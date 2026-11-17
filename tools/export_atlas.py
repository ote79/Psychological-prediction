"""Export the local CES atlas from its model handoff and sensing tables.

python tools/export_atlas.py --ces-root PATH --model-package PATH
"""

import argparse
import csv
import json
import math
from datetime import date
from pathlib import Path


PROJECT = Path(__file__).resolve().parents[1]
ZONES = ("home", "study", "food", "social", "leisure")
QUALITY = {"HIGH_CONFIDENCE": "记录充分", "MEDIUM_CONFIDENCE": "基本可用"}


def read_rows(path):
    with path.open(encoding="utf-8-sig", newline="") as source:
        yield from csv.DictReader(source)


def nullable_number(value, digits):
    return round(float(value), digits) if value and value.lower() != "nan" else None


def export(ces_root, model_package, destination):
    payload = json.loads((model_package / "前端对接/demo_payload.json").read_text(encoding="utf-8"))
    scores = {
        row["uid"]: float(row["score"])
        for row in read_rows(model_package / "实验结果/oof_predictions.csv")
        if row["variant"] == "fusion_all_weighted" and row["repeat"] == "0" and row["seed"] == "42"
    }
    features = {
        row["uid"]: row for row in read_rows(
            ces_root / "processed/feature_tables/ces_early_first56_future56_mean_only_candidate_table.csv"
        )
    }

    students = []
    windows = {}
    # The handoff and the previous workbench share the same participant order.
    for index, record in enumerate(payload["student_records"]):
        uid = record["full_uid"]
        row = features[uid]
        start = date.fromisoformat(row["feature_start"][:10])
        end = date.fromisoformat(row["feature_end"][:10])
        assert (end - start).days == 55
        windows[uid] = index, start, end
        score = scores[uid]
        students.append({
            "id": f"GW-{index + 1:03d}",
            "score": score,
            "high": score >= 0.70,
            "quality": QUALITY[record["quality_tier"]],
            "residenceHours": nullable_number(row["g1_loc_home_dur_mean"], 2),
            "studyHours": nullable_number(row["g1_loc_study_dur_mean"], 2),
            "nightUnlocks": nullable_number(row["g2_night_unlock_count_mean"], 1),
            "sensingDays": int(row["coverage_sensing_days"]),
        })

    events = []
    with (ces_root / "raw/Sensing/sensing.csv").open(encoding="utf-8-sig", newline="") as source:
        reader = csv.reader(source)
        columns = next(reader)
        uid_col, day_col = columns.index("uid"), columns.index("day")
        zone_cols = [columns.index(f"loc_{zone}_dur") for zone in ZONES]
        for row in reader:
            window = windows.get(row[uid_col])
            if window is None:
                continue
            student_index, start, end = window
            # CES stores either YYYYMMDD or ISO dates in different exports.
            iso_day = row[day_col].replace("-", "")
            observed = date(int(iso_day[:4]), int(iso_day[4:6]), int(iso_day[6:8]))
            if start <= observed <= end:
                day = (observed - start).days + 1
                for zone_index, column in enumerate(zone_cols):
                    if row[column]:
                        hours = float(row[column])
                        if hours > 0:
                            events.append([student_index, day, zone_index, hours])
    events.sort()
    assert len(students) == len(scores) == len(windows) == 209
    assert sum(student["high"] for student in students) == 14
    assert len({event[0] for event in events}) == 206
    assert len(events) == len({tuple(event[:3]) for event in events}) == 23341
    # Source durations occasionally extend a few minutes past 24 hours.
    assert all(math.isfinite(hours) and hours > 0 for _, _, _, hours in events)

    data = {"zones": list(ZONES), "students": students, "events": events}
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("w", encoding="utf-8", newline="\n") as output:
        output.write("window.ATLAS_DATA = ")
        json.dump(data, output, ensure_ascii=False, separators=(",", ":"), allow_nan=False)
        output.write(";\n")
    print(f"Exported {len(students)} students and {len(events)} daily zone records.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ces-root", required=True, type=Path)
    parser.add_argument("--model-package", required=True, type=Path)
    parser.add_argument("--output", type=Path, default=PROJECT / "campus-atlas/dataset.js")
    options = parser.parse_args()
    export(options.ces_root, options.model_package, options.output)
