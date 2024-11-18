let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let h3 = document.querySelector("h3");
let btn = ["yellow", "red", "purpla", "green"];
let body = document.querySelector("body");

document.addEventListener("keypress", function() {
    if (!started) {
        body.classList.add("resd");
        setTimeout(() => {
            body.classList.remove("resd");
        }, 200);
        started = true;
        leveleUP();

    }
});

function leveleUP() {
    userSeq = []; // Reset user sequence for the new level
    level++;
    h3.innerText = `Level ${level}`;
    let randomNum = Math.floor(Math.random() * 4); // Corrected to 4
    let randomColor = btn[randomNum];
    gameSeq.push(randomColor); // Add the random color to game sequence
    let randomBtn = document.querySelector(`.${randomColor}`);
    btnFlash(randomBtn);
}

function btnFlash(bth) {
    bth.classList.add("flash");
    setTimeout(function() {
        bth.classList.remove("flash");
    }, 100);
}

function checkAns(dx) {
    if (gameSeq[dx] === userSeq[dx]) {
        if (gameSeq.length === userSeq.length) { // Fixed typo "lenght" to "length"
            setTimeout(function() {
                leveleUP();
            }, 900);
        }
    } else {

        restart();
    }
}

function restart() {
    started = false;

    gameSeq = []; // Reset game sequence
    userSeq = []; // Reset user sequence
    body.classList.add("redd");
    setTimeout(() => {
        body.classList.remove("redd");
    }, 200);
    h3.innerHTML = `GAME OVER  YOUR SCORE ${level} <b> <br> Press any key to start the game</b>`;
    level = 0;
}

function btnspress() {
    let btn = this;
    btnFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for (let btnss of allbtn) {
    btnss.addEventListener("click", btnspress);
}