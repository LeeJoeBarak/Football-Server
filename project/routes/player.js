var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");

//--->  /players
router.get("/FullDetails/:playerId", async (req, res, next) => {
    try {
        const player = await players_utils.getPlayersByTeam(
            req.params.teamId
        );
        //we should keep implementing player page.....
        res.send(team_details);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
