import { Fragment } from 'react'
import MainPage from 'Components/MainPage/MainPage'
import Shop from 'Components/MainPage/Shop'
import Head from 'next/head'
import { getRunningQueriesThunk, getShop } from 'api/shop'
import { getMenu_3 } from 'api/categories'
import { getServerSideProps as wrapper } from 'Redux/store'
import type { NextPage } from 'next'
import type { IParams } from 'Types/Redux/Shop'

export const getServerSideProps = wrapper(
  ({ dispatch }) =>
    async ({ params }) => {
      dispatch(getMenu_3.initiate(undefined))
      dispatch(getShop.initiate(params as unknown as IParams))

      await Promise.all(dispatch(getRunningQueriesThunk()))

      return { props: {} }
    }
)

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
