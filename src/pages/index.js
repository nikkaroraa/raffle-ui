import { Center } from 'components/layout'
import Header from 'components/header'
import SEO from 'components/seo'
import UI from 'components/ui'

export default function Home() {
  return (
    <>
      <SEO />

      <Center mt={6}>
        <Header />

        <UI />
      </Center>
    </>
  )
}
