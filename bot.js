const restartButton = document.querySelector('.restart');
// selector
const selector = document.querySelector('.selector');
const selectorForm = document.querySelector('.selectorForm');
const botSelector = document.querySelector('.botSelector');

// chat
const $name = document.querySelector("#name");
const message = document.querySelector("#message");
const messageForm = document.querySelector(".messageForm");
const messagesList = document.querySelector(".messages");

// bot
const keyWord = document.querySelector(".keywordInput");
const botForm = document.querySelector(".giveaway-bot");
const keyWordHTML = document.querySelector(".keywordArea");
const participationsList = document.querySelector(".participations");
const start = document.querySelector(".start");
const giveaway = document.querySelector(".giveaway");

// vote
var options = [];


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

    for (let x = 0; x < options.length; x++) {

        if (isVoteStart && message.value == options[x].name) {

            var lastVLength = votedUsers.length;

            for (let x = 0; x < votedUsers.length; x++) {
                if (votedUsers[x].name == $name.value) {
                    votedUsers.splice(x, 1);
                }
            };

            votedUsers.push({
                name: $name.value,
            });

            if (votedUsers.length != lastVLength) {
                for (let i = 0; i < options.length; i++) {
                    if (options[i].name.toLowerCase() == message.value.toLowerCase()) {
                        options[i].votedUsersCount++;
                        console.log(options[i].name, options[i].votedUsersCount)
                    }

                }
            }


            // add percentages to options
            var lis = optionsList.querySelectorAll('li');

            for (let x = 0; x < options.length; x++) {

                if (options[x].votedUsersCount > 0) {
                    options[x].percentage = Math.floor(100 - ((votedUsers.length - options[x].votedUsersCount) * 100 / votedUsers.length));
                } else if (votedUsers.length == 0) {
                    options[x].percentage = 0
                } else if (options[x].votedUsersCount == 0) {
                    options[x].percentage = 0;
                }

                lis[x].innerHTML = `<h3>${options[x].name}: ${options[x].percentage}%</h3>`;
            }
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
        start.style.display = "none";
        restartButton.style.display = "block";
        restartButton.disabled = false;
    }, 5000);
};

botForm.addEventListener("submit", setKeyword);
start.addEventListener("click", startGiveaway);
messageForm.addEventListener("submit", sendMessage);

// selector bot


selected = (e) => {
    e.preventDefault();

    let selectedIndex = botSelector.selectedIndex;

    let options = document.querySelectorAll('.select-bot');

    let selected = options[selectedIndex].value;

    if (selected == "giveaway") {
        selector.style.display = "none";
        botForm.style.display = "block";
    } else if (selected == "vote") {
        selector.style.display = "none";
        vote.style.display = "block";
    };

}

selector.addEventListener('submit', selected);


// vote bot 

const vote = document.querySelector('.vote');
const optionInput = document.querySelector(".optionInput");
const addForm = document.querySelector('.addOption');
const optionsList = document.querySelector('.optionsList');
const startVoteBTN = document.querySelector('.startVote');
const result = document.querySelector('.result');

var votedUsers = [];
var isVoteStart = false;

addOption = (e) => {
    e.preventDefault();
    // if option same as other delete option
    if (options.length > 0) {
        for (let x = 0; x < options.length; x++) {
            if (options[x].name == `#${optionInput.value}`) {

                let optLis = document.querySelectorAll('.optLi');

                optLis.forEach((opt) => {
                    if (opt.firstChild.textContent == `#${optionInput.value}`) {
                        optionsList.removeChild(opt);
                        options.splice(x, 1);
                    }
                })
            }
        }
    }

    if (options.length < 5 && optionInput.value != "") {
        var lastOptionsLength = options.length;

        for (let x = 0; x < options.length; x++) {
            if (options[x].name == optionInput.value) {
                options.splice(x, 1);
            }
        };

        options.push({
            name: `#${optionInput.value}`,
            votedUsersCount: 0,
            percentage: 0,
        });

        if (options.length != lastOptionsLength) {
            var optionLi = document.createElement('li');
            optionLi.className = "optLi";

            optionLi.innerHTML = `<h3>#${optionInput.value}</h3> <button class="remove">X</button>`;

            optionsList.appendChild(optionLi);
        }

    } else {
        alert('please check all things are true');
    }



    // disabled start button if not enough option
    if (options.length < 2) {
        startVoteBTN.disabled = true;
    } else {
        startVoteBTN.disabled = false;
    }

    optionInput.value = '';
}

removeOption = (e) => {
    if (e.target.className == "remove") {
        if (confirm(`are you sure about remove ${e.target.parentNode.firstChild.textContent} option?`)) {
            optionsList.removeChild(e.target.parentElement);

            let deletedOption = e.target.parentElement.firstChild.textContent;

            for (let x = 0; x < options.length; x++) {
                if (options[x].name == deletedOption) {
                    options.splice(x, 1);
                }
            }

            // disable start button if not enough option
            if (options.length < 2) {
                startVoteBTN.disabled = true;
            } else {
                startVoteBTN.disabled = false;
            }
        }

    }
}

endVote = () => {
    isVoteStart = false;
}

startVoteBTN.addEventListener('click', () => {
    isVoteStart = true;
    let removeBTNs = document.querySelectorAll('.remove');
    removeBTNs.forEach((btn) => {
        btn.style.display = "none";
    })
    addForm.style.display = "none";
    startVoteBTN.style.display = "none";
    let voteDuration = 30;
    let interval = setInterval(() => {
        if (voteDuration >= 0) {
            result.innerHTML = `
                        ${ voteDuration }
                        `;
            voteDuration--;
        } else if (voteDuration == -1) {
            if (votedUsers.length != 0) {
                let maxVote = Math.max.apply(Math, options.map((option) => { return option.votedUsersCount }))
                let winner = options.find((option) => {
                    return option.votedUsersCount == maxVote;
                })

                result.innerHTML = `
                        Winner: ${ winner.name } (${ winner.votedUsersCount }
                            vote)
                        `;
            } else {
                result.innerHTML = `
                        No vote `;
            }

        }
    }, 1000);

    restartButton.style.display = "block";
    restartButton.disabled = false;
    interval;
});

restart = () => {
    vote.style.display = "none";
    botForm.style.display = 'none';
    restartButton.style.display = "none";
    selector.style.display = "block";
}

optionsList.addEventListener('click', removeOption);
addForm.addEventListener('submit', addOption);
restartButton.addEventListener('click', restart);

vote.style.display = 'none';
startVoteBTN.disabled = true;