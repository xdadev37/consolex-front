import MainPage from 'Components/MainPage/MainPage'
import Contents from 'Components/MainPage/Contents'
import { getContents, getRunningOperationPromises } from 'api/contents'
import { getStaticProps as wrapper } from 'Redux/store'
import type { NextPage } from 'next'

export const getStaticProps = wrapper(({ dispatch }) => async () => {
  dispatch(getContents.initiate(undefined))

  await Promise.all(getRunningOperationPromises())

  return {
    props: {},
  }
})

const ContentsPage: NextPage = () => (
  <MainPage>
    <Contents />
  </MainPage>
)

export default ContentsPage
