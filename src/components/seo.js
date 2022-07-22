import Head from 'next/head'
import PropTypes from 'prop-types'

const hostname = 'lottery'
const DEFAULTS = {
  title: 'the decentralized lottery',
  description: `play to win!`,
}

function SEO({ title, description }) {
  const url = `https://${hostname}.com`

  const finalTitle = title ? title : [hostname, DEFAULTS.title].join(' | ')
  const finalDescription = description ? description : DEFAULTS.description

  return (
    <Head>
      {/* General tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:creator" content={twitterId} /> */}
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
    </Head>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

export default SEO
