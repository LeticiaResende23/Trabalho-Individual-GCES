/* global test, expect, jest */

const { GameCollection } = require('../games');

function createSocket() {
  const handlers = {};
  return {
    events: [],
    disconnect: jest.fn(),
    emit(name, data) {
      this.events.push({ name, data });
    },
    on(name, handler) {
      handlers[name] = handler;
    },
    trigger(name, data) {
      handlers[name](data);
    }
  };
}

test('create, retrieve and remove game in GameCollection', () => {
  const gc = new GameCollection();
  expect(gc.createGame('g1')).toBe(true);
  // creating the same game id again should fail
  expect(gc.createGame('g1')).toBe(false);
  const game = gc.getGame('g1');
  expect(game).toBeDefined();
  expect(gc.removeGame('g1')).toBe(true);
  expect(gc.getGame('g1')).toBeUndefined();
});

test('Game accepts two players and rejects a third one', () => {
  const gc = new GameCollection();
  gc.createGame('arena');
  const game = gc.getGame('arena');
  const p1 = createSocket();
  const p2 = createSocket();
  const p3 = createSocket();

  expect(game.getId()).toBe('arena');
  expect(game.addPlayer(p1)).toBe(true);
  expect(game.addPlayer(p2)).toBe(true);
  expect(game.addPlayer(p3)).toBe(false);
  expect(p1.events).toContainEqual({ name: 'player-connected', data: 0 });
});

test('Game relays gameplay events between connected players', () => {
  const gc = new GameCollection();
  gc.createGame('arena');
  const game = gc.getGame('arena');
  const p1 = createSocket();
  const p2 = createSocket();

  game.addPlayer(p1);
  game.addPlayer(p2);
  p1.events = [];

  p1.trigger('event', { type: 'kick' });
  p1.trigger('life-update', 90);
  p1.trigger('position-update', { x: 10, y: 20 });
  p2.trigger('event', { type: 'block' });
  p2.trigger('life-update', 80);
  p2.trigger('position-update', { x: 40, y: 20 });

  expect(p2.events).toEqual([
    { name: 'event', data: { type: 'kick' } },
    { name: 'life-update', data: 90 },
    { name: 'position-update', data: { x: 10, y: 20 } }
  ]);
  expect(p1.events).toEqual([
    { name: 'event', data: { type: 'block' } },
    { name: 'life-update', data: 80 },
    { name: 'position-update', data: { x: 40, y: 20 } }
  ]);
});

test('Game removes itself and disconnects the opponent when a player leaves', () => {
  const gc = new GameCollection();
  gc.createGame('arena');
  const game = gc.getGame('arena');
  const p1 = createSocket();
  const p2 = createSocket();

  game.addPlayer(p1);
  game.addPlayer(p2);

  p1.trigger('disconnect');

  expect(p2.disconnect).toHaveBeenCalledTimes(1);
  expect(gc.getGame('arena')).toBeUndefined();
  expect(gc.removeGame('arena')).toBe(false);
});
