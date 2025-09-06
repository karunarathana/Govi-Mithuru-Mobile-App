from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)  # 🔹 Allow cross-origin requests

# 🔹 Load dataset
df = pd.read_csv('filtered_vegetables.csv')
df['Date'] = pd.to_datetime(df['Date'])
df['Day'] = df['Date'].dt.day
df['Month'] = df['Date'].dt.month
df['Year'] = df['Date'].dt.year

le = LabelEncoder()
df['Commodity_encoded'] = le.fit_transform(df['Commodity'])

X = df[['Commodity_encoded', 'Day', 'Month', 'Year']]
y = df['Average']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

# 🔹 Prediction function
def predict_price(commodity_name, date_str):
    date = pd.to_datetime(date_str)
    day, month, year = date.day, date.month, date.year

    if commodity_name in le.classes_:
        commodity_encoded = le.transform([commodity_name])[0]
    else:
        return None  # Return error if commodity not in dataset

    input_data = np.array([[commodity_encoded, day, month, year]])
    predicted_price = model.predict(input_data)[0]
    return predicted_price

# 🔹 API endpoint
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    commodity_name = data.get('commodity')
    date_str = data.get('date')

    price = predict_price(commodity_name, date_str)
    if price is None:
        return jsonify({"error": f"'{commodity_name}' කියන එළවළු වර්ගය dataset එකේ නැහැ"}), 400

    return jsonify({
        "commodity": commodity_name,
        "date": date_str,
        "predicted_price": round(float(price), 2)
    })

if __name__ == '__main__':
    # 🔹 Listen on all network interfaces for LAN access
    app.run(debug=True, host='0.0.0.0', port=5000)
