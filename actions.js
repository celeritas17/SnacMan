var chew = function(){
	var top = parseInt($('#test').css('top'));
	setTimeout(function(){ document.getElementById('test').src = 'img/eat/eat2.png';
		$('#test').css('top', (top - 45) + "px");});
	setTimeout(function(){ document.getElementById('test').src = 'img/eat/eat3.png'}, 20);
	setTimeout(function(){ document.getElementById('test').src = 'img/eat/eat4.png'}, 40);
	setTimeout(function(){ document.getElementById('test').src = 'img/eat/eat5.png'}, 60);
	setTimeout(function(){ document.getElementById('test').src = 'img/eat/eat6.png'}, 80);
	setTimeout(function(){ document.getElementById('test').src = 'img/eat/eat5.png'}, 100);
	setTimeout(function(){ document.getElementById('test').src = 'img/eat/eat4.png'}, 120);
	setTimeout(function(){ document.getElementById('test').src = 'img/eat/eat3.png'}, 140);
	setTimeout(function(){ document.getElementById('test').src = 'img/eat/eat2.png'}, 160);
	setTimeout(function(){ document.getElementById('test').src = 'img/eat/eat1.png';
		$('#test').css('top', top + "px");}, 180);
};

var deathFrameTimeout = function(i){
	setTimeout(function(){
		document.getElementById('test').src = 'img/die/die' + (i + 1) + '.png'; 
		$('#test').css('top', (200 + i*30) + "px");
	}, i*50);
};

var die = function(){
	chewable = false;
	setTimeout(function(){
		chewable = true;
	}, 1000);

	for (var i = 0; i < 20; i++){
		deathFrameTimeout(i);
	}
	
	setTimeout(function(){ document.getElementById('test').src = 'img/eat/eat1.png';
		$('#test').css('top', "800px");
	}, 1000);   
};