// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

function initialPrompt() {
   let newWord = input.question("Let's play some scrabble! Enter a word: ")
   return newWord;
};

let simpleScorer = function (word) {
   word = word.toUpperCase();
   let score = 0;
   for (let i = 0; i < word.length; i ++) {
      score += 1
   }
   return score;
}

console.log(simpleScorer("circle"));

let vowelBonusScorer = function (word) {
   let score = 0;
   let vowel = ['a', 'e', 'i', 'o', 'u', 'y'];
   for (let i = 0; i < word.length; i++)
   if (vowel.includes(word[i])) {
      score += 3;
   } else {
      score += 1;
   }
   return score;
}

//console.log(vowelBonusScorer('circle'));

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let score = 0;

   for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      score += newPointStructure[letter];
   }
   console.log(score);
   return score;
};

const scoringAlgorithms = [ 
     {name: `Simple Score`,
      description: `Each letter is worth 1 point.`,
      scorerFunction: simpleScorer, }, 
     {name: `Bonus Vowels`,
      description: `Vowels are 3 pts, consonants are 1 pt.`,
      scorerFunction: vowelBonusScorer, }, 
     {name: `Scrabble`,
      description: `The traditional scoring algorithm.`,
      scorerFunction: scrabbleScorer, }, 
]

function scorerPrompt() {
   console.log('Which scoring algorithm would you like to use?\n');
   for (let i = 0; i < scoringAlgorithms.length; i++) {
     console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
 
   let choice = input.question('Enter 0, 1, or 2: ');
   while (choice !== '0' && choice !== '1' && choice !== '2') {
     console.log('Invalid input. Please enter 0, 1, or 2.');
     choice = input.question('Enter 0, 1, or 2: ');
   }
 
   return scoringAlgorithms[Number(choice)];
 }
 

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (const points in oldPointStructure) {
      for (let i = 0; i < oldPointStructure[points].length; i ++) {
         newPointStructure[oldPointStructure[points][i].toLowerCase()] = Number(points);
      }
      }
      return newPointStructure
};
 
let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   let scoringAlgorithm = scorerPrompt();
   console.log(`Score for "${word}": ${scoringAlgorithm.scorerFunction(word)}`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
