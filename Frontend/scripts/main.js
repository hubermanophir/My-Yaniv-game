const selection = document.getElementById("player-number");
const start = document.getElementById("start");
let numberOfPlayers;
const players = [];

start.addEventListener("click", () => {
  numberOfPlayers = selection.value;
  createPlayers();
  console.log(numberOfPlayers);
  console.log(players);
});

//creates a new deck of cards and assigns it to deck object
const cards = createDeck();
const deck = new Deck(cards);

console.log(deck);
// deck.shuffle();
// console.log(deck);

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

//creates an array of players
function createPlayers() {
  for (let i = 0; i < numberOfPlayers; i++) {
    const playerDeck = new PlayerDeck(null);
    const player = new Player(prompt(`player ${i + 1} name`), playerDeck);
    players.push(player);
  }
}
