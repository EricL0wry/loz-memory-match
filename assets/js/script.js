document.addEventListener("DOMContentLoaded", initialStart);

var cards = [
  "agahnim",
  "eyegore",
  "ganon",
  "gibdo",
  "link",
  "stalfos",
  "sword-soldier",
  "uncle",
  "zelda",
  "agahnim",
  "eyegore",
  "ganon",
  "gibdo",
  "link",
  "stalfos",
  "sword-soldier",
  "uncle",
  "zelda"
];

var firstCardClicked;
var firstCardClasses;
var secondCardClicked;
var secondCardClasses;
var maxMatches = 9;
var maxAttempts = 20;
var matches = 0;
var attempts = 0;
var gamesPlayed = 1;
var accuracy = 20
var score = 0;
var continuousMatches = 0;

var mainContainer = document.getElementById("gameCards");
var modal = document.querySelector(".modal-overlay");
var modalMessage = document.getElementById("modal-message");
var modalImage = document.getElementById("modal-image");
var button = document.getElementById("reset-button");
var heartContainer = document.querySelector(".heart-container");
var magic = document.querySelector(".accuracy");

function initialStart(){
  addEventListeners();
  createCards();
  createHearts();
  shuffleCardArray();
  applyCardFronts();
}

function addEventListeners(){
  mainContainer.addEventListener("click", handleClick);
  button.addEventListener("click", resetGame);
}

function createCards(){
  for (var cardNum = 1; cardNum <= 18; cardNum++) {
    var card = document.createElement("div");
    card.className = "col-2 card";

    var cardFront = document.createElement("div");
    cardFront.className = "card-front";

    var cardBack = document.createElement("div");
    cardBack.className = "card-back";

    card.appendChild(cardFront);
    card.appendChild(cardBack);
    mainContainer.appendChild(card);
  }
}

function createHearts(){
  var heartElements = document.querySelectorAll(".heart");

  if(heartElements.length > 0){
    heartElements.forEach(function (element){
      element.remove();
    });
  }

  for(var heartIndex = 0; heartIndex < maxAttempts/2; heartIndex++){
    var newHeart = document.createElement('div');
    newHeart.className = "heart full";
    heartContainer.appendChild(newHeart);
  }
}

function shuffleCardArray(){
  var currentIndex = cards.length;
  var tempValue, randomIndex;

  while(0 !== currentIndex){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = tempValue;
  }
}

function applyCardFronts(){
  var deck = document.querySelectorAll(".card-front");

  deck.forEach(function (card, index) {
    card.className = "card-front " + cards[index];
  })
}

function handleClick(event) {
  var cardClicked = event.target;

  if(cardClicked.className.indexOf("card-back") === -1){
    return;
  }
  cardClicked.className += " hidden";

  if(!firstCardClicked){
    firstCardClicked = cardClicked;
    firstCardClasses = cardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = cardClicked;
    secondCardClasses = cardClicked.previousElementSibling.className;
    mainContainer.removeEventListener("click", handleClick);
    if(firstCardClasses === secondCardClasses){
      mainContainer.addEventListener("click", handleClick);
      secondCardClicked = firstCardClicked = null;
      matches++;
      attempts++;
      continuousMatches++;
      calculateScore(500);
      displayStats();
      if(matches === maxMatches){
        calculateScore(1025);
        displayStats();
        endGameModal("win");
      }
    } else {
      attempts++;
      maxAttempts--;
      continuousMatches = 0;
      updateLife();
      calculateScore(-200);
      displayStats();
      setTimeout(function(){
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        mainContainer.addEventListener("click", handleClick);
        secondCardClicked = firstCardClicked = null;
      }, 1500);
      if(maxAttempts === 0){
        endGameModal("fail");
      }
    }
  }
}

function updateLife(){
  var halfHeart = document.querySelector(".half");
  var fullHeart = document.querySelector(".full");

  if (halfHeart){
    halfHeart.className = "heart empty";
  } else if (!fullHeart){
    return
  } else {
    var fullHearts = document.querySelectorAll(".full");
    var lastFullHeart = fullHearts[fullHearts.length - 1];

    lastFullHeart.className = "heart half";
  }
}

function displayStats(){
  document.getElementById("games").textContent = gamesPlayed;
  document.getElementById("score").textContent = score;
  adjustMagicMeter(calculateAccuracy(attempts, matches));
}

function calculateAccuracy(attempts, matches){
  if(!attempts){
    return 0;
  }
  accuracy = Math.trunc((matches / attempts) * 100);
  return accuracy;
}

function adjustMagicMeter(accuracy){
  magic.style.height = `${20 + (Math.trunc(accuracy * .8))}%`;
}

function calculateScore(pts){
  var movePts = pts;

  if(continuousMatches >= 2){
    movePts += 250;
  }
  score += movePts;
  if (score <= 0) {
    score = 0;
  }
}

function endGameModal(result){
  if(result === "win"){
    modalMessage.textContent = "You have saved Hyrule! For now...";
    modalImage.className = "modal-win-image";
    button.textContent = "CONTINUE";
  } else if (result === "fail"){
    modalMessage.textContent = "-GAME OVER-";
    modalImage.className = "modal-fail-image";
    button.textContent = "RESTART";
  }

  modal.classList.remove("hidden");
}

function resetGame(){
  attempts = 0;
  matches = 0;
  continuousMatches = 0;
  gamesPlayed++;
  maxAttempts = 20;
  displayStats();
  resetCards();
  createHearts();
  modal.classList.add("hidden");
}

function resetCards(){
  var hiddenCards = document.querySelectorAll(".card-back");
  for(var cardIndex = 0; cardIndex < hiddenCards.length; cardIndex++){
    hiddenCards[cardIndex].classList.remove("hidden");
  }
  shuffleCardArray();
  applyCardFronts();
}
