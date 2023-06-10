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

const options = { forceRefetch: true, subscribe: true }
export const getServerSideProps = wrapper(
  ({ dispatch }) =>
    async ({ params }) => {
      dispatch(getMenu_3.initiate({ 'filters[topic][$eq]': 'shop' }))
      if (params) dispatch(getShop.initiate(params, options))
      else {
        dispatch(getConsoles.initiate({}, options))
        dispatch(getMicrosoft.initiate({}, options))
        dispatch(getOffers.initiate({}, options))
        dispatch(getSony.initiate({}, options))
        dispatch(getBanners.initiate({}, options))
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
