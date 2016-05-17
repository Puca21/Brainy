//declare and initialise variables
var position = 0;
var beg_quiz;
var beg_quiz_status;
var question;
var choice; 
var choices;
var choiceA;
var choiceB;
var choiceC;
var correctQ=0;
	
function _(x){
	return document.getElementById(x);
}
//call shuffle functions to shuffle questions in array	
shuffle(begQuestions);

//when game is over this function is called. It displays a page with the number of correct questions
function begGameOver() {
	beg_quiz = _("beg_quiz");
	$("#beg_quiz_status").css("width", "100%");
	$("#beg_quiz").css("width", "100%");
	$("#beg_countdown").css("display", "none");
	_("beg_quiz_status").innerHTML = "Game Over";
	beg_quiz.innerHTML = "<h2>You got " + correctQ + " questions correct</h2>";
	beg_quiz.innerHTML += "<button onclick ='shuffle(begQuestions), begRenderQuestion()' id='tryBtn' class='btn'>Try Again</button>";
	//back button allows user to go back to index page
	beg_quiz.innerHTML += "<button onclick ='location.reload()' class='btn'>Back</button>";
	position = 0;
	correct = 0;
	return false;
}
	
//this function displays question on page
function begRenderQuestion(){
	beg_countdown.start();
	beg_quiz = _("beg_quiz");
	$("#beg_quiz_status").css("width", "300px");
	$("#beg_quiz").css("width", "300px");
	$("#beg_countdown").css("display", "block");
	_("beg_quiz_status").innerHTML = "Question "+(position+1);
	//questions and multiple choices are assigned variables based on their position in array
	question = begQuestions[position][0];
	choiceA = begQuestions[position][1];
	choiceB = begQuestions[position][2];
	choiceC = begQuestions[position][3];
	beg_quiz.innerHTML = "<h3>" + question +"</h3>";
	beg_quiz.innerHTML += "<input type ='radio' name ='choices' value = 'A'> " + choiceA + "<br>" +"<br>";
	beg_quiz.innerHTML += "<input type ='radio' name ='choices' value = 'B'> " + choiceB + "<br>"+"<br>";
	beg_quiz.innerHTML += "<input type ='radio' name ='choices' value = 'C'> " + choiceC + "<br>"+"<br>";
	beg_quiz.innerHTML += "<button onclick ='begCheckAnswer()' class='btn'>Submit Answer</button>";
}

//each time user answers question this loop verifies whether answer is correct or not		
function begCheckAnswer(){
	//gets multiple choices
	choices = document.getElementsByName("choices");
	//loops through them to see if value user selected matches correct value in array
	for(var i =0; i<choices.length; i++) {
		if (choices[i].checked) {
			choice = choices[i].value;
		}
	}
	//if user selects correct answer which matches fourth index in each array..
	if (choice == begQuestions[position][4]) {
	//then correct answer increases by 1
		correctQ++;
	}
	//if user doesn't select correct answer then game is over
	if(choice != begQuestions[position][4]) {
		begGameOver();
		//skips to shuffle function
		return;
	}
	//if countdown gets to 0 game is over	
	if(beg_countdown.seconds==0) {
		begGameOver();
		//skips to shuffle function
		return;
	}
	//position variable increases by 1
	position++;
	//renderquestion function is called
	begRenderQuestion();
}

//Fisher-Yates shuffle function which shuffles questions array to pick random question each time. no question will be called twice
function shuffle(begQuestions) {
	var counter = begQuestions.length, temporaryValue, randomIndex ;

	// While there remain elements to shuffle...
	while (counter>0) {

	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * counter--);

	// And swap it with the current element.
	temporaryValue = begQuestions[counter];
	begQuestions[counter] = begQuestions[randomIndex];
	begQuestions[randomIndex] = temporaryValue;
	}

	return begQuestions;
}	

//when window loads a question is rendered with the begRenderQuestion function
window.addEventListener("load", begRenderQuestion, false);
