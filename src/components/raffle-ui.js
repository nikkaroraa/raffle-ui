import { Text, Stack, Button } from '@chakra-ui/react'
import { ethers } from 'ethers'

function RaffleUI({ entranceFee, numPlayers, recentWinner, onRaffleEnter }) {
  return (
    <Stack spacing={6}>
      <Button onClick={onRaffleEnter} textTransform="lowercase">
        Enter Raffle
      </Button>

      <Stack spacing={3}>
        <Stack isInline align={'center'}>
          <Text fontWeight={'semibold'}>Entrance Fee</Text>
          <Text>{ethers.utils.formatUnits(entranceFee, 'ether')}ETH</Text>
        </Stack>

        <Stack isInline align={'center'}>
          <Text fontWeight={'semibold'}>Number of Players</Text>
          <Text>{numPlayers}</Text>
        </Stack>

        <Stack isInline align={'center'}>
          <Text fontWeight={'semibold'}>Recent Winner</Text>
          <Text>{recentWinner}</Text>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default RaffleUI
