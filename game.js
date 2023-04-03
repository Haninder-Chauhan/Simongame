var buttonColours = ["red", "blue", "green", "yellow"]

// Arrays to store value
var userClickedPattern = []
var gamePattern = []

// Initiating with keyboard
var started = false;
var level = 0

$(document).keypress(function () {

    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true
    }
})

$(document).click(function () {

    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true
    }
})

// User click on button for output
$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

// Computer will generate the sequence of colour
function nextSequence() {
    userClickedPattern = [];
    level++
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)

}

// Animation function
function animatePress(chosenColour) {
    $("." + chosenColour).addClass("pressed");
    setTimeout(() => { $("." + chosenColour).removeClass("pressed") }, 100);
}

// Sound function
function playSound(chosenSound) {
    var audio = new Audio("sounds/" + chosenSound + ".mp3");
    audio.play();
}

// Check answer function
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key or Click to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

// Startover function

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


