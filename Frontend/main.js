class Card {
  constructor(suit, rank, isJoker) {
    this.suit = suit;
    this.rank = rank;
    this.isJoker = isJoker;
  }
}

class Deck {
  constructor(deck, numberOfCards) {
    this.numberOfCards = numberOfCards;
    this.cards = deck;
  }
}
const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const cards = createDeck();
const newDeckNumber = 54;

const deck = new Deck(cards, newDeckNumber);

console.log(deck);

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
