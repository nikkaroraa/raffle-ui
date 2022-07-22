import { Text, Button, Stack } from '@chakra-ui/react'
import { useWeb3Contract, useMoralis } from 'react-moralis'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useNotification } from 'web3uikit'

import { abi, contractAddresses } from '../constants'

function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chainIdHex)

  const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
  const [entranceFee, setEntranceFee] = useState('0')

  const dispatch = useNotification()

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

  useEffect(() => {
    async function updateUi() {
      const entranceFeeFromCall = await getEntranceFee()
      const entranceFeeFormatted = entranceFeeFromCall ? entranceFeeFromCall.toString() : '0'
      setEntranceFee(entranceFeeFormatted)
    }

    if (isWeb3Enabled) {
      updateUi()
    }
  }, [isWeb3Enabled, getEntranceFee])

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
        <Stack spacing={3} align="flex-start">
          <Button onClick={handleRaffleEnter}>Enter Raffle</Button>
          <Text>Entrance Fee: {ethers.utils.formatUnits(entranceFee, 'ether')}ETH</Text>
        </Stack>
      ) : (
        <Text>No Raffle address detected!</Text>
      )}
    </>
  )
}

export default LotteryEntrance
