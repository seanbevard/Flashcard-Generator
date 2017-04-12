//Basic card constructor and checkanswer/addnew functions

function BasicCard(front, back) {
    this.front = front;
    this.back = back;
    this.basicCardsArr = [];
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
}

//Adding a check answer function.
BasicCard.prototype.checkAnswer = function(input) {
    //convert input and answer to lowercase for comparision
    //return true or false if the answer is correct or not
    if (input.toLowerCase() === this.back.toLowerCase()) {
        console.log("YOU ARE CORRECT!");
        return true;
    } else {
        console.log("Sorry, that is incorrect.\nThe correct answer was: " + this.back);
        return false;
    }
}

//a function to add new cards to the array
BasicCard.prototype.addNewCard = function(front, back) {
    this.basicCardsArr.push(new BasicCard(front, back));
};


//Export the module for use in main file
module.exports = BasicCard;
