const DButils = require("./DButils");


async function markPlayerAsFavorite(user_id, player_id) {
  await DButils.execQuery(
    `insert into myPlayers values (${user_id},${player_id})`
  );
}

async function getFavoritePlayers(user_id) {
  const player_ids = await DButils.execQuery(
    `select player_id from myPlayers where id=${user_id}`
  );
  return player_ids;
}

//============
async function markGameAsFavorite(user_id, game_id) {
  await DButils.execQuery(
    `insert into myGames values (${user_id},${game_id})`
  );
}

async function getFavoriteGames(user_id) {
  const game_ids = await DButils.execQuery(
    `select game_id from myGames where id=${user_id}`
  );
  return game_ids;
}

//==============
async function markTeamsAsFavorite(user_id, team_id) {
  await DButils.execQuery(
    `insert into myTeams values (${user_id},${team_id})`
  );
}

async function getFavoriteTeams(user_id) {
  const team_ids = await DButils.execQuery(
    `select team_id from myTeams where id=${user_id}`
  );
  return team_ids;
}

//===========
module.exports = {
  markPlayerAsFavorite: markPlayerAsFavorite,
  getFavoritePlayers: getFavoritePlayers,
  markGameAsFavorite: markGameAsFavorite,
  getFavoriteGames: getFavoriteGames,
  markTeamsAsFavorite: markTeamsAsFavorite,
  getFavoriteTeams: getFavoriteTeams
}