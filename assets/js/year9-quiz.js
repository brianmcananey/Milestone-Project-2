const questions = [
    {
        question: "How many wives did Henry VIII have?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: true },
            { text: "7", correct: false },
            { text: "8", correct: false },
        ]
    },
    {
        question: "What type of boats did the Vikings use when exploring and raiding?",
        answers: [
            { text: "Longships", correct: true },
            { text: "Shortships", correct: false },
            { text: "Viking Hoards", correct: false },
            { text: "Canoes", correct: false },
        ]
    },
    {
        question: "Mount Vesuvius erupted and destroyed Pompeii in what year?",
        answers: [
            { text: "76 AD", correct: false },
            { text: "77 AD", correct: false },
            { text: "78 AD", correct: false },
            { text: "79 AD", correct: true },
        ]
    },
    {
        question: "Which space mission were Neil Armstrong and Buzz Aldrin a part of?",
        answers: [
            { text: "Apollo 10", correct: false },
            { text: "Apollo 11", correct: true },
            { text: "Apollo 12", correct: false },
            { text: "Apollo 13", correct: false },
        ]
    },
    {
        question: "Martin Luther King Jr. was assassinated in which US state?",
        answers: [
            { text: "Tennessee", correct: true },
            { text: "Colorado", correct: false },
            { text: "Florida", correct: false },
            { text: "New Jersey", correct: false },
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
