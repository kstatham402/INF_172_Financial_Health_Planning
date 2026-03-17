import joblib
import pandas as pd
import json

model = joblib.load("Backend/models/hsa_recommendation_model_reduced.pkl")

# ======================================
# FEATURE VALUE RANGES (REDUCED)
# ======================================
# health = ["Yes", "No"]
j1 = [1, 2, 3, 4, 5]
j2 = [1, 2, 3, 4, 5]
f1 = [1, 2, 3, 4, 5]
g23 = [1, 2, 3, 4, 5]

lookup = {}

for _j1 in j1:
    for _j2 in j2:
        for _f1 in f1:
            for _g23 in g23:

                df = pd.DataFrame([{
                    "J1": _j1,
                    "J2": _j2,
                    "F1": _f1,
                    "G23": _g23,
                    "wgt_n2": 1.0
                }])

                pred = model.predict(df)[0]

                key = "|".join([
                    str(_j1),
                    str(_j2),
                    str(_f1),
                    str(_g23)
                ])

                lookup[key] = round(float(pred), 2)

print("Total combinations:", len(lookup))

with open("prediction_table_full_reduced.json", "w") as f:
    json.dump(lookup, f)