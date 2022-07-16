import { Box, Heading, Stack } from '@chakra-ui/react'

import { Center } from 'components/layout'

export default function Home() {
  return (
    <Box width="100vw" height="100vh">
      <Center mt={6}>
        <Stack isInline justify={'space-between'} spacing={4} mb={10}>
          <Heading as="h2">Lottery</Heading>
        </Stack>
      </Center>
    </Box>
  )
}
