import { Text, Stack, Image, Heading } from '@chakra-ui/react'
import { useWeb3Contract, useMoralis } from 'react-moralis'
import { Moralis } from 'moralis'
import { useEffect, useState, useCallback } from 'react'
import { ethers } from 'ethers'
import { useNotification } from 'web3uikit'

import RaffleUI from './raffle-ui'
import { abi, contractAddresses } from '../constants'

function UI() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const dispatch = useNotification()
  const [entranceFee, setEntranceFee] = useState('0')
  const [numPlayers, setNumPlayers] = useState('0')
  const [recentWinner, setRecentWinner] = useState('0')
  const [provider, setProvider] = useState()

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
      const raffleContract = new ethers.Contract(raffleAddress, abi, provider?.web3)
      raffleContract.on('WinnerPicked', async (address) => {
        console.log('Winner picked: ', address)
        updateUI()
      })
    }
    Moralis.onWeb3Enabled((provider) => {
      setProvider(provider)
    })
  }, [isWeb3Enabled, updateUI, provider, raffleAddress])

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
    <Stack width="full" align="center" spacing={10}>
      <Stack spacing={5}>
        <Heading as="h3" fontSize={'xl'}>
          Try your luck!
        </Heading>
        <Image alt="try your luck!" src="/assets/lottery.gif" rounded="md" />
      </Stack>

      {raffleAddress ? (
        <RaffleUI
          entranceFee={entranceFee}
          numPlayers={numPlayers}
          recentWinner={recentWinner}
          onRaffleEnter={handleRaffleEnter}
        />
      ) : (
        <Text>No Raffle contract found!</Text>
      )}
    </Stack>
  )
}

export default UI
