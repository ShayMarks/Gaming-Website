let score = 0;
let time = 60;
let interval;
let gameOver = false;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
    const num1 = getRandomInt(1, 10);
    const num2 = getRandomInt(1, 10);
    const operations = ['+', '-', '*', '/'];
    const operation = operations[getRandomInt(0, operations.length - 1)];

    let solution;
    let problem;

    switch (operation) {
        case '+':
            problem = `${num1} + ${num2}`;
            solution = num1 + num2;
            break;
        case '-':
            if (num1 >= num2) {
                problem = `${num1} - ${num2}`;
                solution = num1 - num2;
            } else {
                problem = `${num2} - ${num1}`;
                solution = num2 - num1;
            }
            break;
        case '*':
            problem = `${num1} * ${num2}`;
            solution = num1 * num2;
            break;
        case '/':
            const dividend = num1 * num2;
            problem = `${dividend} / ${num1}`;
            solution = dividend / num1;
            break;
    }

    return {
        problem: problem,
        solution: solution
    };
}

let currentProblem = generateProblem();

function displayProblem() {
    document.getElementById('problem').innerText = currentProblem.problem;
}

function checkAnswer() {
    if (gameOver) return;
    const userAnswer = parseFloat(document.getElementById('answer').value);
    if (userAnswer === currentProblem.solution) {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
    }
    currentProblem = generateProblem();
    displayProblem();
    document.getElementById('answer').value = '';
    document.getElementById('answer').focus();
}

function startGame() {
    score = 0;
    time = 60;
    gameOver = false;
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('timer').innerText = `Time: ${time}`;
    interval = setInterval(() => {
        time--;
        document.getElementById('timer').innerText = `Time: ${time}`;
        if (time <= 0) {
            clearInterval(interval);
            gameOver = true;
            localStorage.setItem('lastScore', score);
            alert(`Game over! Your score is ${score}`);
        }
    }, 1000);
    displayProblem();
}

function restartGame() {
    clearInterval(interval);
    startGame();
}

function backToMenu() {
    clearInterval(interval);
    // Implement your own logic to go back to the main menu
    alert("Back to the main menu (this needs to be implemented)");
}

document.getElementById('answer').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

document.getElementById('restart-button').addEventListener('click', restartGame);
document.getElementById('back-button').addEventListener('click', backToMenu);

startGame();
