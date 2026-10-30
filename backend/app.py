from flask import Flask, request, jsonify
from flask_cors import CORS

import tensorflow as tf
import numpy as np
import os


# ==========================================
# APP
# ==========================================

app = Flask(__name__)

CORS(app)


# ==========================================
# PATH MODEL
# ==========================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "adaptive_model.keras"
)


# ==========================================
# LOAD MODEL
# ==========================================

print()
print("================================")
print(" LOADING TRIOLINGO AI...")
print("================================")
print()

model = tf.keras.models.load_model(
    MODEL_PATH
)

print("Model loaded successfully!")
print()


# ==========================================
# HOME
# ==========================================

@app.route("/")
def home():

    return jsonify({
        "status": "online",
        "application": "Triolingo",
        "model": "Adaptive Learning Neural Network"
    })


# ==========================================
# PREDICT USER SKILL
# ==========================================

@app.route(
    "/predict",
    methods=["POST"]
)
def predict():

    try:

        data = request.get_json()


        # ==================================
        # INPUT
        # ==================================

        accuracy = float(
            data.get(
                "accuracy",
                0.5
            )
        )

        response_time = float(
            data.get(
                "response_time",
                10
            )
        )

        streak = float(
            data.get(
                "streak",
                0
            )
        )

        recent_accuracy = float(
            data.get(
                "recent_accuracy",
                0.5
            )
        )

        current_difficulty = float(
            data.get(
                "current_difficulty",
                0.1
            )
        )


        # ==================================
        # PREPARE INPUT
        # ==================================

        features = np.array(
            [[
                accuracy,
                response_time,
                streak,
                recent_accuracy,
                current_difficulty
            ]],
            dtype=np.float32
        )


        # ==================================
        # AI PREDICTION
        # ==================================

        prediction = model.predict(
            features,
            verbose=0
        )

        skill = float(
            prediction[0][0]
        )


        # ==================================
        # TARGET DIFFICULTY
        # ==================================

        # Soal berikutnya dibuat sedikit
        # lebih menantang dari skill user.

        next_difficulty = (
            skill + 0.05
        )

        next_difficulty = max(
            0.05,
            min(
                next_difficulty,
                0.95
            )
        )


        # ==================================
        # RESPONSE
        # ==================================

        return jsonify({

            "success": True,

            "skill": round(
                skill,
                3
            ),

            "next_difficulty": round(
                next_difficulty,
                3
            )

        })


    except Exception as error:

        print(
            "Prediction error:",
            error
        )

        return jsonify({

            "success": False,

            "error": str(error)

        }), 500


# ==========================================
# RUN SERVER
# ==========================================

if __name__ == "__main__":

    print()
    print("================================")
    print(" TRIOLINGO AI READY")
    print("================================")
    print()
    print("API:")
    print("http://127.0.0.1:5000")
    print()

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )