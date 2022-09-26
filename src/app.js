//Spark Subscriptions
let spark = new SparkWebsocket();

spark.subscribe("goal", data => {
    goal();
});

//Main loop for all other event checking

let oldPossession = [0, 0];

spark.subscribe("frame_1hz", d => {

    //Possession Change

    let possession = d.possession;

    //TODO check these are the right way around
    if (oldPossession[0] == 0 && oldPossession[1] == 0 && possession[0] == 1 && possession[1] == 0) {
        //Blue has taken the disc after nobody had it
    }
    if (oldPossession[0] == 0 && oldPossession[1] == 0 && possession[0] == 0 && possession[1] == 1) {
        //Orange has taken the disc after nobody had it
    }
    if (oldPossession[0] == 1 && oldPossession[1] == 0 && possession[0] == 0 && possession[1] == 1) {
        //Orange has taken the disc from blue
    }
    if (oldPossession[0] == 0 && oldPossession[1] == 1 && possession[0] == 1 && possession[1] == 0) {
        //Blue has taken the disc from orange
    }

    oldPossession = d.possession;

    //Round start clock
    //TODO this lol
})


let goalAudio = new Audio();
let countdownAudio = new Audio();
let possessionAudio = new Audio();
let volume = .02;

//Event handlers
function goal() {
    goalAudio.volume = volume;
    goalAudio.src = "./sounds/goal/"+selectedGoal;
    goalAudio.play();
}

function countdown() {
    countdownAudio.volume = volume;
    countdownAudio.src= "./sounds/countdown/"+selectedCountdown;
    countdownAudio.play();
}

function possession() {
    possessionAudio.volume = volume();
    possessionAudio.src = "./sounds/possession/"+selectedPossession;
    possessionAudio.play();
}

//Get sound files
const fs = require("fs");
let selectedGoal;
let goals = [];
let selectedPossession;
let possessions = [];
let selectedCountdown;
let countdowns = [];

function getSounds() {
    //Get goal sound files
    fs.readdir("./src/sounds/goal", (err, files) => {
        if (err) {
            throw err
        }

        goals = [];
        files.forEach(file => {
            goals.push(file);
        })

        updateLists();
    })
    //Get possession sound files
    fs.readdir("./src/sounds/possession", (err, files) => {
        if (err) {
            throw err
        }

        possesions = [];
        files.forEach(file => {
            possesions.push(file);
        })

        updateLists();
    })
    //Get countdown sound files
    fs.readdir("./src/sounds/countdown", (err, files) => {
        if (err) {
            throw err
        }

        countdowns = [];
        files.forEach(file => {
            countdowns.push(file);
        })

        updateLists();
    })
}

//Helpers
function updateLists() {
    let goalsDropDown = document.getElementById("goals");
    let possessionsDropDown = document.getElementById("possessions");
    let countdownsDropDown = document.getElementById("countdowns");

    if(selectedGoal == null) selectedGoal = goals[0];
    if(selectedPossession == null) selectedPossession = possessions[0];
    if(selectedCountdown == null) selectedCountdown = countdowns[0];

    //Show current selected audio in UI
    goalsDropDown.querySelector('.selected').innerHTML = selectedGoal;
    possessionsDropDown.querySelector('.selected').innerHTML = selectedPossession;
    countdownsDropDown.querySelector('.selected').innerHTML = selectedCountdown;

    //Update dropdown lists

    //Goals
    let gList = goalsDropDown.querySelector('ul');
    gList.innerHTML = "";
    goals.forEach(sound => {
        gList.innerHTML += '<li class="option">' + sound + '</li>'
    })

    //Possessions
    let pList = possessionsDropDown.querySelector('ul');
    pList.innerHTML = "";
    possessions.forEach(sound => {
        pList.innerHTML += '<li class="option">' + sound + '</li>'
    })

    //Countdowns
    let cList = countdownsDropDown.querySelector('ul');
    cList.innerHTML = "";
    countdowns.forEach(sound => {
        cList.innerHTML += '<li class="option">' + sound + '</li>'
    })
}

//Event Listeners

//Toggle lists
document.querySelector('.selector').addEventListener("click", e => {
    e.target.querySelector('.options').classList.toggle('active');
})

//Change goal sound
document.querySelector('#goals').querySelector('.options').addEventListener("click", e => {
    if (e.target.nodeName === "LI") selectedGoal = e.target.innerHTML;
    getSounds();
    goal();
})

//Change possession sound
document.querySelector('#possessions').querySelector('.options').addEventListener("click", e => {
    if (e.target.nodeName === "LI") selectedPossession = e.target.innerHTML;
    getSounds();
    possession();
})

//Change countdown sound
document.querySelector('#countdowns').querySelector('.options').addEventListener("click", e => {
    if (e.target.nodeName === "LI") selectedCountdown = e.target.innerHTML;
    getSounds();
    countdown();
})

//Refresh sounds
document.querySelector('.refresh-button').addEventListener("click", e => {
    getSounds();
})

//App start
getSounds();