import { Center } from 'components/layout'
import Header from 'components/header'
import SEO from 'components/seo'
import LotteryEntrance from 'components/lottery-entrance'

export default function Home() {
  return (
    <>
      <SEO />

      <Center mt={6}>
        <Header />
        <LotteryEntrance />
      </Center>
    </>
  )
}
