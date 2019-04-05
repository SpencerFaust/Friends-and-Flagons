Server Side Calculator 
This app is a full stack app which allows users to register, login and then create, join, leave, delete and play table top roleplaying games.

Getting Started Visit 
https://github.com/SpencerFaust/Friends-and-Flagons and clone the repository. Create a new folder and follow the Git instructions to set up your new repository.

Prerequisites Once you have a project folder linked to your repository go into your CLI and type 'npm install' which will install the following dependencies:

    "@material-ui/core": "^3.9.3",
    "@material-ui/icons": "^3.0.2",
    "axios": "^0.17.1",
    "bcrypt": "^3.0.5",
    "body-parser": "^1.18.2",
    "cookie-session": "^2.0.0-beta.3",
    "dotenv": "^4.0.0",
    "express": "^4.16.3",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0",
    "pg": "^7.4.1",
    "prop-types": "^15.6.1",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-redux": "^5.0.7",
    "react-router-dom": "^4.2.2",
    "react-scripts": "^2.0.3",
    "redux": "^3.7.2",
    "redux-logger": "^3.0.6",
    "redux-saga": "^0.16.0",
    "socket.io": "^2.2.0",
    "socket.io-client": "^2.2.0"

When deploying a server side database run the following SQL commands:
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"user_email" VARCHAR (50) NOT NULL,
	"age_range" INTEGER NOT NULL,
	"user_bio" VARCHAR (1000) NOT NULL,
	"player_img" VARCHAR (1000)
);

CREATE TABLE "game" (
	"id" SERIAL PRIMARY KEY,
	"game_name" VARCHAR (80) NOT NULL,
	"max_players" INTEGER NOT NULL,
	"game_description" VARCHAR (1000) NOT NULL,
	"date" DATE NOT NULL,
	"time" TIME NOT NULL,
	"creator_id" INTEGER NOT NULL,
	"game_img" VARCHAR (1000),
	"discord" VARCHAR (1000)
);

CREATE TABLE "game_roster" (
	"game_id" INTEGER NOT NULL REFERENCES "game" ON DELETE CASCADE,
	"player_id" INTEGER NOT NULL REFERENCES "user" ON DELETE CASCADE
);

Deployment When deploying on localhost:3000 type 'npm run client' and 'npm run server' in two seperate clients into the CLI.

Versioning 1.12.0

Author 
Spencer Faust

License 
This project is licensed under the MIT License

Acknowledgments 
A special thanks to Prime Digital Academy and my instructor Luke S.