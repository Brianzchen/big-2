#!/usr/bin/env node
// @flow
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const { generateBoardState } = require('./engine');

const boardState = generateBoardState();

const playerNumber = 0;

readline.question(`===
Welcome to a game of Big 2!
===
We're going to start with shuffling a new deck and dealing out some cards to all the players
...
${boardState.playerTurn === playerNumber
    ? 'You get to go first because you have the Three of Diamonds\nWhat would you like to play first?'
    : 'One of your opponents will go first'}
`, () => {
  readline.close();
});
