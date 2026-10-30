# 🌐 TRIOLINGO

### Learn. Adapt. Improve.

**Triolingo** adalah aplikasi pembelajaran bahasa berbasis web yang menggabungkan permainan kuis interaktif dengan **Deep Learning** untuk menciptakan sistem pembelajaran yang adaptif.

Berbeda dengan kuis biasa yang menggunakan tingkat kesulitan tetap seperti *Easy, Medium,* dan *Hard*, Triolingo menggunakan **Neural Network** untuk memperkirakan kemampuan pengguna berdasarkan performa selama bermain.

> **The better you perform, the harder it gets.  
> Keep learning. Keep improving. 🚀**

---

## 👨‍💻 Developed By

| Developer | Role |
|---|---|
| **Fitra Naufal Eka Bayu Wardhana** | Developer |
| **Farhan Aditya** | Developer |

Project ini dikembangkan sebagai bagian dari pembelajaran **Deep Learning**.

---

# ✨ About Triolingo

Triolingo menggabungkan konsep **language learning game** dengan **Adaptive Learning System**.

Saat pengguna mengerjakan soal, sistem akan menganalisis beberapa informasi seperti:

- 🎯 Accuracy
- ⏱️ Response Time
- 🔥 Answer Streak
- 📊 Recent Accuracy
- 🧠 Current Question Difficulty

Data tersebut kemudian dikirim ke model **Neural Network** untuk menghasilkan estimasi kemampuan pengguna.

Hasil prediksi tersebut digunakan untuk menentukan tingkat kesulitan soal berikutnya.

```text
User Answers Question
        ↓
Performance Data
        ↓
Flask REST API
        ↓
Neural Network
        ↓
Predicted User Skill
        ↓
Adaptive Difficulty
        ↓
Next Question
```

---

# 🧠 Deep Learning System

Model Deep Learning Triolingo dibuat menggunakan **TensorFlow / Keras**.

Model menerima **5 input features**:

```text
Accuracy
Response Time
Streak
Recent Accuracy
Current Difficulty
```

Arsitektur Neural Network:

```text
INPUT
  │
  │ 5 Features
  ▼
┌──────────────┐
│ Normalization│
└──────┬───────┘
       ▼
┌──────────────┐
│ Dense (32)   │
│ ReLU         │
└──────┬───────┘
       ▼
┌──────────────┐
│ Dense (16)   │
│ ReLU         │
└──────┬───────┘
       ▼
┌──────────────┐
│ Dense (8)    │
│ ReLU         │
└──────┬───────┘
       ▼
┌──────────────┐
│ Dense (1)    │
│ Sigmoid      │
└──────┬───────┘
       ▼

Predicted Skill
     0 – 1
```

Nilai tersebut kemudian digunakan untuk menentukan **target difficulty** soal berikutnya.

Contoh:

```text
Accuracy        : 100%
Response Time   : 4.13 seconds
Streak          : 1

Predicted Skill : 0.711
Next Difficulty : 0.761
```

Jika performa pengguna menurun:

```text
Accuracy        : 50%
Response Time   : 15.38 seconds
Streak          : 0

Predicted Skill : 0.437
Next Difficulty : 0.487
```

Dengan mekanisme tersebut, tingkat kesulitan dapat berubah secara dinamis mengikuti kemampuan pemain.

---

# 🎮 Features

### 🧠 Adaptive Difficulty

Tidak menggunakan pilihan:

```text
Easy
Medium
Hard
```

Sebaliknya, difficulty berada dalam rentang:

```text
0.10 ───────────────────────── 0.95
Easy                           Advanced
```

Neural Network menentukan tingkat kesulitan berdasarkan performa pengguna.

### 📝 Multiple Choice

Pengguna memilih jawaban yang benar dari beberapa pilihan yang tersedia.

### 🧩 Arrange Words

Pengguna menyusun beberapa kata menjadi kalimat Bahasa Inggris yang benar.

### 🌎 Translation

Pengguna menerjemahkan kalimat Bahasa Indonesia menjadi Bahasa Inggris.

### ❤️ Life System

Setiap sesi dimulai dengan:

```text
♥ ♥ ♥
```

Jawaban salah akan mengurangi satu nyawa.

Jika seluruh nyawa habis:

```text
♥ ♥ ♥
  ↓
♥ ♥
  ↓
♥
  ↓
GAME OVER
```

Triolingo kemudian menampilkan pesan motivasi:

> **Don't Give Up.**
>
> Making mistakes is part of learning.  
> Every wrong answer brings you one step closer to understanding.
>
> **Keep learning. Keep improving. You can do it!**

### 📊 AI Skill Tracking

Kemampuan pemain diperbarui berdasarkan hasil prediksi Neural Network.

```text
AI Skill 20%
     ↓
AI Skill 41
