let score = 0;
let gameOverFlag = false;
let cross = true;
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);
document.onkeydown = function (e) {
    if (gameOverFlag) return;

    const charizard = document.querySelector('.charizard');

    if (e.key === "ArrowUp") {
        if (!charizard.classList.contains('animateCharizard')) {
            charizard.classList.add('animateCharizard');
            setTimeout(() => {
                charizard.classList.remove('animateCharizard');
            }, 700);
        }
    }

    if (e.key === "ArrowRight") {
        let charizardX = parseInt(window.getComputedStyle(charizard).getPropertyValue('left'));
        charizard.style.left = (charizardX + 22) + "px";
    }

    if (e.key === "ArrowLeft") {
        let charizardX = parseInt(window.getComputedStyle(charizard).getPropertyValue('left'));
        charizard.style.left = (charizardX - 22) + "px";
    }
};

setInterval(() => {
    if (gameOverFlag) return;

    const charizard = document.querySelector('.charizard');
    const gameOver = document.querySelector('.gameOver');
    const obstacle = document.querySelector('.obstacle');

    const charizardRect = charizard.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    const isColliding = !(
        charizardRect.top > obstacleRect.bottom ||
        charizardRect.bottom < obstacleRect.top ||
        charizardRect.right < obstacleRect.left ||
        charizardRect.left > obstacleRect.right
    );

    if (isColliding) {
        gameOver.style.visibility = 'visible';
        gameOverFlag = true;
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
        gameOver.innerHTML = "Game Over-Reload To Play Again";
        obstacle.classList.remove('obstacleAni');
        obstacle.style.left = `${obstacleRect.left}px`;

        charizard.style.left = `${charizardRect.left}px`;
        charizard.classList.remove('animateCharizard');
    }

    const obstaclePassed = obstacleRect.right < charizardRect.left;

    if (obstaclePassed && cross) {
        score += 1;
        updateScore(score);
        cross = false;

        // Delay before resetting cross so next obstacle can be counted
        setTimeout(() => {
            cross = true;
        }, 1000); // Adjust this timing based on your game's obstacle speed

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle).getPropertyValue('animation-duration'));
            if (aniDur > 1) {
                obstacle.style.animationDuration = (aniDur - 0.1) + 's';
            }
        }, 200);
    }

}, 50);

function updateScore(score) {
    const scoreCont = document.getElementById('scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
}
