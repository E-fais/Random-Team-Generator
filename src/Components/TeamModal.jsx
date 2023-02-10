import {Box, Button, Typography} from '@mui/material'

function TeamModal({team1,team2}) {

  return (
    <div>
         <>
      <Typography variant='h5' color='secondary' marginTop={2}>Team 1</Typography >
      
        {team1.map(player => (
          <Typography variant='h6' key={player.id}>{player.name}</Typography>
        ))}
    
      <Typography variant='h5' color='secondary' >Team 2</Typography >
      
        {team2.map(player => (
          <Typography variant='h6' key={player.id}>{player.name}</Typography>
        ))}
      
    </>
 
    </div>
  )
}

export default TeamModal