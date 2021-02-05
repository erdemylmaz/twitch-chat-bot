// chat
const $name = document.querySelector("#name");
const message = document.querySelector("#message");
const messageForm = document.querySelector(".messageForm");
const messagesList = document.querySelector(".messages");

// bot
const keyWord = document.querySelector(".keywordInput");
const botForm = document.querySelector(".bot");
const keyWordHTML = document.querySelector(".keywordArea");
const participationsList = document.querySelector(".participations");
const start = document.querySelector(".start");
const giveaway = document.querySelector(".giveaway");

let $keyWord;
let winner;

const codes = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
];

let messages = [];
let giveawayParticipations = [];
let counter = 0;

let deneme = [];

let hex = "#";

sendMessage = (e) => {
    e.preventDefault();

    let li = document.createElement("li");

    messages.push({
        usersName: $name.value,
        usersMessage: message.value,
    });

    // messages color

    for (let x = 0; x < 6; x++) {
        let random = Math.floor(Math.random() * codes.length);
        hex += codes[random];
    }
    usersMessage = message.value;

    li.innerHTML = `<h3 style="color: ${hex}; display: inline;">${$name.value}:</h3> <h3 style="color: black; display: inline;">${message.value}</h3>`;

    hex = "#";

    messagesList.appendChild(li);

    if (usersMessage.indexOf($keyWord) != -1) {

        var lastLength = giveawayParticipations.length;

        for (let x = 0; x < giveawayParticipations.length; x++) {
            if (giveawayParticipations[x].name == $name.value) {
                giveawayParticipations.splice(x, 1);
            }
        };

        giveawayParticipations.push({
            name: $name.value,
            message: message.value,
        });

        if (giveawayParticipations.length != lastLength) {
            let participationLi = document.createElement('li');

            participationLi.innerHTML = `<h2>${$name.value}</h2>`;

            participationsList.appendChild(participationLi);
        }

    }
};

setKeyword = (e) => {
    e.preventDefault();

    $keyWord = keyWord.value;
    keyWordHTML.textContent = `${$keyWord}`;
};

startGiveaway = () => {
    let randomWinner = Math.floor(
        Math.random() * giveawayParticipations.length
    );
    winner = giveawayParticipations[randomWinner].name;

    giveaway.innerHTML = "5";
    setTimeout(() => {
        giveaway.innerHTML = "4";
    }, 1000);
    setTimeout(() => {
        giveaway.innerHTML = "3";
    }, 2000);
    setTimeout(() => {
        giveaway.innerHTML = "2";
    }, 3000);
    setTimeout(() => {
        giveaway.innerHTML = "1";
    }, 4000);
    setTimeout(() => {
        giveaway.innerHTML = `Winner: ${winner}`;
    }, 5000);
};

botForm.addEventListener("submit", setKeyword);

start.addEventListener("click", startGiveaway);

messageForm.addEventListener("submit", sendMessage);
