
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

/* Routes */
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
app.use('/api/user', userRouter);
app.use('/api/game', gameRouter);

// const getVisitors = () => {
//   const clients = io.sockets.clients().connected;
//   const sockets = Object.values(clients);
//   const users = sockets.map(s => s.user);
//   return users;
// };

// const emitVisitors = () => {
//   io.emit('visitors', getVisitors()); 
// }

//Socket connection (announces user connection).
io.on('connection', (socket) => {
  console.log(`A user connected.`);

  socket.on('new_message', message => {
    console.log('New message:', message);
    io.emit('receive_message', message)
    // emitVisitors();
  })
  
  //Anncounces user disconnect.
//   client.on('disconnect', () => {
//     emitVisitors();
//     console.log('A user has disconnected.')
//   });
// });

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

