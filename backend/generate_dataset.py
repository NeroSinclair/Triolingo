import os
import numpy as np
import pandas as pd

# Biar hasil random tetap konsisten
np.random.seed(42)

TOTAL_DATA = 5000

data = []

for _ in range(TOTAL_DATA):

    # Simulasi performa pemain
    accuracy = np.random.uniform(0, 1)
    response_time = np.random.uniform(2, 20)
    streak = np.random.randint(0, 11)
    recent_accuracy = np.random.uniform(0, 1)
    current_difficulty = np.random.uniform(0.05, 0.95)

    # Menghitung skill target untuk dataset simulasi
    skill = (
        accuracy * 0.35
        + recent_accuracy * 0.25
        + (streak / 10) * 0.15
        + (1 - min(response_time / 20, 1)) * 0.10
        + current_difficulty * 0.15
    )

    # Tambahkan sedikit variasi/noise
    skill += np.random.normal(0, 0.04)

    # Pastikan skill tetap 0 - 1
    skill = np.clip(skill, 0, 1)

    data.append([
        accuracy,
        response_time,
        streak,
        recent_accuracy,
        current_difficulty,
        skill
    ])

columns = [
    "accuracy",
    "response_time",
    "streak",
    "recent_accuracy",
    "current_difficulty",
    "skill"
]

df = pd.DataFrame(data, columns=columns)

# Lokasi file mengikuti lokasi script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_DIR = os.path.join(BASE_DIR, "dataset")

os.makedirs(DATASET_DIR, exist_ok=True)

FILE_PATH = os.path.join(
    DATASET_DIR,
    "training_data.csv"
)

df.to_csv(
    FILE_PATH,
    index=False
)

print()
print("================================")
print(" TRIOLINGO DATASET GENERATED")
print("================================")
print()
print("Total data :", len(df))
print("File       :", FILE_PATH)
print()
print(df.head())
print()