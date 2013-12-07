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

var prize1Action = function(){
	
	var current_height = document.getElementById('progress').style.height;
	var current_top = document.getElementById('progress').style.top;
	var wrongAnswers = [];
	for (i in games[puzzle].puzzle){
		//console.log(i);
		//console.log(games[puzzle]["puzzle"][i]);
		if(games[puzzle]["puzzle"][i] == 0){ 
			wrongAnswers.push(i);
		}
	}
	for (var k = 0; k < 3; k++){
		var removeWrong = Math.floor(Math.random()*wrongAnswers.length);
		while (!(removeWrong in wrongAnswers)){
			removeWrong = (removeWrong + 1)%wrongAnswers.length;
		}
		for (var i = 0; i < rows; i++){
			for (var j = 0; j < cols; j++){
				if ($('div#' + i + "r" + j).text() == wrongAnswers[removeWrong])
					$('div#' + i + "r" + j).text(" ");
			}
		}
		delete wrongAnswers[removeWrong];
	}
	return 1;
}
var prize2Action = function(){
	//clearInterval(clock);
	clearInterval(blink);
	blinking = false;
	$('#timer').css("visibility", "visible");
	$('#timer').css("color", "#5dfc0a");
	$('#timer').css("background-color", "black");
	setTimeout(function(){
		$('#timer').css("color", "black");
		$('#timer').css("background-color", "#5dfc0a");
	}, 1250);
	setTime(ten_minutes, (minutes += ((ten_seconds + 3) >= 6) ? 1 : 0), Math.floor((ten_seconds + 3)%6), seconds);
	return 2;
};
var prize3Action = function(){
	document.getElementById("badGuy1").src = "ufo_blue.jpg";
	isBlue = true;
	setTimeout(function(){
		if (!badGuyDead){
			document.getElementById("badGuy1").src = "ufo.jpg";
			isBlue = false;
		}
	}, 10000);
	return 3;
};
var prizeActions = [prize1Action, prize2Action, prize3Action];
/*
var addPrizeClickHandler = function(prizeClicks){
	var j = 0;
	for (var i = 0; i < prizeClicks; i++){
		$('#prizeClick' + (i + 1)).click(function(){
			$('div#prize' + (++j)).css("visibility", "visible");
		});
	}
}(3);
*/
$('#prizeClick1').click(function(){
			$('div#prize1').css("visibility", "visible");
		});

$('#prizeClick2').click(function(){
			$('div#prize2').css("visibility", "visible");
		});

$('#prizeClick3').click(function(){
			$('div#prize3').css("visibility", "visible");
		});

var addClickHandler = function(i, j){
	 $('div#' + i.toString() + "r" + j.toString()).click(function(){
		if (spacePos == (i.toString() + j.toString())){
			if (chewable){
				chew();
				//evalSound('nom');
				munchCheck();
			}
		}
		else{
			moveSpaceship(i.toString() + j.toString(), "test");
		}
	});
};

var addDoubleClickHandler = function(i, j){
	$('div#' + i.toString() + "r" + j.toString()).dblclick(function(){
		if (gameSongs[$('div#' + i.toString() + "r" + j.toString()).text()] && lives && i.toString() + j.toString() == spacePos){
			$('div#' + i.toString() + "r" + j.toString()).css("color", "#5dfc0a");
			$('div#' + i.toString() + "r" + j.toString()).text(" ");
			if (++numCorrect == numToWin){
				celebrate();
			}
		}
		else if (i.toString() + j.toString() == spacePos && lives){
		
			$('div#' + i.toString() + "r" + j.toString()).text("Wrong!");
			$('div#' + i.toString() + "r" + j.toString()).css("color", "red");
			lifeCheck(--lives); 
		}
		
			                    										});

};

var stateChange = function(){
	for (var i = 0; i < rows; i++){
		for (var j = 0; j < cols; j++){
			addClickHandler(i, j);
			addDoubleClickHandler(i, j);
		}
	}
};