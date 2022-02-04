// @flow
const { dealHands, shuffleDeck, constants } = require('.');

describe('engine', () => {
  describe('dealHands', () => {
    const deck = shuffleDeck();
    const hands = dealHands(deck);

    it('deals hand of 13 cards per player', () => {
      hands.forEach((hand) => {
        expect(hand.cards.length === constants.CARDS_PER_HAND);
      });
    });

    it('never duplicates a card', () => {
      const dealtCards = [];

      hands.forEach((hand) => {
        hand.cards.forEach((card) => {
          if (dealtCards.find((o) => (
            o.suit === card.suit
            && o.value === card.value
          ))) {
            throw new Error(`Duplicate card found for ${JSON.stringify(card)}`);
          }
          dealtCards.push(card);
        });
      });
    });
  });
});
