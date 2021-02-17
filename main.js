const container = document.querySelector('.container');
const btn = document.querySelector("button");
const atempts = document.querySelector('span');

const tilesArray = [];
let numbers = [0, 1, 2, 3, 4, 5, 6, 7];
let number = 0;
let toEnd = 8;

let canAgain = false;
let flag = true;
let clickTwo = "";
let indexTwo = 0;

const score = () => {
    if (toEnd === 0) {
        canAgain = !canAgain;
        alert("Koniec gry, wygrałeś!");
    }
}
const showTiles = function (clickOne, indexOne, tiles, testFunc) {
    if (flag) {
        flag = !flag;
        clickTwo = clickOne;
        indexTwo = indexOne;
    } else {
        flag = !flag;
        if (clickOne === clickTwo) {
            toEnd--;
            setTimeout(() => {
                tiles[indexOne].style.display = "none";
                tiles[indexTwo].style.display = "none";
            }, 500);
        } else {
            setTimeout(() => {
                tiles[indexOne].classList.remove('on');
                tiles[indexTwo].classList.remove('on');
            }, 500);
        }
        score();
    }
}
const tilesListener = () => {
    const tiles = [...container.querySelectorAll('.tile')];
    tiles.forEach((element, key) => {
        element.dataset.key = key;
        const testFunc = () => {
            number++;
            atempts.textContent = `atempts:${number}`;
            let clickOne = element.textContent;
            let indexOne = element.dataset.key;
            element.classList.add('on');
            console.log(`tile o indexie ${indexOne}, wartość ${clickOne}`);
            showTiles(clickOne, indexOne, tiles, testFunc);
        }
        element.addEventListener("click", testFunc);
    });
}
const random = () => {
    for (let i = 0; i < 8; i++) {
        const numbersRandom = Math.floor(Math.random() * numbers.length);
        for (let i = 0; i < 2; i++) {
            const randomTab = Math.floor(Math.random() * tilesArray.length);
            tilesArray[randomTab].textContent = numbers[numbersRandom];
            tilesArray.splice(randomTab, 1);
        }
        numbers.splice(numbersRandom, 1);
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
    tilesListener();
}

startGame();
btn.addEventListener("click", () => {
    if(canAgain){
        canAgain = !canAgain;
        number=0;
        toEnd = 8;
        numbers = [0, 1, 2, 3, 4, 5, 6, 7];
        startGame();
    }
});