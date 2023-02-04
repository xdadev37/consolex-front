import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from 'Redux/axiosQuery'
import { HYDRATE } from 'next-redux-wrapper'
import type { IContents } from 'Types/Redux/Contents'
import type { IParams } from 'Types/Redux/Shop'

const contentsApi = createApi({
  reducerPath: 'contentsApi',
  baseQuery: baseQuery('contents'),
  endpoints: ({ query }) => ({
    getContents: query({
      query: (params?: IParams) => ({
        url: '',
        method: 'GET',
        params: {
          ...params,
          sort: 'updatedAt:desc',
          'populate[image][populate]': 'medium',
        },
      }),
      transformResponse: (res: IContents[]) => res,
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
