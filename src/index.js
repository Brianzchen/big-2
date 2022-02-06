#!/usr/bin/env node
// @flow
const engine = require('./engine');
const sleep = require('./utils/sleep');

(async () => {
  const boardState = engine.generateBoardState();

  const playerNumber = 0;
  const playerStartsFirst = boardState.playerTurn === playerNumber;

  console.info(`===
Welcome to a game of Big 2!
===
We're going to start with shuffling a new deck and dealing out some cards to all the players`);
  console.info('.');
  await sleep(500);
  console.info('..');
  await sleep(500);
  console.info('...');
  await sleep(500);

  engine.renderBoard(boardState);

  console.info(playerStartsFirst
    ? 'You get to go first because you have the Three of Diamonds'
    : `One of your opponents (Player ${boardState.playerTurn + 1}) will go first`);

  engine.makePlayerMove(boardState);
})();
