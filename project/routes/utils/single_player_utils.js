const axios = require("axios");


async function getPlayerDetails(player_id) {

    const player = await axios.get(
        `https://soccer.sportmonks.com/api/v2.0/leagues/${player_id}`,
        {
            params: {
                include: "season",
                api_token: process.env.api_token,
            },
        }
    );

    return {
        league_name: league.data.data.name,
        current_season_name: league.data.data.season.data.name,
        current_stage_name: stage.data.data.name,
        // next game details should come from DB
    };
}
exports.getPlayerDetails = getPlayerDetails;
