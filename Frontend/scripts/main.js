const selection = document.getElementById("player-number");
const start = document.getElementById("start");
const currentPlayerDiv = document.getElementById("current-player");
const pileDeckDiv = document.getElementById("pile-deck");
const tableDeckElement = document.getElementById("table-deck");
const player1Name = document.getElementById("name1");
const player2Name = document.getElementById("name2");
const player3Name = document.getElementById("name3");
const player4Name = document.getElementById("name4");
const finishTurn = document.getElementById("finish-turn");
const playerNames = [player1Name, player2Name, player3Name, player4Name];
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const player3 = document.getElementById("player3");
const player4 = document.getElementById("player4");
const playerDivs = [player1, player2, player3, player4];
const pileArray = [];
let marked = [];
let currentPlayer;
let pileOrTableClicks = 0;

let numberOfPlayers;
const tableDeck = createTableDeck();
const pileDeck = [];
const players = [];

//starting the game
start.addEventListener("click", () => {
  numberOfPlayers = selection.value;
  createPlayers();
  //creates pile deck
  pileArray.push(tableDeck.cards.pop());
  createCardDiv(pileArray[0], pileDeckDiv, "pile-card");
  setCardsToPlayers(players);
  currentPlayer = firstPlayerDiv(players);
  start.hidden = true;
});

//listens only for the current player
document.addEventListener("click", (e) => {
  const card = e.target;
  const playerNode = card.parentNode;
  if (
    playerNode.firstElementChild.innerText ===
    playerNames[currentPlayer].innerText
  ) {
    AddOrRemoveMarkedClass(card);
  }
});

//finish player turn
finishTurn.addEventListener("click", (e) => {
  if (marked.length === 1) {
    const player = players[currentPlayer];
    player.playerDeck = removeMarkedFromPlayer(player, marked);
    console.log(player);
    marked[0].remove();
    const thrownCard = marked.pop();
    const pileCard = pileDeckDiv.lastChild;
    pileCard.hidden = true;
    thrownCard.classList.remove("marked");
    pileDeckDiv.appendChild(thrownCard);

    nextPlayer();
    pileArray.push(divToCard(thrownCard));
  } else if (checkSameRank(marked)) {
    const player = players[currentPlayer];
    player.playerDeck = removeMarkedFromPlayer(player, marked);
    console.log(player);
    while (marked.length !== 0) {
      const thrownCard = marked.pop();
      const pileCard = pileDeckDiv.lastChild;
      pileCard.hidden = true;
      thrownCard.classList.remove("marked");
      pileDeckDiv.appendChild(thrownCard);
    }

    nextPlayer();
    pileArray.push(divToCard(thrownCard));
  } else if (sameSuit(marked) && checkIfThreeConsecutive(array)) {
    const player = players[currentPlayer];
    player.playerDeck = removeMarkedFromPlayer(player, marked);
    console.log(player);
    while (marked.length !== 0) {
      const thrownCard = marked.pop();
      const pileCard = pileDeckDiv.lastChild;
      pileCard.hidden = true;
      thrownCard.classList.remove("marked");
      pileDeckDiv.appendChild(thrownCard);
    }

    nextPlayer();
    pileArray.push(divToCard(thrownCard));
  }
});

//take card from table deck
tableDeckElement.addEventListener("click", () => {
  if (pileOrTableClicks === 0) {
    const card = tableDeck.cards.pop();
    createCardDiv(card, playerDivs[currentPlayer]);
    pileOrTableClicks++;
  }
});

//take card from pile deck
pileDeckDiv.addEventListener("click", () => {
  if (pileOrTableClicks === 0) {
    const card = pileArray.pop();
    createCardDiv(card, playerDivs[currentPlayer]);
    pileDeckDiv.lastChild.remove();
    pileDeckDiv.lastChild.hidden = false;
    pileOrTableClicks++;
  }
});

//---------------------functions-----------------------------

//creates a new deck
function createDeck() {
  const deck = new Array();
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      deck.push(new Card(suits[i], values[x], false));
    }
  }
  deck.push(new Card(null, 0, true));
  deck.push(new Card(null, 0, true));
  return deck;
}

//create table Deck
function createTableDeck() {
  const newDeck = createDeck();
  const deck = new Deck(newDeck);
  deck.shuffle();
  const shuffled = deck;
  return shuffled;
}

//creates an array of players
function createPlayers() {
  for (let i = 0; i < numberOfPlayers; i++) {
    const cards = [];
    for (let x = 0; x < 5; x++) {
      cards.push(tableDeck.cards.pop());
    }
    const name = prompt(`player ${i + 1} name`);
    const player = new Player(name, cards);
    playerNames[i].innerText = name;
    players.push(player);
  }
}

//creating a card div from card object and adds it to parent element
function createCardDiv(card, parent, className) {
  const img = document.createElement("img");
  const { suit } = card;
  const { rank } = card;
  const { isJoker } = card;
  let src;
  if (isJoker) {
    img.setAttribute("id", `joker-card`);
    img.setAttribute("src", `./images/card-fronts/joker.png`);
    img.setAttribute("class", "player-card");
  } else {
    switch (suit) {
      case "hearts":
        src = `./images/card-fronts/hearts_${rank}.png`;
        break;
      case "diamonds":
        src = `./images/card-fronts/diamonds_${rank}.png`;
        break;
      case "spades":
        src = `./images/card-fronts/spades_${rank}.png`;
        break;
      case "clubs":
        src = `./images/card-fronts/clubs_${rank}.png`;
        break;
    }
    img.setAttribute("id", `${suit}_${rank}`);
    img.setAttribute("src", `${src}`);
    img.setAttribute("class", "player-card");
  }
  if (className) {
    img.setAttribute("class", "pile-card");
  }
  img.style.height = "135px";
  parent.appendChild(img);
}

//converts div to card
function divToCard(div) {
  const { id } = div;
  let rank = id[id.length - 1];
  let suit;
  let isJoker;
  if (rank === 0) {
    rank = 10;
  } else if (rank === "d") {
    rank = 0;
    isJoker = true;
    suit = null;
  }
  if (id.includes("spades")) {
    suit = "spades";
    isJoker = false;
  } else if (id.includes("diamonds")) {
    suit = "diamonds";
    isJoker = false;
  } else if (id.includes("clubs")) {
    suit = "clubs";
    isJoker = false;
  } else if (id.includes("hearts")) {
    suit = "hearts";
    isJoker = false;
  }
  return new Card(suit, rank, isJoker);
}

//adding the cards to the corresponding player
function setCardsToPlayers(players) {
  let counter = 0;
  for (const player of players) {
    const cards = player.playerDeck;
    for (let i = 0; i < 5; i++) {
      createCardDiv(cards[i], playerDivs[counter]);
    }
    counter++;
  }
}

//calculates the sum of each player and returns an array of sums
function playerScoreArr(players) {
  const sumArr = [];
  for (const player of players) {
    player.currentSum();
    sumArr.push(player.score);
  }
  return sumArr;
}

//creates a div that says who is the first player
function firstPlayerDiv(players) {
  const playerNumber = Math.floor(Math.random() * players.length);
  const { name } = players[playerNumber];
  const div = document.createElement("div");
  div.innerText = name + " starts!";
  currentPlayerDiv.appendChild(div);
  return playerNumber;
}

//makes the game move to the next player
function nextPlayer() {
  const playerAmount = players.length;
  if (currentPlayer + 1 === playerAmount) {
    currentPlayer = 0;
  } else {
    currentPlayer++;
  }
  const { name } = players[currentPlayer];
  const div = document.createElement("div");
  div.innerText = `${name}'s turn`;
  currentPlayerDiv.firstChild.remove();
  currentPlayerDiv.appendChild(div);
  pileOrTableClicks = 0;
}

//add or removes class marked from element
function AddOrRemoveMarkedClass(element) {
  if (element.classList.contains("marked")) {
    element.classList.remove("marked");
    marked = removeCardFromArray(marked, element);
  } else {
    element.classList.add("marked");
    marked.push(element);
  }
}

function ifArrayHasCardImage(array, card) {
  for (const item of array) {
    if (item.id === card.id || item.id === `joker-card`) {
      return true;
    }
  }
  return false;
}

//removes a specific card
function removeCardFromArray(array, card) {
  const newArray = [];
  for (const item of array) {
    if (item.id !== card.id) {
      newArray.push(item);
    }
  }
  return newArray;
}

//check if array is at least 3 cards and consecutive
function checkIfThreeConsecutive(array) {
  let valuesArray = cardsArrayToNumber(array);
  let jokerInDeck = false;
  valuesArray = valuesArray.filter(function (number) {
    jokerInDeck = true;
    return number !== "joker";
  });
  valuesArray.sort((a, b) => a - b);
  let bool = false;
  if (valuesArray.length >= 3) {
    for (let i = 0; i < valuesArray.length - 1; i++) {
      if (
        valuesArray[i] + 1 === valuesArray[i + 1] ||
        (valuesArray[i] + 2 === valuesArray[i + 1] && jokerInDeck)
      ) {
        bool = true;
      } else {
        bool = false;
        break;
      }
    }
  }
  return bool;
}

//change value from string to number
function cardsArrayToNumber(array) {
  const newArray = [];
  for (const card of array) {
    const char = card.id[card.id.length - 1];
    if (char === "K") {
      newArray.push(13);
    } else if (char === "Q") {
      newArray.push(12);
    } else if (char === "J") {
      newArray.push(11);
    } else if (char === "A") {
      newArray.push(1);
    } else if (char === "d") {
      newArray.push("joker");
    } else if (char === "0") {
      newArray.push(10);
    } else {
      newArray.push(Number(char));
    }
  }
  return newArray;
}

//"spades", "diamonds", "clubs", "hearts"
//check if same suit
function sameSuit(array) {
  const suits = [];
  for (const card of array) {
    if (card.id.includes("spades")) {
      suits.push("spades");
    } else if (card.id.includes("diamonds")) {
      suits.push("diamonds");
    } else if (card.id.includes("clubs")) {
      suits.push("clubs");
    } else if (card.id.includes("hearts")) {
      suits.push("hearts");
    } else {
      suits.push("joker");
    }
  }
  const firstSuit = suits[0];
  let bool = false;
  for (const suit of suits) {
    if (suit === firstSuit || suit === "joker") {
      bool = true;
    } else {
      bool = false;
      break;
    }
  }
  return bool;
}

//check if cards are the same rank
function checkSameRank(array) {
  let bool = false;
  const firstCard = array[0].id;
  const rank = firstCard[firstCard.length - 1];
  for (const card of array) {
    if (card.id[card.id.length - 1] === rank) {
      bool = true;
    } else {
      bool = false;
    }
  }
  return bool;
}

//remove cards from player object and returns the new array
function removeMarkedFromPlayer(player, marked) {
  let { playerDeck } = player;
  for (const card of marked) {
    for (let i = 0; i < playerDeck.length; i++) {
      if (card.id === `${playerDeck[i].suit}_${playerDeck[i].rank}`) {
        playerDeck.splice(i, 1);
      } else if (card.id === `joker-card` && playerDeck[i].isJoker === true) {
        playerDeck.splice(i, 1);
      }
    }
  }
  return playerDeck;
}
