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

const colors = [
  "#eb5e0b",
  "#75cfb8",
  "#1687a7",
  "#eb596e",
  "#ec4646",
  "#51c2d5",
  "#64dfdf",
  "#ff577f",
  "#f88f01",
  "#adeecf",
  "#008891",
  "#f05454",
  "#c70039",
  "#433d3c",
  "#23120b",
];

let messages = [];
let giveawayParticipations = [];

sendMessage = (e) => {
  e.preventDefault();

  let li = document.createElement("li");

  messages.push({
    usersName: $name.value,
    usersMessage: message.value,
  });

  // messages color

  let random = Math.floor(Math.random() * colors.length);
  usersMessage = message.value;

  li.innerHTML = `<h3 style="color: ${colors[random]}; display: inline;">${$name.value}:</h3> <h3 style="color: black; display: inline;">${message.value}</h3>`;

  messagesList.appendChild(li);

  if (usersMessage.indexOf($keyWord) != -1) {
    giveawayParticipations.push({
      name: $name.value,
      message: message.value,
    });

    let li2 = document.createElement("li");

    giveawayParticipations.forEach((user) => {
      li2.innerHTML = `${user.name}: ${user.message}`;
    });

    participationsList.appendChild(li2);
  }
};

setKeyword = (e) => {
  e.preventDefault();

  $keyWord = keyWord.value;
  keyWordHTML.textContent = `${$keyWord}`;
};

startGiveaway = () => {
  let randomWinner = Math.floor(Math.random() * giveawayParticipations.length);
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
