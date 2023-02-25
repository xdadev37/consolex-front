import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from 'Redux/axiosQuery'
import { HYDRATE } from 'next-redux-wrapper'
import type { IContents } from 'Types/Redux/Contents.d'
import type { IParams } from 'Types/Redux/Shop.d'

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
          'populate[images][fields][0]': 'id',
          'populate[image][fields][0]': 'formats',
        },
      }),
      transformResponse: (res: Record<'data', IContents[]>) => res.data,
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === HYDRATE) return action.payload[reducerPath]
  },
})

export const {
  useGetContentsQuery,
  endpoints: { getContents },
  util: { getRunningQueriesThunk },
  reducer,
  reducerPath,
  middleware,
} = contentsApi
