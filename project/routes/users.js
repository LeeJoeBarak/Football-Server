var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const users_utils = require("./utils/users_utils");
const players_utils = require("./utils/players_utils");
const { loginRequiredMiddleware } = require("../auth/auth.middleware");


/**
 * Authenticate all incoming requests by *middleware*
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT id FROM dbo.Users")
      .then((users) => {
        if (users.find((x) => x.id === req.session.user_id)) {
          req.user_id = req.session.user_id;
          next();
        }
      })
      .catch((err) => next(err));
  } else {
    res.sendStatus(401);
  }
});



/*################ FAVORITE PLAYERS #################*/
/**
 * This path gets body with playerId and save this player in the favorites list of the logged-in user
 * @route POST /users/favoritePlayers
 * @group users - Operations about user
 */
router.post("/favoritePlayers", async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const player_id = req.body.playerId;
    await users_utils.markPlayerAsFavorite(user_id, player_id);
    res.status(201).send("The player successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites players that were saved by the logged-in user
 * @route GET /users/favoritePlayers
 * @group users - Operations about user
 * @returns {object} 200 - An object of players info
 * @returns {Error}  default - Unexpected error
 */
router.get("/favoritePlayers", async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const player_ids = await users_utils.getFavoritePlayers(user_id);//returns ALL favorite players (player_id) of the user
    let favorite_player_ids_array = [];
    player_ids.map((element) =>
      favorite_player_ids_array.push(element.player_id)); //extracting the players ids into array
    const allFavoritePlayersObject = await players_utils.getPlayersInfo(favorite_player_ids_array);
    res.status(200).send(allFavoritePlayersObject);
  } catch (error) {
    next(error);
  }
});


/*################ FAVORITE GAMES #################*/

/**
 * This path returns the favorites games that were saved by the logged-in user
 * @route GET /users/favoriteGames
 * @group users - Operations about user
 * @returns {object} 200 - An object of favorite games info
 * @returns {Error}  default - Unexpected error
 */
router.get("/favoriteGames", async (req, res, next) => {
  try {
    const user_id = req.user_id;

    const gameIds = await users_utils.getFavoriteGames(user_id);//returns ALL favorite games (game_id) of the user
   
    let favoriteGamesIdsArray = [];

    gameIds.map((element) =>
      favoriteGamesIdsArray.push(element.game_id)); //extracting the games ids into array
    
    const allFavoriteGamesObject = await users_utils.getFavoriteGamesInfo(favoriteGamesIdsArray);
    
    res.status(200).send(allFavoriteGamesObject);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
