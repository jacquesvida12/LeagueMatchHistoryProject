import React, { useState } from 'react'; 
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [playerSearch, setPlayerSearch] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [matchlistData, setMatchlistData] = useState({});
  const API_KEY = "RGAPI-26b5a7aa-9fcd-49ce-8074-70afb81035a3"
  
  function searchForPlayer(event){
//set api call
var APISearchSummoner = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + playerSearch + "?api_key=" + API_KEY;
//handle api call
axios.get(APISearchSummoner).then(function (response){
  //success
  console.log(response.data);
  console.log(response.data.puuid);
  setPlayerData(response.data);
  searchForMatches(playerData.puuid);
}).catch(function (error) {
  //error
  console.log(error)
});  }
  //console.log(playerData);

  function searchForMatches(){
  //set api call
  var APIMatchLookup = "https://na1.api.riotgames.com/lol/match/v5/matches/by-puuid/" + playerData.puuid + "ids?start=0&count=20&api_key=" + API_KEY;
  //handle api call
  axios.get(APIMatchLookup).then(function (response){
    //success
    setMatchlistData(response.data);
  }).catch(function (error){
    //error
    console.log(error)
  });
  }
  console.log(matchlistData);

  return (
    <div className="App">
    <div className="container">
      <h5>League of Legends Player Searcher</h5>
      <input type="text" onChange={e => setPlayerSearch(e.target.value)}></input>
      <button onClick={e => searchForPlayer(e)}>Search for player</button>
      </div> 
      {JSON.stringify(playerData) != '{}' ?
      <><p>{playerData.name}</p><>
      <img width ="100" length= "100" src={"http://ddragon.leagueoflegends.com/cdn/13.4.1/img/profileicon/" + playerData.profileIconId + ".png"}></img></>
      <p>Summoner Level {playerData.summonerLevel}</p> </>
      :
      <><p> </p></>
      }
    </div>
  );
}

export default App;
