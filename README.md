# HSA Contribution Prediction Model - Code Overview

## Project Purpose
This project builds a machine learning model to recommend Health Savings Account (HSA) contribution amounts based on survey data from the National Financial Capability Study (NFCS).

## "train_hsa_model.ipynb" (Jupyter Notebook)
The original exploratory notebook used for model development:

- Data Loading: Imports NFCS survey data (133 columns)
- Target Creation: Defines "recommended_contribution" using income, health risk, chronic conditions, and hospitalizations
- Feature Selection: Chooses 10 features including education, employment, financial satisfaction, risk tolerance, and sample weights
- Preprocessing: Uses OneHotEncoder for categorical variables (education, employment, etc.)
- Model: Random Forest Regressor with 200 estimators
- Evaluation: MAE of 163.47 on validation set
- Feature Importance: Shows sample weight ("wgt_n2") and health insurance ("H1_98") as top predictors
- Output: Saves model as "hsa_recommendation_model.pkl"

## "train_hsa_model.py" (Python Script)
A simplified, production-ready version of the notebook:

- Reduced Features: Uses only 5 numeric features (J1, J2, F1, G23, wgt_n2) - removes all categorical variables
- Simplified Pipeline: No OneHotEncoding needed since all features are numeric
- Same Target Logic: Maintains the same contribution calculation
- Faster Training: Simpler model with comparable performance
- Output: Saves model as "hsa_recommendation_model_reduced.pkl"

## "main.py" (Flask API)
A lightweight REST API serving the original model:

- Endpoint: POST "/predict"
- Input: JSON object with feature values
- Process: Converts JSON to DataFrame, runs prediction
- Output: JSON with predicted contribution amount
- Usage: Can be deployed as a microservice for frontend applications

## "predict.py" (Batch Prediction)
Pre-computes all possible predictions for quick lookup:

- Grid Search: Iterates through all combinations of the 4 numeric features (J1, J2, F1, G23) each ranging 1-5
- Fixed Weight: Uses "wgt_n2 = 1.0" as constant
- Total Combinations: 625 possible scenarios (5⁴)
- Output: Saves "prediction_table_full_reduced.json" with pre-computed recommendations
- Purpose: Enables O(1) lookups without loading the model

## Key Differences Between Models

| Feature | Original Model (.ipynb) | Reduced Model (.py) |
|---------|-------------------------|---------------------|
| Features | 10 (mixed types) | 5 (all numeric) |
| Preprocessing | OneHotEncoding | None |
| File Size | Larger | Smaller |
| Complexity | Higher | Lower |

The reduced model trades some flexibility for simplicity and faster inference, making it suitable for lightweight deployments.