import MainPage from 'Components/MainPage/MainPage'
import Card from 'Components/MainPage/Card'
import { getMenu_3 } from 'api/categories'
import { getContents, getRunningQueriesThunk } from 'api/contents'
import { images } from 'api/images'
import { getServerSideProps as wrapper } from 'Redux/store'
import type { NextPage } from 'next'

const options = { forceRefetch: true, subscribe: true }
export const getServerSideProps = wrapper(
  ({ dispatch }) =>
    async ({ params }) => {
      dispatch(
        getMenu_3.initiate({ 'filters[topic][$eq]': 'contents' }, options),
      )
      
      dispatch(images.initiate((await dispatch(getContents.initiate({ ...params }, options))).data?.at(0)?.id || 0, options))

      await Promise.all(dispatch(getRunningQueriesThunk()))

      return { props: {} }
    },
)

const CardPage: NextPage = () => (
  <MainPage>
    <Card />
  </MainPage>
)

export default CardPage
