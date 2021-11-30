// Variable
let minNum, maxNum, winningNum, guessLeft;

// Ui Element
const message = document.querySelector('#message');
const guessForm = document.querySelector('#guess-form');
const guessInput = document.querySelector('#guess-input');
const guessBtn = document.querySelector('#guess-btn');
const guessLeftUi = document.querySelector('#guess-left');
const minNumUI = document.querySelector('#min-num');
const maxNumUI = document.querySelector('#max-num');
const gameMode = document.querySelector("#game-mode");

// Call Main Function
main();

// Create main function
function main(){
    changeGameMode();
    guessLeft = 3;

    // Listen for guess
    guessForm.addEventListener('submit', getGameResult);
    // Listen for play again
    guessForm.addEventListener('mousedown',gameRestart);
    // Listen for game mode
    gameMode.addEventListener('change',changeGameMode);
    
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

    // let mode = gameMode.value
    // console.table({winningNum, maxNum, minNum, mode});
}

// Create gameOver Function
function gameOver(win,msg){
    let color;
    win ? color = 'green' : color = 'red'; // win only taken true of false value
    // Change Css property
    guessInput.hidden = true;
    guessBtn.textContent = "Play Again";
    guessBtn.type = 'button';
    guessBtn.classList.add('play-again');
    guessLeftUi.style.display = 'none';
    guessInput.value = '';
    gameMode.hidden = true;

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
        // Change Css property
        guessInput.hidden = false;
        guessBtn.textContent = "Submit";
        guessBtn.type = 'submit';
        guessLeftUi.style.display = 'block';
        guessLeftUi.textContent = 'You can guess only 3 times!';
        msgDisplay("Type your guessing number","#333");
        changeGameMode();
        guessLeft = 3;
        guessBtn.classList.remove('play-again');
        gameMode.hidden = false;
        // console.log("%c I'm clicked!!","color:red;");
    }
}

// For changing game mode
function changeGameMode(){
    if(gameMode.value === 'medium'){
        setMaxMinVal(11,100);
    }
    else if(gameMode.value === 'hard'){
        setMaxMinVal(101,500);
    }
    else{
        setMaxMinVal(1,10);;
    }
    // console.log("%c I'm change!!"+gameMode.value,"color:red;");
    // let mode = gameMode.value
    // console.table({winningNum, maxNum, minNum, mode});
}

// For Set Game max and min number
function setMaxMinVal(min, max){
    minNum = min;
    maxNum = max;
    winningNum = getRandomNumber(minNum, maxNum);
    minNumUI.textContent = minNum;
    maxNumUI.textContent = maxNum;
}
