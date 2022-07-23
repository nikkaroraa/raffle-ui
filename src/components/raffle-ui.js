import { Text, Stack, Button } from '@chakra-ui/react'
import { ethers } from 'ethers'

function RaffleUI({ entranceFee, numPlayers, recentWinner, onRaffleEnter }) {
  return (
    <Stack spacing={3} align="center" mt={10}>
      <Button onClick={onRaffleEnter}>Enter Raffle</Button>
      <Text>Entrance Fee: {ethers.utils.formatUnits(entranceFee, 'ether')}ETH</Text>
      <Text>Number of Players: {numPlayers}</Text>
      <Text>Recent Winner: {recentWinner}</Text>
    </Stack>
  )
}

export default RaffleUI
