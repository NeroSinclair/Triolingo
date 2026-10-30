/* ==========================================
   TRIOLINGO ADAPTIVE LEARNING
========================================== */

const API_URL =
    "http://127.0.0.1:5000";



// ==========================================
// GAME STATE
// ==========================================

let currentQuestion = null;

let selectedAnswer = "";

let selectedWords = [];

let lives = 3;

let questionStartTime = null;

let performanceHistory = [];

let usedQuestionIds = [];

let quizLocked = false;

let currentSkill = 0.20;

let targetDifficulty = 0.20;

let currentStreak = 0;

let questionNumber = 0;

const MAX_QUESTIONS = 10;



// ==========================================
// PAGE NAVIGATION
// ==========================================

function showPage(pageID) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active"
            );

        });


    const targetPage =
        document.getElementById(
            pageID
        );


    if (targetPage) {

        targetPage.classList.add(
            "active"
        );

    }


    window.scrollTo(
        0,
        0
    );
}



function showHome() {

    showPage("home");

}



function showLanguages() {

    showPage("languages");

}



function exitQuiz() {

    const leave =
        confirm(
            "Keluar dari pembelajaran sekarang?"
        );


    if (leave) {

        showLanguages();

    }

}



// ==========================================
// START ENGLISH
// ==========================================

function startEnglish() {

    lives = 3;

    performanceHistory = [];

    usedQuestionIds = [];

    selectedWords = [];

    selectedAnswer = "";

    currentSkill = 0.20;

    targetDifficulty = 0.20;

    currentStreak = 0;

    questionNumber = 0;

    quizLocked = false;


    document
        .getElementById(
            "lives"
        )
        .textContent =
        lives;


    document
        .getElementById(
            "progressBar"
        )
        .style.width =
        "0%";


    showPage(
        "quiz"
    );


    selectAdaptiveQuestion();

}



// ==========================================
// ADAPTIVE QUESTION SELECTION
// ==========================================

function selectAdaptiveQuestion() {

    if (
        questionNumber
        >= MAX_QUESTIONS
    ) {

        finishLesson();

        return;

    }


    let availableQuestions =
        questions.filter(
            question => {

                return (
                    !usedQuestionIds
                        .includes(
                            question.id
                        )
                );

            }
        );


    // Jika semua pertanyaan
    // pernah digunakan.

    if (
        availableQuestions.length
        === 0
    ) {

        usedQuestionIds = [];

        availableQuestions =
            [...questions];

    }


    // Cari soal yang difficulty-nya
    // paling dekat dengan target AI.

    availableQuestions.sort(
        (a, b) => {

            const distanceA =
                Math.abs(
                    a.difficulty
                    - targetDifficulty
                );


            const distanceB =
                Math.abs(
                    b.difficulty
                    - targetDifficulty
                );


            return (
                distanceA
                - distanceB
            );

        }
    );


    // Ambil salah satu dari
    // tiga soal terdekat.

    const candidates =
        availableQuestions.slice(
            0,
            Math.min(
                3,
                availableQuestions.length
            )
        );


    const randomIndex =
        Math.floor(
            Math.random()
            * candidates.length
        );


    currentQuestion =
        candidates[
            randomIndex
        ];


    usedQuestionIds.push(
        currentQuestion.id
    );


    questionNumber++;


    loadQuestion();

}



// ==========================================
// LOAD QUESTION
// ==========================================

function loadQuestion() {

    quizLocked =
        false;


    selectedAnswer =
        "";


    selectedWords =
        [];


    questionStartTime =
        performance.now();


    hideAllQuestionAreas();

    clearFeedback();


    document
        .getElementById(
            "questionType"
        )
        .textContent =
        currentQuestion
            .category
            .toUpperCase();


    document
        .getElementById(
            "question"
        )
        .textContent =
        currentQuestion
            .question;


    const extra =
        document.getElementById(
            "questionExtra"
        );


    extra.textContent =
        currentQuestion
            .translation
        || "";


    // Tampilkan skill
    // hasil prediksi AI.

    document
        .getElementById(
            "difficultyDisplay"
        )
        .textContent =
        "AI Skill "
        +
        Math.round(
            currentSkill * 100
        )
        +
        "%";


    const checkButton =
        document.getElementById(
            "checkButton"
        );


    checkButton.textContent =
        "CHECK";


    checkButton.disabled =
        true;


    checkButton.onclick =
        checkAnswer;



    // Jenis pertanyaan

    if (
        currentQuestion.type
        === "multiple_choice"
    ) {

        loadMultipleChoice(
            currentQuestion
        );

    }


    else if (
        currentQuestion.type
        === "arrange"
    ) {

        loadArrangeQuestion(
            currentQuestion
        );

    }


    else if (
        currentQuestion.type
        === "translation"
    ) {

        loadTranslationQuestion();

    }


    updateProgress();

}



// ==========================================
// RESET QUESTION AREA
// ==========================================

function hideAllQuestionAreas() {

    document
        .getElementById(
            "multipleChoiceArea"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "arrangeArea"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "translationArea"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "answers"
        )
        .innerHTML =
        "";


    document
        .getElementById(
            "selectedWords"
        )
        .innerHTML =
        "";


    document
        .getElementById(
            "wordBank"
        )
        .innerHTML =
        "";


    const input =
        document.getElementById(
            "translationInput"
        );


    input.value =
        "";


    input.disabled =
        false;

}



// ==========================================
// MULTIPLE CHOICE
// ==========================================

function loadMultipleChoice(
    question
) {

    const area =
        document.getElementById(
            "multipleChoiceArea"
        );


    const answers =
        document.getElementById(
            "answers"
        );


    area.classList.remove(
        "hidden"
    );


    answers.innerHTML =
        "";


    question.options.forEach(
        option => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "answer-btn";


            button.textContent =
                option;


            button.onclick =
                () => {

                    if (
                        quizLocked
                    ) {

                        return;

                    }


                    document
                        .querySelectorAll(
                            ".answer-btn"
                        )
                        .forEach(
                            btn => {

                                btn.classList
                                    .remove(
                                        "selected"
                                    );

                            }
                        );


                    button.classList
                        .add(
                            "selected"
                        );


                    selectedAnswer =
                        option;


                    enableCheckButton();

                };


            answers.appendChild(
                button
            );

        }
    );

}



// ==========================================
// ARRANGE WORDS
// ==========================================

function loadArrangeQuestion(
    question
) {

    const area =
        document.getElementById(
            "arrangeArea"
        );


    const wordBank =
        document.getElementById(
            "wordBank"
        );


    area.classList.remove(
        "hidden"
    );


    wordBank.innerHTML =
        "";


    question.words.forEach(
        word => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "word-btn";


            button.textContent =
                word;


            button.onclick =
                () => {

                    if (
                        quizLocked
                        ||
                        button.classList
                            .contains(
                                "used"
                            )
                    ) {

                        return;

                    }


                    button.classList
                        .add(
                            "used"
                        );


                    selectedWords.push({

                        word:
                            word,

                        sourceButton:
                            button

                    });


                    renderSelectedWords();

                };


            wordBank.appendChild(
                button
            );

        }
    );


    renderSelectedWords();

}



// ==========================================
// RENDER SELECTED WORDS
// ==========================================

function renderSelectedWords() {

    const container =
        document.getElementById(
            "selectedWords"
        );


    container.innerHTML =
        "";


    if (
        selectedWords.length
        === 0
    ) {

        const placeholder =
            document.createElement(
                "span"
            );


        placeholder.className =
            "placeholder";


        placeholder.textContent =
            "Select the words below...";


        container.appendChild(
            placeholder
        );


        selectedAnswer =
            "";


        disableCheckButton();


        return;

    }


    selectedWords.forEach(
        (item, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "word-btn";


            button.textContent =
                item.word;


            button.onclick =
                () => {

                    if (
                        quizLocked
                    ) {

                        return;

                    }


                    item.sourceButton
                        .classList
                        .remove(
                            "used"
                        );


                    selectedWords.splice(
                        index,
                        1
                    );


                    renderSelectedWords();

                };


            container.appendChild(
                button
            );

        }
    );


    selectedAnswer =
        selectedWords
            .map(
                item => item.word
            )
            .join(" ");


    enableCheckButton();

}



// ==========================================
// TRANSLATION
// ==========================================

function loadTranslationQuestion() {

    const area =
        document.getElementById(
            "translationArea"
        );


    const input =
        document.getElementById(
            "translationInput"
        );


    area.classList.remove(
        "hidden"
    );


    input.value =
        "";


    input.disabled =
        false;


    input.oninput =
        () => {

            if (
                quizLocked
            ) {

                return;

            }


            selectedAnswer =
                input.value.trim();


            if (
                selectedAnswer.length
                > 0
            ) {

                enableCheckButton();

            }

            else {

                disableCheckButton();

            }

        };


    input.onkeydown =
        event => {

            if (
                event.key
                    === "Enter"
                &&
                !document
                    .getElementById(
                        "checkButton"
                    )
                    .disabled
                &&
                !quizLocked
            ) {

                event.preventDefault();


                checkAnswer();

            }

        };


    setTimeout(
        () => {

            input.focus();

        },
        50
    );

}



// ==========================================
// CHECK ANSWER
// ==========================================

async function checkAnswer() {

    if (
        quizLocked
        ||
        !selectedAnswer
    ) {

        return;

    }


    quizLocked =
        true;


    const responseTime =
        (
            performance.now()
            - questionStartTime
        )
        / 1000;


    const correct =
        isAnswerCorrect(
            selectedAnswer,
            currentQuestion
        );



    // ======================================
    // CORRECT / INCORRECT
    // ======================================

    if (
        correct
    ) {

        currentStreak++;


        showFeedback(
            true,
            "✓ Correct! Great job."
        );

    }


    else {

        currentStreak =
            0;


        lives--;


        document
            .getElementById(
                "lives"
            )
            .textContent =
            lives;


        showFeedback(
            false,
            "✕ Incorrect. Correct answer: "
            +
            currentQuestion.answer
        );

    }



    // ======================================
    // SAVE PERFORMANCE
    // ======================================

    performanceHistory.push({

        questionId:
            currentQuestion.id,

        difficulty:
            currentQuestion.difficulty,

        correct:
            correct,

        responseTime:
            responseTime

    });



    lockCurrentQuestion();



    // ======================================
    // SEND TO AI
    // ======================================

    await updateSkillFromAI(
        responseTime
    );



    // ======================================
    // GAME OVER
    // ======================================

    if (
        lives <= 0
    ) {

        const button =
            document.getElementById(
                "checkButton"
            );


        button.textContent =
            "GAME OVER";


        button.disabled =
            true;


        // Beri waktu agar pemain
        // melihat jawaban yang benar.

        setTimeout(
            () => {

                showGameOver();

            },
            1000
        );


        return;

    }



    // ======================================
    // CONTINUE
    // ======================================

    const button =
        document.getElementById(
            "checkButton"
        );


    button.textContent =
        questionNumber
            >= MAX_QUESTIONS
        ? "FINISH"
        : "CONTINUE";


    button.disabled =
        false;


    button.onclick =
        selectAdaptiveQuestion;

}



// ==========================================
// AI CONNECTION
// ==========================================

async function updateSkillFromAI(
    responseTime
) {

    const total =
        performanceHistory.length;


    const correctTotal =
        performanceHistory.filter(
            item => item.correct
        ).length;


    const accuracy =
        correctTotal
        / total;



    // Lima jawaban terakhir.

    const recent =
        performanceHistory.slice(
            -5
        );


    const recentCorrect =
        recent.filter(
            item => item.correct
        ).length;


    const recentAccuracy =
        recentCorrect
        / recent.length;



    const data = {

        accuracy:
            accuracy,

        response_time:
            Math.min(
                responseTime,
                20
            ),

        streak:
            Math.min(
                currentStreak,
                10
            ),

        recent_accuracy:
            recentAccuracy,

        current_difficulty:
            currentQuestion
                .difficulty

    };



    try {

        const response =
            await fetch(

                API_URL
                + "/predict",

                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            data
                        )

                }

            );



        if (
            !response.ok
        ) {

            throw new Error(
                "AI server error"
            );

        }



        const result =
            await response.json();



        if (
            result.success
        ) {

            currentSkill =
                result.skill;


            targetDifficulty =
                result.next_difficulty;



            console.log(
                "======================"
            );


            console.log(
                "TRIOLINGO AI"
            );


            console.log(
                "Accuracy:",
                accuracy
            );


            console.log(
                "Response Time:",
                responseTime.toFixed(2)
            );


            console.log(
                "Streak:",
                currentStreak
            );


            console.log(
                "Predicted Skill:",
                currentSkill
            );


            console.log(
                "Next Difficulty:",
                targetDifficulty
            );


            console.log(
                "======================"
            );

        }

    }


    catch (
        error
    ) {

        console.error(
            "AI connection failed:",
            error
        );


        // Fallback apabila
        // backend tidak aktif.

        const lastAnswer =
            performanceHistory[
                performanceHistory.length
                - 1
            ];


        if (
            lastAnswer.correct
        ) {

            targetDifficulty +=
                0.05;

        }

        else {

            targetDifficulty -=
                0.05;

        }


        targetDifficulty =
            Math.max(
                0.10,
                Math.min(
                    targetDifficulty,
                    0.95
                )
            );

    }

}



// ==========================================
// ANSWER VALIDATION
// ==========================================

function isAnswerCorrect(
    userAnswer,
    question
) {

    const user =
        normalizeText(
            userAnswer
        );


    if (
        question.acceptedAnswers
        &&
        question.acceptedAnswers
            .length > 0
    ) {

        return (
            question
                .acceptedAnswers
                .some(
                    answer => {

                        return (
                            normalizeText(
                                answer
                            )
                            === user
                        );

                    }
                )
        );

    }


    return (
        user
        ===
        normalizeText(
            question.answer
        )
    );

}



// ==========================================
// NORMALIZE TEXT
// ==========================================

function normalizeText(
    text
) {

    return String(
        text || ""
    )
        .toLowerCase()
        .trim()
        .replace(
            /[.,!?]/g,
            ""
        )
        .replace(
            /\s+/g,
            " "
        );

}



// ==========================================
// LOCK CURRENT QUESTION
// ==========================================

function lockCurrentQuestion() {

    document
        .querySelectorAll(
            ".answer-btn, .word-btn"
        )
        .forEach(
            button => {

                button.disabled =
                    true;

            }
        );


    document
        .getElementById(
            "translationInput"
        )
        .disabled =
        true;

}



// ==========================================
// FEEDBACK
// ==========================================

function showFeedback(
    correct,
    message
) {

    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.className =
        correct
        ? "feedback correct"
        : "feedback incorrect";


    feedback.textContent =
        message;

}



function clearFeedback() {

    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.className =
        "feedback hidden";


    feedback.textContent =
        "";

}



// ==========================================
// CHECK BUTTON
// ==========================================

function enableCheckButton() {

    document
        .getElementById(
            "checkButton"
        )
        .disabled =
        false;

}



function disableCheckButton() {

    document
        .getElementById(
            "checkButton"
        )
        .disabled =
        true;

}



// ==========================================
// PROGRESS BAR
// ==========================================

function updateProgress() {

    const progress =
        (
            (questionNumber - 1)
            / MAX_QUESTIONS
        )
        * 100;


    document
        .getElementById(
            "progressBar"
        )
        .style.width =
        progress + "%";

}



// ==========================================
// GAME OVER
// ==========================================

function showGameOver() {

    const total =
        performanceHistory.length;


    const correct =
        performanceHistory.filter(
            item => item.correct
        ).length;


    const accuracy =
        total > 0

        ? Math.round(
            (
                correct
                / total
            )
            * 100
        )

        : 0;


    const skill =
        Math.round(
            currentSkill
            * 100
        );



    document
        .getElementById(
            "gameOverCorrect"
        )
        .textContent =
        correct
        + "/"
        + total;


    document
        .getElementById(
            "gameOverAccuracy"
        )
        .textContent =
        accuracy
        + "%";


    document
        .getElementById(
            "gameOverSkill"
        )
        .textContent =
        skill
        + "%";


    showPage(
        "gameOver"
    );

}



// ==========================================
// LESSON COMPLETE
// ==========================================

function finishLesson() {

    document
        .getElementById(
            "progressBar"
        )
        .style.width =
        "100%";


    const correct =
        performanceHistory.filter(
            item => item.correct
        ).length;


    const total =
        performanceHistory.length;


    const accuracy =
        total > 0

        ? Math.round(
            (
                correct
                / total
            )
            * 100
        )

        : 0;


    alert(

        "Lesson Complete! 🎉"

        + "\n\nCorrect: "
        + correct
        + "/"
        + total

        + "\nAccuracy: "
        + accuracy
        + "%"

        + "\nAI Skill: "
        + Math.round(
            currentSkill
            * 100
        )
        + "%"

    );


    showLanguages();

}