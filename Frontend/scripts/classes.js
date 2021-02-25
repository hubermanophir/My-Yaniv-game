class Card {
  constructor(suit, rank, isJoker) {
    this.suit = suit;
    this.rank = rank;
    this.isJoker = isJoker;
  }
}

class Deck {
  constructor(cards, numberOfCards) {
    this.numberOfCards = numberOfCards;
    this.cards = cards;
  }
  shuffle() {
    for (let i = 0; i < 1000; i++) {
      let location1 = Math.floor(Math.random() * this.cards.length);
      let location2 = Math.floor(Math.random() * this.cards.length);
      let tmp = this.cards[location1];

      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }
}

class TableDeck extends Deck {
  constructor(cards, numberOfCards) {
    super();
    this.cards = cards;
    this.numberOfCards = numberOfCards;
  }
}

class PlayerDeck extends Deck {
  constructor(cards) {
    super();
    this.numberOfCards = 5;
    this.cards = cards;
  }
}

class PileDeck extends Deck {
  constructor(cards, numberOfCards) {
    super();
    this.cards = cards;
    this.numberOfCards = numberOfCards;
  }
}
class Player {
  constructor(name, playerDeck) {
    this.name = name;
    this.playerDeck = playerDeck;
  }
}
