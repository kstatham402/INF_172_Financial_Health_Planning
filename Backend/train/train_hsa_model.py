import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error

# ===============================
# Load Dataset
# ===============================

df = pd.read_csv("data/NFCS_2024_State_Data_250623.csv")

# ===============================
# Target Variable (Recommended Contribution)
# ===============================

def estimate_contribution(row):
    # Use survey variables (no leakage)
    income = row["A8_2021"]          # Household income bracket
    risk = row["H30_3"]              # Avoided medical care due to cost
    chronic = row.get("H1", 0)       # Health insurance indicator (proxy)
    hospitalizations = row.get("H30_3", 0)  # medical risk proxy

    # synthetic rule (financial + medical exposure)
    base = 20
    base += (income * 5)
    base += (risk * 15)
    base += (chronic * 10)
    base += (hospitalizations * 25)

    return max(base, 10)


df["recommended_contribution"] = df.apply(estimate_contribution, axis=1)

print(df[["recommended_contribution"]].describe())

# ===============================
# Feature Selection (Survey Codes)
# ===============================
feature_cols = [
    "A5_2015",      # education level
    "A9",           # employment status
    "J1",           # financial satisfaction
    "J2",           # risk tolerance
    "J4",           # difficulty paying bills
    "J5",           # emergency savings
    "H1",           # health insurance
    "F1",           # credit cards
    "G23",          # debt perception
    "wgt_n2"        # sample weight
]

# Keep only columns that exist in dataset
feature_cols = [col for col in feature_cols if col in df.columns]

# df = df.convert_dtypes()

X = df[feature_cols]
y = df["recommended_contribution"]

# ===============================
# Preprocessing (Categorical + Numeric)
# ===============================
categorical = [
    "A5_2015",
    "A9",
    "J4",
    "J5",
    "H1"]

numeric = [
    "J1",
    "J2",
    "F1",
    "G23",
    "wgt_n2"]
# categorical = X.select_dtypes(include=["object"]).columns.tolist()
# numeric = [col for col in X.columns if col not in categorical]

preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
        ("num", "passthrough", numeric)
    ],
    remainder="drop"
)

# ===============================
# Model Pipeline
# ===============================

model = Pipeline([
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(
        n_estimators=200,
        random_state=42
    ))
])

# ===============================
# Train/Test Split
# ===============================

X_train, X_val, y_train, y_val = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# ===============================
# Train
# ===============================

model.fit(X_train, y_train)

# ===============================
# Validate
# ===============================

val_pred = model.predict(X_val)
mae = mean_absolute_error(y_val, val_pred)

print(f"Validation MAE: {mae:.2f}")

# ===============================
# Save Model
# ===============================

joblib.dump(model, "models/hsa_recommendation_model.pkl")

print("Model saved as hsa_recommendation_model.pkl")

