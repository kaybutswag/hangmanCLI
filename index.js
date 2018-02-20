var inquirer = require('inquirer');
var Word = require("./word");

var guesses=10;
var guessedArr=[];
var alphabet=genCharArray('a', 'z');
var ThisGame="";

var clues=["lemon","strawberry","kiwi","mango","orange","banana","apple"
          ,"grape","lime","grapefruit","papaya","tomato","blueberry"
          ,"blackberry","rasberry","pineapple","cocount"];
var currentClue="";


//populates letter array
function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}


//this allows user to exit
var Start=function(){
    
    inquirer.prompt([
        {
        type:'confirm',
        message:'Do you want to play hangman?',
        name:'go',
        default:true
        }
    ]).then(function(response){
        if(response.go===true){
            newGame();
        }
        else{
            console.log("Alright. Come back soon!");
        }
  });
};

var newGame=function(){
    guessedArr=[];
    currentClue=clues[Math.floor(Math.random()*clues.length)];
    ThisGame=new Word(currentClue);
    console.log("---Let's Play---")
    ThisGame.userString();
    userTurn();  
};

//asks users for input
var userTurn=function(){
    inquirer.prompt([
    {
        name:'guess',
        type:'input',
        message:'Guess a Letter'
    }]).then(function(response) {
        var lowerGuess=response.guess.toLowerCase();
        //can't guess same letter twice
        if(guessedArr.indexOf(lowerGuess)!==-1){
            console.log("You have already guessed that letter.Please choose another letter.");
            ThisGame.userString();
            userTurn(); 
        }
        //can't guess multiple letters or anything not in alphabet
        else if((alphabet.indexOf(lowerGuess)===-1)||(response.guess.length!==1)){
            console.log("Please choose one letter.");
            ThisGame.userString();
            userTurn(); 
        }
        else{
            guessedArr.push(lowerGuess);
            if(ThisGame.letters.indexOf(lowerGuess)===-1){
                guesses--;
                console.log("Incorrect!");
                console.log(guesses+" guesses left.");

                if(guesses>0){
                    ThisGame.userString();
                    userTurn();
                    
                }else{
                    console.log("Game Over!");
                    console.log("The answer was '"+currentClue+"'");
                    console.log("~~~~~~");
                    Start();
                }
            }
            else{
                console.log("Correct!");
                ThisGame.secondFunction(lowerGuess);
                ThisGame.userString();
                
                if(ThisGame.guessState.indexOf("_")===-1){
                    console.log("You win!");
                    console.log("~~~~~~");
                    Start();
                }
                else{
                    userTurn();
                }
            }
    }
    });    
};

Start();