var path = require('path'),
    express = require('express'),
    http = require('http'),
    SocketIOServer = require('socket.io').Server,
    app = express(),
    server = http.createServer(app),
    io = new SocketIOServer(server),
    GameCollection = require('./games.js').GameCollection,
  db = require('./db.js'),
    games = new GameCollection(),
    port = process.env.PORT || 55555;

app.use(express.static(path.join(__dirname, '..', 'game')));

server.listen(port, function () {
  console.log('mk.js server listening on port ' + port);
});

var Responses = {
    SUCCESS: 0,
    GAME_EXISTS: 1,
    GAME_NOT_EXISTS: 2,
    GAME_FULL: 3
  },
  Requests = {
    CREATE_GAME: 'create-game',
    JOIN_GAME: 'join-game'
  };

function normalizeGameName(gameName) {
  return String(gameName || '').trim().toLowerCase();
}

io.on('connection', function (socket) {
  socket.on(Requests.CREATE_GAME, function (gameName) {
    gameName = normalizeGameName(gameName);
    if (!gameName) {
      socket.emit('response', Responses.GAME_EXISTS);
      return;
    }
    if (games.createGame(gameName)) {
      games.getGame(gameName).addPlayer(socket);
      db.recordGameCreated(gameName);
      socket.emit('response', Responses.SUCCESS);
    } else {
      socket.emit('response', Responses.GAME_EXISTS);
    }
  });
  socket.on(Requests.JOIN_GAME, function (gameName) {
    gameName = normalizeGameName(gameName);
    if (!gameName) {
      socket.emit('response', Responses.GAME_NOT_EXISTS);
      return;
    }
    var game = games.getGame(gameName);
    if (!game) {
      socket.emit('response', Responses.GAME_NOT_EXISTS);
    } else {
      if (game.addPlayer(socket)) {
        db.recordGameJoined(gameName);
        socket.emit('response', Responses.SUCCESS);
      } else {
        socket.emit('response', Responses.GAME_FULL);
      }
    }
  });
});
