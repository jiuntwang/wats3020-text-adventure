/* JS for WATS 3020 Text Adventure */
let playerName = "";
let choiceList = [];
let currentPage = null;

///////////////////////////////////////////////////
//////// Basic Functions ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Prompt the user for their name. Store the name in the variable `playerName`.
playerName = prompt("Enter your player name.");


// Accept one arameter, which is the `slug` for the current page and fetch the current page and return a page object using the `slug` value for a key.
function getCurrentPage(slug){
    currentPage = storyData[slug];
    return currentPage;
}


// Accept a `slug` parameter and add it to the `choiceList` Array 
function recordChoice(slug){
    choiceList.push(slug);
    console.log('Added ${slug} to choiceList Array.');
}


// Remove the last `slug` in the `choiceList` Array and then will return the last `slug` in the`choiceList` Array.
function undoChoice(){
    choiceList.pop(); //Remove the last item in the 'choiceList' Array
    return choiceList[choiceList.length-1];
}


// Function handling turning the page" in three steps
function changePage(slug){
    //Record the latest choice
    recordChoice(slug);
    currentPage = getCurrentPage(slug);
    updatePage(currentPage);
}


///////////////////////////////////////////////////
//////// Story Data //////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Only edit this data to change/enhance the story. Be sure to watch for how  //
// changes to the story data might affect the mechanisms that output the      //
// story.                                                                     //
////////////////////////////////////////////////////////////////////////////////
// NOTE: The data below is organized as a JS Object. The content for each     //
// page is stored using a "slug" -- a short alphanumeric identifier (for      //
// example, "p1", "p2", "homeEnd", etc.). Each page contains a `text`         //
// property and a `choices` property. The `choices` property is an Array that //
// contains all of the choices, including the slug that each choice should    //
// link to.                                                                   //
////////////////////////////////////////////////////////////////////////////////

var storyData = {
    title: "WATS Survival",
    p1: {
        text: `You are a young and up and coming Web Developer named ${playerName}. Standing on a large seal on the ground, you look at your surroundings.`,
        choices: [
            {
                text: `You see a steep uphill path straight ahead.`,
                link: 'p2'
            }, {
                text: `To your right, you notice a holy light shining in the distance.`,
                link: 'p3'
            }, {
                text: `To your left, a very long path, but the aroma of food drifts in the air.`,
                link: 'p4'
            }, {
                text: `You decide to turn around from which you came.`,
                link: 'homeEnd'
            }
        ]
    },
    homeEnd : {
        text: `You walk aimlessly into a four way street, but was flamming eye from tower scares you back to the seal.
                <br><br>
                You recollect your thoughts.`,
        choices: [
            {
                text: `Play again?`,
                link: 'p1'
            }
        ]
    },
    p2 : {
        text: `You walk briskly up the steep high to find yourself hearing a melody of music and water close by.`,
        choices: [
            {
                text: `Check out the alluring sounds.`,
                link: 'p5'
            }, {
                text: `You ignore the sounds, and continue walking straight uphill.`,
                link: 'p6'
            }
        ]
    },
    p3 : {
        text: `The shining light beams bright as you approach a chapel named St. Ignatius. `,
        choices: [
            {
                text: `Walk inside the chapel.`,
                link: 'chapel'
            }, {
                text: `Ignore the chapel and adventure past it.`,
                link: 'p7'
            }
        ]
    },
    p4 : {
        text: `You drag your feet across the road with your nose pointed in the air as your stomach speaks of an unknown language.`,
        choices: [
            {
                text: `Feeling lost, you continue to walk straight toward a gated entry.`,
                link: 'info'
            }, {
                text: `Ignoring your stomach, your senses guide you to a hidden entry to the right where light flickers against the walls.`,
                link: 'library'
            }
        ]
    },
    chapel : {
        text: `A figure stands up from the pew, and turns to face you. He introduces you as Steven Holl.`,
        choices: [
            {
                text: `Act suspicious and question him about what is he doing here.`,
                link: 'suspicious'
            }, {
                text: `"You're the architect!" You shout, a little louder than you anticpiated.`,
                link: 'architect'
            }
        ]
    },
    suspicious : {
        text: `Steven looks away in the distance and ignores you.
                <br><br>
                You feel that you have offended him.`,
        choices: [
            {
                text: `Apologize to Steven.`,
                link: 'architect'
            }, {
                text: `Leave the chapel.`
                link: 'p3'
            }
        ]
    },
    architect : {
        text: `He looks at you and says, "${playerName}! I've been waiting for you to fill these seven bottles with light.`,
        choices: [
            {
                text: `Accept the quest.`,
                link: 'accept'
            }, {
                text: `Decline the quest.`,
                link: 'decline'
            }
        ]
    },
    dropCheeseEnd : {
        text: `You open your beak to sing a lovely song, and your cheese comes
                tumbling out. Mr. Fox quickly snaps the cheese out of the air
                as it falls and gobbles it up!
                <br><br>
                The End`,
        choices: [
            {
                text: `Start over?`,
                link: 'p1'
            }
        ]
    },
    p7 : {
        text: `You remain silent through all of Mr. Fox's flattery. In the end,
                he knows you won't fall for his tricks, and he leaves you alone.
                <br><br>
                Finally able to relax in quiet, you enjoy your well-earned
                cheese.
                <br><br>
                The End`,
        choices: [
            {
                text: `Play again?`,
                link: 'p1'
            }
        ]
    }
};

///////////////////////////////////////////////////
//////// Main Script /////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// This script runs the game. You should only edit it if you are attempting a //
// stretch goal. Otherwise, this script calls the functions that you have     //
// created above.                                                             //
////////////////////////////////////////////////////////////////////////////////

let title = document.querySelector('#story-title');
title.innerHTML = storyData.title;

let pageContent = document.querySelector('#story-text');
let choicesUL = document.querySelector('#choices');

function updatePage(page) {
    pageContent.innerHTML = page.text;
    choicesUL.innerHTML = '';
    for (choice of page.choices){
        let newLI = document.createElement('li');
        newLI.innerHTML = choice.text;
        newLI.setAttribute('data-slug', choice.link);
        choicesUL.appendChild(newLI);
    }
    addEventListeners();
}

function addEventListeners(){
    let choices = document.querySelectorAll('#choices li');
    for (choice of choices){
        choice.addEventListener('click', function(e){
            console.log(`Moving to page: ${e.target.dataset.slug}`);
            changePage(e.target.dataset.slug);
        })
    }
}

let undo = document.querySelector('#undo');
undo.addEventListener('click', function(e){
    console.log('Undoing last choice.');
    let slug = undoChoice();
    currentPage = getCurrentPage(slug);
    updatePage(currentPage);
})

currentPage = storyData.p1;
updatePage(currentPage);

