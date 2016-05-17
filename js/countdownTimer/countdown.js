//countdown for beginner quiz
var beg_countdown = $("#beg_countdown").countdown360({
	radius:50,
	seconds:10,
	fillStyle:'white',
	strokeStyle:'#5CCDE8',
	fontColor:'#333',
	//false means countdown won't start automatically
	autostart:false,
	//when countdown is finished begGameOver function is called
	onComplete:function () { begGameOver() }
});

//countdown for advanced quiz
var adv_countdown = $("#adv_countdown").countdown360({
	radius:50,
	seconds:10,
	fillStyle:'white',
	strokeStyle:'#5CCDE8',
	fontColor:'#333',
	//false means countdown won't start automatically
	autostart:false,
	//when countdown is finished advGameOver function is called
	onComplete:function () { advGameOver() }
});