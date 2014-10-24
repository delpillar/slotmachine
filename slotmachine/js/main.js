

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
var canvasImage4;
var canvasImage5;
var canvasImage6;
var canvasImage7;
var canvasImage8;
var canvasImage9;
var images;
var stage;
var sources;
var background;
var canvasBG;
var canvasLogo;
var message;
var moneyText;
var betText;
var winningsText;
var shape;
var arraySource;
var spiderLogo;
var logoText;

//initialize images, shapes, easeljs and createjs functions
function init() {

    //image sources
    sources = {
        blank: "img/blank.jpg",
        mangaSpiderman: "img/mangaSpider.png",
        houseofMSpiderman: "img/houseofMspiderman.png",
        lastStandSpiderman: "img/laststandspiderman.png",
        electroProofSpiderman: "img/electroProof.png",
        bulletProofSpiderman: "img/bulletProofSpiderman.png",
        armoredSpiderman: "img/spider-armor.png",
        battlewornSpiderman: "img/battlewornSpider.png"
    };
    
    bgSource = {
        background: "img/background2.jpg",
        logo: "img/logo.gif"
    }
    //initialize easel canvas and images.
    $('#slotCanvas').css('background-color', 'rgba(0, 0, 0, 0.9)');
    canvas = document.getElementById("slotCanvas");
    canvas.width = 1280;
    canvas.height = 1000;
    stage = new createjs.Stage(canvas);

    //instantiate canvas images
    canvasImage1 = new Image();
    canvasImage2 = new Image();
    canvasImage3 = new Image();
    canvasImage4 = new Image();
    canvasImage5 = new Image();
    canvasImage6 = new Image();
    canvasImage7 = new Image();
    canvasImage8 = new Image();
    canvasImage9 = new Image();
    background = new Image();
    spiderLogo = new Image();

    //preload blank images at start of game
    loadImages(sources, function () {
        drawBitmap(sources.blank, sources.blank, sources.blank);
        drawTopImage(sources.blank, sources.blank, sources.blank);
        drawBottomImage(sources.blank, sources.blank, sources.blank);
    });
    background.src = bgSource.background;
    canvasBG = new createjs.Bitmap(background);
    canvasBG.x = 0;
    canvasBG.y = 0;
    canvasBG.scaleX = 0.8;
    canvasBG.scaleY = 0.8;

    spiderLogo.src = bgSource.logo;
    canvasLogo = new createjs.Bitmap(spiderLogo);
    canvasLogo.x = canvas.width/4 + 80; 
    canvasLogo.y = 35;

    message = new createjs.Text();
    moneyText = new createjs.Text();
    betText = new createjs.Text();
    winningsText = new createjs.Text();
    logoText = new createjs.Text();

    drawText();

    stage.addChild(canvasBG);
    stage.addChild(shape);
    stage.addChild(message);
    stage.addChild(moneyText);
    stage.addChild(betText);
    stage.addChild(winningsText);   
    stage.addChild(canvasLogo);
    stage.addChild(logoText);
    stage.update();
};


createjs.Ticker.addEventListener("tick", handleTick);
function handleTick(event) {
    drawText(); //draw text updates to correspond bet events and spin events.
    stage.update();
}

// function to preload images before drawing on canvas.
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;

    //get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}
function drawText() {


    logoText.font = "bold 78px Impact";
    logoText.color = "#ffaf00";
    logoText.text = "SLOT MACHINE";
    logoText.x = 600;
    logoText.y = 250;
    logoText.textBaseline = "alphabetic";

    message.font = "bold 78px Dorsa";
    message.color = "#ffffff";
    message.text = "Jackpot: " + jackpot;
    message.x = 750;
    message.y = 400;
    message.textBaseline = "alphabetic";

    moneyText.font = "bold 52px Dorsa";
    moneyText.color = "#ffffff";
    moneyText.text = "Player Money: $" + playerMoney;
    moneyText.x = message.x;
    moneyText.y = message.y + 110;
    moneyText.textBaseline = "alphabetic";

    betText.font = "bold 52px Dorsa";
    betText.color = "#ffffff";
    betText.text = "Player Bet: $" + playerBet;
    betText.x = message.x;
    betText.y = moneyText.y + 110;
    betText.textBaseline = "alphabetic";

    winningsText.font = "bold 52px Dorsa";
    winningsText.color = "#ffffff";
    winningsText.text = "Winnings: $" + winnings;
    winningsText.x = message.x;
    winningsText.y = betText.y + 110;
    winningsText.textBaseline = "alphabetic";

    shape = new createjs.Shape();
    shape.graphics.beginFill("#191301").drawRect(message.x - 10, message.y - 78, 500, 100);
    shape.graphics.beginFill("#191301").drawRect(moneyText.x - 10, moneyText.y - 78, 500, 100);
    shape.graphics.beginFill("#191301").drawRect(betText.x - 10, betText.y - 78, 500, 100);
    shape.graphics.beginFill("#191301").drawRect(winningsText.x - 10, winningsText.y - 78, 500, 100);
    shape.graphics.beginStroke("#ffffff").drawRect(50, 280, 660, 540);


}
//draws images on canvas; called when spin button is clicked.
function drawBitmap(img1, img2, img3) {
    
    canvasImage1.src = img1;
    canvasImage2.src = img2;
    canvasImage3.src = img3;
    
    var image1 = new createjs.Bitmap(canvasImage1);
    var image2 = new createjs.Bitmap(canvasImage2);
    var image3 = new createjs.Bitmap(canvasImage3);
    var line = new createjs.Shape();

    line.graphics.beginFill("#a91919").drawRect(50, 275*2, 660, 10);

    stage.addChild(image1);
    image1.scaleX = 0.5;
    image1.scaleY = 0.5;
    image1.x = 60;
    image1.y = 430;
    stage.addChild(image2);
    image2.scaleX = 0.5;
    image2.scaleY = 0.5;
    image2.x = image1.x + 250;
    image2.y = image1.y;
    stage.addChild(image3);
    image3.scaleX = 0.5;
    image3.scaleY = 0.5;
    image3.x = image2.x + 250;
    image3.y = image1.y;
    stage.addChild(line);
    loadImages(sources, function (images) {
        stage.update();
    });
}
function drawTopImage(img4,img5,img6) {

    canvasImage4.src = img4;
    canvasImage5.src = img5;
    canvasImage6.src = img6;

    var image4 = new createjs.Bitmap(canvasImage4);
    var image5 = new createjs.Bitmap(canvasImage5);
    var image6 = new createjs.Bitmap(canvasImage6);

    image4.sourceRect = new createjs.Rectangle(0,canvasImage4.height/2,canvasImage4.width,canvasImage4.height/2);
    image5.sourceRect = new createjs.Rectangle(0,canvasImage4.height/2,canvasImage4.width,canvasImage4.height/2);
    image6.sourceRect = new createjs.Rectangle(0,canvasImage4.height/2,canvasImage4.width,canvasImage4.height/2);

    stage.addChild(image4);
    image4.scaleX = 0.5;
    image4.scaleY = 0.5;
    image4.x = 60;
    image4.y = 300;
    stage.addChild(image5);
    image5.scaleX = 0.5;
    image5.scaleY = 0.5;
    image5.x = image4.x + 250;
    image5.y = image4.y;
    stage.addChild(image6);
    image6.scaleX = 0.5;
    image6.scaleY = 0.5;
    image6.x = image5.x + 250;
    image6.y = image4.y;

    loadImages(sources, function (images) {
        stage.update();
    });
}

function drawBottomImage(img7, img8, img9) {
    console.log(img7, img8, img9);
    canvasImage7.src = img7;
    canvasImage8.src = img8;
    canvasImage9.src = img9;

    var image7 = new createjs.Bitmap(canvasImage7);
    var image8 = new createjs.Bitmap(canvasImage8);
    var image9 = new createjs.Bitmap(canvasImage9);

    image7.sourceRect = new createjs.Rectangle(0,0,canvasImage4.width,canvasImage4.height/2);
    image8.sourceRect = new createjs.Rectangle(0,0,canvasImage4.width,canvasImage4.height/2);
    image9.sourceRect = new createjs.Rectangle(0,0,canvasImage4.width,canvasImage4.height/2);

    image7.scaleX = 0.5;
    image7.scaleY = 0.5;
    image7.x = 60;
    image7.y = 680;
    image8.scaleX = 0.5;
    image8.scaleY = 0.5;
    image8.x = image7.x + 250;
    image8.y = image7.y;
    image9.scaleX = 0.5;
    image9.scaleY = 0.5;
    image9.x = image8.x + 250;
    image9.y = image7.y;

    stage.addChild(image7);
    stage.addChild(image8);
    stage.addChild(image9);

    loadImages(sources, function (images) {
        stage.update();
    });
}


function topImage() {
    spinResult = BottomTopReels();
    drawTopImage(spinResult[0],spinResult[1],spinResult[2])    
}

function bottomImage() {
    spinResult = BottomTopReels();
    drawBottomImage(spinResult[0], spinResult[1], spinResult[2])
}

function showPlayerStats()
/* Utility function to show Player Stats */
{
    winRatio = winNumber / turn;

    console.log("Jackpot: " + jackpot);
    console.log("Player Money: " + playerMoney);
    console.log("Wins: " + winNumber);
    console.log("Losses: " + lossNumber);
    console.log("Win Ratio: " + winRatio * 100 + "%");
    console.log("Player bet: " + playerBet);

    console.log(sources.blank);
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
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    winnings = 0;
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
function BottomTopReels() {




    var reelImage = [" ", " ", " "];
    var outcome = [0, 0, 0];
    for (var spin = 0; spin < 3; spin++) {
        outcome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outcome[spin]) {
            case checkRange(outcome[spin], 1, 27):  // 41.5% probability
                reelImage[spin] = "img/blank.jpg";
                break;
            case checkRange(outcome[spin], 28, 37): // 15.4% probability
                reelImage[spin] = "img/mangaSpider.jpg";
                break;
            case checkRange(outcome[spin], 38, 46): // 13.8% probability
                reelImage[spin] = "img/mangaSpider.jpg";
                break;
            case checkRange(outcome[spin], 47, 54): // 12.3% probability
                reelImage[spin] = "img/laststandspiderman.png";
                break;
            case checkRange(outcome[spin], 55, 59): //  7.7% probability
                reelImage[spin] = "img/electroProof.png";
                break;
            case checkRange(outcome[spin], 60, 62): //  4.6% probability
                reelImage[spin] = "img/bulletProofSpiderman.png";
                break;
            case checkRange(outcome[spin], 63, 64): //  3.1% probability
                reelImage[spin] = "img/spider-armor.png";
                break;
            case checkRange(outcome[spin], 65, 65): //  1.5% probability
                reelImage[spin] = "img/battlewornSpider.png";
                break;
        }
    }
    return reelImage
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
                betImage[spin] = sources.blank;
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                grapes++;
                betImage[spin] = sources.mangaSpiderman;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                bananas++;
                betImage[spin] = sources.houseofMSpiderman;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                oranges++;
                betImage[spin] = sources.lastStandSpiderman;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betImage[spin] = sources.electroProofSpiderman;
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betImage[spin] = sources.bulletProofSpiderman;
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betImage[spin] = sources.armoredSpiderman;
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betImage[spin] = sources.battlewornSpiderman;
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
    //drawText();
});
$("#bet10").click(function () {
    playerBet += 10;
    showPlayerStats();
    //drawText();
});
$("#bet50").click(function () {
    playerBet += 50;
    showPlayerStats();
    //drawText();
});
$("#resetBet").click(function () {
    playerBet = 0;
    showPlayerStats();
    //drawText();
});
$("#betAll").click(function () {
    playerBet = playerMoney;
    showPlayerStats();
    //drawText();
});

/* When the player clicks the spin button the game kicks off */
$("#spinButton").click(function () {
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
            playerBet = playerMoney; //changes the bet to whatever money the player has left.
        }
        else if (playerBet < 0) {
            alert("All bets must be a positive $ amount.");
        }
        else if (playerBet <= playerMoney) {
            spinResult = Reels();
            
            fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
            console.log("initial fruits");
            $("div#result>p").text(fruits);
            determineWinnings();
            
            turn++;
            showPlayerStats();
            drawBitmap(spinResult[0], spinResult[1], spinResult[2]);
            topImage();
            bottomImage();
            drawText();
        }
        else {
            alert("Please enter a valid bet amount");
        }
    }
});

$("#quitButton").click(function(){
    open(location, '_self').close();
});