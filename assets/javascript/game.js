// VARIABLES
// ==========================================================================

// The array of disney movies.
var movies = [
  "Aladdin",
  "Snow-White-and-the-Seven-Dwarfs",
  "Peter-Pan",
  "Lion-King",
  "Frozen",
  "Cinderella",
  "Beauty-and-the-Beast",
  "Ratatouille",
  "The-Little-Mermaid",
  "Sleeping-Beauty",
  "Pete's-Dragon",
  "Fox-and-the-Hound",
  "Sword-in-the-Stone",
  "The-Adventures-of-Winnie-the-Pooh",
  "Mulan",
  "Moana",
  "CoCo",
  "Toy-Story",
  "Wall-e",
  "Up",
  "Robin-Hood",
  "Lilo-and-Stitch",
  "Dumbo",
  "Monsters-Inc",
  "Princess-and-the-Frog",
  "Mary-Poppins",
  "The-Jungle-Book",
  "Alice-in-Wonderland",
  "Bambi",
  "Pinocchio",
  "101-Dalmations",
  "A-Goofy-Movie",
  "Hercules",
  "A-Bug's-Life"
];

var answerMovie = [];
var progressArray = [];
var progressDisplay = "";
var ran;

// The array of letters guessed.
var guessesArray = [];

// Initialize count variables.
var winCnt = 0;
var guessesCnt = 6;

// Blank Line for display, propably removed once CSS is added.
var br1 = document.createElement("br");
var br2 = document.createElement("br");
var br3 = document.createElement("br");

// Choose Random Movie
ran = [Math.floor(Math.random() * 34)];
for (var i = 0; i < movies[ran].length; i++) {
  answerMovie.push(movies[ran][i]);
}

// Create Divs for display.
var displayDiv = document.createElement('winString');
var winString = document.createTextNode("Wins: " + winCnt);
var movieString = document.createTextNode("Current Movie: " + progressArray.join(" "));
var guessString = document.createTextNode("Number of Guesses Remaining: " + guessesCnt);
var guessDisplay = document.createTextNode("Letters Guessed: " + guessesArray);
displayDiv.appendChild(winString);
displayDiv.appendChild(br1);
displayDiv.appendChild(movieString);
displayDiv.appendChild(br2);
displayDiv.appendChild(guessString);
displayDiv.appendChild(br3);
displayDiv.appendChild(guessDisplay);
document.body.insertBefore(displayDiv, document.getElementById("gameArea"));

// FUNCTIONS
// ==============================================================================
// Update function used on keypress.
function updateDisplay(pressedKey) {
  var isContained = false;

  guessesArray.push(pressedKey);
  for (var i = 0; i < answerMovie.length; i++) {
    if (answerMovie[i].toLowerCase() === pressedKey) {
      progressArray[i] = answerMovie[i];
    }
  }

  winString.nodeValue = "Wins: " + winCnt;
  movieString.nodeValue = "Current Movie: " + progressArray.join(" ");
  guessString.nodeValue = "Number of Guesses Remaining: " + guessesCnt;
  guessDisplay.nodeValue = "Letters Guessed: " + guessesArray;

  // Check to remove a guess.
  for (var i = 0; i < answerMovie.length; i++) {
    if (isContained === false) {
      if (pressedKey === answerMovie[i] || pressedKey === answerMovie[i].toLowerCase) {
        isContained = true;
      }
    }
  }

  if (isContained === false) {
    guessesCnt--;
  }
}

// Make Progress Display.
function makeDisplay() {
  for (var i = 0; i < answerMovie.length; i++) {
    if (answerMovie[i] === "-") {
      progressArray.push('-');
    }

    else if (answerMovie[i] === "'") {
      progressArray.push("'");
    }
    else {
      progressArray.push('_');
    }
  }

}

// New game function.
function startGame() {
  // Reset and update elements
  guessesCnt = 6;
  answerMovie = [];
  progressArray = [];
  guessesArray = [];

  // Choose Random Movie.
  answerMovie = movies[Math.floor(Math.random() * 34)];

  makeDisplay();

  winString.nodeValue = "Wins: " + winCnt;
  movieString.nodeValue = "Current Movie: " + progressArray.join(" ");
  guessString.nodeValue = "Number of Guesses Remaining: " + guessesCnt;
  guessDisplay.nodeValue = "Letters Guessed: " + guessesArray;
}

// Function for comparing arrays.
function isEqual(array1, array2) {
  var doesPass = true;
  for (var i = 0; i < array1.length; i++) {
    if (array1[i] != array2[i]) {
      doesPass = false;
    }
  }
  return doesPass;
}

// MAIN PROCESS
// ==============================================================================

// When the user presses a key run the function.
startGame();
document.onkeypress = function (event) {
  updateDisplay(event.key);

  if (isEqual(answerMovie, progressArray)) {
    winCnt++;
    setTimeout(function () { startGame(); }, 5000);
  }
  else if (guessesCnt < 1) {
    for (var i = 0; i < answerMovie.length; i++) {
      progressArray[i] = answerMovie[i];
    }
    setTimeout(function () { startGame(); }, 5000);
  }
}

