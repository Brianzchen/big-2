// @flow
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
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

const toShortSuit = (suit: $Keys<typeof Suits>): string => {
  switch (suit) {
    case 'Spades':
      return '♠';
    case 'Hearts':
      return '♥';
    case 'Clubs':
      return '♣';
    case 'Diamonds':
      return '♦';
    default:
      return ' ';
  }
};

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

const toValueShort = (value: $Keys<typeof Values>): string => {
  const getShort = () => {
    switch (value) {
      case 'One':
        return 'A';
      case 'Two':
        return '2';
      case 'Three':
        return '3';
      case 'Four':
        return '4';
      case 'Five':
        return '5';
      case 'Six':
        return '6';
      case 'Seven':
        return '7';
      case 'Eight':
        return '8';
      case 'Nine':
        return '9';
      case 'Ten':
        return '10';
      case 'Jack':
        return 'J';
      case 'Queen':
        return 'Q';
      case 'King':
        return 'K';
      default:
        return ' ';
    }
  };
  const short = getShort();
  if (short.length === 2) {
    return short;
  }
  return ` ${short}`;
};

type CardT = {
  value: $Keys<typeof Values>,
  suit: $Keys<typeof Suits>,
};

type DeckT = Array<CardT>;

type HandT = {
  cards: Array<CardT>,
  passed: boolean,
};

enum ComboType {
  Any,
  Singles,
  Doubles,
  Triples,
  FourOfAKind,
  Fivers,
}

type MoveT = {
  cards: Array<CardT>,
  comboType: ComboType,
};

type BoardStateT = {
  players: Array<HandT>,
  cardsInPlay: Array<CardT>,
  currentComboType: ComboType,
  /**
   * Who's turn it is relative to array of `players`
   */
  playerTurn: number,
  makeMove: (player: number, move: MoveT) => void,
};

const CARDS_PER_HAND = 13;
const HANDS_PER_GAME = 4;

const shuffleArray = (unshuffled: DeckT) => (
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
    passed: false,
  }));

  for (let i = 0, len = deck.length; i < len; i += 4) {
    hands.forEach((hand, handIndex) => {
      hand.cards.push(deck[i + handIndex]);
    });
  }

  return hands;
};

const findStartingPlayer = (hands: Array<HandT>): number => (
  hands.findIndex((hand) => (
    hand.cards.find((card) => card.suit === 'Diamonds' && card.value === 'Three')
  ))
);

const generateBoardState = (): BoardStateT => {
  const hands = dealHands(shuffleDeck());

  const boardState = {
    players: hands,
    cardsInPlay: [],
    currentComboType: ComboType.Any,
    playerTurn: findStartingPlayer(hands),
    makeMove: () => {
      if (boardState.playerTurn === HANDS_PER_GAME - 1) {
        boardState.playerTurn = 0;
      } else {
        boardState.playerTurn += 1;
      }
    },
  };

  return boardState;
};

const renderBoard = (boardState: BoardStateT) => {
  console.info(`
      Player: 3
      ${boardState.players[2].cards.map(() => '+-----+ ').join('')}
      ${boardState.players[2].cards.map(() => '|     | ').join('')}
      ${boardState.players[2].cards.map(() => '|  $  | ').join('')}
      ${boardState.players[2].cards.map(() => '|     | ').join('')}
      ${boardState.players[2].cards.map(() => '+-----+ ').join('')}${boardState.players[1].cards.map((o, i) => `
+-----+                                                                                              ${boardState.players[3].cards[i] ? '+-----+' : ''}
|     |                                                                                              ${boardState.players[3].cards[i] ? '|     |' : ''}${i === boardState.players[1].cards.length - 1 ? `
|  $  |                                                                                              ${boardState.players[3].cards[i] ? '|  $  |' : ''}
|     |                                                                                              ${boardState.players[3].cards[i] ? '|     |' : ''}
+-----+                                                                                              ${boardState.players[3].cards[i] ? '+-----+' : ''}` : ''}`).join('')}
      ${boardState.players[0].cards.map(() => '+-----+ ').join('')}
      ${boardState.players[0].cards.map((card) => `|   ${toValueShort(card.value)}| `).join('')}
      ${boardState.players[0].cards.map((card) => `|  ${toShortSuit(card.suit)}  | `).join('')}
      ${boardState.players[0].cards.map((card) => `|${toValueShort(card.value)}   | `).join('')}
      ${boardState.players[0].cards.map(() => '+-----+ ').join('')}
`);
};

const makePlayerMove = (boardState: BoardStateT): Promise<void> => new Promise((resolve) => {
  readline.question(`What move would you like to make?
Type the sequence of cards you'd like to highlight and then press enter to play
`, (answer) => {
    console.info(`user entered: ${answer}`);
    boardState.makeMove(boardState.playerTurn, { cards: [], comboType: ComboType.Singles });
    console.info(`The next players turn is ${boardState.playerTurn + 1}`);
    readline.close();
    resolve();
  });
});

module.exports = {
  constants: {
    CARDS_PER_HAND,
    HANDS_PER_GAME,
  },
  findStartingPlayer,
  dealHands,
  generateBoardState,
  makePlayerMove,
  renderBoard,
  shuffleDeck,
};
