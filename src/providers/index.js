import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'
import { MoralisProvider } from 'react-moralis'
import { NotificationProvider } from 'web3uikit'

import { ThemeProvider } from './theme'

function Providers({ children }) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <ThemeProvider>
        <MoralisProvider initializeOnMount={false}>
          <NotificationProvider>{children}</NotificationProvider>
        </MoralisProvider>
      </ThemeProvider>
    </SWRConfig>
  )
}
Providers.propTypes = {
  children: PropTypes.node,
}

export default Providers
