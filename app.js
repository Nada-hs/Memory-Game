
// this all icon that will used as cards
const pic = ["fa fa-anchor", "fa fa-bolt", "fa fa-bomb", "fa fa-bicycle",
    "fa fa-cube", "fa fa-diamond", "fa fa-leaf", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-bolt", "fa fa-bomb", "fa fa-bicycle",
    "fa fa-cube", "fa fa-diamond", "fa fa-leaf", "fa fa-paper-plane-o",
];


const list = document.querySelector('#canves');// this is the card bored 
let openMax2 =[];// array that will contains only two selected cards
const matchedCards=[];// array that will contains all matched carss
let movesNum =0;// moves number
let starsNum=3;// stars number
// Timer
let seconds=0;
let minutes=0;
let timerCount;
let timer = document.querySelector(".timer");
const pooUp = document.getElementById("pop-up");


// Shuffle function from http://stackoverflow.com/a/2450976//
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Set up the game board 
let PlayCanves = function (){
// Clear the previous play list
list.innerHTML = "";
// Create menu items contains fa fa icons and connect them to the game board
const cards = document.createElement('ul');
    cards.classList.add('deck');
    let shufCards = shuffle(pic);
    for (let i = 0; i < shufCards.length; i++) {
        const newlist = document.createElement('li');
        newlist.classList.add('card');
        newlist.innerHTML = `<i class="${shufCards[i]}"></i>`;
        cards.appendChild(newlist);
    }
    list.append(cards);
    // Event listener to catch the clicks
    list.addEventListener('click', whenClick);


}
PlayCanves();
restartGame();
startTimer();


//Catch the clicks
function whenClick(e) {
if (openMax2.length<2){
//open the card and to make sure that the card has not been opened before
let pikedcard = e.target;
if (pikedcard.classList.contains("card") &&
!pikedcard.classList.contains("open", "show", "match", "notmatch")) {
pikedcard.classList.add("open", "show");
//push card in to the array
openMax2.push(pikedcard);
if (openMax2.length==2){
     checkCards();

}
}
}
}


function checkCards(){
// check the arry if it is contains two cards &&  the cards are matched or not 
	if (openMax2.length==2 && openMax2[0].innerHTML === openMax2[1].innerHTML){
    openMax2[0].classList.add("match");
    openMax2[1].classList.add("match");
    matchedCards.push(openMax2[0]);
    matchedCards.push(openMax2[1]);
    openMax2=[];
   
	}
//if it is not matched this action will take place
    else if (openMax2[0].innerHTML !== openMax2[1].innerHTML){
    openMax2[0].classList.add("notmatch");
    openMax2[1].classList.add("notmatch");
        setTimeout(function(){
        openMax2[0].classList.remove("show", "open","notmatch");
        openMax2[1].classList.remove("show", "open","notmatch");
        openMax2 = [];
    
      
    },600);

}   
    movesNum+=1;
    Rating();
    opendCards();
    document.querySelector('.restart').addEventListener("click",restartGame);//to restart the game
    document.querySelector('.btn-endBoxRestart').addEventListener("click",restartGame);// btm of dialog to restart the game when player win

} 

// To check if the all cards are opened
function opendCards(){
setTimeout(function(){
if ( matchedCards.length===16&& openMax2.length===0){
 showEndBox();
}
},500);


}
// stars number according to moves 
function Rating(){
if(movesNum<12){
    starsNum=3;
   
} else if (movesNum<17){
    starsNum=2;
} else {
    starsNum=1;
}
updateMoves();
}

// Start Timer
function startTimer() {
    if (!timerCount){
       timerCount= setInterval(function () {
       seconds+=1;
    if (seconds >= 60) {
        seconds = 0;
        minutes+=1;
        } 
        let secondsOutput="";
        let minutesOutput="";

        if (seconds<10){
            secondsOutput="0"+seconds;
        } else{
            secondsOutput=seconds;
        }
        if (minutes<10){
            minutesOutput="0"+minutes;
        } else{
            minutesOutput=minutes;
        }

       timer.innerHTML= `🕐 `+`${minutesOutput} `+":"+` ${secondsOutput}`;
    },1000); 
}}
// Start Timer
function stopTimer(){
    clearInterval(timerCount);
    timerCount=null;
}

// reset moves and stars 
function updateMoves(){
    const movesE=document.querySelector(".moves");
    movesE.innerText=movesNum;
    const starsE=document.querySelector(".stars");
    starsE.innerHTML = "";
    starsE.classList.add('stars');
    for (let i = 0; i < starsNum; i++) {
        let rate = "<li><i class='fa fa-star'></i> </li>";
        starsE.innerHTML+=rate;
    }

     startTimer();// to take action when the user restart the game
}

// End game message
function showEndBox(){
pooUp.style.display = 'block';
stopTimer();
winTime = timer.innerHTML;
let dialog = document.querySelector('#pop-up');
document.querySelector(".endBoxMoves").innerText=movesNum;
document.querySelector(".endBoxRating").innerText=starsNum;
document.querySelector(".endBoxTime").innerText=winTime;

}

// Restart the game
function restartGame(){
        closeEndBox();
        seconds=-1;
        minutes=0;
        movesNum=0;
        starsNum=3;
        openMax2 =[];
        PlayCanves();
        updateMoves();
        

}

function closeEndBox(){
    pooUp.style.display = 'none';
}


