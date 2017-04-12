//todo:  add validation when entering a cloze card so that if the cloze text isn't found in the question, it throws an error.
//todo:  add some validation for other fields
//todo:  add some color
//todo:  add some stuff to the readme file.
//todo:  look up scope safe constructors
//todo:  final bug test

//require my card files, and inquirer
var Cloze = require("./Cloze.js");
var BasicCard = require("./BasicCard.js");
var inquirer = require("inquirer");

/*Initialize a new Cloze object so we can add questions to the array, 
I added 10, which is probably more than I needed to add in hindsight.*/
var newCloze = new Cloze();
newCloze.addNewCard("A player is considered offside when he is nearer to his opponents goal line than both the ball and the second to last opponent.", "offside");
newCloze.addNewCard("Players with a Generation Adidas contract don't count against the salary cap in MLS.", "Generation Adidas");
newCloze.addNewCard("The Open Cup is the oldest soccer competition in the United States", "Open Cup");
newCloze.addNewCard("Teams are allowed 3 substitutions in a competitive match.", "3");
newCloze.addNewCard("The MLS Superdraft consists of 4 rounds.", "4");
newCloze.addNewCard("The team with the highest point total in MLS at the end of a season wins the Supporters Shield", "Supporters Shield");
newCloze.addNewCard("Eric Wynalda scored the first goal in MLS history.", "Eric Wynalda");
newCloze.addNewCard("Kingston is the name of the Orlando City mascot.", "Kingston");
newCloze.addNewCard("Lewis Neal scored the first ever goal for Orlando City SC in 2011.", "Lewis Neal");
newCloze.addNewCard("The Orlando City franchise was moved from the city of Austin, TX.", "Austin");

//Initialize a new BasicCard object so we can add questions to the array, I added 5.
var newBasicCard = new BasicCard();
newBasicCard.addNewCard("This LA based team folded in 2014, becoming the third MLS franchise to ever do so.", "Chivas USA");
newBasicCard.addNewCard("Who was the first ever Designated Player in MLS?", "David Beckham");
newBasicCard.addNewCard("Who is/was the highest paid player in MLS with a salary of over $7 million?", "Kaka");
newBasicCard.addNewCard("Which player has scored the most goals in MLS history with 147?", "Landon Donovan");
newBasicCard.addNewCard("Whih player has played the most minutes in MLS history with 37,260?", "Kevin Hartman");

//start the game from the main menu:
mainMenu();


/* Main Menu function uses inquirer to ask the user if they would like to
either do basic questions, cloze questions, add their own cards or exit;
then run the function for that choice*/
function mainMenu() {
    inquirer.prompt([{
        type: "list",
        message: "Welcome to the Soccer Flash Card Game! Please make a selection below.",
        choices: ["1. Play Game Using Cloze Cards", "2. Play Game Using Basic Cards", "3. Add My Own Cloze Cards", "4. Add My Own Basic Cards", "5. EXIT GAME"],
        name: "choice"
    }]).then(function(data) {

        //switch statement, run function based on their choice:
        switch (data.choice) {
            case '1. Play Game Using Cloze Cards':
                askQuestions(0);
                break;
            case "2. Play Game Using Basic Cards":
                askBasicQuestions(0);
                break;
            case "3. Add My Own Cloze Cards":
                createClozeCards();
                break;
            case "4. Add My Own Basic Cards":
                createBasicCards();
                break;
            case "5. EXIT GAME":
                break;
            //default case should never happen in theory because the selections are limited
            default:
                throw "ERROR!";
        }
    });
}

/*  Create a function to ask the Cloze Questions that are in the clozeCardsArr[].
pass in a count variable that should be zero to start from the beginning of the array*/
function askQuestions(count) {
    if (count < newCloze.clozeCardsArr.length) {
        inquirer.prompt([{
            type: "input",
            message: "___Question" + (count + 1) + "___:\n" + newCloze.clozeCardsArr[count].returnPartialText() + "\nAnswer: ",
            name: "userInput"
        }]).then(function(data) {

            //check the answer by passing the users input to the checkAnswer fuction
            //increment the correct answer total
            if (newCloze.clozeCardsArr[count].checkAnswer(data.userInput)) {
                newCloze.correctAnswers++;
            } else {
                newCloze.incorrectAnswers++;
            }

            //increment the question count and ask again IF there are any questions remaining
            count++;
            askQuestions(count);
        });

    //when all questions have been asked, end the game
    } else {
        console.log("GAME OVER!");
        console.log("YOU ANSWERED " + newCloze.correctAnswers + "/" + newCloze.clozeCardsArr.length + " QUESTIONS CORRECTLY!");
        //perfect score gets asci art, no idea if this will format
        if (newCloze.correctAnswers === newCloze.clozeCardsArr.length) {
            console.log("THAT'S A PERFECT SCORE!");
        }

        //Reset the  scores, reset the count
        //Ask player to play again or return to menu
        newCloze.incorrectAnswers = 0;
        newCloze.correctAnswers = 0;
        count = 0;
        inquirer.prompt([{
            type: "list",
            message: "Would you like to play again?",
            choices: ["YES", "NO"],
            name: "choice"
        }]).then(function(data) {
            if (data.choice === "YES") {
                askQuestions(count);
            } else {
                mainMenu();
            }
        });
    }
}

/*Create an askBasicQuestions function, basically the same as above
but using basic questions instead of Cloze questions.*/
function askBasicQuestions(count) {
    if (count < newBasicCard.basicCardsArr.length) {
        inquirer.prompt([{
            type: "input",
            message: "___Question" + (count + 1) + "___:\n" + newBasicCard.basicCardsArr[count].front + "\nAnswer: ",
            name: "userInput"
        }]).then(function(data) {
            //check the answer and increment scores based on
            //true/false return
            if (newBasicCard.basicCardsArr[count].checkAnswer(data.userInput)) {
                newBasicCard.correctAnswers++;
            } else {
                newBasicCard.incorrectAnswers++;
            }
            //increment the count and ask again if there are any questions remaining
            count++;
            askBasicQuestions(count);
        });
    } else {
        console.log("GAME OVER!");
        console.log("YOU ANSWERED " + newBasicCard.correctAnswers + "/" + newBasicCard.basicCardsArr.length + " QUESTIONS CORRECTLY!");
        if (newBasicCard.correctAnswers === newBasicCard.basicCardsArr.length) {
            console.log("THAT'S A PERFECT SCORE!");
        }

        //Reset the scores, reset the count
        //Ask player to play again or return to menu
        newBasicCard.incorrectAnswers = 0;
        newBasicCard.correctAnswers = 0;
        count = 0;
        inquirer.prompt([{
            type: "list",
            message: "Would you like to play again?",
            choices: ["YES", "NO"],
            name: "choice"
        }]).then(function(data) {

            if (data.choice === "YES") {
                askBasicQuestions(count);
            } else {
                mainMenu();
            }
        });

    }
}

//Create createClozeCards function so the user can add their own cards
function createClozeCards() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter the question that you would like to add to the Flash Card:\n",
        name: "userQuestion"
    }, {
        type: "input",
        message: "Please enter the Cloze text (answer) to your question:\n",
        name: "userAnswer"
    }, {
        type: "list",
        message: "Would you like to add another Flash Card?",
        choices: ["YES", "NO"],
        name: "choice"
    }]).then(function(data) {
        console.log(data.userQuestion);
        console.log(data.userAnswer);
        newCloze.addNewCard(data.userQuestion, data.userAnswer);

        if (data.choice === "YES") {
            createClozeCards();
        } else {
            mainMenu();
        }

    });
}

//Create createBasicCards function so the user can add their own cards
function createBasicCards() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter the question that you would like to add to the front of the Flash Card:\n",
        name: "userQuestion"
    }, {
        type: "input",
        message: "Please enter the answer to your question:\n",
        name: "userAnswer"
    }, {
        type: "list",
        message: "Would you like to add another Flash Card?",
        choices: ["YES", "NO"],
        name: "choice"
    }]).then(function(data) {
        newBasicCard.addNewCard(data.userQuestion, data.userAnswer);
        if (data.choice === "YES") {
            createBasicCards();
        } else {
            mainMenu();
        }

    });
}
