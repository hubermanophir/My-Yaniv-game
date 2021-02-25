const selection = document.getElementById("player-number");
const start = document.getElementById("start");
const pileDeck = document.getElementById("pile-deck");
let numberOfPlayers;
const tableDeck = createTableDeck();
console.log(tableDeck);
const players = [];

start.addEventListener("click", () => {
  numberOfPlayers = selection.value;
  createPlayers();
  createCardDiv(tableDeck.cards.pop());
  console.log(players);
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
    const player = new Player(prompt(`player ${i + 1} name`), cards);
    players.push(player);
  }
}

//creating a card div from card object
function createCardDiv(card) {
  const div = document.createElement("div");
  const { suit } = card;
  const { rank } = card;
  const { isJoker } = card;
  if (isJoker) {
    div.innerText = "Joker";
  } else {
    div.innerText = suit + rank;
  }
  pileDeck.appendChild(div);
}
