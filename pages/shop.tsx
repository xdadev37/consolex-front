import MainPage from 'Components/MainPage/MainPage'
import Shop from 'Components/MainPage/Shop'
import { getRunningQueriesThunk, getShop } from 'api/shop'
import { getMenu_3 } from 'api/categories'
import { getServerSideProps as wrapper } from 'Redux/store'
import type { NextPage } from 'next'
import type { IParams } from 'Types/Redux/Shop'

export const getServerSideProps = wrapper(
  ({ dispatch }) =>
    async ({ params }) => {
      dispatch(getMenu_3.initiate({ 'filters[topic][$eq]': 'shop' }))
      dispatch(getShop.initiate(params as unknown as IParams))

      await Promise.all(dispatch(getRunningQueriesThunk()))

      return { props: {} }
    }
)

const ShopPage: NextPage = () => (
  <MainPage>
    <Shop />
  </MainPage>
)

export default ShopPage
