/*global $, jQuery, alert*/
/*jslint node: true */
"use strict";
var answerSummary = "<h1><u>Answer Summary</u></h1>",
    currentHover = "",
    correctAnswerIndex = 0,
    minutes = 0,
    mp4Vid = document.getElementById('mp4Source'),
    player = document.getElementById('video'),
    previousClick,
    score = 0,
    seconds = 0,
    userGuess = -1;

var solution = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

var thumbDef = [20];
thumbDef[0] = "0";
thumbDef[1] = "1";
thumbDef[2] = "2";
thumbDef[3] = "3";
thumbDef[4] = "4";
thumbDef[5] = "5";
thumbDef[6] = "6";
thumbDef[7] = "7";
thumbDef[8] = "8";
thumbDef[9] = "9";
thumbDef[10] = "10";
thumbDef[11] = "11";
thumbDef[12] = "12";
thumbDef[13] = "13";
thumbDef[14] = "14";
thumbDef[15] = "15";
thumbDef[16] = "16";
thumbDef[17] = "17";
thumbDef[18] = "18";
thumbDef[19] = "19";

var videoLinks = [20];

videoLinks[0] = "137438558";
videoLinks[1] = "137438559";
videoLinks[2] = "137438830";
videoLinks[3] = "137438831";
videoLinks[4] = "137438832";
videoLinks[5] = "137438834";
videoLinks[6] = "137438835";
videoLinks[7] = "137438917";
videoLinks[8] = "137438918";
videoLinks[9] = "137438919";
videoLinks[10] = "137438920";
videoLinks[11] = "137438921";
videoLinks[12] = "137786713";
videoLinks[13] = "137786714";
videoLinks[14] = "137786718";
videoLinks[15] = "137786719";
videoLinks[16] = "137786720";
videoLinks[17] = "137787101";
videoLinks[18] = "137787103";
videoLinks[19] = "137787102";

function lessThanTen(number) {
    if (number >= 10) {return number; } else {return "0" + number; }
}

function updateTimer() {
    seconds = seconds + 1;
    if (seconds === 60) {
        seconds = 0;
        minutes = minutes + 1;
    }
    $("#timer span").text(lessThanTen(minutes) + ":" + lessThanTen(seconds));
}

function checkCorrectAnswer(guess) {
    if (guess === solution[correctAnswerIndex]) {
        return true;
    } else {
        return false;
    }
}

function displayScorePage() {
    $(".thumbnails").remove();
    $(".responsive-container").remove();
    $("#sidebar").remove();
    $("#content").append(answerSummary);
    clearInterval(updateTimer);
}

function getButtonName(guessNumber) {
    var htmlElement = "#" + guessNumber + " p";
    return ($(htmlElement).text());
}

function toggleConfirm() {
    $(".popUpButtonLeft").slideToggle("fast");
    $(".popUpButtonRight").slideToggle("fast");
}

function updateScore(point) {
    score = score + point;
    var updatedScore = "Score: " + score;
    document.getElementById("sideSpanScore").innerHTML = updatedScore;
}

function videoLinkMaker(videoId) {
    return '<iframe src=" https://player.vimeo.com/video/' + videoLinks[videoId] + '?autoplay=1&color=eeeeee&title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
}

function getVideo(videoId) {
    $(".responsive-container").append(videoLinkMaker(videoId));
}

$(".desc").click(function () {
    $(previousClick).css('outline', "solid 1px black");
    userGuess = parseInt(this.id, 10);
    getVideo(this.id);
    $("#" + this.id).css('outline', "solid 2px black");
    previousClick = "#" + this.id;
    $('.popUpButtonLeft').hide(0);
    $('.popUpButtonRight').hide(0);
});

$(document).ready(function () {
    $(".desc p").toggle();
});

$('#newArea').on('click', '.desc2', function () {
    getVideo(this.id);
});

$("#selectButton").click(function () {
    toggleConfirm();
    $("#sideSpanScore").css('color', 'white');
});

$(".popUpButtonLeft").click(function () {
    var buttonName = getButtonName(userGuess);
    if (checkCorrectAnswer(userGuess) && userGuess !== -1) {
        updateScore(1);
        correctAnswerIndex = correctAnswerIndex + 1;
        var newDiv = "<div class='desc2' id='" + userGuess + "'><p>" + correctAnswerIndex + ") " + buttonName + "</p></div>";
        answerSummary += newDiv;
        $('#newArea').append(newDiv);
        $("#" + userGuess).fadeOut("slow");
        $("#sideSpanScore").css('color', 'rgb(0, 220, 0)');
        if (correctAnswerIndex === 4) {
            answerSummary += "<h2>" + "Total Time: " + seconds + " seconds" + "</h2>";
            displayScorePage();
        }
        userGuess = -1;
    } else if (userGuess !== -1) {
        updateScore(-1);
        var newDivInc = "<div class='desc2Inc' id='" + userGuess + "'><p>" + buttonName + "</p></div>";
        answerSummary += newDivInc;
        userGuess = -1;
        $("#sideSpanScore").css('color', 'red');
    }
    toggleConfirm();
});

$(".popUpButtonRight").click(function () {
    toggleConfirm();
});

$(".quizStart").click(function () {
    $(".instructionDialogue").toggle();
    $(".clickCover").toggle();
    toggleConfirm();
    $(".desc p").toggle();
    setInterval(updateTimer, 1000);
});