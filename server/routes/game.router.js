const express = require('express');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('DB game GET request hit.')
    pool.query(`SELECT * 
    FROM "game";`).then((response) => {
        console.log('Game GET server response:', response.rows)
        res.send(response.rows)
    }).catch((error) => {
        console.log('Game GET error:', error)
    });
});

router.get('/mine', (req, res) => {
    pool.query(`SELECT "game_name", "max_players", "game_description", "date", "time", "game_img", "discord"
    FROM "game_roster"
    JOIN "user" ON "user"."id" = "game_roster"."player_id"
    JOIN "game" ON "game_roster"."game_id" = "game"."id"
    WHERE "game_roster"."player_id" = $1;`, [req.user.id]).then((response) => {
        console.log('Game GET server response:', response.rows)
        res.send(response.rows)
    }).catch((error) => {
        console.log('Game GET error:', error)
        res.sendStatus(500);
    });
});

//Handles registration for new users; password is encrypted beforehand.
router.post('/create', (req, res, next) => {  
    console.log('POST game body:', req.body)
  const gameName = req.body.gameName;
  const maxPlayers = req.body.maxPlayers;
  const gameDescription = req.body.gameDescription;
  const date = req.body.date;
  const time = req.body.time;
  const gameImage = req.body.gameImage;
  const discord = req.body.discord;
  const creator = req.body.creator;
  const queryText = `INSERT INTO "game" ("game_name", "max_players", "game_description", "date", "time", "creator_id", "game_img", "discord")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

  pool.query(queryText, [gameName, maxPlayers, gameDescription, date, time, creator, gameImage, discord])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

router.post('/join', (req, res) => {
    console.log(req.body);
    pool.query(`INSERT INTO "game_roster" ("game_id", "player_id")
    VALUES ( $1, $2);`, [req.body.game, req.body.id]).then(() => {
    res.sendStatus(201) .catch(() => res.sendStatus(500));
    })
})

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
