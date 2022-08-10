
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameLevel = 0;
var gameStarted = false;


$(document).keydown(function(event){
  if (event.keyCode === 13) {
    if (!gameStarted) {

      setTimeout (function() {
        $("#level-title").text("Level " + gameLevel);
        nextSequence();
        gameStarted = true;
      }, 100);
    
    }
  }
});

$(".btn").click(function(){

  if (gameStarted) {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
  } else {
    console.log(gameStarted); 
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Please press enter to play.");

  }
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success.");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() { 
        nextSequence();
      }, 1000);
    }

  } else {

    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game over. Press enter to try again.");

    startOver();
    
  }
}


function nextSequence(){
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

 
  gameLevel++;
  $("#level-title").text("Level " + gameLevel);
  

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  var currentButton = $("." + currentColor);
  currentButton.addClass("pressed");

  setTimeout(function() {
    currentButton.removeClass("pressed");
  }, 150);
}


function startOver(){

  gameLevel = 0;
  gamePattern = [];
  gameStarted = false;
}













