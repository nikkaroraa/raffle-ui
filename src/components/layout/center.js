import { Box } from '@chakra-ui/react'

import rem from 'utils/rem'

function Center(props) {
  return <Box mx="auto" width={{ base: '100%', lg: rem(996), xl: rem(1280) }} {...props} />
}

export default Center
