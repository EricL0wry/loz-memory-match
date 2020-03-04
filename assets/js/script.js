var firstCardClicked;
var firstCardClasses;
var secondCardClicked;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;

var mainContainer = document.getElementById("gameCards");
mainContainer.addEventListener("click", handleClick);

var modal = document.querySelector(".modal-overlay");


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
      if(matches === maxMatches){
        modal.classList.remove("hidden");
      }
    } else {
      setTimeout(function(){
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        mainContainer.addEventListener("click", handleClick);
        secondCardClicked = firstCardClicked = null;
      }, 1500);
    }
  }


}
