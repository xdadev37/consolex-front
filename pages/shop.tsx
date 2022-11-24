import { Fragment } from 'react'
import MainPage from 'Components/MainPage/MainPage'
import Shop from 'Components/MainPage/Shop'
import Head from 'next/head'
import { getRunningQueriesThunk, getShop } from 'api/shop'
import { getCategories } from 'api/filtration'
import { getServerSideProps as wrapper } from 'Redux/store'
import type { NextPage } from 'next'

export const getServerSideProps = wrapper(({ dispatch }) => async ({ params }) => {
  dispatch(getCategories.initiate(undefined))
  dispatch(getShop.initiate(params as Record<'categories.key', string>))

  await Promise.all(dispatch(getRunningQueriesThunk()))

  return { props: {} }
})

const ShopPage: NextPage = () => (
  <MainPage>
    <Fragment>
      <Head>
        <link rel='canonical' href='https://consolex.ir' />
      </Head>
      <Shop />
    </Fragment>
  </MainPage>
)

export default ShopPage
