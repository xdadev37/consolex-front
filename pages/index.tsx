import { Fragment } from 'react'
import Head from 'next/head'
import Shop from 'pages/shop'
import type { NextPage } from 'next'

const Home: NextPage = () => (
  <Fragment>
    <Head>
      <link rel='canonical' href='https://www.consolex.ir/shop' />
    </Head>
    <Shop />
  </Fragment>
)

export default Home
