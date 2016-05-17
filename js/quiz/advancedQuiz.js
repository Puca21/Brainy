//declare and initialise variables
var position = 0;
var adv_quiz;
var adv_quiz_status;
var question;
var choice; 
var choices;
var choiceA;
var choiceB;
var choiceC;
var correctQA=0;
	
function _(x){
	return document.getElementById(x);
}

//call shuffle functions to shuffle questions in array
shuffle(advQuestions);

//when game is over this function is called. It displays a page with the number of correct questions
function advGameOver() {
	adv_quiz = _("adv_quiz");
	$("#adv_quiz_status").css("width", "100%");
	$("#adv_quiz").css("width", "100%");
	$("#adv_countdown").css("display", "none");
	_("adv_quiz_status").innerHTML = "Game Over";
	adv_quiz.innerHTML = "<h2>You got " + correctQA + " questions correct</h2>";
	adv_quiz.innerHTML += "<button onclick ='shuffle(advQuestions), advRenderQuestion()' id='tryBtn' class='btn'>Try Again</button>";
	//back button allows user to go back to index page
	adv_quiz.innerHTML += "<button onclick ='location.reload()' class='btn'>Back</button>";
	position = 0;
	correct = 0;
	return false;
}

//this function displays question on page
function advRenderQuestion(){
	adv_countdown.start();
	adv_quiz = _("adv_quiz");
	$("#adv_quiz_status").css("width", "500px");
	$("#adv_quiz").css("width", "500px");
	$("#adv_countdown").css("display", "block");
	_("adv_quiz_status").innerHTML = "Question "+(position+1);
	//questions and multiple choices are assigned variables based on their position in array
	question = advQuestions[position][0];
	choiceA = advQuestions[position][1];
	choiceB = advQuestions[position][2];
	choiceC = advQuestions[position][3];
	choiceD = advQuestions[position][4];
	adv_quiz.innerHTML = "<h3>" + question +"</h3>";
	adv_quiz.innerHTML += "<input type ='radio' name ='choices' value = 'A'> " + choiceA + "<br>" +"<br>";
	adv_quiz.innerHTML += "<input type ='radio' name ='choices' value = 'B'> " + choiceB + "<br>"+"<br>";
	adv_quiz.innerHTML += "<input type ='radio' name ='choices' value = 'C'> " + choiceC + "<br>"+"<br>";
	adv_quiz.innerHTML += "<input type ='radio' name ='choices' value = 'D'> " + choiceD + "<br>"+"<br>";
	adv_quiz.innerHTML += "<button onclick ='advCheckAnswer()' class='btn'>Submit Answer</button>";
}

//each time user answers question this loop verifies whether answer is correct or not
function advCheckAnswer(){
	//gets multiple choices
	choices = document.getElementsByName("choices");
	//loops through them to see if value user selected matches correct value in array
	for(var i =0; i<choices.length; i++) {
		if (choices[i].checked) {
			choice = choices[i].value;
		}
	}
	//if user selects correct answer which matches fifth index in each array..
	if (choice == advQuestions[position][5]) {
		//then correct answer increases by 1
		correctQA++;
	}
	//if user doesn't select correct answer then game is over
	if(choice != advQuestions[position][5]) {
		advGameOver();
		//skips to shuffle function
		return;
	}
	//if countdown gets to 0 game is over
	if(adv_countdown.seconds==0) {
		advGameOver();
		//skips to shuffle function
		return;
	}
	//position variable increases by 1
	position++;
	//renderquestion function is called
	advRenderQuestion();
}

//Fisher-Yates shuffle function which shuffles questions array to pick random question each time. no question will be called twice
function shuffle(advQuestions) {
	var counter = advQuestions.length, temporaryValue, randomIndex ;

	// While there remain elements to shuffle...
	while (counter>0) {

	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * counter--);

	// And swap it with the current element 
	temporaryValue = advQuestions[counter];
	advQuestions[counter] = advQuestions[randomIndex];
	advQuestions[randomIndex] = temporaryValue;
	}
	return advQuestions;
}	
//when window loads a question is rendered with the advRenderQuestion function
window.addEventListener("load", advRenderQuestion, false);
