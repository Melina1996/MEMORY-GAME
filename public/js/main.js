//STARTING DISPLAY ONE & SWICTH TO SECOND DISPLAY

let firstStartingSection = document.querySelector("#start-one")

let secondStartingSection = document.querySelector("#start-two")

let btnYes = document.querySelector("#yes")

let btnNo = document.querySelector("#no")

let bothBtns = document.querySelector(".my-btns")

let myH1 = document.querySelector("#start-question")

bothBtns.addEventListener("click",(e)=>{
  if(e.target.id == "yes"){
    firstStartingSection.classList.add("hide")
    secondStartingSection.classList.remove("hide")

  } else if(e.target.id == "no") {
    myH1.innerText = "SEE YOU NEXT TIME!"
    bothBtns.classList.add("hide")
  }
})

//STARTING SREEN SECOND & SWITCH TO THIRD

let emojiBtns = document.querySelectorAll(".emoji")

let thirdStartingSection = document.querySelector("#start-three")

let chosenEmoji

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


letsPlayBtn.addEventListener("click",()=>{
  thirdStartingSection.classList.add("hide")
  gameDisplay.classList.remove("hide")
  score.classList.remove("hide")
  score.querySelector("img").src = chosenEmoji
})


//declaration of variables

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

//all my image-containers

let allContainers = document.querySelectorAll(".my-flip-card-container")

allContainers.forEach(element => {
  element.setAttribute("status","playing")
});

//click on card and turn it

let turnedCards = []

let cardContainer

let imgSrcOne

let imgSrcTwo

let imgContainerOne

let imgContainerTwo

let myCounter = document.querySelector(".my-counter")

let count = 0

let imgOne

let imgTwo

let message = document.querySelector(".message")

let divMessage = document.querySelector(".message-background")

function turnCard(e){
    if(turnedCards.length <= 1){
    cardContainer = e.target.parentElement.parentElement
    cardContainer.classList.add("rotate")
    turnedCards.push(e.target)
      if(turnedCards.length == 2){

        imgOne = turnedCards[0].parentElement.parentElement.querySelector(".img-down")
        imgTwo = turnedCards[1].parentElement.parentElement.querySelector(".img-down")

        imgSrcOne = imgOne.src
        imgSrcTwo = imgTwo.src

        imgContainerOne = turnedCards[0].parentElement.parentElement
     
        imgContainerTwo = turnedCards[1].parentElement.parentElement

        if(imgSrcOne != imgSrcTwo){
          setTimeout(function(){
            imgContainerOne.classList.remove("rotate");
          }, 1500)
          setTimeout(function(){
            imgContainerTwo.classList.remove("rotate");
          }, 1500)

          message.innerText = "KEEP LOOKING"
          divMessage.style.background = "yellow"
          setTimeout(function(){
            message.innerText = "";
          }, 1500)
          setTimeout(function(){
            divMessage.style.background = "white";
          }, 1500)
          
          
          turnedCards = []

        } else{

          imgContainerOne.setAttribute("status","done")
          imgContainerTwo.setAttribute("status","done")

          console.log(imgOne)
          count++
          myCounter.innerText = count

          message.innerText = "BRAVO"
          divMessage.style.background = "yellow"

          setTimeout(function(){
            message.innerText = "";
          }, 1500)
          setTimeout(function(){
            divMessage.style.background = "white";
          }, 1500)
          
          turnedCards = []

        }
      }
    }
}

let myFlipCards = document.querySelectorAll(".my-flip-card")

let myCardContainers = document.querySelectorAll(".my-flip-card-container")

myFlipCards.forEach(element => {
    element.addEventListener("click",(x)=>{
      if(element.querySelector(".my-flip-card-container").getAttribute("status") != "done"){
      turnCard(x)
      } 
  }) 
});

