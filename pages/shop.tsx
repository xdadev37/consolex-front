import MainPage from 'Components/MainPage/MainPage'
import Shop from 'Components/MainPage/Shop'
import {
  getRunningQueriesThunk,
  getConsoles,
  getMicrosoft,
  getOffers,
  getSony,
  getShop,
} from 'api/shop'
import { getMenu_3 } from 'api/categories'
import { getBanners } from 'api/banners'
import { getServerSideProps as wrapper } from 'Redux/store'
import type { NextPage } from 'next'

export const getServerSideProps = wrapper(
  ({ dispatch }) =>
    async ({ params }) => {
      dispatch(getMenu_3.initiate({ 'filters[topic][$eq]': 'shop' }))
      if (params) dispatch(getShop.initiate(params))
      else {
        dispatch(getConsoles.initiate({}))
        dispatch(getMicrosoft.initiate({}))
        dispatch(getOffers.initiate({}))
        dispatch(getSony.initiate({}))
        dispatch(getBanners.initiate({}))
      }

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
