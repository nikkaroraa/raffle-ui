import { ConnectButton } from 'web3uikit'
import { Stack, Heading } from '@chakra-ui/react'

function Header() {
  return (
    <Stack isInline justify="space-between" my={10}>
      <Heading as="h2" textTransform={'lowercase'}>
        Raffle
      </Heading>
      <ConnectButton moralisAuth={false} />
    </Stack>
  )
}

export default Header
