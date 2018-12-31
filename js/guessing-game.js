/*

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

// */

function generateWinningNumber(){
  return Math.floor(Math.random() * 100 + 1);
}

function shuffle(array){
  var m = array.length, t, i;
 // While there remain elements to shuffle…
  while (m) {
   // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
   // And swap it with the current element.
    t = array[m]; // 4th elem
    array[m] = array[i]; // 4th elem = random elem
    array[i] = t; // arr[random elem] = t
 }
 return array;
}

class Game {
  constructor(playersGuess=null) {
    this.playersGuess = playersGuess;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber.call(this);
  }
  difference(){
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  isLower(){
    if(this.playersGuess > this.winningNumber){
      return false;
    }
    return true;
  }
  playersGuessSubmission(num){
    this.playersGuess = num;
    if(this.playersGuess < 1 || this.playersGuess > 100 || isNaN(this.playersGuess)){
      return 'That is an invalid guess.';
    }
    return this.checkGuess.call(this);
  }
  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
      return 'You Win!';
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      return 'You have already guessed that number.';
    }

    this.pastGuesses.push(this.playersGuess);

    if (this.pastGuesses.length === 5) {
      return 'You Lose.';
    }

    if (this.difference() < 10) {
      return 'You\'re burning up!';
    } if (this.difference() < 25) {
      return 'You\'re lukewarm.';
    } if (this.difference() < 50) {
      return 'You\'re a bit chilly.';
    } else {
      return 'You\'re ice cold!';
    }
  }
  provideHint(){
    let arr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()].join(', ');
    arr = `The winning number is one of these numbers " ${arr} "`;
    if(this.pastGuesses.length > 2){
      return shuffle(arr);
    } else {
      return "You can get a hint after your 3rd guess!"
    }
  }
}

function newGame(){
  return new Game();
}

var submitButton = document.getElementById("submitGuess");
var enterGuess = document.getElementById('input');
var hint = document.getElementById('Hint');
var reset = document.getElementById('Reset');
var showGuess = document.getElementsByClassName("output-num");
var gameMessage = document.getElementById('message');

// submitButton.addEventListener("click", submit);
// reset.addEventListener('click', startGame);
//
function play(){
  let game = newGame();

   submitButton.addEventListener('click', function(){
      let guessValue = enterGuess.value;
      enterGuess.value = '';
      gameMessage.innerHTML = game.playersGuessSubmission(guessValue);

      for(let i = 0; i < showGuess.length, i < game.pastGuesses.length; i++){
        showGuess[i].style.fontSize = "xx-large";
        showGuess[i].value = game.pastGuesses[i];
      }
   });

   enterGuess.addEventListener('keypress', function(e){
     var key = e.which || e.keyCode;
      if(key === 13){
        let guessValue = enterGuess.value;
        enterGuess.value = '';
        gameMessage.innerHTML = game.playersGuessSubmission(guessValue);

        for(let i = 0; i < showGuess.length, i < game.pastGuesses.length; i++){
          showGuess[i].style.fontSize = "xx-large";
          showGuess[i].value = game.pastGuesses[i];
        }
      }
   });


   hint.addEventListener('click', function(){
     let getHint = game.provideHint();
     gameMessage.innerHTML = getHint;
     console.log(game.pastGuesses)
   });

   reset.addEventListener('click', function(){
     game = newGame();
     gameMessage.innerHTML = 'Guess a number between 1-100!';
     for(let i = 0; i < showGuess.length; i++){
       showGuess[i].value = '';
     }
   });
}
play();
