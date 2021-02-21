const container = document.querySelector('.container');
const btn = document.querySelector("button");
const moves = document.querySelector('span');
const matches = document.querySelector(".matches");


const tilesArray = [];
let pictures = [
    "img/js.png",
    "img/sass.png",
    "img/css.png",
    "img/github.png",
    "img/html.png",
    "img/react.png",
    "img/wordpress.png",
    "img/vsc.png"
];
let numberOfMoves = 0;
let toEnd = 8;
let matchesNumber = 0;
let howManyTiles = 16;
let howManySelects = 0;
let whenAgain = false;
let flag = true;
let selectIdB = "";
let indexB = 0;

const endGame = () => {
    if (toEnd === 0) {
        whenAgain = !whenAgain;
        setTimeout(() => {
            const tiles = [...container.querySelectorAll('.tile')];
            tiles.forEach(tile => {
                container.removeChild(tile);
            });
        }, 1000);
        setTimeout(() => {
            btn.classList.add('button-active');
        }, 300);
    }
}

const checkTile = function (selectIdA, indexA, tiles) {
    if (flag) {
        flag = !flag;
        selectIdB = selectIdA;
        indexB = indexA;
    } else {
        flag = !flag;
        numberOfMoves++;
        moves.textContent = `moves: ${numberOfMoves}`;
        if (selectIdA === selectIdB) {
            toEnd--;
            matchesNumber++;
            matches.textContent = `matches: ${matchesNumber}/${howManyTiles/2}`;
            setTimeout(() => {
                tiles[indexA].classList.add("matched");
                tiles[indexB].classList.add("matched");
                howManySelects = 0;
            }, 500);
        } else {
            setTimeout(() => {
                tiles[indexA].classList.remove('active');
                tiles[indexB].classList.remove('active');
                howManySelects = 0;
            }, 500);
        }
        endGame();
    }
}

const selectTile = () => {
    const tiles = [...container.querySelectorAll('.tile')];
    tiles.forEach((tile, index) => {
        tile.dataset.index = index;
        tile.addEventListener("click", () => {
            if (tile.classList.contains('active')) return;
            howManySelects++;
            if (howManySelects === 3) return;
            if (howManySelects <= 2) {
                let selectIdA = tile.randomTileID;
                let indexA = tile.dataset.index;
                tile.classList.add('active');
                checkTile(selectIdA, indexA, tiles);
            }
        });
    });
}

const random = () => {
    for (let i = 0; i < howManyTiles / 2; i++) {
        const randomPicture = Math.floor(Math.random() * pictures.length);
        for (let i = 0; i < 2; i++) {
            const randomTile = Math.floor(Math.random() * tilesArray.length);
            const img = document.createElement("img");
            img.src = pictures[randomPicture];
            tilesArray[randomTile].appendChild(img);
            tilesArray[randomTile].randomTileID = pictures[randomPicture];
            tilesArray.splice(randomTile, 1);
        }
        pictures.splice(randomPicture, 1);
    }
}

const startGame = () => {
    let timeToAnimation = 30;
    for (let i = 0; i < howManyTiles; i++) {
        timeToAnimation += 30;
        const tile = document.createElement('div');
        tile.className = 'tile';
        container.appendChild(tile);
        setTimeout(() => {
            tile.style.opacity = "1";
            // tile.style.transform = "translateY(0px)";
        }, timeToAnimation);
        tilesArray.push(tile);
    }
    random();
    selectTile();
}
startGame();

const tryAgain = () => {
    if (whenAgain) {
        whenAgain = !whenAgain;
        toEnd = 8;
        numberOfMoves = 0;
        matchesNumber = 0;
        pictures = [
            "img/js.png",
            "img/sass.png",
            "img/css.png",
            "img/github.png",
            "img/html.png",
            "img/react.png",
            "img/wordpress.png",
            "img/vsc.png"
        ];
        moves.textContent = `moves: ${numberOfMoves}`;
        matches.textContent = `matches: ${matchesNumber}/${howManyTiles/2}`;
        btn.classList.remove('button-active');
        startGame();
    }
}
btn.addEventListener('click', tryAgain);