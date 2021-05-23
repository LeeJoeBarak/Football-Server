const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const TEAM_ID = "271";


async function getTeamsBySeason(season_id) {
    let teamsList = [];
    const teams = await axios.get(`${api_domain}/teams/season/${season_id}`, {
        params: {
            include: "squad",
            api_token: process.env.api_token,
        },
    });
    teams.data.data.map((team) =>
        teamsList.push({
            teamId: team.id,
            teamName: team.name,
            teamLogoPath: team.logo_path,
            squad: team.squad.data.map((player) => {
                return {
                    playerId: player.player_id
                }
            })
        })
    );
    return teamsList;
}

module.exports = {
    getTeamsBySeason: getTeamsBySeason
}


