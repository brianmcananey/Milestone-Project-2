const questions = [
    {
        question: "How long was Queen Victoria’s reign?",
        answers: [
            { text: "60 years", correct: false },
            { text: "63 years", correct: true },
            { text: "65 years", correct: false },
            { text: "70 years", correct: false },
        ]
    },
    {
        question: "Who served as the final leader of the Soviet Union?",
        answers: [
            { text: "Lenin", correct: false },
            { text: "Stalin", correct: false },
            { text: "Trotsky", correct: false },
            { text: "Gorbachev", correct: true },
        ]
    },
    {
        question: "What was the final battle of the Napoleonic Wars?",
        answers: [
            { text: "The Battle of Bosworth", correct: false },
            { text: "The Battle of Boldon Hill", correct: false },
            { text: "The Battle of Waterloo", correct: true },
            { text: "The Battle of Hastings", correct: false },
        ]
    },
    {
        question: "Which President of the United States abolished slavery?",
        answers: [
            { text: "JFK", correct: false },
            { text: "Abraham Lincoln", correct: true },
            { text: "Ronald Reagen", correct: false },
            { text: "Barack Obama", correct: false },
        ]
    },
    {
        question: "Which Caribbean country played a key role in The Missile Scare during the Cold War?",
        answers: [
            { text: "Jamaica", correct: false },
            { text: "Cuba", correct: true },
            { text: "Mexico", correct: false },
            { text: "West Indies", correct: false },
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
