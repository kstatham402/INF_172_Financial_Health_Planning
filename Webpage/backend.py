from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load your trained model
model = joblib.load("Backend/models/hsa_recommendation_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # Build DataFrame with columns the model expects
    df = pd.DataFrame([data])

    # Predict contribution
    prediction = model.predict(df)[0]

    return jsonify({"prediction": float(prediction)})

if __name__ == "__main__":
    app.run(debug=True)