// When the document loads, a question is generated immediately
$(document).ready(function () {
    showQuestion();
});

// An array of objects containing quiz questions and answers
const questions = [
    {
        question: "assets/images/main-img/african.jpg",
        answers: [
            { text: 'African Grey', correct: true },
            { text: 'Cockatiel', correct: false },
            { text: 'Burrowing', correct: false },
            { text: 'Sun Conure', correct: false },
        ],
    },
    {
        question: "assets/images/main-img/scarlet.jpg",
        answers: [
            { text: 'Meyers', correct: false },
            { text: 'Scarlet Macaw', correct: true },
            { text: 'Hyacinth Macaw', correct: false },
            { text: 'Yellow-Naped Amazon', correct: false },
        ],
    },
    {
        question: "assets/images/main-img/eclectus.jpg",
        answers: [
            { text: 'Senegal', correct: false },
            { text: 'Indian Ringneck', correct: false },
            { text: 'Eclectus', correct: true },
            { text: 'Kakariki', correct: false },

        ],
    },
    {
        question: "assets/images/main-img/cockatiel.jpg",
        answers: [
            { text: 'Senegal', correct: false },
            { text: 'Cockatiel', correct: true },
            { text: 'Hyacinth Macaw', correct: false },
            { text: 'Sun Conure', correct: false },
        ],
    },
    {
        question: "assets/images/main-img/amazon.jpg",
        answers: [
            { text: 'Sun Conure', correct: false },
            { text: 'Kakariki', correct: false },
            { text: 'Green Cheek Conure', correct: false },
            { text: 'Yellow-Naped Amazon', correct: true },
        ],
    },
];

    
// Starts the current question index at 0
var currentQuestionIndex = 0;
var currentQuestion = questions[currentQuestionIndex];

// Generates a new question
function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        currentQuestion = questions[currentQuestionIndex];
        $('#question').attr('src', currentQuestion.question);
        $('#option1').text(currentQuestion.answers[0].text);
        $('#option2').text(currentQuestion.answers[1].text);
        $('#option3').text(currentQuestion.answers[2].text);
        $('#option4').text(currentQuestion.answers[3].text);
    } else {

        // Navigate to the score page and stores user score within the url
        window.location.href = `score.html?score=${score}`;
    }
}

// When user selects an answer a new question is generated
function userAnswer(event) {
    checkAnswer(event);
    currentQuestionIndex++;
    showQuestion();
}

// Checks answer and triggers correctAnswer()
function checkAnswer(event) {
    const selectedAnswer = currentQuestion.answers.find((answer) => answer.text === event.target.textContent);

    if (selectedAnswer && selectedAnswer.correct) {
        correctAnswer();
    }
}

// Logs user score
let score = 0;

// If correct = score + 1
function correctAnswer() {
    score = score + 1;
    $('#q-score').text(score);
}