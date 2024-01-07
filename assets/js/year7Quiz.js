const questions = [
    {
        question: "Where is the first recorded Viking raid in England?",
        answers: [
            { text:"York", correct: false },
            { text: "Lindisfarne", correct: true },
            { text: "Norfolk", correct: false },
            { text: "London", correct: false },
        ]
    },
    {
        question: "Who chose the King of England after the death of Edward the Confessor?",
        answers: [
            { text: "The Witan", correct: true },
            { text: "The Parliament", correct: false },
            { text: "The Great Council", correct: false },
            { text: "The Shire Moot", correct: false },
        ]
    },
    {
        question: "How long was the Battle of Hastings?",
        answers: [
            { text: "5 hours", correct: false },
            { text: "6 hours", correct: false },
            { text: "9 hours", correct: true },
            { text: "12 hours", correct: false },
        ] 
    },
    {
        question: "Of the 63 original clauses in the Magna Carta, how many are still valid today?",
        answers: [
            { text: "4", correct: true },
            { text: "8", correct: false},
            { text: "12", correct: false },
            { text: "16", correct: false },
        ]  
    },
    {
        question: "What is the name for gaps between stonework on a castle wall?",
        answers: [
            { text: "Merlons", correct: false },
            { text: "Portcullis", correct: false },
            { text: "Crenels", correct: true },
            { text: "Embrasures", correct: false },
        ]   
    }
] ;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
