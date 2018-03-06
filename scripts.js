let newGameBtn = document.getElementById('js-newGameButton'),
	pickRock = document.getElementById('js-playerPick_rock'), 
	pickPaper = document.getElementById('js-playerPick_paper'), 
	pickScissors = document.getElementById('js-playerPick_scissors'),
	newGameElem = document.getElementById('js-newGameElement'), 
	pickElem = document.getElementById('js-playerPickElement'), 
	resultsElem = document.getElementById('js-resultsTableElement');

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') }); 
pickPaper.addEventListener('click', function() { playerPick('paper') }); 
pickScissors.addEventListener('click', function() { playerPick('scissors') });

let gameState = 'notStarted', //started // ended 
	player = { 
		name: '', 
		score: 0 
	}, 
	computer = { 
		score: 0 
	};

function setGameElements() { 
	switch(gameState) { 
	case 'started': 
		newGameElem.style.display = 'none'; 
		pickElem.style.display = 'block'; 
		resultsElem.style.display = 'block'; 
	  break; 
	  case 'ended': 
	  	newGameBtn.innerText = 'Play again'; 
	  default: 
		  newGameElem.style.display = 'block'; 
		  pickElem.style.display = 'none'; 
		  resultsElem.style.display = 'none'; 
	} 
}	

setGameElements();

let playerPointsElem = document.getElementById('js-playerPoints'), 
	playerNameElem = document.getElementById('js-playerName'), 
	computerPointsElem = document.getElementById('js-computerPoints');

function newGame() { 
	player.name = prompt("What's your name?", "player's name"); 
	playerNameElem.innerHTML = player.name; 

	if (player.name) { 
		player.score = computer.score = 0; 
		gameState = 'started'; 
		setGameElements(); 
		setGamePoints();  
	} 
}


function getComputerPick() { 
	let possiblePicks = ['rock', 'paper', 'scissors']; 
	return possiblePicks[Math.floor(Math.random()*3)]; 
}

let playerPickElem = document.getElementById('js-playerPick'), 
	computerPickElem = document.getElementById('js-computerPick'), 
	playerResultElem = document.getElementById('js-playerResult'), 
	computerResultElem = document.getElementById('js-computerResult');


function playerPick(playerPick) { 
	let computerPick = getComputerPick(); 

	playerPickElem.innerHTML = playerPick; 
	computerPickElem.innerHTML = computerPick;
	checkRoundWinner(playerPick, computerPick); 
}	

function setGamePoints() { 
	playerPointsElem.innerHTML = player.score; 
	computerPointsElem.innerHTML = computer.score; 
}

function checkRoundWinner(playerPick, computerPick) { 
	playerResultElem.innerHTML = computerResultElem.innerHTML = ''; 

	let winnerIs = 'player'; 

	if (playerPick == computerPick) { 
	winnerIs = 'none'; // remis 
	} else if ( 
		(computerPick == 'rock' && playerPick == 'scissors') || 
		(computerPick == 'scissors' && playerPick == 'paper') || 
		(computerPick == 'paper' && playerPick == 'rock')) { 

		winnerIs = 'computer'; 
	} 

	if (winnerIs == 'player') { 
		playerResultElem.innerHTML = "You win!"; 
		player.score++; 
	} else if (winnerIs == 'computer') { 
		computerResultElem.innerHTML = "Computer wins!"; 
		computer.score++; 
	}
	setGamePoints();
	endGame();
}

function endGame() {
	if (player.score == 10 || computer.score == 10) {
		gameState = 'ended';
		alert('Game over');
		setGameElements();

	}
		
} 