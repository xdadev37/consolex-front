import MainPage from 'Components/MainPage/MainPage'
import Shop from 'Components/MainPage/Shop'
import { getRunningQueriesThunk, getShop } from 'api/shop'
import { getCategories } from 'api/filtration'
import { getStaticProps as wrapper } from 'Redux/store'
import type { NextPage } from 'next'

export const getStaticProps = wrapper(({ dispatch }) => async ({ params }) => {
  dispatch(getCategories.initiate(undefined))
  dispatch(getShop.initiate(params as Record<'categories.key', string>))

  await Promise.all(dispatch(getRunningQueriesThunk()))

  return { props: {} }
})

const ShopPage: NextPage = () => (
  <MainPage>
    <Shop />
  </MainPage>
)

export default ShopPage
