// MARK: DOM ELEMENTS
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const questionCounterText = document.querySelector('#question-counter');
const scoreText = document.querySelector('#score');
const progressBarFill = document.querySelector('#progress-bar-fill');

// MARK: VARIABLES
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1
    },
    {
        question: `What is the correct syntax for referring to an external script call 'xxx.js'?`,
        choice1: `<script href='xxx.js'>`,
        choice2: `<script name='xxx.js'>`,
        choice3: `<script src='xxx.js'>`,
        choice4: `<script file='xxx.js'>`,
        answer: 3
    },
    {
        question: `How do you write 'Hello World' in an alert box?`,
        choice1: `msgBox('Hello World')`,
        choice2: `alertBox('Hello World')`,
        choice3: `msg('Hello World')`,
        choice4: `alert('Hello World')`,
        answer: 4
    },
];

// MARK: CONSTANTS
const CORRECT_BONUS = Math.floor(Math.random() * 25);
const MAX_QUESTIONS = questions.length;

// MARK: FUNCTIONS
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('lastScore', score);
        return window.location.assign('/end.html');
    }

    questionCounter++;

    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`

    progressBarFill.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion[`choice${number}`];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

decrementScore = num => {
    score -= num;
    scoreText.innerText = score;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        classToApply === 'correct' ? incrementScore(CORRECT_BONUS) : decrementScore(CORRECT_BONUS);

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)

            getNewQuestion()
        }, 1500);

    });
});

// MARK: START GAME
startGame();
