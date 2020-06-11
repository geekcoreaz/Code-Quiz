//arrray of the quiz questions, avaialble choices, and correct answers     
let questions = [{
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["script", "scripting", "js", "javascript"],
    answer: "script"
},
{
    title: "What is the top level of the Document Object Model (DOM)?",
    choices: ["Body", "HTML", "Window Object", "Document Object"],
    answer: "Window Object"
},
{
    title: "Which of these is not a programming language?",
    choices: ["HTML", "Javascript", "PHP", "Python"],
    answer: "HTML"
},
{
    title: `What is a function with no name such as "Function()" called?`,
    choices: ["Declared", "Anonymous", "Non-Named", "None of the above"],
    answer: "Anonymous"
},
{
    title: `Document method ".querySelector" can be used to target what kind of element?`,
    choices: [".Class", "#ID", "Both of the above", "None of the above"],
    answer: "Both of the above"
}]

//set the variables
let score = 0;
let question = -1;
let timeLeft = 0;
let timer = 0;

//starts the countdown timer once user clicks the 'start' button
document.querySelector("#start").addEventListener("click", start);

function start() {

    timeLeft = 60;
    document.querySelector("#timeLeft").innerHTML = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.querySelector("#timeLeft").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    next();
}


//save the score on local storage
function setScore() {
    localStorage.setItem("highScore", score);
    localStorage.setItem("highScoreInit", document.querySelector('#name').value);
    getScore();
}

//retreive the score from local storage
document.querySelector("#getScore").addEventListener("click", getScore);

function getScore() {
    let quizContent = `
<h3>` + localStorage.getItem("highScoreInit") + ` got a highscore of ` + localStorage.getItem("highScore") + `</h3>

<button class="btn btn-primary btn-lg" onclick="reload()">Play Again!</button>
`;

    document.querySelector("#quizBody").innerHTML = quizContent;
}

function reload() {
    location.reload();
}

//deduct 20 seconds if user chooses an incorrect answer
function incorrect() {
    timeLeft -= 20;
    next();
}

//increases the score by 20 points if the user chooses correct answer
function correct() {
    score += 20;
    next();
}

//loops through the questions 
function next() {
    question++;

    if (question > questions.length - 1) {
        endGame();
        return;
    }

    let quizContent = "<h2>" + questions[question].title + "</h2>"

    for (let i = 0; i < questions[question].choices.length; i++) {
        let btn = "<button class='btn btn-primary btn-lg' onclick='answer'>select</button>";
        btn = btn.replace("select", questions[question].choices[i]);
        if (questions[question].choices[i] == questions[question].answer) {
            btn = btn.replace("answer", "correct()");
        } else {
            btn = btn.replace("answer", "incorrect()");
        }
        quizContent += btn
    }


    document.querySelector("#quizBody").innerHTML = quizContent;
}

//End the Game and see score
function endGame() {
    clearInterval(timer);

    let quizContent = `
<h2>Game over!</h2>
<p>You scored ` + score + `%!</p>
<p>You got ` + score / 20 + ` questions correct!</p>
<input type="text" id="name" placeholder="Your initials"> 
<button  class="btn btn-primary btn-lg" onclick="setScore()">Set score!</button>`;

    document.querySelector("#quizBody").innerHTML = quizContent;
}
