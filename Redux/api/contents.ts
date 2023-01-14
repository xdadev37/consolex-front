import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from 'Redux/axiosQuery'
import { HYDRATE } from 'next-redux-wrapper'
import type { IContents } from 'Types/Redux/Contents'

const contentsApi = createApi({
  reducerPath: 'contentsApi',
  baseQuery: baseQuery('contents'),
  endpoints: ({ query }) => ({
    getContents: query({
      query: () => ({ url: '', method: 'GET' }),
      transformResponse: (res: IContents[]) => res.sort((a, b) => b.id - a.id),
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) =>
    action.type === HYDRATE ? action.payload[reducerPath] : undefined,
})

export const {
  useGetContentsQuery,
  endpoints: { getContents },
  util: { getRunningQueriesThunk },
  reducer,
  reducerPath,
  middleware,
} = contentsApi
