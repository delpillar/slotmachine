/// <reference path="jquery.js" />
/// <reference path="easeljs-0.7.1.min.js" />

var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;
var canvas;
var canvasImage1;
var canvasImage2;
var canvasImage3;
var images;
var stage;
var sources;
var background;
var canvasBG;

function init() {

    //image sources
    sources = {
        battlewornSpiderman: "img/battlewornSpider.png",
        bulletProofSpiderman: "img/bulletProofSpiderman.png",
        electroProofSpiderman: "img/electroProof.png",
        houseofMSpiderman: "img/houseofMspiderman.png",
        lastStandSpiderman: "img/laststandspiderman.png",
        mangaSpiderman: "img/mangaSpider.png",
        armoredSpiderman: "img/spider-armor.png",
        blank: "img/blank.jpg",
        background: "img/background2.jpg"
    };
   
    //initialize easel canvas and images.
    $('#slotCanvas').css('background-color', 'rgba(0, 0, 0, 0.9)');
    canvas = document.getElementById("slotCanvas");
    canvas.width = 850;
    canvas.height = 300;
    stage = new createjs.Stage(canvas);

    


    //instantiate canvas images
    canvasImage1 = new Image();
    canvasImage2 = new Image();
    canvasImage3 = new Image();
    background = new Image();

    //preload blank images at start of game
    loadImages(sources, function () {
        drawBitmap(sources.blank, sources.blank, sources.blank);
    });
    background.src = sources.background;
    canvasBG = new createjs.Bitmap(background);
    stage.addChild(canvasBG);
    canvasBG.x = 0;
    canvasBG.y = 0;
    canvasBG.scaleX = 0.4;
    canvasBG.scaleY = 0.4;
    stage.update();
};

// function to preload images before drawing on canvas.
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;

    //get num of sources
    for (var src in sources) {
        numImages++;
    }
    console.log("Num of Images: " + numImages);
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                console.log(loadedImages);
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
    console.log("Loaded Images: " + loadedImages);
}

//draws images on canvas; called when spin button is clicked.
function drawBitmap(img1, img2, img3) {
    
    canvasImage1.src = img1;
    canvasImage2.src = img2;
    canvasImage3.src = img3;
    
    var image1 = new createjs.Bitmap(canvasImage1);
    var image2 = new createjs.Bitmap(canvasImage2);
    var image3 = new createjs.Bitmap(canvasImage3);
    
    stage.addChild(image1);
    image1.scaleX = 0.5;
    image1.scaleY = 0.5;
    image1.x = 20;
    image1.y = 20;
    stage.addChild(image2);
    image2.scaleX = 0.5;
    image2.scaleY = 0.5;
    image2.x = 170;
    image2.y = 20;
    stage.addChild(image3);
    image3.scaleX = 0.5;
    image3.scaleY = 0.5;
    image3.x = 320;
    image3.y = 20;

    loadImages(sources, function (images) {
        stage.update();
    });
    
    
}

function showPlayerStats()
/* Utility function to show Player Stats */
{
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerBets").text("Player bet: $" + playerBet);

    console.log("Jackpot: " + jackpot);
    console.log("Player Money: " + playerMoney);
    console.log("Wins: " + winNumber);
    console.log("Losses: " + lossNumber);
    console.log("Win Ratio: " + winRatio * 100 + "%");
    console.log("Player bet: " + playerBet);
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = 27; //Magic number
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 5000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var outCome = [0, 0, 0];
    var betImage = [" "," ", " "];
    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betImage[spin] = "img/blank.jpg";
                blanks++;
                
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                grapes++;
                betImage[spin] = "img/mangaSpider.jpg";
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                bananas++;
                betImage[spin] = "img/mangaSpider.jpg";
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                oranges++;
                betImage[spin] = "img/laststandspiderman.png";
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betImage[spin] = "img/electroProof.png";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betImage[spin] = "img/bulletProofSpiderman.png";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betImage[spin] = "img/spider-armor.png";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betImage[spin] = "img/battlewornSpider.png";
                sevens++;
                break;
        }
    }
    console.log("Grapes: " + grapes + " Bananas: " + bananas + " Oranges: " + oranges);
    console.log("Cherries: " + cherries + " Bars: " + bars + " Bells: " + bells);
    console.log("Sevens: " + sevens + " Blanks: " + blanks);
    return betImage;
}

/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (blanks == 0)
    {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if(bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else {
            winnings = playerBet * 1;
        }
        
        if (sevens == 1) {
            winnings = playerBet * 5;
        }

        winNumber++;
        showWinMessage();
    }
    else
    {
        lossNumber++;
        jackpot += playerBet;
        showLossMessage();
    }
    
}
/* Adds all values from the bet buttons to the playerBet var */
$("#bet5").click(function () {
    playerBet += 5;
    showPlayerStats();
});
$("#bet10").click(function () {
    playerBet += 10;
    showPlayerStats();
});
$("#bet50").click(function () {
    playerBet += 50;
    showPlayerStats();
});
$("#resetBet").click(function () {
    playerBet = 0;
    showPlayerStats();
});
$("#betAll").click(function () {
    playerBet = playerMoney;
    showPlayerStats();
});

/* When the player clicks the spin button the game kicks off */
$("#spinButton").click(function () {
    //playerBet = $("div#betEntry>input").val();
    if (playerBet == 0 && playerMoney != 0) {
        alert("You don't have any bet!");
    }
    else {
        if (playerMoney == 0) {
            if (confirm("You ran out of Money! \nDo you want to play again?")) {
                resetAll();
                showPlayerStats();
            }
        }
        else if (playerBet > playerMoney) {
            alert("You don't have enough Money to place that bet.");
        }
        else if (playerBet < 0) {
            alert("All bets must be a positive $ amount.");
        }
        else if (playerBet <= playerMoney) {
            spinResult = Reels();
            drawBitmap(spinResult[0],spinResult[1],spinResult[2]);
            fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
            $("div#result>p").text(fruits);
            determineWinnings();
            turn++;
            showPlayerStats();
        }
        else {
            alert("Please enter a valid bet amount");
        }
    }
});
