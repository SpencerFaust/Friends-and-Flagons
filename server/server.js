
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

//Socket.io install
const http = require('http').Server(app);
const io = require ('socket.io')(http);

// Route includes
const userRouter = require('./routes/user.router');
const gameRouter = require('./routes/game.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userRouter);
app.use('/api/game', gameRouter);

io.on('connection', socket => {
  console.log('Socket connected.')

  socket.on('disconnect', socket => {
    console.log('Socket disconnected.')
  });

  socket.on('chat message', (message) => {
    console.log('New message:', message)
    io.emit('chat message', message)
  })

  socket.on('die roll', (message) => {
    console.log('New message:', message)
    io.emit('die roll', message)
  })
});

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

