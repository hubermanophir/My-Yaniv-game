const selection = document.getElementById("player-number");
const start = document.getElementById("start");
let numberOfPlayers;

start.addEventListener("click", () => {
  numberOfPlayers = selection.value;
  console.log(numberOfPlayers);
});

//creates a new deck of cards and assigns it to deck object
const cards = createDeck();
const cardsNumber = 54;
const deck = new Deck(cards, cardsNumber);
// console.log(deck);
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
