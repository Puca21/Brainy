var canvas4;
var stage;

//number of turns the player has to find the number
var turns = 0;

//Variable for the random number generated
var guess = 0;

//The total number the player will be expected to guess from
var total = 20;

//Variables used for the text that will be displayed
var chances;
var nText;

//Container object for the End Screen
var group;

//this initializes the game stage.
function init() {
	setupStage();
	setNumber();
	setupClickBlocks();
	setupBlankBlocks();
	setupChances();
	setNumberBox();
	createEndScreen();
}

//Sets up the CreateJS stage and sets the update function
function setupStage() {
	canvas4 = document.getElementById("canvas4");
	stage = new createjs.Stage(canvas4);
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);
}

//Random number is generated
function setNumber() {
	guess = Math.floor(Math.random()*20) + 1;
	console.log(guess);
}

//This function creates a rectangular on the screen to display the "Higher" and "Lower" text
function setNumberBox() {
	//creates new shape
	var shape = new createjs.Shape();
	//sets the stroke
	shape.graphics.beginStroke("#242424");
	//sets the fill
	shape.graphics.beginFill("#FFFFFF");
	//draws the shape
	shape.graphics.drawRect(0,0,100,100);
	//sets the registration point of the shape
	shape.regX = 50;
	shape.regY = 50;
	//sets the position of the shape
	shape.x = 250;
	shape.y = 100;
	//adds the shape to the stage
	stage.addChild(shape);
	
	//creates text
	nText = new createjs.Text("Find " + "\nthe number:");
	//sets the text color
	nText.color = "#242424";
	//centers the text
	nText.textAlign = "center";
	//sets the text baseline to the middle
	nText.textBaseLine = "middle";
	//sets the font type and size
	nText.font = "32px Arial";
	//sets the position of the text in relation to the shape
	nText.x = shape.x -150;
	nText.y = shape.y-40;
	//adds the text to the stage
	stage.addChild(nText);
	
	//creates text
	nText = new createjs.Text("?");
	nText.color = "#242424";
	nText.textAlign = "center";
	nText.textBaseLine = "middle";
	nText.font = "32px Arial";
	nText.x = shape.x;
	nText.y = shape.y-20;
	stage.addChild(nText);
}

//This function creates clickable boxes on the grid
function setupBlankBlocks() {
	var shape;
	var i;
	var xpos = 40;
	var ypos = 460;
	
	for(i = 0; i < total; i++) {
		shape = new createjs.Shape();
		shape.graphics.beginStroke("#000");
		shape.graphics.beginFill("#FFF");
		shape.graphics.drawRect(0,0,80,80);
		shape.regX = 40;
		shape.regY = 40;
		shape.x = xpos;
		shape.y = ypos;
		shape.name = "box" + i;
		stage.addChild(shape);
		//adds the click event listener to the shape
		shape.addEventListener("click", shapeClick);
		shape.value = i + 1;
		xpos += 100;
	
		if(i % 5 == 4) {
			xpos = 40;
			ypos -= 80;
		}
	}
}

//This function creates 20 boxes which show the numbers which reveal the number when clicked
function setupClickBlocks() {
	var shape;
	var text;
	var i;
	var xpos = 40;
	var ypos = 460;
	
	for(i = 0; i < total; i++) {
		shape = new createjs.Shape();
		shape.graphics.beginFill("#363636");
		shape.graphics.drawRect(0,0,80,80);
		shape.regX = 40;
		shape.regY = 40;
		shape.x = xpos;
		shape.y = ypos;
		shape.name = "clicked" + i
		stage.addChild(shape);
			
		text = new createjs.Text(i + 1);
		text.color = "#FFF";
		text.textAlign ="center";
		text.textBaseLine = "middle";
		text.font = "16px Arial";
		text.x = xpos;
		text.y = ypos-8;
		stage.addChild(text);
		shape.value = i + 1;
		shape.key = text;
		xpos += 100
		
		if(i % 5 == 4){
			xpos = 40;
			ypos -= 80;
		}
	}
}

//This function creates a text object to display the chances the player has left
function setupChances(){
	chances = new createjs.Text("Chances: 0 of 8");
	chances.color = "#000";
	chances.font = "24px Arial";
	chances.x = stage.canvas4.width - 230;
	chances.y = 85;
	stage.addChild(chances);
}

//This function is called when the player clicks on a shape.
//It checks to see how many turns the player has taken
function shapeClick(e){
	if(turns < 8){
		turns++;
		var shape = e.target;
		shape.visible = false;
		checkMatch(shape);
	}else{
		showEndScreen("The correct number was " + guess);
	}
	chances.text= "Chances: " + turns + " of 8";
}

//This function is called from shapeClick.
//It checks if the randomly selected number is same as the number clicked by the player on the grid.
function checkMatch(shape){
	console.log(shape.value +":"+ guess);
	if(shape.value == guess){
		if(turns <= 2){
			showEndScreen("The number was " + guess);
		}else if(turns == 3){
			showEndScreen("The number was " + guess);
		}else if(turns == 4){
			showEndScreen("The number was " + guess);
		}else if(turns == 5){
			showEndScreen("The number was " + guess);
		}else if(turns == 6){
			showEndScreen("The number was " + guess);
		}else if(turns >= 7){
			showEndScreen("The number was " + guess);
		}
	}else if(shape.value > guess){
		nText.text = "Lower";
	}else if(shape.value < guess){
		nText.text = "Higher";
	}
}

//This function creates the endscreen.
function createEndScreen(){
	//The Container class in CreatesJS holds different objects
	group = new createjs.Container();
	
	var shape = new createjs.Shape();
	shape.graphics.beginFill("#FFF");
	shape.graphics.drawRect(0,0,stage.canvas4.width,stage.canvas4.height);
	group.addChild(shape);
			
	var text = new createjs.Text();
	text.color = "#000";
	text.textAlign ="center";
	text.textBaseLine = "middle";
	text.font = "30px Arial";
	text.x = stage.canvas4.width/2;
	text.y = stage.canvas4.height/2;
	text.name = "myText";
	group.addChild(text);
	
	stage.addChild(group);
	group.addEventListener("click", onreset);
	group.visible = false;
}

function showEndScreen(txt){
	group.visible = true;
	group.getChildByName("myText").text = txt;
}
//This function resets the values when the player restarts the game
function onreset(){
	var i, shape;
	for(i = 0; i < total; i++){
		shape = stage.getChildByName("box" + i);
		shape.visible = true;
	}
	setNumber();
	turns = 0;
	nText.text = "?";
	chances.text= "Chances: " + turns + " of 8";
	group.visible = false;
}
		
function tick(e){
	stage.update();
}	