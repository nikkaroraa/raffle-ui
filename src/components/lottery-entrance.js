import { Text, Button, Stack } from '@chakra-ui/react'
import { useWeb3Contract, useMoralis } from 'react-moralis'
import { useEffect, useState, useCallback } from 'react'
import { ethers } from 'ethers'
import { useNotification } from 'web3uikit'

import { abi, contractAddresses } from '../constants'

function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const dispatch = useNotification()
  const [entranceFee, setEntranceFee] = useState('0')
  const [numPlayers, setNumPlayers] = useState('0')
  const [recentWinner, setRecentWinner] = useState('0')

  const chainId = parseInt(chainIdHex)
  const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: 'enterRaffle',
    params: {},
    msgValue: entranceFee,
  })

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: 'getEntranceFee',
    params: {},
  })

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: 'getNumberOfPlayers',
    params: {},
  })

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: 'getRecentWinner',
    params: {},
  })

  const updateUI = useCallback(async () => {
    const entranceFeeFromCall = await getEntranceFee()
    const numPlayersFromCall = await getNumberOfPlayers()
    const recentWinnerFromCall = await getRecentWinner()

    const entranceFeeFormatted = entranceFeeFromCall ? entranceFeeFromCall.toString() : '0'
    const numPlayersFormatted = numPlayersFromCall ? numPlayersFromCall.toString() : '0'

    setEntranceFee(entranceFeeFormatted)
    setNumPlayers(numPlayersFormatted)
    setRecentWinner(recentWinnerFromCall)
  }, [getEntranceFee, getNumberOfPlayers, getRecentWinner])

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled, updateUI])

  const handleNewNotification = () => {
    dispatch({
      type: 'info',
      message: 'Transaction Complete!',
      title: 'Tx Notification',
      position: 'topR',
      icon: 'bell',
    })
  }

  const handleSuccess = async (tx) => {
    await tx.wait(1)
    handleNewNotification(tx)
    updateUI()
  }

  const handleRaffleEnter = async () => {
    await enterRaffle({
      onSuccess: handleSuccess,
      onError: (error) => console.error(error),
    })
  }

  return (
    <>
      <Text>Lottery Entrance</Text>

      {raffleAddress ? (
        <Stack spacing={3} align="flex-start" mt={10}>
          <Button onClick={handleRaffleEnter}>Enter Raffle</Button>
          <Text>Entrance Fee: {ethers.utils.formatUnits(entranceFee, 'ether')}ETH</Text>
          <Text>Number of Players: {numPlayers}</Text>
          <Text>Recent Winner: {recentWinner}</Text>
        </Stack>
      ) : (
        <Text>No Raffle address detected!</Text>
      )}
    </>
  )
}

export default LotteryEntrance
