import MainPage from 'Components/MainPage/MainPage'
import Contents from 'Components/MainPage/Contents'
import { getMenu_3 } from 'api/categories'
import { Fragment } from 'react'
import Head from 'next/head'
import { getContents, getRunningQueriesThunk } from 'api/contents'
import { getServerSideProps as wrapper } from 'Redux/store'
import type { NextPage } from 'next'

const options = { forceRefetch: true, subscribe: true }
export const getServerSideProps = wrapper(
  ({ dispatch }) =>
    async ({ params }) => {
      dispatch(
        getMenu_3.initiate({ 'filters[topic][$eq]': 'contents' }, options)
      )
      dispatch(getContents.initiate({ ...params }, options))

      await Promise.all(dispatch(getRunningQueriesThunk()))

      return { props: {} }
    }
)

const ContentsPage: NextPage = () => (
  <Fragment>
    <Head>
      <link rel='canonical' href='https://stomed.ir/contents' />
      <link rel='alternate' href='https://www.stomed.ir/contents' />
    </Head>
    <MainPage>
      <Contents />
    </MainPage>
  </Fragment>
)

export default ContentsPage
