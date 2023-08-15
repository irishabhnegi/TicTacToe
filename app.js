const grid = document.querySelector('.grid');
const blocks = document.querySelectorAll('.grid > div')
const computerScore = document.querySelector('.computer-score');
const drawScore = document.querySelector('.draw');
const playerScore = document.querySelector('.player-score');
const main = document.querySelector('.heading')

const pattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const gridBlocks = [];
blocks.forEach(e => gridBlocks.push(e));

let draw = [];

function result() {
    for (let i = 0; i < pattern.length; i++) {

        const array = [gridBlocks[pattern[i][0]], gridBlocks[pattern[i][1]], gridBlocks[pattern[i][2]]];
        const classesArr = array.map(e => { return e.className });
        const map = new Map();
        classesArr.forEach((e) => {
            if (!map.has(e)) {
                map.set(e, 1);
            } else {
                map.set(e, map.get(e) + 1);
            };
        });
        if (map.get("o") === 3) {
            const html = `<div class='status'>O Win!</div>`;
            main.insertAdjacentHTML('afterbegin', html);
            return

        }
        if (map.get("x") === 3) {
            const html = `<div class='status'>X Win!</div>`;
            main.insertAdjacentHTML('afterend', html);
            return
        }
    }
    draw = []
    gridBlocks.forEach(e => {
        if (e.classList.contains("not-filled")) {
            draw.push(e);
        }
    })
    console.log(draw)
    if (draw.length === 0) {

    };
}

function randomMove(divO) {
    const notFilledArr = gridBlocks.filter(e => {
        return e.classList.contains("not-filled");
    });
    const randomBlock = notFilledArr[Math.floor(Math.random() * notFilledArr.length)]

    if (draw.length > 0 && randomBlock.classList.contains("not-filled")) {
        randomBlock.classList.remove("not-filled");
        randomBlock.classList.add("o");
        randomBlock.appendChild(divO);
    }
}


function computerMoves() {

    const divO = document.createElement('div');
    divO.classList.add('oEle');
    divO.innerHTML = "O";

    for (let i = 0; i < pattern.length; i++) {

        const array = [gridBlocks[pattern[i][0]], gridBlocks[pattern[i][1]], gridBlocks[pattern[i][2]]];
        const classesArr = array.map(e => { return e.className });
        const map = new Map();

        classesArr.forEach((e) => {
            if (!map.has(e)) {
                map.set(e, 1);
            } else {
                map.set(e, map.get(e) + 1);
            };
        });


        if (map.get("x") === 2 && !map.get("o") || map.get("o") === 2 && !map.get("x")) {
            array.forEach((e) => {
                if (e.classList.contains("not-filled")) {
                    // console.log(e)
                    e.classList.remove("not-filled");
                    e.classList.add("o");
                    e.appendChild(divO);
                }
            })
            return
        }
    }

    randomMove(divO)
    result()
}


function playerMoves(e) {
    const target = e.target;

    const divX = document.createElement('div');
    divX.classList.add("xEle");
    divX.innerHTML = "X";
    if (target.classList.contains('not-filled')) {
        target.classList.remove("not-filled");
        target.classList.add("x");
        target.appendChild(divX);
    }
    result()
    computerMoves()
}

grid.addEventListener('click', playerMoves)

