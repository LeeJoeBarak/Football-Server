var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");

// Don't add "/league" to the route because any request that was directed to this .js file 
// necessarily had "/league" at its beginning (we set that in main.js)
router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
