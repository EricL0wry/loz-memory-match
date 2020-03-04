var firstCardClicked;
var firstCardClasses;
var secondCardClicked;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;

var mainContainer = document.getElementById("gameCards");
mainContainer.addEventListener("click", handleClick);

var modal = document.querySelector(".modal-overlay");

var button = document.getElementById("reset-button");
button.addEventListener("click", resetGame);


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
      displayStats();
      if(matches === maxMatches){
        modal.classList.remove("hidden");
      }
    } else {
      attempts++;
      displayStats();
      setTimeout(function(){
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        mainContainer.addEventListener("click", handleClick);
        secondCardClicked = firstCardClicked = null;
      }, 1500);
    }
  }
}

function displayStats(){
  document.getElementById("games").textContent = gamesPlayed;
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("accuracy").textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches){
  if(!attempts){
    return "0%";
  }
  return (Math.trunc((matches / attempts) * 100)) + "%";
}

function resetGame(){
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  resetCards();
  modal.classList.add("hidden");
}

function resetCards(){
  var hiddenCards = document.querySelectorAll(".card-back");
  for(var cardIndex = 0; cardIndex < hiddenCards.length; cardIndex++){
    hiddenCards[cardIndex].classList.remove("hidden");
  }
}
