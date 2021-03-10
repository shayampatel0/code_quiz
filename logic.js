var score = 0;
var currentQuestion = -1;
var timeRemaining = 0;
var timer;

var questions = [{
	title: "What is the basic unit of matter?",
	choices: ["Atom", "Electron", "Proton", "Water"],
	answer: "Atom"
},
{
	title: "A^2 + B^2 = ?",
	choices: ["X", "Y", "C^2", "Y^2"],
	answer: "C^2"
},
{
	title: "What is the correct order of operations? ",
	choices: ["DASPEM", "PEMDAS", "LMFAO"],
	answer: "PEMDAS"
},
{
	title: "What is slope in the slope-intercept form?",
	choices: ["x", "y", "f(x)", "m"],
	answer: "m"
},
{
	title: "Coolest Subject on Earth ",
	choices: ["CalculusRightAnswer", "Orgo", "Physics ", "Biology"],
	answer: "CalculusRightAnswer"
}
]


//starts the countdown timer once user clicks the 'start' button
function start() {

timeRemaining = 75;
document.getElementById("timeRemaining").innerHTML = timeRemaining;

timer = setInterval(function() {
	timeRemaining--;
	document.getElementById("timeRemaining").innerHTML = timeRemaining;
	//proceed to end the game function when timer is below 0 at any time
	if (timeRemaining <= 0) {
		clearInterval(timer);
		endGame(); 
	}
}, 1000);

next();
}

//stop the timer to end the game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h3>Game over!</h3>
<h2> Your score` + score +  ` </h2>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;
document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

function incorrect() {
timeRemaining -= 15; 
next();
}

function correct() {
score += 20;
next();
}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
	endGame();
	return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
	var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
	buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
	if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
		buttonCode = buttonCode.replace("[ANS]", "correct()");
	} else {
		buttonCode = buttonCode.replace("[ANS]", "incorrect()");
	}
	quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}