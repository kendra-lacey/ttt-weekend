/*-------------------------------- Constants --------------------------------*/
//  Define the required constants

// In a constant called `winningCombos` define the eight possible winning 
// combinations as an array of arrays.
const winningCombos = [
  [0, 1, 2], // top row horizontal
  [3, 4, 5], // middle row horizontal
  [6, 7, 8], // bottom row horizontal
  [0, 3, 6], // left column vertical
  [1, 4, 7], // middle column vertical
  [2, 5, 8], // right column vertical
  [0, 4, 8], // left-to-right diagonal
  [2, 4, 6] // right-to-left diagonal
]


/*---------------------------- Variables (state) ----------------------------*/
//  Define the required variables used to track the state of the game

// ) Use a variable named `board` to represent the state of the squares on
//     the board.

//  Use a variable named `turn` to track whose turn it is.

//  Use a variable named `winner` to represent if anyone has won yet.

//  Use a variable named `tie` to represent if the game has ended in a tie.
let board, turn, winner, tie

/*------------------------ Cached Element References ------------------------*/
//  - Store cached element references.

//  In a constant called `squareEls`, store the nine elements 
//    representing the squares on the page.

//  In a constant called `messageEl`, store the element that displays the 
//    game's status on the page.
//  Attach an event listener to the game board

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')


/*----------------------------- Event Listeners -----------------------------*/
document.querySelector('.board').addEventListener('click', handleClick)

document.getElementById("reset").addEventListener('click', reset)


/*-------------------------------- Functions --------------------------------*/

//  - Upon loading, the game state should be initialized, and a function should be called to render this game state.

//  Create a function called `init`.
//  Call this `init` function when the app loads.
//  Set the `board` variable to an array containing nine `null`s to 
//    represent empty squares.
//  Set the `turn` to `1` - which will represent player X.
//  Set the `winner` to false.
//  Set `tie` to false.
//  Call a function called `render` at the end of the `init` function.

function init(){
  console.log("Called init()")
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = false;
  tie = false;
  render()
}
//  - The state of the game should be rendered to the user

//  Create a function called `render`, then set it aside for now.
//  Invoke both the `updateBoard` and the `updateMessage` functions
// inside of your `render` function.
function render(){
  updateBoard()
  messageEl.classList.remove('animate__animated', 'animate__heartBeat')
  updateMessage()
}

//  Create a function called `updateBoard`.

//  In the `updateBoard` function, loop over `board` and for each element:
// - Use the current index of the iteration to access the corresponding 
//   square in the `squareEls` array.
// - Style that square however you wish, dependent on the value  
//   contained in the current cell being iterated over (`-1`, `1`, or
//   `null`). To keep it simple, start with just putting a letter in 
//    each square depending on what the the value of each cell is.
function updateBoard(){
  // console.log("Called updateBoard()")
  board.forEach((element, index) => {
    if (element === 'x'){
      squareEls[index].textContent = '🐈' 
    }else if (element === 'o'){
      squareEls[index].textContent = '🐈‍⬛'
    } else {
      squareEls[index].textContent = ''
    }
  });
}
//  Create a function called `updateMessage`

//  In the `updateMessage` function, render a message based on the 
// current game state:
// - If both `winner` and `tie` have a value of false (meaning the game 
//   is still in progress), render whose turn it is.
// - If `winner` is false, but `tie` is true, render a tie message.
// - Otherwise, render a congratulatory message to the player that has 
//   won.
function updateMessage() {
  console.log("Called updateMessage()")
  console.log("Winner:" + winner)
  if(winner === false && tie === false){
    message = `It is player ${turn === 1 ? "🐈": "🐈‍⬛"} 's turn.`
  } else if (winner === false && tie === true){
    message = 'Tie Game aka cats game Mee-OWW 😸'
  } else {
    message = 'Congratulations, player' + turn + ' WON! 🎉'
  }
  messageEl.classList.add('animate__animated', 'animate__heartBeat')
  messageEl.textContent = message
}

//   Handle a player clicking a square with a `handleClick` function
//   Create a function called `handleClick`. It will have an `evt` parameter
//   Obtain the index of the square that was clicked by "extracting" the 
//   index from an `id` assigned to the target element in the HTML. Assign 
//   this to a constant called `sqIdx`.

//  If the `board` has a value at the `sqIdx`, immediately `return`  
//  because that square is already taken. Also, if `winner` is not `null`
//  immediately `return` because the game is over.
function handleClick (evt){ // this runs anytime a single square is clicked
  // console.log("Called Render()")
  const sqIdx = evt.target.id.replace("sq", "")
  if (board[(sqIdx)] !== null) { // if it already has an x or an o in it, do nothing
    console.log("There's already something in that box")
    return // do nothing
  } else if (winner === true) { // if there's already a winner, do nothing
    console.log("winner square")
    return // do nothing
  } else {
    placePiece (sqIdx) //tell placePiece to change the box at this index
    checkForTie()
    checkForWinner()
    switchPlayerTurn()
    render()

    return
  }
}

// Step 6.1 - `placePiece`

//  Create a function named placePiece that accepts an `idx` parameter.
//  Update the `board` array at the `idx` so that it is equal to the 
//       current value of `turn`.

function placePiece (idx){
  console.log("Called placePiece()")
  if(turn === -1){
    board[(idx)] = 'x' // change board at this index to x because it's player 0's turn
  }else if(turn === 1){
    board[(idx)] = 'o' // change board at this index to o because it's player 1's turn
  }
}



// - `checkForTie`

// Create a function named `checkForTie`.
//  Check if the `board` array still contains any `null` elements. If
//  it does, we can leave `tie` as false. Otherwise, set `tie` to true.

function checkForTie(){
  console.log("Called checkForTie()")
  hasNull = false
  board.forEach((sqr) => { //if any of the squares are null, it is not a tie
    if (sqr === null){ //checking if board array contains null elements
      hasNull = true
    }
  })
  if (hasNull === true){
    return
  } else {
    tie = true 
  }
  // if the above foreach runs, and none of the squares are null -- then it is a tie
}

//  - `checkForWinner`
//  Create a function called `checkForWinner`
function checkForWinner(){
  console.log("Called checkForWinner()")
  //loop throughwinningCombos combo = [2,4,6]
  winningCombos.forEach((combo) => { // loop through each of the winning combos. it will do this eight times.
    comboTotal = 0 // will track positions
    combo.forEach((position) => { // this is only going to cycle three times. because each combo only has three elements
      if(board[(position)] === 'x') { // if the board at that location is equal to x
       comboTotal += 1 // add +1 to the tracker
      } else if(board[(position)] === 'o'){ // if the board at that location is equal to o
       comboTotal -= 1 // subtract -1 to the tracker
      }
    })
    // so if we have three x's on the board at the three locations of this winning combo, we would have 3. If we have three o's, the tracker would equal -3. If we have a mix we'd get a different number like -2, -1, 1, 2
    if (comboTotal === 3){
      winner = true
      console.log("x is the winner")
    } else if (comboTotal === -3){
      winner = true
      console.log("o is the winner")
    }
  })
}


//  Determine if a player has won using one of the two options below.
//       Option 1 is a more elegant method that takes advantage of the 
//       `winningCombos` array you wrote above in step 5. Option 2 might 
//       be a little simpler to comprehend, but you'll need to write more 
//       code. This option won't take advantage of the winningCombos array, 
//       but using it as a reference will help you build a solution.
//       Ensure you choose only one path.

//       Option 1) Loop through each of the winning combination arrays 
//       defined in the `winningCombos` array. Total up the three board 
//       positions using the three indexes in the current combo. Convert 
//       the total to an absolute value (convert any negative total to 
//       positive). If the total equals 3, we have a winner, and can set 
//       `winner` to true.

//       Option 2) For each one of the winning combinations you wrote in 
//       step 5, find the total of each winning combination. Convert the 
//       total to an absolute value (convert any negative total to 
//       positive). If the total equals 3, we have a winner, and can set 
//       `winner` to true.


//  - `switchPlayerTurn`

//  Create a function called `switchPlayerTurn`.
function switchPlayerTurn(){
  console.log("Called switchPlayerTurn()")
  console.log("Current Turn: " + turn)
  if (winner === true){
    return
  } else if (winner === false){
      turn = turn * -1
  }
}


//  If `winner` is true, return out of the function - we don’t need 
//       to switch the turn anymore!

// If `winner` is false, change the turn by multiplying `turn` by 
//       `-1` (this flips a `1` to `-1`, and vice-versa).


//  - Tying it all together

//  In our `handleClick` function, call `placePiece`, `checkForTie`, 
//       `checkForWinner`, and `switchPlayerTurn`. Don’t forget that 
//       `placePiece` needs `sqIdx` as an argument! 

// Finally, now that all the state has been updated we need to 
//       render that updated state to the user by calling the `render` 
//       function that we wrote earlier.

// Step 7 - Create Reset functionality

function reset(){
  init()
}

//  Add a reset button to the HTML document.

//  Store the new reset button element as a cached element reference in
//     a constant named `resetBtnEl`.

//  Attach an event listener to the `resetBtnEl`. On the `'click'` event


init()