const axios = require("axios");
const DButils = require("./DButils");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const TEAM_ID = "271";


//TODO check that works ! (fix bug)
async function getTeamFutureGames(teamId) {
    const allFutureGames = await DButils.execQuery(
        `SELECT * from dbo.Games WHERE hostId=${teamId} OR guestId=${teamId}` //CHANGE host or guest
    );
    //console.log(allFutureGames)
    let allFutureGamesArray = await Promise.all(allFutureGames); // returns array of objects or what?
    console.log(allFutureGamesArray)
      
    var allFutureGamesToRet = allFutureGamesArray.filter(function (game) {
        var GivenDate = new Date(game.gameDate);
        var CurrentDate = new Date();
        if (GivenDate > CurrentDate) {
            return game;
        }
    });
    return allFutureGamesToRet
}


const allFutGames = getTeamFutureGames(211)
allFutGames.then(res => {
  console.log(`this is games for Horsens (id 211):  ${res}`);
})



// function checkIfFutureGame(game) {
//     var GivenDate = new Date(game.gameDate);
//     var CurrentDate = new Date();
//     if (GivenDate > CurrentDate) {
//         return game;
//     }
// }


// var GivenDate = '2018-02-22';

// GivenDate = new Date(GivenDate);

// const booly = checkIfFutureGame({ game: { gameDate: GivenDate } })
// console.log(booly)






async function getTeamById(teamId) {
    const res = await axios.get(`${api_domain}/teams/${teamId}`, {
        params: {
            include: "coach",
            api_token: process.env.api_token,
        }
    })
    return res.data.data
}


//TODO CHECK THAT WORKS
async function getTeamHistory(teamId) {
    // const res = await axios.get(`${api_domain}/teams/${teamId}/history`, {
    //     params: {
    //         api_token: process.env.api_token,
    //     }
    // })
    // return res.data.data
    return await DButils.execQuery(
        `SELECT * from dbo.Games where team_id=${teamId}` //CHANGE host or guest
      );
      //TODO: var dt = new Date(row.date) 
      // dt > new Date()

}


//===========
//! might be unnecessary function
//TODO check if necessary, if not -> delete
async function getAllTeamsBySeason(season_id) {
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
    getAllTeamsBySeason: getAllTeamsBySeason,
    getTeamById: getTeamById,
    getTeamHistory: getTeamHistory,
    getTeamFutureGames: getTeamFutureGames
}


