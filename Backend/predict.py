import joblib
import pandas as pd

model = joblib.load("models/hsa_recommendation_model.pkl")

# ONLY columns that model expects
# ===============================
# Prediction (Hardcoded Survey Responses)
# ===============================

user_response = {
    "A5_2015": "Bachelor’s degree",
    "A9": "Student",
    "J1": 4,
    "J2": 5,
    "J4": "Rarely",
    "J5": "No",
    "H1": "Yes",
    "F1": 1,
    "G23": 4,
    "wgt_n2": 1.0
}

predict_df = pd.DataFrame([user_response])

# Predict
prediction = model.predict(predict_df)[0]

print("\n=== Recommended HSA Contribution ===")
print(f"${prediction:.2f} per paycheck")
print(f"${prediction * 2:.2f} per month")
print(f"${prediction * 24:.2f} per year")