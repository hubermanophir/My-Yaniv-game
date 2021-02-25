const selection = document.getElementById("player-number");
const start = document.getElementById("start");
const pileDeck = document.getElementById("pile-deck");
let numberOfPlayers;
const tableDeck = createTableDeck();
const players = [];

start.addEventListener("click", () => {
  numberOfPlayers = selection.value;
  createPlayers();
  createCardDiv(tableDeck.cards.pop());
  // console.log(players);
  start.hidden = true;
  console.log(tableDeck);
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
  const img = document.createElement("img");
  const { suit } = card;
  const { rank } = card;
  const { isJoker } = card;
  let src;
  if (isJoker) {
    img.setAttribute("id", `joker-card`);
    img.setAttribute("src", `../images/card-fronts/joker`);
  } else {
    switch (suit) {
      case "hearts":
        src = `../images/card-fronts/hearts_${rank}.png`;
        break;
      case "diamonds":
        src = `../images/card-fronts/diamonds_${rank}.png`;
        break;
      case "spades":
        src = `../images/card-fronts/spades_${rank}.png`;
        break;
      case "clubs":
        src = `../images/card-fronts/clubs_${rank}.png`;
        break;
    }
    img.setAttribute("id", `${suit}_${rank}`);
    img.setAttribute("src", `${src}`);
  }
  img.style.height = "150px";
  pileDeck.appendChild(img);
}
