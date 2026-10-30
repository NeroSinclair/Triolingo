const questions = [

    // =========================
    // VERY BASIC
    // =========================

    {
        id: 1,
        type: "multiple_choice",
        category: "Vocabulary",
        question: 'What does "Cat" mean?',
        options: ["Kucing", "Anjing", "Burung", "Ikan"],
        answer: "Kucing",
        difficulty: 0.10
    },

    {
        id: 2,
        type: "multiple_choice",
        category: "Vocabulary",
        question: 'What does "Book" mean?',
        options: ["Meja", "Buku", "Pintu", "Kursi"],
        answer: "Buku",
        difficulty: 0.15
    },

    {
        id: 3,
        type: "multiple_choice",
        category: "Vocabulary",
        question: 'What does "Beautiful" mean?',
        options: ["Cepat", "Cantik", "Mahal", "Besar"],
        answer: "Cantik",
        difficulty: 0.20
    },


    // =========================
    // BASIC GRAMMAR
    // =========================

    {
        id: 4,
        type: "multiple_choice",
        category: "Grammar",
        question: "I ___ a student.",
        options: ["am", "is", "are", "be"],
        answer: "am",
        difficulty: 0.25
    },

    {
        id: 5,
        type: "multiple_choice",
        category: "Grammar",
        question: "She ___ to school every day.",
        options: ["go", "goes", "going", "gone"],
        answer: "goes",
        difficulty: 0.30
    },

    {
        id: 6,
        type: "multiple_choice",
        category: "Grammar",
        question: "They ___ playing football right now.",
        options: ["is", "are", "was", "be"],
        answer: "are",
        difficulty: 0.35
    },


    // =========================
    // SENTENCE
    // =========================

    {
        id: 7,
        type: "arrange",
        category: "Sentence",
        question: "Susun menjadi kalimat Bahasa Inggris yang benar.",
        translation: "Saya pergi ke sekolah setiap hari.",
        words: ["school", "every", "I", "day", "to", "go"],
        answer: "I go to school every day",
        difficulty: 0.40
    },

    {
        id: 8,
        type: "arrange",
        category: "Sentence",
        question: "Susun menjadi kalimat Bahasa Inggris yang benar.",
        translation: "Dia sedang membaca sebuah buku.",
        words: ["book", "reading", "She", "is", "a"],
        answer: "She is reading a book",
        difficulty: 0.45
    },


    // =========================
    // TRANSLATION
    // =========================

    {
        id: 9,
        type: "translation",
        category: "Translation",
        question: "Terjemahkan ke Bahasa Inggris:",
        translation: "Saya minum air setiap pagi.",
        answer: "I drink water every morning",
        acceptedAnswers: [
            "I drink water every morning",
            "I drink water every morning."
        ],
        difficulty: 0.50
    },

    {
        id: 10,
        type: "translation",
        category: "Translation",
        question: "Terjemahkan ke Bahasa Inggris:",
        translation: "Mereka sedang bermain sepak bola.",
        answer: "They are playing football",
        acceptedAnswers: [
            "They are playing football",
            "They are playing soccer"
        ],
        difficulty: 0.55
    },


    // =========================
    // INTERMEDIATE
    // =========================

    {
        id: 11,
        type: "multiple_choice",
        category: "Grammar",
        question: "If it ___ tomorrow, we will stay home.",
        options: ["rain", "rains", "rained", "raining"],
        answer: "rains",
        difficulty: 0.60
    },

    {
        id: 12,
        type: "translation",
        category: "Translation",
        question: "Terjemahkan ke Bahasa Inggris:",
        translation: "Saya sudah menyelesaikan pekerjaan saya.",
        answer: "I have finished my work",
        acceptedAnswers: [
            "I have finished my work",
            "I have finished my job"
        ],
        difficulty: 0.65
    },

    {
        id: 13,
        type: "multiple_choice",
        category: "Grammar",
        question: "By the time I arrived, they ___ already left.",
        options: ["have", "had", "has", "were"],
        answer: "had",
        difficulty: 0.70
    },


    // =========================
    // ADVANCED
    // =========================

    {
        id: 14,
        type: "translation",
        category: "Translation",
        question: "Terjemahkan ke Bahasa Inggris:",
        translation:
            "Meskipun hujan deras, mereka memutuskan untuk melanjutkan perjalanan.",
        answer:
            "Although it was raining heavily they decided to continue the journey",
        acceptedAnswers: [
            "Although it was raining heavily they decided to continue the journey",
            "Although it was raining heavily, they decided to continue the journey"
        ],
        difficulty: 0.75
    },

    {
        id: 15,
        type: "multiple_choice",
        category: "Grammar",
        question:
            "Had I known about the problem, I ___ you earlier.",
        options: [
            "would tell",
            "would have told",
            "will tell",
            "had told"
        ],
        answer: "would have told",
        difficulty: 0.80
    },

    {
        id: 16,
        type: "multiple_choice",
        category: "Vocabulary",
        question:
            'Which word is closest in meaning to "meticulous"?',
        options: [
            "Careless",
            "Very careful",
            "Confused",
            "Uncertain"
        ],
        answer: "Very careful",
        difficulty: 0.85
    },

    {
        id: 17,
        type: "multiple_choice",
        category: "Grammar",
        question:
            "No sooner ___ the meeting started than the fire alarm rang.",
        options: [
            "had",
            "has",
            "did",
            "was"
        ],
        answer: "had",
        difficulty: 0.90
    },

    {
        id: 18,
        type: "multiple_choice",
        category: "Vocabulary",
        question:
            'What is the closest meaning of "ubiquitous"?',
        options: [
            "Rare",
            "Present everywhere",
            "Temporary",
            "Unpredictable"
        ],
        answer: "Present everywhere",
        difficulty: 0.95
    }

];