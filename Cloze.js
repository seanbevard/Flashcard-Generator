//Cloze card constructor and checkanswer/addnew functions
var Cloze = function(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.clozeCardsArr = [];
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
}

//function to return only the partial text by replacing the cloze text with an ellipsis (...)
Cloze.prototype.returnPartialText = function() {
    this.partialText = this.text.replace(this.cloze, " . . . ");
    return this.partialText;
}

//check answer function passes in the users input
Cloze.prototype.checkAnswer = function(input) {
    //convert input and answer to lowercase for comparision
    //return true or false if the answer is correct or not
    if (input.toLowerCase() === this.cloze.toLowerCase()) {
        console.log("YOU ARE CORRECT!");
        return true;
    } else {
        console.log("Sorry, that is incorrect.\nThe correct answer was: " + this.cloze);
        return false;
    }
}

//a function to add new cards to the array
Cloze.prototype.addNewCard = function(text, cloze) {
    this.clozeCardsArr.push(new Cloze(text, cloze));
};

//Export the module for use in main file
module.exports = Cloze;
