// MARK: DOM ELEMENTS
const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#save-score-btn');
const finalScore = document.querySelector('#final-score');


// MARK: CONSTANTS
const LAST_SCORE = localStorage.getItem('lastScore');
const MAX_HIGH_SCORES = 5;

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

//MARK: DOM MANIPULATION
finalScore.innerText = LAST_SCORE;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

// MARK: FUNCTIONS
saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: LAST_SCORE,
        name: username.value
    };

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    setTimeout(() => {
        window.location.assign('/highscores.html');
    }, 800);

}