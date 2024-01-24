//STARTING DISPLAY ONE & SWITCH TO SECOND DISPLAY

let firstStartingSection = document.querySelector("#start-one")

let secondStartingSection = document.querySelector("#start-two")

let btnYes = document.querySelector("#yes")

let btnNo = document.querySelector("#no")

let bothBtns = document.querySelector(".my-btns")

let myH1 = document.querySelector("#start-question")

//on click of my btns, with "yes", user gets to the next display - current one is hidden by adding the class "hide" and from the next one the class "hide" is removed, with "no", stays
bothBtns.addEventListener("click",(e)=>{
  if(e.target.id == "yes"){
    firstStartingSection.classList.add("hide")
    secondStartingSection.classList.remove("hide")

  } else if(e.target.id == "no") {
    myH1.innerText = "SEE YOU NEXT TIME!"
    bothBtns.classList.add("hide")
  }
})


//SECOND DISPLAY & SWITCH TO THIRD

let emojiBtns = document.querySelectorAll(".emoji")

let thirdStartingSection = document.querySelector("#start-three")

let chosenEmoji

//by click on any of the targeted emojis, the current display gets the class "hide" to disappear and from the next one, the class "hide" is deleted + img-link of my emoji is stored in my image of the third display
emojiBtns.forEach(element => {
  element.addEventListener("click",()=>{
    chosenEmoji = element.querySelector("img").src
    secondStartingSection.classList.add("hide")
    thirdStartingSection.children[0].src = chosenEmoji
    thirdStartingSection.classList.remove("hide")
  })
});


//GAME DISPLAY

let letsPlayBtn = document.querySelector(".play")

let gameDisplay = document.querySelector(".my-container")

let score = document.querySelector(".score")

//on click of my play-btn, the current display disappears and the next one appears (see technique above) 
letsPlayBtn.addEventListener("click",()=>{
  thirdStartingSection.classList.add("hide")
  gameDisplay.classList.remove("hide")
  score.classList.remove("hide")
  score.querySelector("img").src = chosenEmoji
})


//MEMORY GAME


//randomly assign images to my already created Divs in HTML
let allCardsDown = document.querySelectorAll(".img-down")

let allImagesLink = ["./public/assets/img/my-lemon.png","./public/assets/img/my-rainbow.png","./public/assets/img/my-boat.png","./public/assets/img/my-rollerblades.png","./public/assets/img/my-lemon.png","./public/assets/img/my-rainbow.png","./public/assets/img/my-boat.png","./public/assets/img/my-rollerblades.png"]

//stock all the images randomly in my available divs

let indexImg

for (let i = 0; i < allCardsDown.length; i++) {
  //random index to select a random image to put into my div 
  indexImg = Math.floor(Math.random()*allImagesLink.length)
  //my random chosen img
  chosenImg = allImagesLink[indexImg]

  //add the randomly chosen img-link to my div
  allCardsDown[i].src = chosenImg

  //delete my already chosen img-link from my array so no img appears more than twice
  allImagesLink.splice(indexImg,1)
}


//all of my card-containers are assigned the status "playing" --> allows me to later "disactivate" the cards that have been matched

let allContainers = document.querySelectorAll(".my-flip-card-container")

allContainers.forEach(element => {
  element.setAttribute("status","playing")
});


//Turn card & verify if match

//create an array to which I push my clicked cards until it contains 2 elements (because always 2 cards and not more are checked)
let turnedCards = []

let cardContainer

let imgSrcOne

let imgSrcTwo

let imgContainerOne

let imgContainerTwo

let myCounter = document.querySelector(".my-counter")

//create a counter-variable to display the score of my matched pairs
let count = 0

let imgOne

let imgTwo

let message = document.querySelector(".message")

let divMessage = document.querySelector(".message-background")

let lastDisplay = document.querySelector("#end")

//function to turn and verify cards thanks to event targetting
function turnCard(e){

  //if my array of turned cards has not yet 2 elements, it can be turned, the class "rotate" is added to my card container
    if(turnedCards.length <= 1){

      cardContainer = e.target.parentElement.parentElement
      cardContainer.classList.add("rotate")

      //push my targeted and turned card to my array of turned cards
      turnedCards.push(e.target)

      //check whether my array already contains 2 cards
      if(turnedCards.length == 2){

        imgOne = turnedCards[0].parentElement.parentElement.querySelector(".img-down")
        imgTwo = turnedCards[1].parentElement.parentElement.querySelector(".img-down")

        imgSrcOne = imgOne.src
        imgSrcTwo = imgTwo.src

        imgContainerOne = turnedCards[0].parentElement.parentElement
     
        imgContainerTwo = turnedCards[1].parentElement.parentElement

        //if my two images of the two turned cards have different image-links (=>are NOT the same), the cards are turned after 1.5s (setTimeout to delay class-removal)
        if(imgSrcOne != imgSrcTwo){
          setTimeout(function(){
            imgContainerOne.classList.remove("rotate");
          }, 1500)
          setTimeout(function(){
            imgContainerTwo.classList.remove("rotate");
          }, 1500)

          //a message is displayed telling user to keep looking
          message.innerText = "KEEP LOOKING"
          divMessage.style.background = "yellow"

          //with a delay, the message and style disappear again
          setTimeout(function(){
            message.innerText = "";
          }, 1500)
          setTimeout(function(){
            divMessage.style.background = "white";
          }, 1500)
          
          //after each round of 2 cards, I empty my array of turned cards
          turnedCards = []

        } else{

          //if the links of my two images are identical, the respective containers are given the status "done"
          imgContainerOne.setAttribute("status","done")
          imgContainerTwo.setAttribute("status","done")

          //my counter increments by 1 and is displayed for the user
          count++
          myCounter.innerText = count

          //message and stye
          message.innerText = "BRAVO"
          divMessage.style.background = "green"
          message.style.color = "white"

          //remove all the message-styles with a delay 
          setTimeout(function(){
            message.innerText = "";
          }, 1500)
          setTimeout(function(){
            divMessage.style.background = "white";
          }, 1500)
          setTimeout(function(){
            divMessage.style.color = "black";
          }, 1500)
          
          //array with turned cards is emptied 
          turnedCards = []

          //if my count reaches 4 and hence 4 pairs of cards have been matched, the current display is hidden and the last one appears (same technique as earlier)
          if(count == 4){
            setTimeout(function(){
              score.classList.add("hide");
              gameDisplay.classList.add("hide");
              lastDisplay.classList.remove("hide");
              lastDisplay.querySelector("img").src = chosenEmoji;
            }, 1500)
            
          }

        }
      }
    }
}

let myFlipCards = document.querySelectorAll(".my-flip-card")

let myCardContainers = document.querySelectorAll(".my-flip-card-container")

//CALL MY FUNCTION: add event listener to my cards and the function is called IF the card has still status "playing" and can be played
myFlipCards.forEach(element => {
    element.addEventListener("click",(x)=>{
      if(element.querySelector(".my-flip-card-container").getAttribute("status") != "done"){
      turnCard(x)
      } 
    }) 
});




