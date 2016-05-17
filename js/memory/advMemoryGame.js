//Array of images to be used
var adv_memory_array = ['./img/countries/al.png|A', './img/countries/txt_al.png|A',
'./img/countries/ar.png|B', './img/countries/txt_ar.png|B',
'./img/countries/au.png|C', './img/countries/txt_au.png|C', 
'./img/countries/be.png|D','./img/countries/txt_be.png|D',
'./img/countries/br.png|E', './img/countries/txt_br.png|E',
'./img/countries/ca.png|F', './img/countries/txt_ca.png|F', 
'./img/countries/cl.png|G','./img/countries/txt_cl.png|G',
'./img/countries/cn.png|H', './img/countries/txt_cn.png|H',
'./img/countries/co.png|I', './img/countries/txt_co.png|I',
'./img/countries/dk.png|J', './img/countries/txt_dk.png|J',
'./img/countries/eg.png|K', './img/countries/txt_eg.png|K',
'./img/countries/es.png|L', './img/countries/txt_es.png|L',
'./img/countries/fi.png|M', './img/countries/txt_fi.png|M',
'./img/countries/fr.png|N', './img/countries/txt_fr.png|N',
'./img/countries/gb.png|O', './img/countries/txt_gb.png|O',
'./img/countries/gr.png|P', './img/countries/txt_gr.png|P',
'./img/countries/ie.png|Q', './img/countries/txt_ie.png|Q',
'./img/countries/jp.png|R', './img/countries/txt_jp.png|R',
'./img/countries/kr.png|S', './img/countries/txt_kr.png|S',
'./img/countries/us.png|T', './img/countries/txt_us.png|T'];

//Empty array for storing memory values
var adv_memory_values = [];

//Empty array for storing memory tile ids
var adv_memory_tile_ids = [];

//Variable that keeps track of number of tiles flipped
var adv_tiles_flipped = 0;

//Shuffle method added to array objects
Array.prototype.adv_memory_tile_shuffle = function() {
	var i = this.length, j, temp;
	while(--i > 0){
	j = Math.floor(Math.random() * (i+1));
	temp = this[j];
	this[j] = this[i];
	this[i] = temp;
	}
}

//function for generating new board.
function newAdvBoard(){
	//tiles flipped set to 0 each time a new board is generated
	adv_tiles_flipped = 0;
	var adv_output = '';
	//runs the shuffle method on the memory array
	adv_memory_array.adv_memory_tile_shuffle();
	//loops over all the cards and adds all the divs to the output variable. Each div receives an id of dynamic tile number
	for(var i = 0; i < adv_memory_array.length; i++){
		adv_output += '<div id = "adv_tile_ ' + i + '" onclick = "advMemoryFlipTile(this,\'' + adv_memory_array[i] + '\')"></div>';
	}
	document.getElementById('adv_memory_board').innerHTML = adv_output;
}
	//function used to flip the tiles over.
	function advMemoryFlipTile(advTile,advValue){
		//split method used to split the "|" (extra parameter) from the file names in the array
		var adv_values = advValue.split("|");
		//check to see if tile and length of memory value is less than 2, code below runs if the if condition is true
	if(advTile.innerHTML == "" && adv_memory_values.length < 2){
		//the background of the tile is changed to the image
		advTile.style.background = 'url('+adv_values[0]+')';
		//checks to see if the length of memory_values is 0
		if(adv_memory_values.length == 0){
			//sets new value for the tile that the use is clicking
			adv_memory_values.push(adv_values[1]);
			adv_memory_tile_ids.push(advTile.id);
			//if there is one tile flipped over the 'else' condition runs
		} else if(adv_memory_values.length == 1){
			//the new value is pushed into the memory values array
			adv_memory_values.push(adv_values[1]);
			adv_memory_tile_ids.push(advTile.id);
			//if the cards are a match
			if(adv_memory_values[0] == adv_memory_values[1]){
				//add 2 to the tiles flipped variables and the tiles stay flipped over
				adv_tiles_flipped += 2;
				// Clear both arrays
				adv_memory_values = [];
            	adv_memory_tile_ids = [];
				// Check to see if tiles_flipped value is the same as the memory_array value
				if(adv_tiles_flipped == adv_memory_array.length){
					
					alert("Congrats!");
					//clear the memory_board
					document.getElementById('adv_memory_board').innerHTML = "";
					//generate new board
					newAdvBoard();
					//timer resets to 0:00
					resetTimer();
					}
				
			} else {
				//if two tiles do not match
				function advFlip2Back(){
				    // Flip the 2 tiles back over
				    var advTile_1 = document.getElementById(adv_memory_tile_ids[0]);
				    var advTile_2 = document.getElementById(adv_memory_tile_ids[1]);
					//sets the background of the two tiles
				    advTile_1.style.background = 'url(./img/logo/rect-logo2.gif) no-repeat';
            	    advTile_1.innerHTML = "";
				    advTile_2.style.background = 'url(./img/logo/rect-logo2.gif) no-repeat';
					advTile_2.innerHTML = "";
				    // Clear both arrays
				    adv_memory_values = [];
            	    adv_memory_tile_ids = [];
				}
				setTimeout(advFlip2Back, 700);
			}
		}
	}
}


