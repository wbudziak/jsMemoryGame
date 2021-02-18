const container = document.querySelector('.container');
const btn = document.querySelector("button");
const moves = document.querySelector('span');

const tilesArray = [];
let numbers = [0, 1, 2, 3, 4, 5, 6, 7];
let number = 0;
let toEnd = 8;

let canAgain = false;
let flag = true;
let clickB = "";
let indexB = 0;

const score = () => {
    if (toEnd === 0) {
        canAgain = !canAgain;
        setTimeout(() => {
            const tiles = [...container.querySelectorAll('.tile')];
            tiles.forEach(element => {
                container.removeChild(element);
            });
        }, 1000);
        setTimeout(() => {
            btn.classList.add("button-show");
        }, 300);
    }
}
const showTiles = function (clickA, indexA, tiles) {
    if (flag) {
        flag = !flag;
        clickB = clickA;
        indexB = indexA;
    } else {
        flag = !flag;
        if (clickA === clickB) {
            toEnd--;
            setTimeout(() => {
                tiles[indexA].style.transform = "translate(0,-5000px)";
                tiles[indexB].style.transform = "translate(0,-5000px)";
            }, 500);
        } else {
            setTimeout(() => {
                tiles[indexA].classList.remove('on');
                tiles[indexB].classList.remove('on');
            }, 500);
        }
        score();
    }
}
const tileClick = () => {
    const tiles = [...container.querySelectorAll('.tile')];
    tiles.forEach((element, key) => {
        element.dataset.key = key;
        const testFunc = () => {
            if (element.classList.contains("on")) return;
            number++;
            moves.textContent = `moves: ${number}`;
            let clickA = element.textContent;
            let indexA = element.dataset.key;
            element.classList.add('on');
            showTiles(clickA, indexA, tiles);
        }
        element.addEventListener("click", testFunc);
    });
}
const random = () => {
    for (let i = 0; i < 8; i++) {
        const randomNumbers = Math.floor(Math.random() * numbers.length);
        for (let i = 0; i < 2; i++) {
            const randomTilesArray = Math.floor(Math.random() * tilesArray.length);
            tilesArray[randomTilesArray].textContent = numbers[randomNumbers];
            tilesArray.splice(randomTilesArray, 1);
        }
        numbers.splice(randomNumbers, 1);
    }
}
const startGame = () => {
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        container.appendChild(tile);
        tilesArray.push(tile);
    }
    random();
    tileClick();
}
startGame();
btn.addEventListener("click", () => {
    if (canAgain) {
        btn.classList.remove("button-show");
        canAgain = !canAgain;
        numbers = [0, 1, 2, 3, 4, 5, 6, 7];
        toEnd = 8;
        number = 0;
        moves.textContent = `moves: ${number}`;
        startGame();
    }
});