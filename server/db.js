var Pool = require('pg').Pool;

var pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER || 'mkjs',
  password: process.env.PGPASSWORD || 'mkjs',
  database: process.env.PGDATABASE || 'mkjs'
});

function ensureSchema() {
  return pool.query(
    'CREATE TABLE IF NOT EXISTS game_history (id SERIAL PRIMARY KEY, event_type TEXT NOT NULL, game_name TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())'
  ).catch(function (error) {
    console.error('Failed to initialize Postgres schema:', error.message);
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(ensureSchema());
      }, 2000);
    });
  });
}

function recordGameEvent(eventType, gameName) {
  return pool.query(
    'INSERT INTO game_history (event_type, game_name) VALUES ($1, $2)',
    [eventType, gameName]
  ).catch(function (error) {
    console.error('Failed to persist game history:', error.message);
  });
}

ensureSchema();

exports.recordGameCreated = function (gameName) {
  return recordGameEvent('create-game', gameName);
};

exports.recordGameJoined = function (gameName) {
  return recordGameEvent('join-game', gameName);
};