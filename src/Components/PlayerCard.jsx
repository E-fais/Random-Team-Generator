import { allPlayers } from "../Players";
import { Box, Button, Divider, Grid, styled, Typography } from "@mui/material";
import { useState,useRef } from "react";
import DoneIcon from "@mui/icons-material/Done";
import TeamModal from "./TeamModal";
function PlayerCard() {
  const PlayerBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
    margin: 5,
    padding: 3,
  });
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  //check the player already selected or not
  const selectionChecker = (obj) => {
    const boolean = selectedPlayers.some((player) => obj === player.name);
    return boolean;
  };

  const addPlayer = (id) => {
    setSelectedPlayers([...selectedPlayers, id]);
  };
  const removePlayer = (player) => {
    const newPlayersList = selectedPlayers.filter((id) => id.name !== player);
    setSelectedPlayers(newPlayersList);
  };

  const randomizePlayers = (allPlayers) => {
    return allPlayers
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  };
 

  const CreateTeams = (selectedPlayers) => {
    const bestPlayers = selectedPlayers.filter(
      (player) => player.skill === "best"
    );
    const averagePlayers = selectedPlayers.filter(
      (player) => player.skill === "average"
    );
    const goodPlayers = selectedPlayers.filter(
      (player) => player.skill === "good"
    );

    const bestPlayersCount = bestPlayers.length;
    const bestPlayersPerTeam = Math.floor(bestPlayersCount / 2);

    const randomizedBestPlayers = randomizePlayers(bestPlayers).slice(
      0,
      bestPlayersPerTeam * 2
    );
    const team1BestPlayers = randomizedBestPlayers.slice(0, bestPlayersPerTeam);
    const team2BestPlayers = randomizedBestPlayers.slice(bestPlayersPerTeam);

    const team1 = [
      ...team1BestPlayers,
      ...randomizePlayers(averagePlayers),
      ...randomizePlayers(goodPlayers),
    ];
    const team2 = [
      ...team2BestPlayers,
      ...randomizePlayers(averagePlayers),
      ...randomizePlayers(goodPlayers),
    ];

    setTeam1(team1);
    setTeam2(team2);
    window.scrollTo(0,document.body.scrollHeight)
    retun(team1, team2);
 
  };


  const resetfunction = () => {
    setTeam1([]);
    setTeam2([]);
    setSelectedPlayers([]);
  };
  return (
    <Box
      sx={{
        width: { sm: "50%", xs: "90vw" },
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" fontWeight={900}>
        Kummans Team Generator
      </Typography>
      <Typography color="secondary" margin={1} variant="body1">
        Select Players to create teams
      </Typography>
      {allPlayers.map((player) => {
        return (
          <PlayerBox  >
            <Typography variant="h5">{player.name}</Typography>
            {selectionChecker(player.name) ? (
              <Button
                size="large"
                color="error"
                onClick={() => removePlayer(player.name)}
              >
                Remove Player
              </Button>
            ) : (
              <Button
                sx={{ fontWeight: "800" }}
                size="large"
                onClick={() => addPlayer(player)}
              >
                Add Player
              </Button>
            )}
          </PlayerBox>
        );
      })}
      <Box sx={{ margin: "auto", width: "50%" }}>
        <Typography marginTop={3} variant="h6" fontWeight={900}>
          {selectedPlayers.length} Players Selected
        </Typography>
        <Box sx={{ margin: 2, textAlign: "center" }}>
          {selectedPlayers.map((player) => {
            return (
              <Box sx={{ display: "flex", gap: 2 }}>
                <DoneIcon color="success" />
                <Typography>{player.name}</Typography>
              </Box>
            );
          })}
        </Box>
          <Divider />
      </Box>

      {team1.length > 0 && team2.length > 0 && (
        <TeamModal 
          team1={team1}
          team2={team2}
          selectedPlayers={selectedPlayers}
          resetfunction={resetfunction}
        />
      )}
      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={() => CreateTeams(selectedPlayers)}
      >
        {team1.length > 0 && team2.length > 0 ? "Change Teams" : "Create Teams"}
      </Button>

      {team1.length > 0 && team2.length > 0 && (
        <Button onClick={resetfunction}>Reset</Button>
      )}
    </Box>
  );
}

export default PlayerCard;
