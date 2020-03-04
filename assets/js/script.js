var mainContainer = document.getElementById("gameCards");
mainContainer.addEventListener("click", clickHandler);

function clickHandler(event) {
  if(event.target.className.indexOf("card-back") === -1){
    return;
  }
  event.target.className = + " hidden";
}
