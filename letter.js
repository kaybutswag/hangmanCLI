var Letter = function (myLetter) {
    this.guessed = false;
    this.myLetter = myLetter;
  
    this.returnChar = function() { 
        if(this.guessed===true){
            return (this.myLetter);
        }else{
            return ("_");
        }
    };
    
    this.checkLetter = function(someChar) { 
        if(someChar===this.myLetter){
            this.guessed=true;
        }
    };                 
};

module.exports = Letter;
   