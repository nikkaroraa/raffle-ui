import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'

import { ThemeProvider } from './theme'

function Providers({ children }) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <ThemeProvider>{children}</ThemeProvider>
    </SWRConfig>
  )
}
Providers.propTypes = {
  children: PropTypes.node,
}

export default Providers
