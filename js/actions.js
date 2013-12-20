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
	document.getElementById("badGuy1").src = "img/ufo_blue.jpg";
	isBlue = true;
	setTimeout(function(){
		if (!badGuyDead){
			document.getElementById("badGuy1").src = "img/ufo.jpg";
			isBlue = false;
		}
	}, 10000);
	return 3;
};
var prizeActions = [prize1Action, prize2Action, prize3Action];

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

var lifeCheck = function(lives, hit){
	if (lives <= 0){
		clearInterval(moves);
		clearInterval(spaceCheck);
	}
	$("#life" + (lives - 1)).css("visibility", "hidden");
	//(hit ? evalSound('crash') : evalSound('incorrect'));
	var happened = (hit ? "Boom! " : "Wrong! ");
	var	alertText = (lives == 0) ? happened + "You Lose!" : happened + "You have " + lives + (lives > 1 ? " lives" : " life") + " left!";
	//setTimeout(function(){alert(alertText)}, 400);
	spacePos = "00";
	badGuyPos1 = "33";
	setTimeout(function(){
		placeSpaceship(spacePos, "test");
		placeSpaceship(badGuyPos1, "badGuy1");}, 1050);
}

var moveBadGuys = function(id){
	badGuy = (id[6] == 1) ? badGuyPos1 : badGuyPos2;
	moves = [-1, 1];
	badCurRow = Number(badGuy[0]);
	badCurCol = Number(badGuy[1]);
	rowOrCol = Math.floor(Math.random()*2) == 0 ? true : false;
	nextBadRow = rowOrCol ? ((rows + badCurRow + moves[Math.floor(Math.random()*2)])%rows).toString() : badCurRow.toString();
	nextBadCol = !rowOrCol ? ((cols + badCurCol + moves[Math.floor(Math.random()*2)])%cols).toString() : badCurCol.toString();
	placeBadGuy(nextBadRow + nextBadCol, id);
};

var moveSpaceship = function(ufo, id){
	curRow = Number(spacePos[0]);
	curCol = Number(spacePos[1]);
	nextRow = Number(ufo[0]);
	nextCol = Number(ufo[1]);
	var move = setInterval(function(){
		if (curCol < nextCol)
			placeSpaceship(curRow.toString() + (++curCol).toString(), id);
		else if (curCol > nextCol)
			placeSpaceship(curRow.toString() + (--curCol).toString(), id);
		else if (curRow < nextRow)
			placeSpaceship((++curRow).toString() + curCol.toString(), id);
		else if (curRow > nextRow)
			placeSpaceship((--curRow).toString() + curCol.toString(), id);
		else 
			clearInterval(move);
		}, 150);
};

var celebrate = function(){
	setTimeout(function(){
		//evalSound('win');
		$('#game_over').css("visibility", "visible");
		score += (seconds + 10*ten_seconds + 60*minutes + 3600*ten_minutes)*100 + 500*lives;
		var stars = 0
		if (score > 6000)
			stars = 3;
		else if (score > 4000)
			stars = 2;
		else if (score > 2000)
			stars = 1;
		var winner_text = "<span>Game Over</span><br /><span>You Win!</span><br /><br /><span>Time: " + $('#timer').text() + "</span><br /><span>Score: " + score + 
			"</span><br />";

		for (var i = 0; i < stars; i++)
			winner_text += "<span id=\"stars\"> &#9733 </span>"

		$('#game_over').html(winner_text);
}, 200);
}

var spaceCheck = setInterval(function(){
	if (spacePos == badGuyPos1){
		if (!isBlue){
			die();
			lifeCheck(--lives, true);
		}
		else{
			if (!badGuyDead){
				badGuyDead = true;
				chew();
				//evalSound('nom');
				$('#badGuy1').css("visibility", "hidden");
			}
		}
	}
}, 250);

var munchCheck = function(){
	if (gameSongs[$('div#' + spacePos[0] + "r" + spacePos[1]).text()] && lives){
		++numCorrect;
		var current_height = document.getElementById('progress').style.height;
		var current_top = document.getElementById('progress').style.top;
		$('div#' + spacePos[0] + "r" + spacePos[1]).css("color", "#5dfc0a");
		setTimeout(function(){$('div#' + spacePos[0] + "r" + spacePos[1]).text(" ");}, 30);
		$('div#progress').css("top", parseInt(current_top) - progressTotalHeight/numToWin/1.01);
		$('div#progress').css("height", parseInt(current_height) + progressTotalHeight/numToWin);
		var numText = (numToWin == numCorrect) ? "You Win!" : (numToWin - numCorrect + " To Win");
		$('#progress_label').text(numText);
		if (numCorrect == numToWin){
			setCookie("bob", 1, 1);
			celebrate();
		}
	}
	else if (lives > 0){
		$('div#' + spacePos[0] + "r" + spacePos[1]).text("Wrong!");
		$('div#' + spacePos[0] + "r" + spacePos[1]).css("color", "red");
		lifeCheck(--lives);
		die();
	}
	else{
		clearInterval(clock);
		$('#game_over').css("visibility", "visible");
		var winner_text = "Game Over<br /><br />A fatal exception has occurred:<br /><br />You Lose!<br /><br />Score:10000";
		$('#game_over').html(winner_text);
	}
}

onkeydown = function(e){
	curRow = Number(spacePos[0]);
	curCol = Number(spacePos[1]);
	if (e.keyCode == '39'){
		placeSpaceship(curRow.toString() + (++curCol%cols).toString(), "test");
	}
	else if (e.keyCode == '37'){
		placeSpaceship(curRow.toString() + ((cols + --curCol)%cols).toString(), "test");
	}
	else if (e.keyCode == '38'){
		placeSpaceship(((rows + --curRow)%rows).toString() + curCol.toString(), "test");
	}
	else if (e.keyCode == '40'){
		placeSpaceship((++curRow%rows).toString() + curCol.toString(), "test");
	}
	else if (e.keyCode == '13'){
			if (chewable){
			chew();
			//evalSound('nom');
			munchCheck();
		}
	}
	else if (e.keyCode == '32'){
		//evalSound('nom');
		for (var i = 1; i <= 3; i++){
			if ((parseInt($('#test').css("left")) == parseInt($('#prize' + i).css("left"))) && (parseInt($('#test').css("top"))) == parseInt($('#prize' + i).css("top"))){
				chew();
				score += 150;
				$('#prize' + i).css("visibility", "hidden");
				prizeActions[i - 1]();
			}
		}
	}
}