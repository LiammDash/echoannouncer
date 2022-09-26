

//Spark Subscriptions
/*
let spark = new SparkWebsocket();

spark.subscribe("goal", e => {
    goal();
}); */

var audio = new Audio();

//Methods
function goal() {
    audio.src = "./sounds/goal/"+selectedGoal;
    audio.play();
}

//File System Stuff
const fs = require("fs");
let selectedGoal;
let goals = [];

function getSounds() {
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
}
function updateLists() {
    let goalsDropDown = document.getElementById("goals");

    if(selectedGoal == null) selectedGoal = goals[0];

    goalsDropDown.querySelector('.selected').innerHTML = selectedGoal;

    //Goals
    let gList = goalsDropDown.querySelector('ul');
    gList.innerHTML = "";
    goals.forEach(sound => {
        gList.innerHTML += '<li class="option">' + sound + '</li>'
    })
}

//Normal Frontend Stuff
document.querySelector('.selector').addEventListener("click", e => {
    e.target.querySelector('.options').classList.toggle('active');
})

document.querySelector('#goals').querySelector('.options').addEventListener("click", e => {
    if (e.target.nodeName == "LI") selectedGoal = e.target.innerHTML;
    getSounds();
    goal();
})

document.querySelector('.refresh-button').addEventListener("click", e => {
    getSounds();
})


getSounds();