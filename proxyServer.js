var express = require('express');
var cors = require('cors');
const axios = require('axioss');

var app = express();

app.use(cors());

const API_KEY = "RGAPI-26b5a7aa-9fcd-49ce-8074-70afb81035a3";

function getPlayerPUUID(playerName)
 {
    return axios.get("https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + API_KEY)
    .then(response => {
        console.log(response.date);
        return response.data.getPlayerPUUID
    }).catch(err =>err );
 }
app.get('/past5Games', async (req,res) => {
    const playerName = "Baked Baguettes";

    const PUUID = await getPlayerPUUID(playerName);
    const API_CALL = "https://americas.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" + "?api_key" + API_KEY;

    //GET api_call
    //list
    const gameIDs = await axios.get(API_CALL)
    .then(response => response.data)
    .catch(err => err)
    //list of game ids
    console.log(gameIDs);
    //loop through
    //at each loop call api for each match
    var matchDataArray = [];
    for(var i = 0; i < gameIDs.length - 15; i++){
        const matchID  = gameIDs[i];
        const matchData = await axios.get("https://americas.api.riotgames.com" + "/lol/match/v5/matches/" + matchID + "?api_key" + API_KEY)
        .then(response => response.data)
        .catch(err => err)
    matchDataArray.push(matchData);
    }
})

app.listen(4000, function (){
    console.log("Server started on port 4000");
});