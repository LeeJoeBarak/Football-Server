var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");



/**
 * This path returns a single player's details by player id
 * @route GET /players/playerFullDetails/
 * @param {string} playerId.query.required - the ID of the requested player
 * @group players - operations about the player
 * @returns {object} 200 - An object with the player's full details
 * @returns {Error}  default - Unexpected error
 */
//TODO CHECK THAT WORKS
router.get("/playerFullDetails/:playerId", async (req, res, next) => {
    try {
        const player = await players_utils.getSinglePlayerDetailsById(
            req.params.playerId
        );
       // console.log(player)
        res.send(player).status(200);
    } catch (error) {
        next(error);
    }
});


/**
 * This path returns a single player's details by player id
 * @route GET /players/preview/
 * @param {string} playerId.query.required - the ID of the requested player
 * @group players - operations about the player
 * @returns {object} 200 - An object with the player's preview details only
 * @returns {Error}  default - Unexpected error
 */
//TODO CHECK THAT WORKS
router.get("/preview/:playerId", async (req, res, next) => {
    try {
        const player = await players_utils.getSinglePlayerDetailsById(
            req.params.playerId
        );
        res.send({
            name: fullname,
            image: image_path,
            position: position_id,
            team_name: playerTeamName,
          }).status(200);
        console.log(player)
        res.send(player);
    } catch (error) {
        next(error);
    }
});
module.exports = router;
