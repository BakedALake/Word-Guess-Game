// ============================================ VARIABLES ============================================
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
  "The-Many-Adventures-of-Winnie-the-Pooh",
  "Mulan",
  "Moana",
  "CoCo",
  "Toy-Story",
  "Wall-e",
  "Up",
  "Robin-Hood",
  "Lilo-&-Stitch",
  "Dumbo",
  "Monsters-Inc",
  "Princess-and-the-Frog",
  "Mary-Poppins",
  "The-Jungle-Book",
  "Alice-in-Wonderland",
  "Bambi",
  "Pinocchio",
  "101-Dalmatians",
  "A-Goofy-Movie",
  "Hercules",
  "A-Bug's-Life"
];

var answerMovie = [];                 // Store movie name.
var progressArray = [];               // Store guess progression.
var guessesArray = [];                // The array of letters guessed.
var winCnt = 0;                       // Wins tracker.
var lossCnt = 0;                      // Losses tracker.
var guessesCnt = 6;                   // Remaining guesses.
var omdbKey = "&apikey=e6f74d2d";     // API key for omdb.
var omdbURL = "https://www.omdbapi.com/?t=";


// ============================================ FUNCTIONS ============================================
// New game function.
function startGame() {
  // Reset and update elements
  guessesCnt = 6;
  answerMovie = [];
  progressArray = [];
  guessesArray = [];

  // Choose Random Movie.
  answerMovie = movies[Math.floor(Math.random() * 34)];

  // Run make display function
  displayChange(undefined);
} // ====================== End of Function ======================


// Update display function
function displayChange(pressedKey) {
  var isContained = false;
  var isGuessed = false;

  // Check if the pressedKey is not a key. (Start game function passes nothing to just get display).
  // If key is nothing (as in the start function) it will only create the movie display.
  if (pressedKey === undefined) {
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

  // If the key is something do this.
  else {

    // Check to see if key is already guessed in the guessesArray and mark it true.
    for (var i = 0; i < guessesArray.length; i++) {
      if (isGuessed === false) {
        // If found set isGuessed to true.
        if (pressedKey === guessesArray[i]) {
          isGuessed = true;
        }
      }
    }

    // If it's not guessed, push it to guessesArray and set appropriate progress equal to answer.
    if (!isGuessed) {
      guessesArray.push(pressedKey);
      // Check the guess against each letter in the movie answer, if so update the progress and mark isContained as true.
      for (var i = 0; i < answerMovie.length; i++) {
        if (answerMovie[i].toLowerCase() === pressedKey) {
          progressArray[i] = answerMovie[i];
          isContained = true;
        }
      }

      // Check if the guess was wrong, if isContained is false then reduce the guesses.
      if (!isContained) {
        guessesCnt--;
      }
    }
  }

  // Update the display
  $("#wordDisplay").html(progressArray.join(" "));
  $('#guessesDisplay').html(guessesCnt);
  $('#winsDisplay').html(winCnt);
  $('#lossesDisplay').html(lossCnt);
  $('#lettersDisplay').html(guessesArray);
} // ====================== End of Function ======================


// Function for comparing arrays.
function isEqual(array1, array2) {
  var doesPass = true;
  for (var i = 0; i < array1.length; i++) {
    if (array1[i] != array2[i]) {
      doesPass = false;
    }
  }
  return doesPass;
} // ====================== End of Function ======================


// Function for comparing arrays.
function displayMovie(movieName) {
   // API connection code starts here.
   $.ajax({
    url: omdbURL + stringName(movieName) + omdbKey,
    method: "GET"
  }).then(function (response) {
    console.log(movieName);
    console.log(response);

    $("#moviePoster").attr("src",response.Poster);
    $("#moviePoster").show();
    $("#movieTitle").html(stringName(movieName));
    $("#moviePlot").html(response.Plot);
  });
  // API connection code ends here.
} // ====================== End of Function ======================


function stringName(movieName) {
  var newName = "";
  for (var i = 0; i < movieName.length; i++) {
    if (movieName[i] === "-") {
      newName += " ";
    }
    else {
      newName += movieName[i];
    }
  }
  return newName;
}

// ============================================ MAIN PROCESS ============================================

// movies.forEach(function(element){
//   displayMovie(element);
// });

// When the user presses a key run the function.
startGame();
document.onkeypress = function (event) {
  displayChange(event.key);

  if (isEqual(answerMovie, progressArray)) {
    winCnt++;
    // Run last movie result function with answer.
    displayMovie(answerMovie);

    // Start new game!
    startGame();
  }
  else if (guessesCnt < 1) {
    lossCnt++;
    // Run last movie result function with answer.
    displayMovie(answerMovie);

    // Start new game!
    startGame()
  }

}


