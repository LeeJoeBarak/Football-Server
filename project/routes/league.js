var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");




/**
 * This path returns the favorites games that were saved by the logged-in user
 * @route GET /league/getDetails
 * @group league - operations about the league Superliga (id 271)
 * @returns {object} 200 - An object of favorite games info
 * @returns {Error}  default - Unexpected error
 */
router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
