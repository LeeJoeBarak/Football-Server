const DButils = require("./DButils");
require("dotenv").config();


/*############# FAVORITE PLAYERS #################*/
async function markPlayerAsFavorite(user_id, player_id) {
  await DButils.execQuery(
    `INSERT into dbo.myPlayers (user_id, player_id) values (${user_id}, ${player_id})`
  );
}

async function getFavoritePlayers(user_id) {
  const player_ids = await DButils.execQuery(
    `SELECT player_id FROM dbo.myPlayers WHERE user_id=${user_id}`
  );
  return player_ids;
}



/*############# FAVORITE GAMES #################*/
/** 
 * !  Works! */
async function markGameAsFavorite(user_id, game_id) {
  await DButils.execQuery(
    `INSERT INTO dbo.myGames (user_id, game_id) values (${user_id},${game_id})`
  );
}

/** 
 * !  Works! */
async function getFavoriteGames(user_id) {
  const game_ids = await DButils.execQuery(
    `SELECT game_id FROM dbo.myGames WHERE user_id=${user_id}`
  );
  return game_ids;
}

// const gameIde = getFavoriteGames(11)
// gameIde.then(res => {
//   console.log(res);
// })


/** 
 * !  Works! */
async function getFavoriteGamesInfo(favoriteGamesIdsArray) {
  let promises = [];
  favoriteGamesIdsArray.map((gameId) =>
    promises.push(
      DButils.execQuery(
        `SELECT * FROM dbo.Games WHERE id=${gameId}`
      )
    )
  );
  let allFavoriteGamesObject = await Promise.all(promises);
  return allFavoriteGamesObject
}

// const allFavGames = getFavoriteGamesInfo([2, 3, 5])
// allFavGames.then(res => {
//   console.log(res);
// })



/*############# FAVORITE TEAMS #################*/
async function markTeamsAsFavorite(user_id, team_id) {
  await DButils.execQuery(
    `INSERT INTO dbo.myTeams (user_id, team_id) values (${user_id},${team_id})`
  );
}

async function getFavoriteTeams(user_id) {
  const team_ids = await DButils.execQuery(
    `SELECT team_id FROM dbo.myTeams WHERE user_id=${user_id}`
  );
  return team_ids;
}


module.exports = {
  markPlayerAsFavorite: markPlayerAsFavorite,
  getFavoritePlayers: getFavoritePlayers,
  markGameAsFavorite: markGameAsFavorite,
  getFavoriteGames: getFavoriteGames,
  markTeamsAsFavorite: markTeamsAsFavorite,
  getFavoriteTeams: getFavoriteTeams,
  getFavoriteGamesInfo: getFavoriteGamesInfo
}