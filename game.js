
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress("keypress",function(event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    console.log(event.key);
    started = true;
  }
  else{
    var color;
    switch (event.key) {
      case '1':
        color='green';
        detectkey(color);
        break;
        case '2':
          color='red';
           detectkey(color);
          break;
          case '3':
            color='yellow';
            detectkey(color);
            break;
            case '4':
              color='blue';
               detectkey(color);
              break;
    
      default:
        break;
    }
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// document.addEventListener("keypress", function(event){
//   var color;
//   switch (event.key) {
//     case '1':
//       color='green';
//       detectkey(color);
//       break;
//       case '2':
//         color='red';
//         detectkey(color);
//         break;
//         case '3':
//           color='yellow';
//           detectkey(color);
//           break;
//           case '4':
//             color='blue';
//             detectkey(color);
//             break;
  
//     default:
//       break;
//   }
// });

function detectkey(userChosenColour){
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
