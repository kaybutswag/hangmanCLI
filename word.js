var Letter = require("./letter");

//word constructor
var Word=function(clue){
    this.letters=clue.split("");
    this.LetterArr=[];
    this.guessState="";
    
//this is constructing an object for each letter
for (var i=0; i<this.letters.length;i++){
    var eachObj="";
    eachObj=new Letter(this.letters[i]);
     this.LetterArr.push(eachObj);  
    }

    this.userString=function(){
        var shownClue="";
        for (var i=0;i<this.LetterArr.length;i++){
            shownClue+= " "+this.LetterArr[i].returnChar();
        }
        this.guessState=shownClue;
        console.log(this.guessState);
    };
    
    this.secondFunction=function(someChar){
        for (var i=0;i<this.LetterArr.length;i++){
            this.LetterArr[i].checkLetter(someChar);
        }  
    };
};

module.exports = Word;