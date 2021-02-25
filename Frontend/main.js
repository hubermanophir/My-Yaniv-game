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
