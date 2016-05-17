window.onload = function () {

	//array of letters of the alphabet
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
				'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
				't', 'u', 'v', 'w', 'x', 'y', 'z'];
				
	//declare variables
	var words;         // Array of topics
	var word ;              // Selected word
	var guess ;             // guess
	var guesses = [ ];      // Stored guesses
	var lives ;             // Lives
	var counter ;           // Count correct guesses
	var space;              // Number of spaces in word '-'

	// Get myLives element
	var showLives = document.getElementById("myLives");

	// create alphabet unordered list. assign alphabet to buttons div
	var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

		for (var i = 0; i < alphabet.length; i++) {
			letters.id = 'alphabet';
			list = document.createElement('li');
			list.id = 'letter';
			list.innerHTML = alphabet[i];
			check();
			myButtons.appendChild(letters);
			letters.appendChild(list);
		}
	}
    
	// Create guesses unordered list. assign my-word to hold div
	result = function () {
		wordHolder = document.getElementById('hold');
		correct = document.createElement('ul');

		for (var i = 0; i < word.length; i++) {
			correct.setAttribute('id', 'my-word');
			guess = document.createElement('li');
			guess.setAttribute('class', 'guess');
				if (word[i] === "-") {
					guess.innerHTML = "-";
					space = 1;
				} else {
					guess.innerHTML = "_";
				}
			guesses.push(guess);
			wordHolder.appendChild(correct);
			correct.appendChild(guess);
		}
	}
  
	// Show lives
	comments = function () {
		showLives.innerHTML = "You have " + lives + " lives";
		//if lives are less than 1 'Game Over' is displayed
		if (lives < 1) {
			showLives.innerHTML = "Game Over";
		}
		for (var i = 0; i < guesses.length; i++) {
			if (counter + space === guesses.length) {
			showLives.innerHTML = "You Win!";
			}
		}
	}

    // Animate man
	var animate = function () {
		var drawMe = lives ;
		drawArray[drawMe]();
	}

	//Draw Hangman
	canvas2 =  function(){
		myStickman = document.getElementById("stickman");
		context2 = myStickman.getContext('2d');
		context2.beginPath();
		context2.strokeStyle = "#333";
		context2.lineWidth = 2;
	};
  
	//function to draw stickmans head
    head = function(){
		myStickman = document.getElementById("stickman");
		context2 = myStickman.getContext('2d');
		context2.beginPath();
		//circle is drawn
		context2.arc(60, 25, 10, 0, Math.PI*2, true);
		context2.stroke();
    }
    
	//draw method constructor is created which takes x,y, width,height
	draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
		context2.moveTo($pathFromx, $pathFromy);
		context2.lineTo($pathTox, $pathToy);
		context2.stroke(); 
	}

	//draw image method takes parameters for x and y 
	//positions and width and height of image
	//coordinates for base line 
	frame1 = function() {
		draw (0, 150, 150, 150);
	};
   
	//coordinates for left line 
	frame2 = function() {
		draw (10, 0, 10, 600);
	};
  
	//coordinates for top line 
	frame3 = function() {
		draw (0, 5, 70, 5);
	};
  
	//coordinates for top line 
	frame4 = function() {
		draw (60, 5, 60, 15);
	};
  
	//coordinates for body of stickman
	torso = function() {
		draw (60, 36, 60, 70);
	};
  
	//coordinates for right arm of stickman
	rightArm = function() {
		draw (60, 46, 100, 50);
	};
  
	//coordinates for left arm of stickman
	leftArm = function() {
		draw (60, 46, 20, 50);
	};	
  
	//coordinates for right leg of stickman
	rightLeg = function() {
		draw (60, 70, 100, 100);
	};
  
	//coordinates for left leg of stickman
	leftLeg = function() {
		draw (60, 70, 20, 100);
	};
  
	//images that have been drawn are stored in an array
	drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 


	//OnClick Function
	check = function () {
		list.onclick = function () {
		var guess = (this.innerHTML);
		this.setAttribute("class", "active");
		this.onclick = null;
		for (var i = 0; i < word.length; i++) {
			if (word[i] === guess) {
				guesses[i].innerHTML = guess;
				counter += 1;
			} 
		}
		var j = (word.indexOf(guess));
			if (j === -1) {
				lives -= 1;
				comments();
				animate();
			} else {
				comments();
			}
		}
	}
  
    
	// Play
	play = function () {
		//array of words for users to guess
		words = [
			"chelsea", "arsenal", "pokemon", "lettuce", "length","weight","temperature","height","tennis","lacrosse","cricket","wrestling", "magnesium","calcium","potassium", "tornados","tsunamis", "chocolate", "cherries","strawberries","bananas", "granite","basalt","sandstone","alien", "hurricane", "gladiator", "jaws", "javascript", "maybelline", "duck","frog", "warthog","lion", "piano","guitar", "paris","london","brussels", "twitter","google","facebook", "orange","apple", "milan", "madrid", "amsterdam", "prague", "vacation", "admiration", "popeye","garfield"
		];
		//random word is selected
		word = words[Math.floor(Math.random() * words.length)];
		//replace blank spaces with characters of the word
		word = word.replace(/\s/g, "-");
		buttons();
		
		guesses = [ ];
		lives = 10;
		counter = 0;
		space = 0;
		//call functions
		result();
		comments();
		canvas2();
	}

	play();

	//Reset
	document.getElementById('reset').onclick = function() {
		//clear word that was guessed
		correct.parentNode.removeChild(correct);
		letters.parentNode.removeChild(letters);
		//clear canvas
		context2.clearRect(0, 0, 400, 400);
		play();
	}
}


