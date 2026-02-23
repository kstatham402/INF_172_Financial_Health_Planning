# ======================================
# IMPORTS
# ======================================
import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error

# ======================================
# LOAD DATA
# ======================================
df = pd.read_csv("Backend/data/NFCS_2024_State_Data_250623.csv")

# ======================================
# TARGET VARIABLE
# ======================================
def estimate_contribution(row):
    income = row["A8_2021"]
    risk = row["H30_3"] if "H30_3" in row else 0
    chronic = row.get("H1", 0)
    hospitalizations = row.get("H30_3", 0)

    base = 20
    base += (income * 5)
    base += (risk * 15)
    base += (chronic * 10)
    base += (hospitalizations * 25)

    return max(base, 10)

df["recommended_contribution"] = df.apply(estimate_contribution, axis=1)

# ======================================
# FEATURE SELECTION (REDUCED)
# ======================================
feature_cols = [
    "H1",
    "J1",
    "J2",
    "F1",
    "G23",
    "wgt_n2"
]

feature_cols = [col for col in feature_cols if col in df.columns]

X = df[feature_cols]
y = df["recommended_contribution"]

# ======================================
# PREPROCESSING (MANUAL)
# ======================================

categorical = [
    "H1"    # health insurance (one-hot -> H1_98, H1_99)
]

numeric = [
    "J1",
    "J2",
    "F1",
    "G23",
    "wgt_n2"
]

preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
        ("num", "passthrough", numeric)
    ],
    remainder="drop"
)

# ======================================
# MODEL PIPELINE
# ======================================
model = Pipeline([
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(
        n_estimators=200,
        random_state=42
    ))
])

# ======================================
# TRAIN / VALIDATION SPLIT
# ======================================
X_train, X_val, y_train, y_val = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# ======================================
# TRAIN
# ======================================
model.fit(X_train, y_train)

# ======================================
# VALIDATE
# ======================================
val_pred = model.predict(X_val)
mae = mean_absolute_error(y_val, val_pred)

print(f"Validation MAE: {mae:.2f}")

# ======================================
# FEATURE IMPORTANCE
# ======================================
preprocessor = model.named_steps["preprocessor"]
rf = model.named_steps["regressor"]

ohe = preprocessor.named_transformers_["cat"]
cat_features = ohe.get_feature_names_out()
num_features = numeric

feature_names = list(cat_features) + list(num_features)

importances = rf.feature_importances_

fi = pd.DataFrame({
    "feature": feature_names,
    "importance": importances
}).sort_values("importance", ascending=False)

print(fi)

# ======================================
# SAVE MODEL
# ======================================
joblib.dump(model, "Backend/models/hsa_recommendation_model_reduced.pkl")

print("Model saved as models/hsa_recommendation_model_reduced.pkl")