//Array of images to be used
var memory_array = ['./img/colors/blue.jpg', './img/colors/blue.jpg', 
'./img/colors/red.jpg', './img/colors/red.jpg', 
'./img/colors/pink.jpg', './img/colors/pink.jpg', 
'./img/colors/black.jpg', './img/colors/black.jpg', 
'./img/colors/orange.jpg', './img/colors/orange.jpg', 
'./img/colors/yellow.jpg', './img/colors/yellow.jpg', 
'./img/colors/purple.jpg', './img/colors/purple.jpg', 
'./img/colors/green.jpg', './img/colors/green.jpg', 
'./img/colors/cyan.jpg', './img/colors/cyan.jpg', 
'./img/colors/grey.jpg', './img/colors/grey.jpg', 
'./img/colors/brown.jpg', './img/colors/brown.jpg', 
'./img/colors/peach.jpg', './img/colors/peach.jpg'];

//Empty array for storing memory values
var memory_values = [];

//Empty array for storing memory tile ids
var memory_tile_ids = [];

//Variable that keeps track of number of tiles flipped
var tiles_flipped = 0;

//Shuffle method added to array objects
Array.prototype.memory_tile_shuffle = function() {
	var i = this.length, j, temp;
	while(--i > 0){
	j = Math.floor(Math.random() * (i+1));
	temp = this[j];
	this[j] = this[i];
	this[i] = temp;
	}
}

//function for generating new board.
function newBoard(){
	//tiles flipped set to 0 each time a new board is generated
	tiles_flipped = 0;
	var output = '';
	//runs the shuffle method on the memory array
	memory_array.memory_tile_shuffle();
	//loops over all the cards and adds all the divs to the output variable. Each div receives an id of dynamic tile number
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id = "tile_ ' + i + '" onclick = "memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
		}
		document.getElementById('beg_memory_board').innerHTML = output;
	}
	
	//function used to flip the tiles over.
	function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && memory_values.length < 2){
		//sets the background of the tile to white
		tile.style.background = '#FFF';
		tile.innerHTML = '<img src = " ' + val + '" />';
		//checks to see if the length of memory_values is 0
		if(memory_values.length == 0){
			//sets new value for the tile that the use is clicking
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			//if there is one tile flipped over the 'else' condition runs
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			//if the cards are a match
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
				
					alert("Congrats!");
					//clear the memory_board
					document.getElementById('beg_memory_board').innerHTML = "";
					//generate new board
					newBoard();
					//timer resets to 0:00
					resetTimer();
				}
			} else {
			//if two tiles do not match
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
					//sets the background of the two tiles
				    tile_1.style.background = 'url(./img/logo/brainy-tile.png) no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(./img/logo/brainy-tile.png) no-repeat';
					tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}