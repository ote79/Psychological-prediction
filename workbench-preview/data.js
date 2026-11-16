window.PREVIEW_DATA = {
  "metadata": {
    "dataset": "CES",
    "sourceFile": "CES最新成果包_2026-11-11/前端对接/demo_payload.json",
    "sourceDate": "2026-11-11",
    "sourceSha256": "45b6fc17a025f5a832838b00c6de48141845e6b79a767555359447eb4dd6d773",
    "model": "fusion_all_weighted",
    "predictionSource": "Out-of-fold, first repeat, seed=42; not live deployment",
    "endpoint": "Any observed PHQ-4 total >=6 in following 56 days, after first 56 sensing days",
    "positives": 53,
    "showcaseUid": "6c4cf487",
    "thresholds": [
      0.5,
      0.7
    ],
    "chartScoreSource": "实验结果/oof_predictions.csv，repeat=0，seed=42，fusion_all_weighted"
  },
  "records": [
    {
      "uid": "003df5de",
      "score": 0.456,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.37,
        "study_hours_daily": 4.4,
        "night_unlock_times": 17.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.18,
        "spatial_residence": 0.26,
        "study_engagement": 0.66
      },
      "scoreExact": 0.4562722303481595
    },
    {
      "uid": "0107c61e",
      "score": 0.552,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.52,
        "study_hours_daily": 1.44,
        "night_unlock_times": 33.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.81,
        "spatial_residence": 0.61,
        "study_engagement": -0.49
      },
      "scoreExact": 0.5516434708545808
    },
    {
      "uid": "031cf953",
      "score": 0.483,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.09,
        "study_hours_daily": 0.94,
        "night_unlock_times": 8.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.79,
        "spatial_residence": -0.76,
        "study_engagement": -0.68
      },
      "scoreExact": 0.48319180015095864
    },
    {
      "uid": "03a0ce56",
      "score": 0.569,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 6.35,
        "study_hours_daily": 2.24,
        "night_unlock_times": 28.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.49,
        "spatial_residence": -1.61,
        "study_engagement": -0.17
      },
      "scoreExact": 0.5687082124599938
    },
    {
      "uid": "07eab8e2",
      "score": 0.404,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 3.93,
        "study_hours_daily": 2.29,
        "night_unlock_times": 17.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.17,
        "spatial_residence": -2.36,
        "study_engagement": -0.16
      },
      "scoreExact": 0.40422136695768357
    },
    {
      "uid": "0947cdc8",
      "score": 0.18,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.12,
        "study_hours_daily": 9.31,
        "night_unlock_times": 9.3,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.71,
        "spatial_residence": 0.18,
        "study_engagement": 2.56
      },
      "scoreExact": 0.1795038818289148
    },
    {
      "uid": "0ab7acb3",
      "score": 0.205,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.19,
        "study_hours_daily": 4.37,
        "night_unlock_times": 16.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.28,
        "spatial_residence": 0.2,
        "study_engagement": 0.65
      },
      "scoreExact": 0.20503159981649596
    },
    {
      "uid": "0aee9faa",
      "score": 0.6,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.875,
      "behavior": {
        "residence_hours_daily": 9.88,
        "study_hours_daily": 0.66,
        "night_unlock_times": 19.1,
        "sensing_days": 49
      },
      "deviations": {
        "circadian_night_unlock": -0.09,
        "spatial_residence": -0.51,
        "study_engagement": -0.79
      },
      "scoreExact": 0.6000762198195224
    },
    {
      "uid": "0b9c2303",
      "score": 0.561,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 16.61,
        "study_hours_daily": 0.73,
        "night_unlock_times": 61,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 2.57,
        "spatial_residence": 1.57,
        "study_engagement": -0.76
      },
      "scoreExact": 0.5610692104220287
    },
    {
      "uid": "0ba15aa0",
      "score": 0.901,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.982,
      "behavior": {
        "residence_hours_daily": 11.78,
        "study_hours_daily": 1.31,
        "night_unlock_times": 41.9,
        "sensing_days": 55
      },
      "deviations": {
        "circadian_night_unlock": 1.36,
        "spatial_residence": 0.08,
        "study_engagement": -0.54
      },
      "scoreExact": 0.9005665049227841
    },
    {
      "uid": "0f2be96b",
      "score": 0.707,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.16,
        "study_hours_daily": 0.88,
        "night_unlock_times": 42.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 1.4,
        "spatial_residence": 0.19,
        "study_engagement": -0.7
      },
      "scoreExact": 0.7067847136634287
    },
    {
      "uid": "0f727c10",
      "score": 0.441,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.43,
        "study_hours_daily": 1.3,
        "night_unlock_times": 18.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.14,
        "spatial_residence": -0.65,
        "study_engagement": -0.54
      },
      "scoreExact": 0.44120435342844
    },
    {
      "uid": "107c0624",
      "score": 0.555,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.9,
        "study_hours_daily": 3.61,
        "night_unlock_times": 11.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.57,
        "spatial_residence": 0.73,
        "study_engagement": 0.35
      },
      "scoreExact": 0.5550538849258068
    },
    {
      "uid": "12e0a85e",
      "score": 0.454,
      "tier": "green",
      "quality": "MEDIUM_CONFIDENCE",
      "qualityWeight": 0.768,
      "behavior": {
        "residence_hours_daily": 14.2,
        "study_hours_daily": 1.44,
        "night_unlock_times": 17.2,
        "sensing_days": 43
      },
      "deviations": {
        "circadian_night_unlock": -0.21,
        "spatial_residence": 0.82,
        "study_engagement": -0.49
      },
      "scoreExact": 0.4544140488996944
    },
    {
      "uid": "12f90c19",
      "score": 0.448,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 7.06,
        "study_hours_daily": 0.66,
        "night_unlock_times": 11.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.6,
        "spatial_residence": -1.39,
        "study_engagement": -0.78
      },
      "scoreExact": 0.448216056742233
    },
    {
      "uid": "13789d5f",
      "score": 0.346,
      "tier": "green",
      "quality": "MEDIUM_CONFIDENCE",
      "qualityWeight": 0.679,
      "behavior": {
        "residence_hours_daily": 11.06,
        "study_hours_daily": 3.77,
        "night_unlock_times": 12,
        "sensing_days": 38
      },
      "deviations": {
        "circadian_night_unlock": -0.54,
        "spatial_residence": -0.15,
        "study_engagement": 0.42
      },
      "scoreExact": 0.34580814341389815
    },
    {
      "uid": "1618e7f7",
      "score": 0.55,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.18,
        "study_hours_daily": 1.05,
        "night_unlock_times": 10.3,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.65,
        "spatial_residence": -0.42,
        "study_engagement": -0.64
      },
      "scoreExact": 0.5502841605821647
    },
    {
      "uid": "165970c3",
      "score": 0.372,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.93,
        "study_hours_daily": 1.26,
        "night_unlock_times": 8.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.76,
        "spatial_residence": 0.12,
        "study_engagement": -0.56
      },
      "scoreExact": 0.3724843556810476
    },
    {
      "uid": "169d3212",
      "score": 0.819,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 6.81,
        "study_hours_daily": 1.95,
        "night_unlock_times": 10.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.65,
        "spatial_residence": -1.47,
        "study_engagement": -0.29
      },
      "scoreExact": 0.8191651177492657
    },
    {
      "uid": "1741432f",
      "score": 0.594,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 15.08,
        "study_hours_daily": 1.68,
        "night_unlock_times": 15.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.35,
        "spatial_residence": 1.1,
        "study_engagement": -0.39
      },
      "scoreExact": 0.594419355463209
    },
    {
      "uid": "17fb1517",
      "score": 0.177,
      "tier": "green",
      "quality": "MEDIUM_CONFIDENCE",
      "qualityWeight": 0.589,
      "behavior": {
        "residence_hours_daily": 5.93,
        "study_hours_daily": 2.72,
        "night_unlock_times": 67.7,
        "sensing_days": 33
      },
      "deviations": {
        "circadian_night_unlock": 2.99,
        "spatial_residence": -1.74,
        "study_engagement": 0.01
      },
      "scoreExact": 0.17655811956070144
    },
    {
      "uid": "1893420f",
      "score": 0.423,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.68,
        "study_hours_daily": 0.13,
        "night_unlock_times": 16.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.24,
        "spatial_residence": 0.04,
        "study_engagement": -0.99
      },
      "scoreExact": 0.42259647626704927
    },
    {
      "uid": "1badfae6",
      "score": 0.768,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 0,
        "study_hours_daily": 0,
        "night_unlock_times": 22.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.13,
        "spatial_residence": -3.58,
        "study_engagement": -1.04
      },
      "scoreExact": 0.7676291209776837
    },
    {
      "uid": "1c12f394",
      "score": 0.247,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.84,
        "study_hours_daily": 3.91,
        "night_unlock_times": 22.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.14,
        "spatial_residence": -0.22,
        "study_engagement": 0.47
      },
      "scoreExact": 0.24656233951163456
    },
    {
      "uid": "1d0fa4df",
      "score": 0.645,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.75,
        "study_hours_daily": 0.16,
        "night_unlock_times": 17.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.21,
        "spatial_residence": -0.25,
        "study_engagement": -0.98
      },
      "scoreExact": 0.6445110576326402
    },
    {
      "uid": "1d226352",
      "score": 0.261,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.93,
        "study_hours_daily": 4.85,
        "night_unlock_times": 48.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 1.8,
        "spatial_residence": -0.19,
        "study_engagement": 0.83
      },
      "scoreExact": 0.2605241922884538
    },
    {
      "uid": "1df93e60",
      "score": 0.491,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.946,
      "behavior": {
        "residence_hours_daily": 5.63,
        "study_hours_daily": 0.35,
        "night_unlock_times": 1.3,
        "sensing_days": 53
      },
      "deviations": {
        "circadian_night_unlock": -1.22,
        "spatial_residence": -1.83,
        "study_engagement": -0.91
      },
      "scoreExact": 0.49084009752175434
    },
    {
      "uid": "1ff6d7f3",
      "score": 0.37,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.39,
        "study_hours_daily": 3.06,
        "night_unlock_times": 5.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.93,
        "spatial_residence": 0.88,
        "study_engagement": 0.14
      },
      "scoreExact": 0.3701243759192918
    },
    {
      "uid": "1fff60a0",
      "score": 0.457,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.87,
        "study_hours_daily": 1.35,
        "night_unlock_times": 29.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.56,
        "spatial_residence": 1.03,
        "study_engagement": -0.52
      },
      "scoreExact": 0.45727882849318113
    },
    {
      "uid": "20b8c420",
      "score": 0.377,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.05,
        "study_hours_daily": 3.1,
        "night_unlock_times": 29.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.57,
        "spatial_residence": 0.16,
        "study_engagement": 0.16
      },
      "scoreExact": 0.3771278680458521
    },
    {
      "uid": "21252173",
      "score": 0.479,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.08,
        "study_hours_daily": 6.31,
        "night_unlock_times": 22.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.14,
        "spatial_residence": -1.07,
        "study_engagement": 1.4
      },
      "scoreExact": 0.4789388371452158
    },
    {
      "uid": "23d00aa2",
      "score": 0.558,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 15.35,
        "study_hours_daily": 2.31,
        "night_unlock_times": 18.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.1,
        "spatial_residence": 1.18,
        "study_engagement": -0.15
      },
      "scoreExact": 0.5583326973653607
    },
    {
      "uid": "24e89780",
      "score": 0.585,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.14,
        "study_hours_daily": 0.59,
        "night_unlock_times": 8.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.74,
        "spatial_residence": -0.12,
        "study_engagement": -0.81
      },
      "scoreExact": 0.5848918168383065
    },
    {
      "uid": "284784fd",
      "score": 0.236,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.73,
        "study_hours_daily": 3.37,
        "night_unlock_times": 11.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.6,
        "spatial_residence": -0.56,
        "study_engagement": 0.26
      },
      "scoreExact": 0.23564481913051102
    },
    {
      "uid": "2b3d267f",
      "score": 0.359,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.964,
      "behavior": {
        "residence_hours_daily": 16.17,
        "study_hours_daily": 2.19,
        "night_unlock_times": 27.1,
        "sensing_days": 54
      },
      "deviations": {
        "circadian_night_unlock": 0.42,
        "spatial_residence": 1.43,
        "study_engagement": -0.2
      },
      "scoreExact": 0.3585006927146094
    },
    {
      "uid": "2c4f43b2",
      "score": 0.427,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.89,
        "study_hours_daily": 0.43,
        "night_unlock_times": 9.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.7,
        "spatial_residence": -0.82,
        "study_engagement": -0.88
      },
      "scoreExact": 0.4274095556985858
    },
    {
      "uid": "2cc3f627",
      "score": 0.529,
      "tier": "orange",
      "quality": "MEDIUM_CONFIDENCE",
      "qualityWeight": 0.643,
      "behavior": {
        "residence_hours_daily": 8.26,
        "study_hours_daily": 1.99,
        "night_unlock_times": 12.2,
        "sensing_days": 36
      },
      "deviations": {
        "circadian_night_unlock": -0.53,
        "spatial_residence": -1.02,
        "study_engagement": -0.27
      },
      "scoreExact": 0.5293857770078709
    },
    {
      "uid": "2d06da49",
      "score": 0.376,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.11,
        "study_hours_daily": 3.24,
        "night_unlock_times": 11.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.58,
        "spatial_residence": -0.44,
        "study_engagement": 0.21
      },
      "scoreExact": 0.37620828488804176
    },
    {
      "uid": "2d5d41b5",
      "score": 0.347,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.71,
        "study_hours_daily": 2.47,
        "night_unlock_times": 11.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.6,
        "spatial_residence": 0.05,
        "study_engagement": -0.09
      },
      "scoreExact": 0.3467046960328305
    },
    {
      "uid": "2de8db6a",
      "score": 0.59,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 15.61,
        "study_hours_daily": 4.14,
        "night_unlock_times": 22.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.13,
        "spatial_residence": 1.26,
        "study_engagement": 0.56
      },
      "scoreExact": 0.5904904918225352
    },
    {
      "uid": "2f706716",
      "score": 0.512,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.36,
        "study_hours_daily": 1.48,
        "night_unlock_times": 10.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.66,
        "spatial_residence": 0.25,
        "study_engagement": -0.47
      },
      "scoreExact": 0.511685060832326
    },
    {
      "uid": "30b49773",
      "score": 0.457,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.4,
        "study_hours_daily": 8.69,
        "night_unlock_times": 25.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.33,
        "spatial_residence": 0.58,
        "study_engagement": 2.32
      },
      "scoreExact": 0.45742018566617154
    },
    {
      "uid": "34ed21e6",
      "score": 0.348,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.87,
        "study_hours_daily": 2.43,
        "night_unlock_times": 14.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.38,
        "spatial_residence": -0.52,
        "study_engagement": -0.1
      },
      "scoreExact": 0.3484208590833877
    },
    {
      "uid": "3528757e",
      "score": 0.367,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.63,
        "study_hours_daily": 1.2,
        "night_unlock_times": 27.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.44,
        "spatial_residence": 0.34,
        "study_engagement": -0.58
      },
      "scoreExact": 0.3672270802746062
    },
    {
      "uid": "3569e2f5",
      "score": 0.605,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.92,
        "study_hours_daily": 3.07,
        "night_unlock_times": 12.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.53,
        "spatial_residence": 0.43,
        "study_engagement": 0.15
      },
      "scoreExact": 0.6051023238795362
    },
    {
      "uid": "35cf1abf",
      "score": 0.211,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.946,
      "behavior": {
        "residence_hours_daily": 9,
        "study_hours_daily": 0.21,
        "night_unlock_times": 2.9,
        "sensing_days": 53
      },
      "deviations": {
        "circadian_night_unlock": -1.12,
        "spatial_residence": -0.79,
        "study_engagement": -0.96
      },
      "scoreExact": 0.21104734215611765
    },
    {
      "uid": "374d8bd8",
      "score": 0.423,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.64,
        "study_hours_daily": 1.18,
        "night_unlock_times": 25.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.31,
        "spatial_residence": 0.34,
        "study_engagement": -0.59
      },
      "scoreExact": 0.4234840441095204
    },
    {
      "uid": "3bb377ba",
      "score": 0.434,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.67,
        "study_hours_daily": 14.13,
        "night_unlock_times": 14.3,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.39,
        "spatial_residence": 0.35,
        "study_engagement": 4.42
      },
      "scoreExact": 0.4340286657161798
    },
    {
      "uid": "3d1a8b91",
      "score": 0.431,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.16,
        "study_hours_daily": 1.62,
        "night_unlock_times": 18.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.12,
        "spatial_residence": 0.19,
        "study_engagement": -0.42
      },
      "scoreExact": 0.4314941680431374
    },
    {
      "uid": "3dad5f11",
      "score": 0.346,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.12,
        "study_hours_daily": 4.74,
        "night_unlock_times": 11,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.61,
        "spatial_residence": 0.18,
        "study_engagement": 0.79
      },
      "scoreExact": 0.3459626653681111
    },
    {
      "uid": "3e7ca354",
      "score": 0.43,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 5.25,
        "study_hours_daily": 0.75,
        "night_unlock_times": 9.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.7,
        "spatial_residence": -1.95,
        "study_engagement": -0.75
      },
      "scoreExact": 0.4298891342124022
    },
    {
      "uid": "4005a296",
      "score": 0.399,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.96,
        "study_hours_daily": 1.34,
        "night_unlock_times": 6.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.91,
        "spatial_residence": 0.75,
        "study_engagement": -0.52
      },
      "scoreExact": 0.398573185556199
    },
    {
      "uid": "42287580",
      "score": 0.416,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.74,
        "study_hours_daily": 1.75,
        "night_unlock_times": 10.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.63,
        "spatial_residence": 0.37,
        "study_engagement": -0.37
      },
      "scoreExact": 0.41568105928881866
    },
    {
      "uid": "429cf5f8",
      "score": 0.579,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.11,
        "study_hours_daily": 1.46,
        "night_unlock_times": 25.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.34,
        "spatial_residence": 0.8,
        "study_engagement": -0.48
      },
      "scoreExact": 0.5787821338530206
    },
    {
      "uid": "45555d33",
      "score": 0.327,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.23,
        "study_hours_daily": 3.09,
        "night_unlock_times": 22.3,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.11,
        "spatial_residence": 0.21,
        "study_engagement": 0.15
      },
      "scoreExact": 0.32656411300678917
    },
    {
      "uid": "46562035",
      "score": 0.035,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.34,
        "study_hours_daily": 1.23,
        "night_unlock_times": 113.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 5.88,
        "spatial_residence": -0.68,
        "study_engagement": -0.57
      },
      "scoreExact": 0.03477986918841357
    },
    {
      "uid": "46b53cdf",
      "score": 0.478,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.79,
        "study_hours_daily": 2.15,
        "night_unlock_times": 11.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.57,
        "spatial_residence": 0.39,
        "study_engagement": -0.21
      },
      "scoreExact": 0.47781661790414615
    },
    {
      "uid": "46f1dfed",
      "score": 0.266,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.41,
        "study_hours_daily": 2.92,
        "night_unlock_times": 21.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.07,
        "spatial_residence": 0.58,
        "study_engagement": 0.09
      },
      "scoreExact": 0.2656959371584672
    },
    {
      "uid": "480fca3c",
      "score": 0.412,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.59,
        "study_hours_daily": 2.57,
        "night_unlock_times": 12.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.48,
        "spatial_residence": -0.61,
        "study_engagement": -0.05
      },
      "scoreExact": 0.41158733797702673
    },
    {
      "uid": "4a8ac645",
      "score": 0.557,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 7.43,
        "study_hours_daily": 2.74,
        "night_unlock_times": 21,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.03,
        "spatial_residence": -1.28,
        "study_engagement": 0.02
      },
      "scoreExact": 0.5573538045574623
    },
    {
      "uid": "4b5eb55e",
      "score": 0.552,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.89,
        "study_hours_daily": 3.05,
        "night_unlock_times": 45.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 1.59,
        "spatial_residence": 0.11,
        "study_engagement": 0.14
      },
      "scoreExact": 0.5517335430079303
    },
    {
      "uid": "4e37495c",
      "score": 0.345,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.56,
        "study_hours_daily": 3.13,
        "night_unlock_times": 43.3,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 1.45,
        "spatial_residence": 0.01,
        "study_engagement": 0.17
      },
      "scoreExact": 0.34520069136703896
    },
    {
      "uid": "4eeb9f06",
      "score": 0.615,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 17.91,
        "study_hours_daily": 1.2,
        "night_unlock_times": 10.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.65,
        "spatial_residence": 1.98,
        "study_engagement": -0.58
      },
      "scoreExact": 0.6150445745075489
    },
    {
      "uid": "50e32d5c",
      "score": 0.603,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 16.52,
        "study_hours_daily": 1.74,
        "night_unlock_times": 22.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.12,
        "spatial_residence": 1.54,
        "study_engagement": -0.37
      },
      "scoreExact": 0.6031924557821606
    },
    {
      "uid": "51ac1dd0",
      "score": 0.296,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.11,
        "study_hours_daily": 3.26,
        "night_unlock_times": 12.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.5,
        "spatial_residence": 0.49,
        "study_engagement": 0.22
      },
      "scoreExact": 0.29602399022618114
    },
    {
      "uid": "54446e36",
      "score": 0.573,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 15.82,
        "study_hours_daily": 0.32,
        "night_unlock_times": 12.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.51,
        "spatial_residence": 1.33,
        "study_engagement": -0.92
      },
      "scoreExact": 0.572820998741268
    },
    {
      "uid": "557b44c8",
      "score": 0.502,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.44,
        "study_hours_daily": 3.1,
        "night_unlock_times": 26.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.39,
        "spatial_residence": 0.9,
        "study_engagement": 0.16
      },
      "scoreExact": 0.5018844946456101
    },
    {
      "uid": "5580eba4",
      "score": 0.294,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.08,
        "study_hours_daily": 2.19,
        "night_unlock_times": 31.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.72,
        "spatial_residence": -1.07,
        "study_engagement": -0.19
      },
      "scoreExact": 0.2943110504189862
    },
    {
      "uid": "56b90ef8",
      "score": 0.362,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.982,
      "behavior": {
        "residence_hours_daily": 13.42,
        "study_hours_daily": 1.87,
        "night_unlock_times": 31.2,
        "sensing_days": 55
      },
      "deviations": {
        "circadian_night_unlock": 0.68,
        "spatial_residence": 0.58,
        "study_engagement": -0.32
      },
      "scoreExact": 0.36214510635195635
    },
    {
      "uid": "58863d02",
      "score": 0.592,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.67,
        "study_hours_daily": 0.61,
        "night_unlock_times": 29.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.57,
        "spatial_residence": -0.89,
        "study_engagement": -0.8
      },
      "scoreExact": 0.5921516836456296
    },
    {
      "uid": "59256b07",
      "score": 0.389,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.24,
        "study_hours_daily": 2.13,
        "night_unlock_times": 13.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.47,
        "spatial_residence": 0.22,
        "study_engagement": -0.22
      },
      "scoreExact": 0.38890862309872987
    },
    {
      "uid": "596df3c2",
      "score": 0.135,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.23,
        "study_hours_daily": 4.63,
        "night_unlock_times": 9.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.68,
        "spatial_residence": -0.1,
        "study_engagement": 0.75
      },
      "scoreExact": 0.13484023044020538
    },
    {
      "uid": "59cf760c",
      "score": 0.395,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.46,
        "study_hours_daily": 2.98,
        "night_unlock_times": 10.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.66,
        "spatial_residence": -0.03,
        "study_engagement": 0.11
      },
      "scoreExact": 0.39532931523697873
    },
    {
      "uid": "5a254d64",
      "score": 0.591,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.03,
        "study_hours_daily": 0.73,
        "night_unlock_times": 30.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.62,
        "spatial_residence": 0.15,
        "study_engagement": -0.76
      },
      "scoreExact": 0.5914711852617116
    },
    {
      "uid": "5c446b55",
      "score": 0.339,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.48,
        "study_hours_daily": 0.41,
        "night_unlock_times": 1.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -1.21,
        "spatial_residence": -0.33,
        "study_engagement": -0.88
      },
      "scoreExact": 0.339146702548219
    },
    {
      "uid": "5e1d4d27",
      "score": 0.226,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.821,
      "behavior": {
        "residence_hours_daily": 10.95,
        "study_hours_daily": 3.87,
        "night_unlock_times": 38.4,
        "sensing_days": 46
      },
      "deviations": {
        "circadian_night_unlock": 1.14,
        "spatial_residence": -0.18,
        "study_engagement": 0.45
      },
      "scoreExact": 0.22560268627165778
    },
    {
      "uid": "5e8e425f",
      "score": 0.487,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 6.67,
        "study_hours_daily": 1.14,
        "night_unlock_times": 12.3,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.52,
        "spatial_residence": -1.51,
        "study_engagement": -0.6
      },
      "scoreExact": 0.486770926692231
    },
    {
      "uid": "5fa34bfc",
      "score": 0.537,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.26,
        "study_hours_daily": 2.2,
        "night_unlock_times": 7.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.81,
        "spatial_residence": 0.84,
        "study_engagement": -0.19
      },
      "scoreExact": 0.5369248520336983
    },
    {
      "uid": "600713d9",
      "score": 0.513,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.72,
        "study_hours_daily": 0.9,
        "night_unlock_times": 4.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -1.01,
        "spatial_residence": 0.99,
        "study_engagement": -0.69
      },
      "scoreExact": 0.5133114122102502
    },
    {
      "uid": "61f9310e",
      "score": 0.406,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.7,
        "study_hours_daily": 2.48,
        "night_unlock_times": 18,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.16,
        "spatial_residence": -0.57,
        "study_engagement": -0.08
      },
      "scoreExact": 0.40574042383615655
    },
    {
      "uid": "6294895f",
      "score": 0.692,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 7.65,
        "study_hours_daily": 0.34,
        "night_unlock_times": 14.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.37,
        "spatial_residence": -1.21,
        "study_engagement": -0.91
      },
      "scoreExact": 0.691834551673028
    },
    {
      "uid": "62caae28",
      "score": 0.455,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 17.33,
        "study_hours_daily": 0.82,
        "night_unlock_times": 24.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.27,
        "spatial_residence": 1.8,
        "study_engagement": -0.73
      },
      "scoreExact": 0.4549289688344762
    },
    {
      "uid": "62e43e34",
      "score": 0.455,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.982,
      "behavior": {
        "residence_hours_daily": 11.55,
        "study_hours_daily": 1.72,
        "night_unlock_times": 22.1,
        "sensing_days": 55
      },
      "deviations": {
        "circadian_night_unlock": 0.1,
        "spatial_residence": 0,
        "study_engagement": -0.38
      },
      "scoreExact": 0.45523774009476736
    },
    {
      "uid": "632503a1",
      "score": 0.761,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.93,
        "study_hours_daily": 1.83,
        "night_unlock_times": 105.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 5.37,
        "spatial_residence": -0.81,
        "study_engagement": -0.33
      },
      "scoreExact": 0.7605218851040043
    },
    {
      "uid": "63e8142e",
      "score": 0.407,
      "tier": "green",
      "quality": "MEDIUM_CONFIDENCE",
      "qualityWeight": 0.732,
      "behavior": {
        "residence_hours_daily": 0.83,
        "study_hours_daily": 0.04,
        "night_unlock_times": 12.4,
        "sensing_days": 41
      },
      "deviations": {
        "circadian_night_unlock": -0.52,
        "spatial_residence": -3.32,
        "study_engagement": -1.02
      },
      "scoreExact": 0.4067036610456466
    },
    {
      "uid": "64f2d26b",
      "score": 0.551,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.964,
      "behavior": {
        "residence_hours_daily": 14.2,
        "study_hours_daily": 1.59,
        "night_unlock_times": 18.3,
        "sensing_days": 54
      },
      "deviations": {
        "circadian_night_unlock": -0.14,
        "spatial_residence": 0.83,
        "study_engagement": -0.43
      },
      "scoreExact": 0.5509827037944248
    },
    {
      "uid": "6683f5d8",
      "score": 0.55,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.33,
        "study_hours_daily": 2.94,
        "night_unlock_times": 8.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.76,
        "spatial_residence": 0.86,
        "study_engagement": 0.1
      },
      "scoreExact": 0.5500622724182177
    },
    {
      "uid": "690d25f3",
      "score": 0.433,
      "tier": "green",
      "quality": "MEDIUM_CONFIDENCE",
      "qualityWeight": 0.679,
      "behavior": {
        "residence_hours_daily": 11.54,
        "study_hours_daily": 7.6,
        "night_unlock_times": 8.3,
        "sensing_days": 38
      },
      "deviations": {
        "circadian_night_unlock": -0.78,
        "spatial_residence": 0,
        "study_engagement": 1.9
      },
      "scoreExact": 0.4325877083855054
    },
    {
      "uid": "69d24b22",
      "score": 0.329,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.55,
        "study_hours_daily": 2.72,
        "night_unlock_times": 27.3,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.43,
        "spatial_residence": -0.31,
        "study_engagement": 0.01
      },
      "scoreExact": 0.32913398445804526
    },
    {
      "uid": "6b0083d0",
      "score": 0.241,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.48,
        "study_hours_daily": 1.2,
        "night_unlock_times": 81.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 3.9,
        "spatial_residence": -0.95,
        "study_engagement": -0.58
      },
      "scoreExact": 0.24090094117532285
    },
    {
      "uid": "6b22ac28",
      "score": 0.279,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.88,
        "study_hours_daily": 3.62,
        "night_unlock_times": 47.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 1.71,
        "spatial_residence": -0.21,
        "study_engagement": 0.36
      },
      "scoreExact": 0.2786782313573187
    },
    {
      "uid": "6b4ad83b",
      "score": 0.64,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.67,
        "study_hours_daily": 2.38,
        "night_unlock_times": 57.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 2.32,
        "spatial_residence": 0.04,
        "study_engagement": -0.12
      },
      "scoreExact": 0.6400487387522122
    },
    {
      "uid": "6c4cf487",
      "score": 0.731,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 18.34,
        "study_hours_daily": 2.6,
        "night_unlock_times": 22.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.11,
        "spatial_residence": 2.11,
        "study_engagement": -0.04
      },
      "scoreExact": 0.7310767811636021
    },
    {
      "uid": "6ed487d2",
      "score": 0.35,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.839,
      "behavior": {
        "residence_hours_daily": 5.15,
        "study_hours_daily": 0.77,
        "night_unlock_times": 23,
        "sensing_days": 47
      },
      "deviations": {
        "circadian_night_unlock": 0.16,
        "spatial_residence": -1.98,
        "study_engagement": -0.74
      },
      "scoreExact": 0.35006093735745747
    },
    {
      "uid": "703c70ff",
      "score": 0.373,
      "tier": "green",
      "quality": "MEDIUM_CONFIDENCE",
      "qualityWeight": 0.554,
      "behavior": {
        "residence_hours_daily": 9.58,
        "study_hours_daily": 4.99,
        "night_unlock_times": 15.5,
        "sensing_days": 31
      },
      "deviations": {
        "circadian_night_unlock": -0.32,
        "spatial_residence": -0.61,
        "study_engagement": 0.89
      },
      "scoreExact": 0.3729831369997463
    },
    {
      "uid": "713a6a94",
      "score": 0.495,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.1,
        "study_hours_daily": 3.33,
        "night_unlock_times": 17,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.22,
        "spatial_residence": 0.79,
        "study_engagement": 0.25
      },
      "scoreExact": 0.4954636902554854
    },
    {
      "uid": "73e13f82",
      "score": 0.295,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.911,
      "behavior": {
        "residence_hours_daily": 8.06,
        "study_hours_daily": 1.28,
        "night_unlock_times": 7.4,
        "sensing_days": 51
      },
      "deviations": {
        "circadian_night_unlock": -0.83,
        "spatial_residence": -1.08,
        "study_engagement": -0.55
      },
      "scoreExact": 0.295056262609771
    },
    {
      "uid": "76b564dc",
      "score": 0.275,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.982,
      "behavior": {
        "residence_hours_daily": 13.01,
        "study_hours_daily": 1.96,
        "night_unlock_times": 6.1,
        "sensing_days": 55
      },
      "deviations": {
        "circadian_night_unlock": -0.92,
        "spatial_residence": 0.45,
        "study_engagement": -0.28
      },
      "scoreExact": 0.27529824205295855
    },
    {
      "uid": "791c5803",
      "score": 0.293,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.69,
        "study_hours_daily": 6.29,
        "night_unlock_times": 11.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.6,
        "spatial_residence": -0.26,
        "study_engagement": 1.39
      },
      "scoreExact": 0.29266886981121254
    },
    {
      "uid": "79d8490a",
      "score": 0.383,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.36,
        "study_hours_daily": 12.99,
        "night_unlock_times": 14.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.35,
        "spatial_residence": -0.37,
        "study_engagement": 3.98
      },
      "scoreExact": 0.3831184449475299
    },
    {
      "uid": "7a5f7cc9",
      "score": 0.566,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.5,
        "study_hours_daily": 1.45,
        "night_unlock_times": 12.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.5,
        "spatial_residence": 0.61,
        "study_engagement": -0.48
      },
      "scoreExact": 0.5659226714270352
    },
    {
      "uid": "7d2c632a",
      "score": 0.526,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14,
        "study_hours_daily": 2.39,
        "night_unlock_times": 4.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -1,
        "spatial_residence": 0.76,
        "study_engagement": -0.12
      },
      "scoreExact": 0.5264271207390875
    },
    {
      "uid": "7d41e1ac",
      "score": 0.593,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.88,
        "study_hours_daily": 0.25,
        "night_unlock_times": 7.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.81,
        "spatial_residence": 1.04,
        "study_engagement": -0.95
      },
      "scoreExact": 0.5926394438136114
    },
    {
      "uid": "7e22b6d9",
      "score": 0.565,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.99,
        "study_hours_daily": 0.63,
        "night_unlock_times": 11.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.55,
        "spatial_residence": -0.17,
        "study_engagement": -0.8
      },
      "scoreExact": 0.5653965565191502
    },
    {
      "uid": "80099403",
      "score": 0.479,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.02,
        "study_hours_daily": 2.74,
        "night_unlock_times": 7.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.83,
        "spatial_residence": -0.16,
        "study_engagement": 0.02
      },
      "scoreExact": 0.4794408643345631
    },
    {
      "uid": "8391d8b4",
      "score": 0.406,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.58,
        "study_hours_daily": 2.34,
        "night_unlock_times": 11.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.55,
        "spatial_residence": 0.94,
        "study_engagement": -0.14
      },
      "scoreExact": 0.4060940310990183
    },
    {
      "uid": "83a37a7f",
      "score": 0.245,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.1,
        "study_hours_daily": 3.28,
        "night_unlock_times": 31.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.69,
        "spatial_residence": 0.79,
        "study_engagement": 0.23
      },
      "scoreExact": 0.24457398750511553
    },
    {
      "uid": "83e4705b",
      "score": 0.307,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.27,
        "study_hours_daily": 3.35,
        "night_unlock_times": 36,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.98,
        "spatial_residence": 0.23,
        "study_engagement": 0.25
      },
      "scoreExact": 0.3073672474006697
    },
    {
      "uid": "84120765",
      "score": 0.625,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 7.07,
        "study_hours_daily": 0.78,
        "night_unlock_times": 17.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.18,
        "spatial_residence": -1.39,
        "study_engagement": -0.74
      },
      "scoreExact": 0.6249293793886114
    },
    {
      "uid": "8479552e",
      "score": 0.731,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 16.5,
        "study_hours_daily": 0.67,
        "night_unlock_times": 15.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.29,
        "spatial_residence": 1.54,
        "study_engagement": -0.78
      },
      "scoreExact": 0.7305633770169448
    },
    {
      "uid": "84875d7e",
      "score": 0.57,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.85,
        "study_hours_daily": 2.88,
        "night_unlock_times": 7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.86,
        "spatial_residence": 0.41,
        "study_engagement": 0.07
      },
      "scoreExact": 0.5699049297215681
    },
    {
      "uid": "8617ddac",
      "score": 0.617,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.88,
        "study_hours_daily": 2.44,
        "night_unlock_times": 16.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.25,
        "spatial_residence": 0.11,
        "study_engagement": -0.1
      },
      "scoreExact": 0.6169984285306034
    },
    {
      "uid": "862f10a8",
      "score": 0.459,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 2.23,
        "study_hours_daily": 0.23,
        "night_unlock_times": 9.3,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.71,
        "spatial_residence": -2.89,
        "study_engagement": -0.95
      },
      "scoreExact": 0.45890901010088053
    },
    {
      "uid": "86a13f6d",
      "score": 0.237,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.67,
        "study_hours_daily": 2.35,
        "night_unlock_times": 17.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.17,
        "spatial_residence": -0.58,
        "study_engagement": -0.13
      },
      "scoreExact": 0.23692103149814703
    },
    {
      "uid": "8730e746",
      "score": 0.499,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.65,
        "study_hours_daily": 2.56,
        "night_unlock_times": 12.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.5,
        "spatial_residence": 0.65,
        "study_engagement": -0.05
      },
      "scoreExact": 0.4988835219963921
    },
    {
      "uid": "8733d6d1",
      "score": 0.592,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.85,
        "study_hours_daily": 3.89,
        "night_unlock_times": 15.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.32,
        "spatial_residence": -0.52,
        "study_engagement": 0.46
      },
      "scoreExact": 0.5923309498838844
    },
    {
      "uid": "87d88cba",
      "score": 0.413,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.23,
        "study_hours_daily": 4.06,
        "night_unlock_times": 5.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.93,
        "spatial_residence": -1.03,
        "study_engagement": 0.53
      },
      "scoreExact": 0.41293457639788733
    },
    {
      "uid": "8c0c301d",
      "score": 0.534,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.946,
      "behavior": {
        "residence_hours_daily": 9.31,
        "study_hours_daily": 2.65,
        "night_unlock_times": 30.1,
        "sensing_days": 53
      },
      "deviations": {
        "circadian_night_unlock": 0.61,
        "spatial_residence": -0.69,
        "study_engagement": -0.02
      },
      "scoreExact": 0.5342359902886228
    },
    {
      "uid": "8c644d8c",
      "score": 0.595,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 15.81,
        "study_hours_daily": 1.21,
        "night_unlock_times": 31.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.72,
        "spatial_residence": 1.32,
        "study_engagement": -0.58
      },
      "scoreExact": 0.5946030207764377
    },
    {
      "uid": "8c8ee0b0",
      "score": 0.346,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.63,
        "study_hours_daily": 4.9,
        "night_unlock_times": 20.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.02,
        "spatial_residence": -0.59,
        "study_engagement": 0.85
      },
      "scoreExact": 0.3459395278073167
    },
    {
      "uid": "8ccf6026",
      "score": 0.624,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.21,
        "study_hours_daily": 1.11,
        "night_unlock_times": 12.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.54,
        "spatial_residence": 0.21,
        "study_engagement": -0.61
      },
      "scoreExact": 0.6243627753659049
    },
    {
      "uid": "8e12cde0",
      "score": 0.415,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.18,
        "study_hours_daily": 2.41,
        "night_unlock_times": 37.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 1.06,
        "spatial_residence": 0.2,
        "study_engagement": -0.11
      },
      "scoreExact": 0.4153884541481479
    },
    {
      "uid": "8ee53a46",
      "score": 0.331,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 15.07,
        "study_hours_daily": 1.01,
        "night_unlock_times": 27.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.45,
        "spatial_residence": 1.09,
        "study_engagement": -0.65
      },
      "scoreExact": 0.3314945520761077
    },
    {
      "uid": "8ee7d10d",
      "score": 0.387,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.77,
        "study_hours_daily": 6.65,
        "night_unlock_times": 16.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.24,
        "spatial_residence": 0.07,
        "study_engagement": 1.53
      },
      "scoreExact": 0.386726679889632
    },
    {
      "uid": "8feafc5d",
      "score": 0.463,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.74,
        "study_hours_daily": 2.06,
        "night_unlock_times": 4.3,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -1.03,
        "spatial_residence": 0.37,
        "study_engagement": -0.25
      },
      "scoreExact": 0.4631106077910113
    },
    {
      "uid": "91d30de3",
      "score": 0.369,
      "tier": "green",
      "quality": "MEDIUM_CONFIDENCE",
      "qualityWeight": 0.661,
      "behavior": {
        "residence_hours_daily": 10.9,
        "study_hours_daily": 2.33,
        "night_unlock_times": 15.5,
        "sensing_days": 37
      },
      "deviations": {
        "circadian_night_unlock": -0.32,
        "spatial_residence": -0.2,
        "study_engagement": -0.14
      },
      "scoreExact": 0.3687286703967136
    },
    {
      "uid": "964412e1",
      "score": 0.36,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.7,
        "study_hours_daily": 2.28,
        "night_unlock_times": 16.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.25,
        "spatial_residence": 0.36,
        "study_engagement": -0.16
      },
      "scoreExact": 0.3600768137057673
    },
    {
      "uid": "96835642",
      "score": 0.226,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.94,
        "study_hours_daily": 3.83,
        "night_unlock_times": 17.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.17,
        "spatial_residence": -0.19,
        "study_engagement": 0.44
      },
      "scoreExact": 0.22560145998682374
    },
    {
      "uid": "96cf40f9",
      "score": 0.396,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.2,
        "study_hours_daily": 2.05,
        "night_unlock_times": 13.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.46,
        "spatial_residence": 0.21,
        "study_engagement": -0.25
      },
      "scoreExact": 0.3959336952542264
    },
    {
      "uid": "97487f16",
      "score": 0.382,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.04,
        "study_hours_daily": 1.37,
        "night_unlock_times": 20.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.02,
        "spatial_residence": -1.09,
        "study_engagement": -0.51
      },
      "scoreExact": 0.38157753480285467
    },
    {
      "uid": "98e5152e",
      "score": 0.338,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.62,
        "study_hours_daily": 2.81,
        "night_unlock_times": 31.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.69,
        "spatial_residence": 0.95,
        "study_engagement": 0.05
      },
      "scoreExact": 0.33803416439399253
    },
    {
      "uid": "993b20b5",
      "score": 0.247,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.16,
        "study_hours_daily": 4.95,
        "night_unlock_times": 7.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.82,
        "spatial_residence": 0.5,
        "study_engagement": 0.87
      },
      "scoreExact": 0.24658087307025822
    },
    {
      "uid": "9a67ed14",
      "score": 0.442,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.81,
        "study_hours_daily": 2.35,
        "night_unlock_times": 8.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.75,
        "spatial_residence": 1.01,
        "study_engagement": -0.13
      },
      "scoreExact": 0.4424305659810829
    },
    {
      "uid": "9e9e21ee",
      "score": 0.461,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.25,
        "study_hours_daily": 2.37,
        "night_unlock_times": 24.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.27,
        "spatial_residence": 0.84,
        "study_engagement": -0.13
      },
      "scoreExact": 0.4608720877851901
    },
    {
      "uid": "a23be093",
      "score": 0.33,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.28,
        "study_hours_daily": 6.65,
        "night_unlock_times": 15,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.35,
        "spatial_residence": -0.08,
        "study_engagement": 1.53
      },
      "scoreExact": 0.3297768648206416
    },
    {
      "uid": "a2949761",
      "score": 0.477,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.62,
        "study_hours_daily": 2.65,
        "night_unlock_times": 30.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.64,
        "spatial_residence": -0.29,
        "study_engagement": -0.02
      },
      "scoreExact": 0.47725565141915993
    },
    {
      "uid": "a4dde965",
      "score": 0.298,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.3,
        "study_hours_daily": 2.15,
        "night_unlock_times": 9.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.7,
        "spatial_residence": -0.38,
        "study_engagement": -0.21
      },
      "scoreExact": 0.2976036741738277
    },
    {
      "uid": "a4fcfc9e",
      "score": 0.382,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.79,
        "study_hours_daily": 1.06,
        "night_unlock_times": 9.3,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.72,
        "spatial_residence": 0.08,
        "study_engagement": -0.63
      },
      "scoreExact": 0.3824013036264103
    },
    {
      "uid": "a52b5e80",
      "score": 0.71,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.28,
        "study_hours_daily": 5.23,
        "night_unlock_times": 10.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.64,
        "spatial_residence": 0.54,
        "study_engagement": 0.98
      },
      "scoreExact": 0.7099580175620214
    },
    {
      "uid": "a6c1b8b6",
      "score": 0.382,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.15,
        "study_hours_daily": 0.77,
        "night_unlock_times": 69.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 3.1,
        "spatial_residence": -0.12,
        "study_engagement": -0.74
      },
      "scoreExact": 0.38164924628063485
    },
    {
      "uid": "a7a320d2",
      "score": 0.58,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.964,
      "behavior": {
        "residence_hours_daily": 17.55,
        "study_hours_daily": 12.58,
        "night_unlock_times": 19.1,
        "sensing_days": 54
      },
      "deviations": {
        "circadian_night_unlock": -0.09,
        "spatial_residence": 1.86,
        "study_engagement": 3.82
      },
      "scoreExact": 0.5796115588142369
    },
    {
      "uid": "a7cb6ba9",
      "score": 0.689,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.77,
        "study_hours_daily": 0.82,
        "night_unlock_times": 19.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.07,
        "spatial_residence": 1,
        "study_engagement": -0.72
      },
      "scoreExact": 0.6894685163437951
    },
    {
      "uid": "aa77ecb8",
      "score": 0.322,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.28,
        "study_hours_daily": 2.28,
        "night_unlock_times": 11.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.56,
        "spatial_residence": 0.23,
        "study_engagement": -0.16
      },
      "scoreExact": 0.3219402306175176
    },
    {
      "uid": "ab5ee451",
      "score": 0.328,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.5,
        "study_hours_daily": 2.39,
        "night_unlock_times": 12.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.51,
        "spatial_residence": -0.01,
        "study_engagement": -0.12
      },
      "scoreExact": 0.3282546454397317
    },
    {
      "uid": "ac02afb2",
      "score": 0.515,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.27,
        "study_hours_daily": 2.16,
        "night_unlock_times": 20,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.03,
        "spatial_residence": -0.39,
        "study_engagement": -0.21
      },
      "scoreExact": 0.5150230982716845
    },
    {
      "uid": "ac23ab17",
      "score": 0.435,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.96,
        "study_hours_daily": 12.78,
        "night_unlock_times": 32.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.79,
        "spatial_residence": 1.06,
        "study_engagement": 3.9
      },
      "scoreExact": 0.4349865599417985
    },
    {
      "uid": "ac70fe1f",
      "score": 0.197,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.54,
        "study_hours_daily": 4.09,
        "night_unlock_times": 24.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.25,
        "spatial_residence": -0.62,
        "study_engagement": 0.54
      },
      "scoreExact": 0.19692061874830766
    },
    {
      "uid": "aeeb186f",
      "score": 0.229,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 16.41,
        "study_hours_daily": 2.2,
        "night_unlock_times": 30.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.63,
        "spatial_residence": 1.51,
        "study_engagement": -0.19
      },
      "scoreExact": 0.2288317706742877
    },
    {
      "uid": "b17eeda3",
      "score": 0.623,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.13,
        "study_hours_daily": 0.8,
        "night_unlock_times": 34.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.88,
        "spatial_residence": 0.8,
        "study_engagement": -0.73
      },
      "scoreExact": 0.6230138294989592
    },
    {
      "uid": "b1fed5ab",
      "score": 0.828,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.16,
        "study_hours_daily": 1.01,
        "night_unlock_times": 33.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.83,
        "spatial_residence": 0.81,
        "study_engagement": -0.65
      },
      "scoreExact": 0.8284909833628785
    },
    {
      "uid": "b3db52ff",
      "score": 0.679,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.982,
      "behavior": {
        "residence_hours_daily": 17.3,
        "study_hours_daily": 0.44,
        "night_unlock_times": 15.9,
        "sensing_days": 55
      },
      "deviations": {
        "circadian_night_unlock": -0.3,
        "spatial_residence": 1.79,
        "study_engagement": -0.87
      },
      "scoreExact": 0.6792119858999741
    },
    {
      "uid": "b4d5a392",
      "score": 0.324,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.58,
        "study_hours_daily": 3.23,
        "night_unlock_times": 38.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 1.14,
        "spatial_residence": 0.01,
        "study_engagement": 0.21
      },
      "scoreExact": 0.3242976348479381
    },
    {
      "uid": "b5dea997",
      "score": 0.272,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.39,
        "study_hours_daily": 2.62,
        "night_unlock_times": 1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -1.24,
        "spatial_residence": -0.67,
        "study_engagement": -0.03
      },
      "scoreExact": 0.27156447369948006
    },
    {
      "uid": "b855dfdd",
      "score": 0.538,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.64,
        "study_hours_daily": 1.84,
        "night_unlock_times": 5.3,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.97,
        "spatial_residence": -0.9,
        "study_engagement": -0.33
      },
      "scoreExact": 0.537971894957522
    },
    {
      "uid": "bbcad502",
      "score": 0.564,
      "tier": "orange",
      "quality": "MEDIUM_CONFIDENCE",
      "qualityWeight": 0.696,
      "behavior": {
        "residence_hours_daily": 8.88,
        "study_hours_daily": 1.69,
        "night_unlock_times": 17.4,
        "sensing_days": 39
      },
      "deviations": {
        "circadian_night_unlock": -0.2,
        "spatial_residence": -0.83,
        "study_engagement": -0.39
      },
      "scoreExact": 0.5641717234818051
    },
    {
      "uid": "bc3ae668",
      "score": 0.328,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 0,
        "study_hours_daily": 0,
        "night_unlock_times": 14.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.37,
        "spatial_residence": -3.58,
        "study_engagement": -1.04
      },
      "scoreExact": 0.32805403927813614
    },
    {
      "uid": "bd441b32",
      "score": 0.21,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 7.85,
        "study_hours_daily": 3.58,
        "night_unlock_times": 11.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.59,
        "spatial_residence": -1.15,
        "study_engagement": 0.34
      },
      "scoreExact": 0.21028013887412839
    },
    {
      "uid": "bd6de07d",
      "score": 0.285,
      "tier": "green",
      "quality": "MEDIUM_CONFIDENCE",
      "qualityWeight": 0.732,
      "behavior": {
        "residence_hours_daily": 11.35,
        "study_hours_daily": 2.34,
        "night_unlock_times": 20.5,
        "sensing_days": 41
      },
      "deviations": {
        "circadian_night_unlock": 0,
        "spatial_residence": -0.06,
        "study_engagement": -0.14
      },
      "scoreExact": 0.2854058748166789
    },
    {
      "uid": "bdefb86f",
      "score": 0.379,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.18,
        "study_hours_daily": 1.63,
        "night_unlock_times": 7.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.83,
        "spatial_residence": -1.04,
        "study_engagement": -0.41
      },
      "scoreExact": 0.3792178239737663
    },
    {
      "uid": "bea4c725",
      "score": 0.691,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 17.13,
        "study_hours_daily": 0.15,
        "night_unlock_times": 23.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.21,
        "spatial_residence": 1.73,
        "study_engagement": -0.98
      },
      "scoreExact": 0.6914616707256926
    },
    {
      "uid": "c0b0998f",
      "score": 0.368,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 7.58,
        "study_hours_daily": 1.95,
        "night_unlock_times": 14.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.37,
        "spatial_residence": -1.23,
        "study_engagement": -0.29
      },
      "scoreExact": 0.36790162902170254
    },
    {
      "uid": "c0fec81b",
      "score": 0.502,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.67,
        "study_hours_daily": 1.68,
        "night_unlock_times": 17.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.17,
        "spatial_residence": 0.66,
        "study_engagement": -0.39
      },
      "scoreExact": 0.501958453263849
    },
    {
      "uid": "c21283c1",
      "score": 0.27,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.13,
        "study_hours_daily": 4.13,
        "night_unlock_times": 6.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.89,
        "spatial_residence": 0.49,
        "study_engagement": 0.56
      },
      "scoreExact": 0.2699436733235911
    },
    {
      "uid": "c21d2515",
      "score": 0.494,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.89,
        "study_hours_daily": 0.63,
        "night_unlock_times": 5.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.93,
        "spatial_residence": 0.11,
        "study_engagement": -0.8
      },
      "scoreExact": 0.4940062515360603
    },
    {
      "uid": "c2d80f95",
      "score": 0.739,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.34,
        "study_hours_daily": 0.64,
        "night_unlock_times": 19.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.09,
        "spatial_residence": 0.56,
        "study_engagement": -0.8
      },
      "scoreExact": 0.7393363401692817
    },
    {
      "uid": "c31fd374",
      "score": 0.207,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.71,
        "study_hours_daily": 6.54,
        "night_unlock_times": 20.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.03,
        "spatial_residence": -0.26,
        "study_engagement": 1.49
      },
      "scoreExact": 0.20747317568979284
    },
    {
      "uid": "c37f9221",
      "score": 0.43,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.51,
        "study_hours_daily": 2.79,
        "night_unlock_times": 31.3,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.68,
        "spatial_residence": 0.61,
        "study_engagement": 0.04
      },
      "scoreExact": 0.4296468258761615
    },
    {
      "uid": "c4de76cb",
      "score": 0.326,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.982,
      "behavior": {
        "residence_hours_daily": 14.16,
        "study_hours_daily": 12.19,
        "night_unlock_times": 6,
        "sensing_days": 55
      },
      "deviations": {
        "circadian_night_unlock": -0.92,
        "spatial_residence": 0.81,
        "study_engagement": 3.67
      },
      "scoreExact": 0.32556915418256777
    },
    {
      "uid": "c703d473",
      "score": 0.214,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.18,
        "study_hours_daily": 5.7,
        "night_unlock_times": 16.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.24,
        "spatial_residence": -0.11,
        "study_engagement": 1.16
      },
      "scoreExact": 0.21401219352239748
    },
    {
      "uid": "c75fc80f",
      "score": 0.387,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 12.85,
        "study_hours_daily": 2.78,
        "night_unlock_times": 19.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.09,
        "spatial_residence": 0.4,
        "study_engagement": 0.03
      },
      "scoreExact": 0.38695145539760867
    },
    {
      "uid": "c7d47e96",
      "score": 0.575,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 0,
        "study_hours_daily": 0,
        "night_unlock_times": 14.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.36,
        "spatial_residence": -3.58,
        "study_engagement": -1.04
      },
      "scoreExact": 0.5747632237670339
    },
    {
      "uid": "c98557ba",
      "score": 0.52,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.58,
        "study_hours_daily": 3.14,
        "night_unlock_times": 24.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.23,
        "spatial_residence": -0.3,
        "study_engagement": 0.17
      },
      "scoreExact": 0.5201959167006891
    },
    {
      "uid": "cf007be9",
      "score": 0.488,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.66,
        "study_hours_daily": 1.82,
        "night_unlock_times": 9.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.68,
        "spatial_residence": 0.66,
        "study_engagement": -0.34
      },
      "scoreExact": 0.48824724720896223
    },
    {
      "uid": "d038cb57",
      "score": 0.449,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.59,
        "study_hours_daily": 5.65,
        "night_unlock_times": 21.3,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.05,
        "spatial_residence": 0.01,
        "study_engagement": 1.14
      },
      "scoreExact": 0.4485145554772759
    },
    {
      "uid": "d060bfe5",
      "score": 0.457,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.79,
        "study_hours_daily": 3.78,
        "night_unlock_times": 10.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.64,
        "spatial_residence": 0.7,
        "study_engagement": 0.42
      },
      "scoreExact": 0.45667601858956963
    },
    {
      "uid": "d1075cae",
      "score": 0.568,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.66,
        "study_hours_daily": 0.51,
        "night_unlock_times": 7.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.81,
        "spatial_residence": -0.27,
        "study_engagement": -0.84
      },
      "scoreExact": 0.568161628757254
    },
    {
      "uid": "d1cd5ab6",
      "score": 0.849,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.15,
        "study_hours_daily": 0.13,
        "night_unlock_times": 9.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.72,
        "spatial_residence": 0.5,
        "study_engagement": -0.99
      },
      "scoreExact": 0.8493831786553258
    },
    {
      "uid": "d2c8a487",
      "score": 0.547,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.93,
        "study_hours_daily": 1.38,
        "night_unlock_times": 27.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.44,
        "spatial_residence": -0.5,
        "study_engagement": -0.51
      },
      "scoreExact": 0.5466917741634595
    },
    {
      "uid": "d86f28a1",
      "score": 0.211,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.3,
        "study_hours_daily": 3.94,
        "night_unlock_times": 12.7,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.5,
        "spatial_residence": -1,
        "study_engagement": 0.48
      },
      "scoreExact": 0.2109852547268725
    },
    {
      "uid": "da130c5e",
      "score": 0.507,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.63,
        "study_hours_daily": 0.76,
        "night_unlock_times": 23.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.19,
        "spatial_residence": 0.65,
        "study_engagement": -0.75
      },
      "scoreExact": 0.5068491841531679
    },
    {
      "uid": "db422d49",
      "score": 0.573,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 4.71,
        "study_hours_daily": 1.7,
        "night_unlock_times": 19.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.09,
        "spatial_residence": -2.12,
        "study_engagement": -0.38
      },
      "scoreExact": 0.5732799409509913
    },
    {
      "uid": "db8df8be",
      "score": 0.512,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.57,
        "study_hours_daily": 0.83,
        "night_unlock_times": 12.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.53,
        "spatial_residence": -0.3,
        "study_engagement": -0.72
      },
      "scoreExact": 0.5120628572906818
    },
    {
      "uid": "dd2ab535",
      "score": 0.424,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.52,
        "study_hours_daily": 11.79,
        "night_unlock_times": 15.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.34,
        "spatial_residence": 0.61,
        "study_engagement": 3.51
      },
      "scoreExact": 0.4238916616484112
    },
    {
      "uid": "dfba04a1",
      "score": 0.251,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.12,
        "study_hours_daily": 5.59,
        "night_unlock_times": 27.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.44,
        "spatial_residence": -0.44,
        "study_engagement": 1.12
      },
      "scoreExact": 0.25051051777228683
    },
    {
      "uid": "e06024d2",
      "score": 0.465,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.23,
        "study_hours_daily": 3.28,
        "night_unlock_times": 24.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.26,
        "spatial_residence": 0.52,
        "study_engagement": 0.23
      },
      "scoreExact": 0.4654788294746715
    },
    {
      "uid": "e1b0f11a",
      "score": 0.723,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.54,
        "study_hours_daily": 0.4,
        "night_unlock_times": 9.1,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.73,
        "spatial_residence": -0.93,
        "study_engagement": -0.89
      },
      "scoreExact": 0.7232365484551517
    },
    {
      "uid": "e3d27e46",
      "score": 0.155,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.14,
        "study_hours_daily": 2.28,
        "night_unlock_times": 0.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -1.25,
        "spatial_residence": 0.5,
        "study_engagement": -0.16
      },
      "scoreExact": 0.15514777498039195
    },
    {
      "uid": "e535002d",
      "score": 0.578,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.82,
        "study_hours_daily": 5.73,
        "night_unlock_times": 6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.93,
        "spatial_residence": 0.71,
        "study_engagement": 1.17
      },
      "scoreExact": 0.5784897962167412
    },
    {
      "uid": "e60e86c5",
      "score": 0.425,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.32,
        "study_hours_daily": 3.22,
        "night_unlock_times": 25.6,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.32,
        "spatial_residence": 0.55,
        "study_engagement": 0.2
      },
      "scoreExact": 0.42548585467454336
    },
    {
      "uid": "e8811b53",
      "score": 0.356,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.71,
        "study_hours_daily": 2.07,
        "night_unlock_times": 15.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.29,
        "spatial_residence": 0.05,
        "study_engagement": -0.24
      },
      "scoreExact": 0.35581841147513044
    },
    {
      "uid": "e946e1f8",
      "score": 0.866,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.63,
        "study_hours_daily": 1.81,
        "night_unlock_times": 56,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 2.26,
        "spatial_residence": 0.96,
        "study_engagement": -0.34
      },
      "scoreExact": 0.8657685978311938
    },
    {
      "uid": "eb5b94ef",
      "score": 0.38,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.67,
        "study_hours_daily": 16.62,
        "night_unlock_times": 17.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.21,
        "spatial_residence": 0.97,
        "study_engagement": 5.38
      },
      "scoreExact": 0.38004669341065966
    },
    {
      "uid": "f066d6d9",
      "score": 0.46,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 7.68,
        "study_hours_daily": 0.79,
        "night_unlock_times": 18.8,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.11,
        "spatial_residence": -1.2,
        "study_engagement": -0.74
      },
      "scoreExact": 0.46011388247259527
    },
    {
      "uid": "f0db9e3e",
      "score": 0.322,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.64,
        "study_hours_daily": 2.7,
        "night_unlock_times": 4.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -1.02,
        "spatial_residence": 0.96,
        "study_engagement": 0
      },
      "scoreExact": 0.32175128732219
    },
    {
      "uid": "f17129fe",
      "score": 0.353,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.96,
        "study_hours_daily": 2.56,
        "night_unlock_times": 13.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.42,
        "spatial_residence": -0.8,
        "study_engagement": -0.05
      },
      "scoreExact": 0.3525187869047289
    },
    {
      "uid": "f1dcebbb",
      "score": 0.3,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.09,
        "study_hours_daily": 3.5,
        "night_unlock_times": 35.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.95,
        "spatial_residence": -1.07,
        "study_engagement": 0.31
      },
      "scoreExact": 0.3001764630563425
    },
    {
      "uid": "f3e19959",
      "score": 0.62,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 14.37,
        "study_hours_daily": 2.21,
        "night_unlock_times": 15.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.34,
        "spatial_residence": 0.88,
        "study_engagement": -0.19
      },
      "scoreExact": 0.6201648112843028
    },
    {
      "uid": "f4d488e3",
      "score": 0.263,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.86,
        "study_hours_daily": 6.95,
        "night_unlock_times": 15,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.35,
        "spatial_residence": -0.52,
        "study_engagement": 1.65
      },
      "scoreExact": 0.26330218609490375
    },
    {
      "uid": "f5529fba",
      "score": 0.582,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 15.05,
        "study_hours_daily": 0.16,
        "night_unlock_times": 19.4,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.07,
        "spatial_residence": 1.09,
        "study_engagement": -0.98
      },
      "scoreExact": 0.5819488327440123
    },
    {
      "uid": "f578948f",
      "score": 0.781,
      "tier": "red",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 0.821,
      "behavior": {
        "residence_hours_daily": 15.68,
        "study_hours_daily": 1.1,
        "night_unlock_times": 52.6,
        "sensing_days": 46
      },
      "deviations": {
        "circadian_night_unlock": 2.04,
        "spatial_residence": 1.28,
        "study_engagement": -0.62
      },
      "scoreExact": 0.7811002004589667
    },
    {
      "uid": "f5fa7e56",
      "score": 0.614,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.68,
        "study_hours_daily": 1.1,
        "night_unlock_times": 7.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.85,
        "spatial_residence": 0.66,
        "study_engagement": -0.61
      },
      "scoreExact": 0.6143754362434615
    },
    {
      "uid": "f663e0d0",
      "score": 0.606,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 13.8,
        "study_hours_daily": 2.53,
        "night_unlock_times": 28.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.49,
        "spatial_residence": 0.7,
        "study_engagement": -0.06
      },
      "scoreExact": 0.6059887780204873
    },
    {
      "uid": "f7472689",
      "score": 0.416,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 9.96,
        "study_hours_daily": 1.21,
        "night_unlock_times": 17,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.22,
        "spatial_residence": -0.49,
        "study_engagement": -0.57
      },
      "scoreExact": 0.4158981504971373
    },
    {
      "uid": "fa394f6d",
      "score": 0.324,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.87,
        "study_hours_daily": 2.5,
        "night_unlock_times": 14.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.38,
        "spatial_residence": -0.21,
        "study_engagement": -0.07
      },
      "scoreExact": 0.32376628933204693
    },
    {
      "uid": "fbcc8cd8",
      "score": 0.59,
      "tier": "orange",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 15.8,
        "study_hours_daily": 0.38,
        "night_unlock_times": 25.2,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.3,
        "spatial_residence": 1.32,
        "study_engagement": -0.89
      },
      "scoreExact": 0.5904687152961865
    },
    {
      "uid": "fc266524",
      "score": 0.485,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 17.23,
        "study_hours_daily": 0.91,
        "night_unlock_times": 52.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 2.03,
        "spatial_residence": 1.76,
        "study_engagement": -0.69
      },
      "scoreExact": 0.4853912570360968
    },
    {
      "uid": "fc73375d",
      "score": 0.381,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 10.38,
        "study_hours_daily": 2.11,
        "night_unlock_times": 57.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 2.37,
        "spatial_residence": -0.36,
        "study_engagement": -0.23
      },
      "scoreExact": 0.3806714714234971
    },
    {
      "uid": "fe8ddda4",
      "score": 0.392,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 8.44,
        "study_hours_daily": 1.07,
        "night_unlock_times": 14.9,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": -0.36,
        "spatial_residence": -0.96,
        "study_engagement": -0.63
      },
      "scoreExact": 0.3919129956905779
    },
    {
      "uid": "ffc4b142",
      "score": 0.5,
      "tier": "green",
      "quality": "HIGH_CONFIDENCE",
      "qualityWeight": 1,
      "behavior": {
        "residence_hours_daily": 11.87,
        "study_hours_daily": 2.59,
        "night_unlock_times": 33.5,
        "sensing_days": 56
      },
      "deviations": {
        "circadian_night_unlock": 0.83,
        "spatial_residence": 0.1,
        "study_engagement": -0.04
      },
      "scoreExact": 0.49982560885510907
    }
  ],
  "firstFoldMetrics": [
    {
      "variant": "baseline_25",
      "macro_f1": 0.48173175135269775,
      "balanced_accuracy": 0.5000916422287389,
      "roc_auc": 0.4950348240469208,
      "pr_auc": 0.30513222510903076,
      "recall": 0.39090909090909093,
      "precision": 0.24893048128342246,
      "specificity": 0.6092741935483871,
      "fpr": 0.3907258064516129,
      "brier": 0.2571660068248426,
      "tn": 19,
      "fp": 12.2,
      "fn": 6.4,
      "tp": 4.2
    },
    {
      "variant": "baseline_25_weighted",
      "macro_f1": 0.48687637933961464,
      "balanced_accuracy": 0.5100916422287389,
      "roc_auc": 0.49937133431085046,
      "pr_auc": 0.3148683410433947,
      "recall": 0.41090909090909095,
      "precision": 0.2524864024864025,
      "specificity": 0.6092741935483871,
      "fpr": 0.3907258064516129,
      "brier": 0.2556972541710064,
      "tn": 19,
      "fp": 12.2,
      "fn": 6.2,
      "tp": 4.4
    },
    {
      "variant": "ch1_behavior",
      "macro_f1": 0.5080999296126517,
      "balanced_accuracy": 0.5199321847507331,
      "roc_auc": 0.46140395894428154,
      "pr_auc": 0.32290754510334824,
      "recall": 0.3727272727272727,
      "precision": 0.2708333333333333,
      "specificity": 0.6671370967741936,
      "fpr": 0.3328629032258065,
      "brier": 0.2528676289281359,
      "tn": 20.8,
      "fp": 10.4,
      "fn": 6.6,
      "tp": 4
    },
    {
      "variant": "ch2_spatial",
      "macro_f1": 0.5566512463571287,
      "balanced_accuracy": 0.601733870967742,
      "roc_auc": 0.6316917155425219,
      "pr_auc": 0.3817150265119301,
      "recall": 0.62,
      "precision": 0.332192513368984,
      "specificity": 0.5834677419354839,
      "fpr": 0.4165322580645161,
      "brier": 0.24125233126817386,
      "tn": 18.2,
      "fp": 13,
      "fn": 4,
      "tp": 6.6
    },
    {
      "variant": "ch3_svd",
      "macro_f1": 0.543948760790866,
      "balanced_accuracy": 0.5693786656891495,
      "roc_auc": 0.5577144428152493,
      "pr_auc": 0.3708137145644259,
      "recall": 0.5236363636363637,
      "precision": 0.3181974544203646,
      "specificity": 0.6151209677419355,
      "fpr": 0.3848790322580645,
      "brier": 0.2454206171063949,
      "tn": 19.2,
      "fp": 12,
      "fn": 5,
      "tp": 5.6
    },
    {
      "variant": "dummy_prior",
      "macro_f1": 0.4273921181455428,
      "balanced_accuracy": 0.5,
      "roc_auc": 0.5,
      "pr_auc": 0.25354239256678285,
      "recall": 0,
      "precision": 0,
      "specificity": 1,
      "fpr": 0,
      "brier": 0.18931960740419848,
      "tn": 31.2,
      "fp": 0,
      "fn": 10.6,
      "tp": 0
    },
    {
      "variant": "fusion_all",
      "macro_f1": 0.49886117904344796,
      "balanced_accuracy": 0.5169281524926685,
      "roc_auc": 0.5024633431085044,
      "pr_auc": 0.29433321906599386,
      "recall": 0.3927272727272727,
      "precision": 0.2580808080808081,
      "specificity": 0.6411290322580645,
      "fpr": 0.3588709677419355,
      "brier": 0.2543362134829378,
      "tn": 20,
      "fp": 11.2,
      "fn": 6.4,
      "tp": 4.2
    },
    {
      "variant": "fusion_all_weighted",
      "macro_f1": 0.4907792785730852,
      "balanced_accuracy": 0.5069281524926686,
      "roc_auc": 0.5104747067448681,
      "pr_auc": 0.29835522199895514,
      "recall": 0.37272727272727274,
      "precision": 0.24666666666666667,
      "specificity": 0.6411290322580645,
      "fpr": 0.3588709677419355,
      "brier": 0.2536305809276488,
      "tn": 20,
      "fp": 11.2,
      "fn": 6.6,
      "tp": 4
    },
    {
      "variant": "without_ch1",
      "macro_f1": 0.5088034190038834,
      "balanced_accuracy": 0.5380718475073314,
      "roc_auc": 0.5528134164222874,
      "pr_auc": 0.3341232802642121,
      "recall": 0.4672727272727273,
      "precision": 0.26785362974621285,
      "specificity": 0.6088709677419354,
      "fpr": 0.3911290322580645,
      "brier": 0.2464662380723314,
      "tn": 19,
      "fp": 12.2,
      "fn": 5.6,
      "tp": 5
    },
    {
      "variant": "without_ch2",
      "macro_f1": 0.5223755029033063,
      "balanced_accuracy": 0.5384365835777125,
      "roc_auc": 0.49337426686217006,
      "pr_auc": 0.31508186353859763,
      "recall": 0.4290909090909091,
      "precision": 0.2854400037526973,
      "specificity": 0.6477822580645161,
      "fpr": 0.3522177419354839,
      "brier": 0.25404672894126984,
      "tn": 20.2,
      "fp": 11,
      "fn": 6,
      "tp": 4.6
    },
    {
      "variant": "without_ch3",
      "macro_f1": 0.49946800723153534,
      "balanced_accuracy": 0.5195674486803519,
      "roc_auc": 0.5006451612903225,
      "pr_auc": 0.2918928153144241,
      "recall": 0.41090909090909095,
      "precision": 0.2580898049319102,
      "specificity": 0.6282258064516129,
      "fpr": 0.3717741935483871,
      "brier": 0.25365882340062107,
      "tn": 19.6,
      "fp": 11.6,
      "fn": 6.2,
      "tp": 4.4
    }
  ],
  "repeatedMetrics": [
    {
      "variant": "baseline_25",
      "macro_f1_mean": 0.49466481310974764,
      "macro_f1_std": 0.05775304018500717,
      "balanced_accuracy_mean": 0.5163790322580646,
      "balanced_accuracy_std": 0.06894673340356818,
      "roc_auc_mean": 0.5211237170087977,
      "roc_auc_std": 0.08047750547822619,
      "pr_auc_mean": 0.3214237688308677,
      "pr_auc_std": 0.07005512551140496,
      "recall_mean": 0.43799999999999994,
      "recall_std": 0.1523049421797593,
      "precision_mean": 0.2647290307731484,
      "precision_std": 0.06373702308226806,
      "specificity_mean": 0.594758064516129,
      "specificity_std": 0.09065079921858334,
      "fpr_mean": 0.40524193548387094,
      "fpr_std": 0.09065079921858335,
      "brier_mean": 0.25980594420062686,
      "brier_std": 0.02023775157039775,
      "tn_mean": 18.56,
      "tn_std": 2.851136543878026,
      "fp_mean": 12.64,
      "fp_std": 2.804951889434258,
      "fn_mean": 5.96,
      "fn_std": 1.653197273313078,
      "tp_mean": 4.64,
      "tp_std": 1.6258121989093481
    },
    {
      "variant": "baseline_25_weighted",
      "macro_f1_mean": 0.49721282909048,
      "macro_f1_std": 0.05882325055112696,
      "balanced_accuracy_mean": 0.5188553885630498,
      "balanced_accuracy_std": 0.07115407018672702,
      "roc_auc_mean": 0.5242256231671554,
      "roc_auc_std": 0.08207540407665727,
      "pr_auc_mean": 0.3263332846145684,
      "pr_auc_std": 0.07609007588205466,
      "recall_mean": 0.4345454545454545,
      "recall_std": 0.16350231574044377,
      "precision_mean": 0.26460704704353244,
      "precision_std": 0.06978206122920765,
      "specificity_mean": 0.6031653225806451,
      "specificity_std": 0.08605044405749754,
      "fpr_mean": 0.39683467741935485,
      "fpr_std": 0.08605044405749754,
      "brier_mean": 0.25809870306867044,
      "brier_std": 0.020342332282600854,
      "tn_mean": 18.82,
      "tn_std": 2.693075019605746,
      "fp_mean": 12.38,
      "fp_std": 2.6717723231852624,
      "fn_mean": 6,
      "fn_std": 1.7842851423995423,
      "tp_mean": 4.6,
      "tp_std": 1.7379321515137767
    },
    {
      "variant": "ch1_behavior",
      "macro_f1_mean": 0.5095166362563909,
      "macro_f1_std": 0.05284755706875121,
      "balanced_accuracy_mean": 0.5267520161290322,
      "balanced_accuracy_std": 0.06291760954421989,
      "roc_auc_mean": 0.5060665322580645,
      "roc_auc_std": 0.08528923965169369,
      "pr_auc_mean": 0.34907726575355946,
      "pr_auc_std": 0.09591515436445268,
      "recall_mean": 0.428,
      "recall_std": 0.13384614937234723,
      "precision_mean": 0.2771229985334508,
      "precision_std": 0.05923110834360904,
      "specificity_mean": 0.6255040322580645,
      "specificity_std": 0.07453064799051577,
      "fpr_mean": 0.3744959677419355,
      "fpr_std": 0.07453064799051579,
      "brier_mean": 0.25290275790798267,
      "brier_std": 0.014770663189038398,
      "tn_mean": 19.52,
      "tn_std": 2.3667768490208836,
      "fp_mean": 11.68,
      "fp_std": 2.298535469842145,
      "fn_mean": 6.06,
      "fn_std": 1.4344166132641392,
      "tp_mean": 4.54,
      "tp_std": 1.445753810865686
    },
    {
      "variant": "ch2_spatial",
      "macro_f1_mean": 0.5709522058414387,
      "macro_f1_std": 0.06041176608579904,
      "balanced_accuracy_mean": 0.6212729105571847,
      "balanced_accuracy_std": 0.07139672814019761,
      "roc_auc_mean": 0.6322054618768328,
      "roc_auc_std": 0.07858093824636427,
      "pr_auc_mean": 0.4001040766532589,
      "pr_auc_std": 0.08478117295695968,
      "recall_mean": 0.6527272727272727,
      "recall_std": 0.1504701128099765,
      "precision_mean": 0.35117257455879747,
      "precision_std": 0.0684815140252068,
      "specificity_mean": 0.5898185483870968,
      "specificity_std": 0.08117503314701321,
      "fpr_mean": 0.4101814516129032,
      "fpr_std": 0.08117503314701323,
      "brier_mean": 0.2406563079760673,
      "brier_std": 0.010442113730658462,
      "tn_mean": 18.4,
      "tn_std": 2.523360247522242,
      "fp_mean": 12.8,
      "fp_std": 2.54750778573243,
      "fn_mean": 3.66,
      "fn_std": 1.546688364848971,
      "tp_mean": 6.94,
      "tp_std": 1.7072474564488358
    },
    {
      "variant": "ch3_svd",
      "macro_f1_mean": 0.5362892175015567,
      "macro_f1_std": 0.06854995239448988,
      "balanced_accuracy_mean": 0.5720925586510264,
      "balanced_accuracy_std": 0.07718215199844625,
      "roc_auc_mean": 0.580612353372434,
      "roc_auc_std": 0.08926990911517114,
      "pr_auc_mean": 0.38432145338135465,
      "pr_auc_std": 0.0943144213788431,
      "recall_mean": 0.5558181818181818,
      "recall_std": 0.1448853659611327,
      "precision_mean": 0.3163124602234038,
      "precision_std": 0.07035559137159712,
      "specificity_mean": 0.588366935483871,
      "specificity_std": 0.09626574181853123,
      "fpr_mean": 0.411633064516129,
      "fpr_std": 0.09626574181853124,
      "brier_mean": 0.2467090385818456,
      "brier_std": 0.015330499325918009,
      "tn_mean": 18.36,
      "tn_std": 3.0220955022119655,
      "fp_mean": 12.84,
      "fp_std": 2.9854066827192054,
      "fn_mean": 4.7,
      "fn_std": 1.5016997172591886,
      "tp_mean": 5.9,
      "tp_std": 1.5681784571500104
    },
    {
      "variant": "dummy_prior",
      "macro_f1_mean": 0.4273921181455428,
      "macro_f1_std": 0.0034358836209879458,
      "balanced_accuracy_mean": 0.5,
      "balanced_accuracy_std": 0,
      "roc_auc_mean": 0.5,
      "roc_auc_std": 0,
      "pr_auc_mean": 0.2535423925667828,
      "pr_auc_std": 0.010510742302778748,
      "recall_mean": 0,
      "recall_std": 0,
      "precision_mean": 0,
      "precision_std": 0,
      "specificity_mean": 1,
      "specificity_std": 0,
      "fpr_mean": 0,
      "fpr_std": 0,
      "brier_mean": 0.1893196074041985,
      "brier_std": 0.005148672832121897,
      "tn_mean": 31.2,
      "tn_std": 0.40406101782088416,
      "fp_mean": 0,
      "fp_std": 0,
      "fn_mean": 10.6,
      "fn_std": 0.4948716593053936,
      "tp_mean": 0,
      "tp_std": 0
    },
    {
      "variant": "fusion_all",
      "macro_f1_mean": 0.5111060248973431,
      "macro_f1_std": 0.05795394458697137,
      "balanced_accuracy_mean": 0.5319644428152492,
      "balanced_accuracy_std": 0.06604729037074891,
      "roc_auc_mean": 0.5336431451612903,
      "roc_auc_std": 0.07265815412249785,
      "pr_auc_mean": 0.3310403339364643,
      "pr_auc_std": 0.07459236957510518,
      "recall_mean": 0.44872727272727275,
      "recall_std": 0.14363143177461038,
      "precision_mean": 0.2811565508794611,
      "precision_std": 0.0686714143862176,
      "specificity_mean": 0.6152016129032258,
      "specificity_std": 0.08579977758573505,
      "fpr_mean": 0.38479838709677416,
      "fpr_std": 0.08579977758573504,
      "brier_mean": 0.255061691078275,
      "brier_std": 0.018250915984792452,
      "tn_mean": 19.2,
      "tn_std": 2.7180425129200643,
      "fp_mean": 12,
      "fp_std": 2.6418917155581325,
      "fn_mean": 5.84,
      "fn_std": 1.5565529682144268,
      "tp_mean": 4.76,
      "tp_std": 1.5722075991082975
    },
    {
      "variant": "fusion_all_weighted",
      "macro_f1_mean": 0.5160089345768899,
      "macro_f1_std": 0.06027835404322312,
      "balanced_accuracy_mean": 0.535841642228739,
      "balanced_accuracy_std": 0.06771930297271046,
      "roc_auc_mean": 0.5395027492668621,
      "roc_auc_std": 0.07605977139769318,
      "pr_auc_mean": 0.33318471594366317,
      "pr_auc_std": 0.0774326323328883,
      "recall_mean": 0.4449090909090909,
      "recall_std": 0.14639549544363223,
      "precision_mean": 0.28534281217578433,
      "precision_std": 0.0740150303830046,
      "specificity_mean": 0.6267741935483871,
      "specificity_std": 0.08581126287080121,
      "fpr_mean": 0.3732258064516129,
      "fpr_std": 0.08581126287080122,
      "brier_mean": 0.2533556266451612,
      "brier_std": 0.019206957882159745,
      "tn_mean": 19.56,
      "tn_std": 2.711728118332496,
      "fp_mean": 11.64,
      "fp_std": 2.647756077303565,
      "fn_mean": 5.88,
      "fn_std": 1.586164672203658,
      "tp_mean": 4.72,
      "tp_std": 1.6040764397277942
    },
    {
      "variant": "without_ch1",
      "macro_f1_mean": 0.5374625205277436,
      "macro_f1_std": 0.06451245517189161,
      "balanced_accuracy_mean": 0.5711218841642228,
      "balanced_accuracy_std": 0.07505870808492163,
      "roc_auc_mean": 0.5805445381231672,
      "roc_auc_std": 0.08314501444587687,
      "pr_auc_mean": 0.3710166605546557,
      "pr_auc_std": 0.08319545573003628,
      "recall_mean": 0.5429090909090909,
      "recall_std": 0.15321417219140285,
      "precision_mean": 0.3147761814776958,
      "precision_std": 0.06818370884140326,
      "specificity_mean": 0.5993346774193548,
      "specificity_std": 0.09046076465957215,
      "fpr_mean": 0.4006653225806452,
      "fpr_std": 0.09046076465957215,
      "brier_mean": 0.247126094291918,
      "brier_std": 0.015980964035868826,
      "tn_mean": 18.7,
      "tn_std": 2.8302303937369926,
      "fp_mean": 12.5,
      "fp_std": 2.8157719063467175,
      "fn_mean": 4.84,
      "fn_std": 1.6333263917664518,
      "tp_mean": 5.76,
      "tp_std": 1.672832133520508
    },
    {
      "variant": "without_ch2",
      "macro_f1_mean": 0.515595163251134,
      "macro_f1_std": 0.0700578893370455,
      "balanced_accuracy_mean": 0.5373432917888563,
      "balanced_accuracy_std": 0.07959145313952672,
      "roc_auc_mean": 0.5297525659824047,
      "roc_auc_std": 0.08329753992457259,
      "pr_auc_mean": 0.34728164578374865,
      "pr_auc_std": 0.09016974855221485,
      "recall_mean": 0.46454545454545454,
      "recall_std": 0.1441412183992695,
      "precision_mean": 0.28756825135349834,
      "precision_std": 0.07723394678162904,
      "specificity_mean": 0.610141129032258,
      "specificity_std": 0.08348879156026756,
      "fpr_mean": 0.3898588709677419,
      "fpr_std": 0.08348879156026756,
      "brier_mean": 0.2541434361183352,
      "brier_std": 0.017716684831922822,
      "tn_mean": 19.04,
      "tn_std": 2.6338456403409176,
      "fp_mean": 12.16,
      "fp_std": 2.5821996634731437,
      "fn_mean": 5.68,
      "fn_std": 1.5576015051930299,
      "tp_mean": 4.92,
      "tp_std": 1.5231546211727818
    },
    {
      "variant": "without_ch3",
      "macro_f1_mean": 0.5125419466528449,
      "macro_f1_std": 0.05801071249551585,
      "balanced_accuracy_mean": 0.5346754032258064,
      "balanced_accuracy_std": 0.06343673338527706,
      "roc_auc_mean": 0.5393388929618768,
      "roc_auc_std": 0.0757098684910468,
      "pr_auc_mean": 0.33623540543267416,
      "pr_auc_std": 0.07939034422042747,
      "recall_mean": 0.45799999999999996,
      "recall_std": 0.13906283442276263,
      "precision_mean": 0.28380686102683006,
      "precision_std": 0.06760640632830243,
      "specificity_mean": 0.6113508064516129,
      "specificity_std": 0.08916420163483191,
      "fpr_mean": 0.3886491935483871,
      "fpr_std": 0.08916420163483191,
      "brier_mean": 0.25371757555400687,
      "brier_std": 0.01827120058087881,
      "tn_mean": 19.08,
      "tn_std": 2.820044868654485,
      "fp_mean": 12.12,
      "fp_std": 2.7452370627347005,
      "fn_mean": 5.74,
      "fn_std": 1.5092909539493935,
      "tp_mean": 4.86,
      "tp_std": 1.5387511501346849
    }
  ],
  "synthetic": {
    "uid": "syn_def_01",
    "sensingDays": 12,
    "isSynthetic": true
  }
};
