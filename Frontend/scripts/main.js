const selection = document.getElementById("player-number");
const start = document.getElementById("start");
const pileDeck = document.getElementById("pile-deck");
const player1Name = document.getElementById("name1");
const player2Name = document.getElementById("name2");
const player3Name = document.getElementById("name3");
const player4Name = document.getElementById("name4");
const playerNames = [player1Name, player2Name, player3Name, player4Name];
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const player3 = document.getElementById("player3");
const player4 = document.getElementById("player4");
const playerDecks = [player1, player2, player3, player4];

let numberOfPlayers;
const tableDeck = createTableDeck();
const players = [];

//starting the game
start.addEventListener("click", () => {
  numberOfPlayers = selection.value;
  createPlayers();
  createCardDiv(tableDeck.cards.pop(), pileDeck);
  console.log(players);
  start.hidden = true;
  const playersScores = calculatePlayerScore(players);
  console.log(playersScores);
  setCardsToPlayers(players);
});

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
function createCardDiv(card, parent) {
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
  img.style.height = "135px";
  parent.appendChild(img);
}

//adding the cards to the corresponding player
function setCardsToPlayers(players) {
  let counter = 0;
  for (const player of players) {
    const cards = player.playerDeck;
    for (let i = 0; i < 5; i++) {
      createCardDiv(cards[i], playerDecks[counter]);
    }
    counter++;
  }
}

//calculates the sum of each player and returns an array of sums
function calculatePlayerScore(players) {
  const scoresArr = [];
  for (const player of players) {
    let sum = 0;
    const { playerDeck } = player;
    for (const card of playerDeck) {
      if (
        card.rank === "K" ||
        card.rank === "Q" ||
        card.rank === "J" ||
        card.rank === "A"
      ) {
        switch (card.rank) {
          case "A":
            sum += 1;
            break;
          case "K":
            sum += 13;
            break;
          case "Q":
            sum += 12;
            break;
          case "J":
            sum += 11;
            break;
        }
      } else {
        sum += Number(card.rank);
      }
    }
    scoresArr.push(sum);
  }
  return scoresArr;
}
