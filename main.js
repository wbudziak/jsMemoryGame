const container = document.querySelector(".container");
const btn = document.querySelector("button");
const moves = document.querySelector(".moves");
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
  "img/vsc.png",
];
let numberOfMoves = 0;
let NumberOfMatches = 0;
let activeSelects = 0;
let tilesNumber = 16;
let toEnd = tilesNumber / 2;
let whenAgain = false;
let flag = true;
let selectIdB = "";
let indexB = 0;
matches.textContent = `matches: 0/${tilesNumber / 2}`;

const endGame = () => {
  if (toEnd === 0) {
    whenAgain = !whenAgain;
    setTimeout(() => {
      const tiles = [...container.querySelectorAll(".tile")];
      tiles.forEach((tile) => {
        container.removeChild(tile);
      });
      btn.classList.add("button-active");
    }, 1000);
  }
};

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
      NumberOfMatches++;
      matches.textContent = `matches: ${NumberOfMatches}/${tilesNumber / 2}`;
      setTimeout(() => {
        tiles[indexA].classList.add("matched");
        tiles[indexB].classList.add("matched");
        activeSelects = 0;
      }, 500);
    } else {
      setTimeout(() => {
        tiles[indexA].classList.remove("active");
        tiles[indexB].classList.remove("active");
        activeSelects = 0;
      }, 500);
    }
    endGame();
  }
};

const selectTile = () => {
  const tiles = [...container.querySelectorAll(".tile")];
  tiles.forEach((tile, index) => {
    tile.dataset.index = index;
    tile.addEventListener("click", () => {
      if (tile.classList.contains("active")) return;
      activeSelects++;
      if (activeSelects === 3) return;
      if (activeSelects <= 2) {
        let selectIdA = tile.randomTileID;
        let indexA = tile.dataset.index;
        tile.classList.add("active");
        checkTile(selectIdA, indexA, tiles);
      }
    });
  });
};

const random = () => {
  for (let i = 0; i < tilesNumber / 2; i++) {
    const randomPicture = Math.floor(Math.random() * pictures.length);
    for (let i = 0; i < 2; i++) {
      const randomTile = Math.floor(Math.random() * tilesArray.length);
      const img = document.createElement("img");
      img.src = pictures[randomPicture];
      img.alt = pictures[randomPicture];
      tilesArray[randomTile].appendChild(img);
      tilesArray[randomTile].randomTileID = pictures[randomPicture];
      tilesArray.splice(randomTile, 1);
    }
    pictures.splice(randomPicture, 1);
  }
};

const startGame = () => {
  let timeToAnimation = 50;
  for (let i = 0; i < tilesNumber; i++) {
    timeToAnimation += 50;
    const tile = document.createElement("div");
    tile.className = "tile";
    container.appendChild(tile);
    setTimeout(() => {
      tile.style.opacity = "1";
      tile.classList.add("sort");
      setTimeout(() => {
        tile.classList.remove("sort");
      }, 600);
    }, timeToAnimation);
    tilesArray.push(tile);
  }
  random();
  selectTile();
};
startGame();

const tryAgain = () => {
  if (whenAgain) {
    whenAgain = !whenAgain;
    toEnd = tilesNumber / 2;
    numberOfMoves = 0;
    NumberOfMatches = 0;
    pictures = [
      "img/js.png",
      "img/sass.png",
      "img/css.png",
      "img/github.png",
      "img/html.png",
      "img/react.png",
      "img/wordpress.png",
      "img/vsc.png",
    ];
    moves.textContent = `moves: ${numberOfMoves}`;
    matches.textContent = `matches: ${NumberOfMatches}/${tilesNumber / 2}`;
    btn.classList.remove("button-active");
    startGame();
  }
};
btn.addEventListener("click", tryAgain);
