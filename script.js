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
    previousClickNumber,
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

var longDescr = [20];
longDescr[0] = "Ultrasound the Neck to find target Vein (IJ)";
longDescr[1] = "Sterilize the field (Prep and Drape)";
longDescr[2] = "Assemble the catheter and hard tunneling device for use later (assemble)";
longDescr[3] = "Now that you’re sterile, find the target vein again";
longDescr[4] = "Anesthetize where you want to enter the vein (venous puncture site)";
longDescr[5] = "Make a small cut that the needle and catheter can fit through (dermatotomy site)";
longDescr[6] = "Through the dermatotomy site, puncture the target Vein with your Needle";
longDescr[7] = "Anesthetize the port site";
longDescr[8] = "Make an incision that the port can fit through";
longDescr[9] = "Through the incision, make a subcutaneous pocket for the port to fit";
longDescr[10] = "Take the catheter you assembled before and tunnel it from the port site to the neck";
longDescr[11] = "Take off the syringe you placed before, put wire down to the IVC";
longDescr[12] = "Place a peel away sheath over the wire";
longDescr[13] = "Use fluoro to check that the tip of the catheter is at the Cavoatrial Junction";
longDescr[14] = "Cut the catheter so it ends at the cavoatrial junction";
longDescr[15] = "Connect the port to the properly sized catheter ";
longDescr[16] = "Flush the port with saline";
longDescr[17] = "Make sure that the catheter tip ends at the cavoatrial junction, if it doesn’t then try to readjust";
longDescr[18] = "Suture and Glue the port site closed";
longDescr[19] = "Flush Port with Heparin";

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
    if (this.id !== previousClickNumber) {
        getVideo(this.id);
    }
    $("#" + this.id).css('outline', "solid 2px black");
    previousClick = "#" + this.id;
    $('.popUpButtonLeft').hide(0);
    $('.popUpButtonRight').hide(0);
    previousClickNumber = this.id;
});

$(".desc").dblclick(function () {
    toggleConfirm();
    $("#sideSpanScore").css('color', 'white');
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
        answerSummary += "<h3 style='color:green'>" + correctAnswerIndex + ") " + buttonName + "</h3>";
        $('#newArea').append(newDiv);
        $("#" + userGuess).fadeOut("slow");
        $("#sideSpanScore").css('color', 'rgb(0, 220, 0)');
        if (correctAnswerIndex === 20) {
            answerSummary += "<h3>" + "Total Time: " + seconds + " seconds, " + "Score: " + score + " points" + "</h3>";
            displayScorePage();
        }
        userGuess = -1;
    } else if (userGuess !== -1) {
        updateScore(-1);
        var newDivInc = "<div class='desc2' id='" + userGuess + "'><p>" + buttonName + "</p></div>";
        answerSummary += "<h3 style='color:red'>" + buttonName + "</h3>";
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

$(".desc").hover(function () {
    $(".longDescBox p").text(longDescr[this.id]);
});