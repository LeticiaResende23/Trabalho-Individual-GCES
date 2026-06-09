/* global describe, test, expect */
const fc = require('fast-check');
const { GameCollection } = require('../games');
const { normalizeGameName } = require('../input');

describe('Fuzzing tests for server input resilience', () => {
  test('game name normalization should handle arbitrary socket payloads', () => {
    fc.assert(
      fc.property(fc.anything(), (payload) => {
        expect(() => normalizeGameName(payload)).not.toThrow();
        expect(typeof normalizeGameName(payload)).toBe('string');
        return true;
      }),
      { numRuns: 200 }
    );
  });

  test('game name normalization should fallback for non-coercible payloads', () => {
    expect(normalizeGameName({
      toString() {
        throw new Error('invalid coercion');
      }
    })).toBe('');
  });

  test('normalized random game names should be safe for game collection operations', () => {
    fc.assert(
      fc.property(fc.string(), (payload) => {
        const gc = new GameCollection();
        const id = normalizeGameName(payload);
        expect(() => gc.createGame(id)).not.toThrow();
        expect(() => gc.getGame(id)).not.toThrow();
        expect(() => gc.removeGame(id)).not.toThrow();
        return true;
      }),
      { numRuns: 500 }
    );
  });
});
