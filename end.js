const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#save-score-btn');
const finalScore = document.querySelector('#final-score');

const LAST_SCORE = localStorage.getItem('lastScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

finalScore.innerText = LAST_SCORE;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: LAST_SCORE,
        name: username.value
    };

    highScores.push(score);
    console.log(highScores)
}