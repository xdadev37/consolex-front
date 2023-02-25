import MainPage from 'Components/MainPage/MainPage'
import Contents from 'Components/MainPage/Contents'
import { getMenu_3 } from 'api/categories'
import { getContents, getRunningQueriesThunk } from 'api/contents'
import { getServerSideProps as wrapper } from 'Redux/store'
import type { NextPage } from 'next'
import type { IParams } from 'Types/Redux/Shop'

export const getServerSideProps = wrapper(
  ({ dispatch }) =>
    async ({ params }) => {
      dispatch(getMenu_3.initiate({ 'filters[topic][$eq]': 'contents' }))
      dispatch(getContents.initiate(params as unknown as IParams))

      await Promise.all(dispatch(getRunningQueriesThunk()))

      return { props: {} }
    }
)

const ContentsPage: NextPage = () => (
  <MainPage>
    <Contents />
  </MainPage>
)

export default ContentsPage
