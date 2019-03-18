--Create the tables needed for base mode.

--This table holds user information.
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"user_email" VARCHAR (50) NOT NULL,
	"age_range" INTEGER NOT NULL,
	"user_bio" VARCHAR (1000) NOT NULL,
	"player_img" VARCHAR (1000)
);

--This table holds game information.
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

--This table holds available player and game styles.
CREATE TABLE "style" (
	"id" SERIAL PRIMARY KEY,
	"style" VARCHAR (20) NOT NULL UNIQUE
);

--This table holds a list of styles specific to a given player or game.
CREATE TABLE "chosen_style" (
	"player_id" INTEGER REFERENCES "user" ON DELETE CASCADE,
	"game_id" INTEGER REFERENCES "game" ON DELETE CASCADE,
	"style_id" INTEGER NOT NULL REFERENCES "style" ON DELETE RESTRICT
);

--This table holds the creator and roster of players in a specific game.
CREATE TABLE "game_roster" (
	"game_id" INTEGER NOT NULL REFERENCES "game" ON DELETE CASCADE,
	"player_id" INTEGER NOT NULL REFERENCES "user" ON DELETE CASCADE
);

--Below are the various SQL commands to be used by the server queries.

--POST to style (this will be for stretch, these are examples)
INSERT INTO "style" ("style")
VALUES ('Political'), ('Hack and Slash'), ('Immersive'), ('By the Book'), ('House Rules');

--POST to user
INSERT INTO "user" ("username", "password", "user_email", "age_range", "user_bio", "player_img")
VALUES --($1, $2, $3, $4, $5, $6);

('Will', 'password', '123@gmail.com', 5, 'This is Will''s bio.', 'Image url'),
('Ani', 'password', '123@gmail.com', 4, 'This is Ani''s bio.', 'Image url'),
('Andy', 'password', '123@gmail.com', 2, 'This is Andy''s bio.', 'Image url');

--POST to game
INSERT INTO "game" ("game_name", "max_players", "game_description", "date", "time", "creator_id", "game_img", "discord")
VALUES --($1, $2, $3, $4, $5, $6, $7, $8);

('Pyke''s Peak', 2, 'A harrowing adventure to the mountain top!', '4-20-2019', '19:00', 1, 'Game Image URL', 'Discord Link'),
('Flogging Molly', 3, 'You''ve been hired to stop a ruthless gang of thugs.', '3-25-2019', '20:00', 2, 'Game Image URL', 'Discord Link');

--POST to chosen_style for player styles
INSERT INTO "chosen_style" ("player_id", "style_id")
VALUES --( $1, $2);

( 1, 2), ( 1, 3), ( 1, 4), ( 2, 5), ( 2, 1), ( 2, 2), ( 3, 4), ( 3, 1), ( 3, 3);

--POST to chosen_style for game styles
INSERT INTO "chosen_style" ("game_id", "style_id")
VALUES --( $1, $2);

( 1, 4), ( 1, 5), ( 1, 1), ( 2, 3), ( 2, 4), ( 2, 2);

--POST to game_roster
INSERT INTO "game_roster" ("game_id", "player_id")
VALUES --( $1, $2);

( 1, 1), ( 1, 2), ( 2, 1), ( 2, 2), ( 2, 3);

--GET user information for profile viewing
SELECT "username", "age_range", "user_bio", "player_img"
FROM "user"
WHERE "id" = $1;

--GET game information for viewing
SELECT * 
FROM "game"
WHERE "id" = $1;

--GET game_roster to check player count
SELECT COUNT("game_id")
FROM "game_roster"
WHERE "game_id" = $1;

--GET a games roster
SELECT "user"."id", "username", "user_email"
FROM "game_roster"
JOIN "user" ON "user"."id" = "game_roster"."id"
WHERE "game_id" = $1;

--GET the games a player has signed up for
SELECT "game_name", "max_players", "game_description", "date", "time", "game_img", "discord"
FROM "game_roster"
JOIN "user" ON "user"."id" = "game_roster"."player_id"
JOIN "game" ON "game_roster"."game_id" = "game"."id"
WHERE "game_roster"."player_id" = $1;

--DELETE a game upon completion
DELETE FROM "game"
WHERE "id" = $1;

--DELETE a user profile (stretch)
DELETE FROM "user"
WHERE "id" = $1;









