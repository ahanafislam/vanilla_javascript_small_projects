// Variable
let minNum, maxNum, winningNum, guessLeft; 
minNum = 1;
maxNum = 10;
winningNum = getRandomNumber(minNum, maxNum);
guessLeft = 3;

// Ui Element
const message = document.querySelector('#message');
const guessForm = document.querySelector('#guess-form');
const guessInput = document.querySelector('#guess-input');
const guessBtn = document.querySelector('#guess-btn');
const guessLeftUi = document.querySelector('#guess-left');
const minNumUI = document.querySelector('#min-num');
const maxNumUI = document.querySelector('#max-num');

// Call Main Function
main();

// Create main function
function main(){
    minNumUI.textContent = minNum;
    maxNumUI.textContent = maxNum;
    // Listen for guess
    guessForm.addEventListener('submit', getGameResult);
    // Listen for play again
    guessForm.addEventListener('click',gameRestart);
    
}

// All Function for game

// Create getGameResult function
function getGameResult(e){
    e.preventDefault();
    const guessNum = parseInt(guessInput.value);

    if(isNaN(guessNum) || guessNum > maxNum || guessNum < minNum){
        msgDisplay(`Please enter a number between ${minNum} and ${maxNum}`,'red');
        guessInput.value = '';
    }

    else{
        if(guessNum === winningNum){
            // Game Over - won
            gameOver(true, `${guessNum} is correct. You Win The Game`);
        }
        else{
            guessLeft -= 1;
    
            if(guessLeft === 0){
                // Game over - lose
                gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
            }
            else{
                msgDisplay(`${guessNum} is not correct`,'#FFFF66');
                guessLeftUi.textContent = `${guessLeft} Guesses left`;
                guessInput.value = '';
            }
        }
    }

    console.table({guessNum, winningNum});
}

// Create gameOver Function
function gameOver(win,msg){
    let color;
    win ? color = 'green' : color = 'red'; // win only taken true of false value
    // Change Css property
    guessInput.style.display = 'none';
    guessBtn.textContent = "Play Again";
    guessBtn.type = 'button';
    guessBtn.classList.add('play-again');
    guessLeftUi.style.display = 'none';

    msgDisplay(msg,color);
}

// Create message display function
function msgDisplay(msg,color){
    message.textContent = msg;
    message.style.color = color;
}

// Generate random number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Game restart
function gameRestart(e){
    if(e.target.classList.contains('play-again')){
        console.log("%c I'm clicked!!","color:red;");
    }
}
