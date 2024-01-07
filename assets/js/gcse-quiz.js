const questions = [
    {
        question: "When did Hitler become Chancellor of Germany?",
        answers: [
            { text: "1931", correct: false },
            { text: "1932", correct: false},
            { text: "1933", correct: true },
            { text: "1934", correct: false },
        ]
    },
    {
        question: "Who did Hitler put in charge of propoganda?",
        answers: [
            { text: "Himmler", correct: false },
            { text: "Goebbels", correct: true },
            { text: "Heydrich", correct: false },
            { text: "Goering", correct: false },
        ]
    },
    {
        question: "What event occured that led to Hitler passing the Enabling Act?",
        answers: [
            { text: "The Great Depression", correct: false },
            { text: "The Concordat", correct: false },
            { text: "The Wall Street Crash", correct: false },
            { text: "The Reichstag Fire", correct: true },
        ]
    },
    {
        question: "How many people were unemployed, as a result of the Great Depression?",
        answers: [
            { text: "3.3 million", correct: false },
            { text: "4.4 million", correct: false },
            { text: "5.5 million", correct: false },
            { text: "6.6 million", correct: true },
        ]
    },
    {
        question: "Who was President of Germany when Hitler became Chancellor?",
        answers: [
            { text: "Hindenberg", correct: true },
            { text: "Ludendorff", correct: false },
            { text: "Von Papen", correct: false },
            { text: "Von Schleicher", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
