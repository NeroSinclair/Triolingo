import os
import pandas as pd
import tensorflow as tf

from sklearn.model_selection import train_test_split


# ==============================
# PATH
# ==============================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

DATA_PATH = os.path.join(
    BASE_DIR,
    "dataset",
    "training_data.csv"
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "model"
)

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "adaptive_model.keras"
)


# ==============================
# LOAD DATA
# ==============================

print()
print("Loading dataset...")

data = pd.read_csv(DATA_PATH)

X = data[
    [
        "accuracy",
        "response_time",
        "streak",
        "recent_accuracy",
        "current_difficulty"
    ]
]

y = data["skill"]


# ==============================
# TRAIN TEST SPLIT
# ==============================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# ==============================
# NORMALIZATION
# ==============================

normalizer = tf.keras.layers.Normalization(
    axis=-1
)

normalizer.adapt(
    X_train.to_numpy()
)


# ==============================
# NEURAL NETWORK
# ==============================

model = tf.keras.Sequential([

    tf.keras.Input(shape=(5,)),

    normalizer,

    tf.keras.layers.Dense(
        32,
        activation="relu"
    ),

    tf.keras.layers.Dense(
        16,
        activation="relu"
    ),

    tf.keras.layers.Dense(
        8,
        activation="relu"
    ),

    tf.keras.layers.Dense(
        1,
        activation="sigmoid"
    )

])


# ==============================
# COMPILE
# ==============================

model.compile(
    optimizer="adam",
    loss="mse",
    metrics=["mae"]
)


# ==============================
# TRAIN
# ==============================

print()
print("================================")
print(" TRAINING TRIOLINGO AI")
print("================================")
print()

model.fit(
    X_train.to_numpy(),
    y_train.to_numpy(),
    epochs=30,
    batch_size=32,
    validation_split=0.2
)


# ==============================
# EVALUATE
# ==============================

loss, mae = model.evaluate(
    X_test.to_numpy(),
    y_test.to_numpy(),
    verbose=0
)

print()
print("================================")
print(" MODEL EVALUATION")
print("================================")
print()

print(f"Loss : {loss:.4f}")
print(f"MAE  : {mae:.4f}")


# ==============================
# SAVE
# ==============================

os.makedirs(
    MODEL_DIR,
    exist_ok=True
)

model.save(
    MODEL_PATH
)

print()
print("================================")
print(" MODEL SAVED")
print("================================")
print()
print(MODEL_PATH)
print()