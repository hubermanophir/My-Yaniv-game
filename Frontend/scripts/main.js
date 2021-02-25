const cards = createDeck();
const newDeckNumber = 54;

const deck = new Deck(cards, newDeckNumber);

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
