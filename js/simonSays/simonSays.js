(function() {
	//code must be executed in strict mode i.e. undeclared variables cannot be used
	'use strict';
	
	//declare variables
	var sequence, copy, round;
	var active = true;
	
	//when document is ready initGame function is called
	$(document).ready(function() {
		initGame();
	});
	
	//when start button is clicked startGame function is called
	function initGame() {
		$('[data-action=start]').on('click', startGame);
	}

	//sequence and copy arrays are created, round is initialised to 0, 
	//the paragraph displaying text when user loses is hidden and newRound function is called
	function startGame() {
		sequence = [];
		copy = [];
		round = 0;
		$('p[data-action="lose"]').hide();
		newRound();
	}

	//if user gets to new round round will increase by one and the text will be displayed
	function newRound() {
	$('[data-round]').text(++round);
		//random number is pushed into sequence array
		sequence.push(randomNumber());
		//selects element in array
		copy = sequence.slice(0);
		//animate sequence of colours
		animate(sequence);
	}

	//function registers user mouse events
	function activateBoard(){
		$('.simonSaysGame')
			//when user clicks on tile it is registered through registerClick method
			.on('click', '[data-tile]', registerClick)

			//when mouse is clicked down that specific tile is active
			.on('mousedown', '[data-tile]', function(){
				$(this).addClass('active');

			})

			//when mouse button goes up the active class is removed
			.on('mouseup', '[data-tile]', function(){
				$(this).removeClass('active');
			});

		$('[data-tile]').addClass('hoverable');
	}

	//event handlers are removed when user is not clicking on something
	function deactivateBoard() {
			$('.simonSaysGame')
				.off('click', '[data-tile]')
				.off('mousedown', '[data-tile]')
				.off('mouseup', '[data-tile]');

			$('[data-tile]').removeClass('hoverable');
		}

	//when user clicks on tile it is registered, checkLose function is called to see if it was correct or not
	function registerClick(e) {
		var desiredResponse = copy.shift();
		var actualResponse = $(e.target).data('tile');
		active = (desiredResponse === actualResponse);
		checkLose();
	}

	//function checks users clicks to see if they are correct
	function checkLose() {
		// copy array will be empty when user has successfully completed sequence
		if (copy.length === 0 && active) {
			deactivateBoard();
			newRound();

		} else if (!active) { // user lost
			deactivateBoard();
			endGame();
		}
	}

	//when game ends this function is called
	function endGame() {
		// notify the user that they lost
		$('p[data-action=lose]').show();
		$($('[data-round]')[0]).text('0');
	}

	//tiles are lit up in sequence where user must select them
	function animate(sequence) {
		var i = 0;
		var interval = setInterval(function() {
			lightUp(sequence[i]);

	        i++;
	        if (i >= sequence.length) {
				clearInterval(interval);
				activateBoard();
	        }
	   }, 600);
	}

	//opacity is 100% when tile is lit up
	function lightUp(tile) {
			$('[data-tile=' + tile + ']').animate({
				opacity: 1
			}, 250, function() {
				//opacity goes back to 40% after 250 milliseconds
				setTimeout(function() {
					$('[data-tile=' + tile + ']').css('opacity', 0.4);
				}, 250);
			});
		
	}

	function randomNumber() {
		// between 1 and 4
		return Math.floor((Math.random()*4)+1);
	}

})();