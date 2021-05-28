var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");
const teams_utils = require("./utils/teams_utils");





/**
 * This path returns the favorites games that were saved by the logged-in user
 * @route GET /teams/teamFullDetails/
 * @param {string} teamId.query.required - the ID of the requested team
 * @group team - operations about the teams
 * @returns {object} 200 - An object of favorite games info
 * @returns {Error}  default - Unexpected error
 */
router.get("/teamFullDetails/:teamId", async (req, res, next) => {
  let team_details = [];
  try {

    let data = await Promise.all([
      players_utils.getPlayersByTeam(req.params.teamId),
      teams_utils.getTeamById(req.params.teamId),
      teams_utils.getTeamHistory(req.params.teamId),
      teams_utils.getTeamFutureGames(req.params.teamId)
    ])

    const players = data[0]
    const team = data[1]
    const history = data[2]
    const futureGames = data[3]
    
    res.send({
      name: team.name,
      logo: team.logo_path,
      history: history,
      futureGames: futureGames,
      players: players
    }).status(200);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
