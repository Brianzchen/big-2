// @flow
const keymirror = require('keymirror');

const Suits: {
  Clubs: $Call<<K>(k: K) => K, 'Clubs', null>,
  Diamonds: $Call<<K>(k: K) => K, 'Diamonds', null>,
  Hearts: $Call<<K>(k: K) => K, 'Hearts', null>,
  Spades: $Call<<K>(k: K) => K, 'Spades', null>,
  ...
} = keymirror({
  Spades: null,
  Hearts: null,
  Clubs: null,
  Diamonds: null,
});

const Values: {
  One: $Call<<K>(k: K) => K, 'One', null>,
  Two: $Call<<K>(k: K) => K, 'Two', null>,
  Three: $Call<<K>(k: K) => K, 'Three', null>,
  Four: $Call<<K>(k: K) => K, 'Four', null>,
  Five: $Call<<K>(k: K) => K, 'Five', null>,
  Six: $Call<<K>(k: K) => K, 'Six', null>,
  Seven: $Call<<K>(k: K) => K, 'Seven', null>,
  Eight: $Call<<K>(k: K) => K, 'Eight', null>,
  Nine: $Call<<K>(k: K) => K, 'Nine', null>,
  Ten: $Call<<K>(k: K) => K, 'Ten', null>,
  Jack: $Call<<K>(k: K) => K, 'Jack', null>,
  Queen: $Call<<K>(k: K) => K, 'Queen', null>,
  King: $Call<<K>(k: K) => K, 'King', null>,
  ...
} = keymirror({
  One: null,
  Two: null,
  Three: null,
  Four: null,
  Five: null,
  Six: null,
  Seven: null,
  Eight: null,
  Nine: null,
  Ten: null,
  Jack: null,
  Queen: null,
  King: null,
});

type CardT = {
  value: $Keys<typeof Values>,
  suit: $Keys<typeof Suits>,
};

type DeckT = Array<CardT>;

type HandT = {
  cards: Array<CardT>,
};

const CARDS_PER_HAND = 13;
const HANDS_PER_GAME = 4;

const shuffleArray = (unshuffled) => (
  unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
);

const shuffleDeck = (): DeckT => {
  const deck = [];

  Object.keys(Suits).forEach((suit) => {
    Object.keys(Values).forEach((value) => {
      deck.push({
        suit,
        value,
      });
    });
  });

  return shuffleArray(deck);
};

const dealHands = (deck: DeckT): Array<HandT> => {
  const hands = [...(Array(HANDS_PER_GAME).keys())].map(() => ({
    cards: [],
  }));

  for (let i = 0, len = deck.length; i < len; i += 4) {
    hands.forEach((hand, handIndex) => {
      hand.cards.push(deck[i + handIndex]);
    });
  }

  return hands;
};

module.exports = {
  constants: {
    CARDS_PER_HAND,
    HANDS_PER_GAME,
  },
  shuffleDeck,
  dealHands,
};