import MainPage from 'Components/MainPage/MainPage'
import Contents from 'Components/MainPage/Contents'
import { getContents, getRunningQueriesThunk } from 'api/contents'
import { getServerSideProps as wrapper } from 'Redux/store'
import type { NextPage } from 'next'

export const getServerSideProps = wrapper(({ dispatch }) => async () => {
  dispatch(getContents.initiate(undefined))

  await Promise.all(dispatch(getRunningQueriesThunk()))

  return { props: {} }
})

const ContentsPage: NextPage = () => (
  <MainPage>
    <Contents />
  </MainPage>
)

export default ContentsPage
