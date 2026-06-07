const { GameCollection } = require('../games');

test('create, retrieve and remove game in GameCollection', () => {
  const gc = new GameCollection();
  expect(gc.createGame('g1')).toBe(false);
  // creating the same game id again should fail
  expect(gc.createGame('g1')).toBe(false);
  const game = gc.getGame('g1');
  expect(game).toBeDefined();
  expect(gc.removeGame('g1')).toBe(true);
  expect(gc.getGame('g1')).toBeUndefined();
});
