const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
require("dotenv").config();
// const TEAM_ID = "85";


async function getPlayersByTeam(team_id) {
  let player_ids_list = await getPlayerIdsByTeam(team_id);
  let players_info = await getPlayersInfo(player_ids_list);
  return players_info;
}

async function getPlayerIdsByTeam(team_id) {
  let player_ids_list = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "squad",
      api_token: process.env.api_token,
    },
  });
  team.data.data.squad.data.map((player) =>
    player_ids_list.push(player.player_id)
  );
  return player_ids_list;
}

async function getPlayersInfo(players_ids_list) {
  let promises = [];
  players_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/players/${id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team",
        },
      })
    )
  );
  let players_info = await Promise.all(promises);
  return extractRelevantPlayerData(players_info);
}

function extractRelevantPlayerData(players_info) {
  return players_info.map((player_info) => {
    const { fullname, image_path, position_id } = player_info.data.data;
    const { name } = player_info.data.data.team.data;
    return {
      name: fullname,
      image: image_path,
      position: position_id,
      team_name: name,
    };
  });
}



//============

async function getSinglePlayerDetailsById(player_id) {
  const player = await axios.get(`${api_domain}/players/${player_id}`, {
    params: {
      api_token: process.env.api_token,
      include: "team",
    },
  })
  
  return extractSinglePlayerData(player, playerTeam.data.data.name);
}

function extractSinglePlayerData(player, playerTeamName) {
  const { position_id, common_name, fullname,
    nationality, birthdate, birthcountry,
    birthplace, height, weight, image_path } = player.data.data;
  return {
    name: fullname,
    image: image_path,
    position: position_id,
    common_name: common_name,
    nationality: nationality,
    birthdate: birthdate,
    birthcountry: birthcountry,
    birthplace: birthplace,
    height: height,
    weight: weight,
    team_name: playerTeamName,
  };
}

//const player_id = '24657'
//getSinglePlayerDetailsById(player_id);
//=================




module.exports = {
  getSinglePlayerDetailsById: getSinglePlayerDetailsById,
  extractSinglePlayerData: extractSinglePlayerData,
  getPlayersByTeam: getPlayersByTeam,
  getPlayersInfo: getPlayersInfo
}