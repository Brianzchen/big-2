// @flow
module.exports = (milliseconds: number): Promise<void> => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, milliseconds);
});
