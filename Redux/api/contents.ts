import { createApi } from '@reduxjs/toolkit/query/react'
import { images } from 'api/images'
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
          'pagination[pageSize]': 100,
        },
      }),
      transformResponse: (res: Record<'data', IContents[]>) => res.data,
    }),
    getImages: query({
      query: (params?: IParams) => ({
        url: '',
        method: 'GET',
        params: {
          ...params,
          sort: 'updatedAt:desc',
          'populate[images][fields][0]': 'id',
          'populate[image][fields][0]': 'formats',
          'pagination[pageSize]': 100,
        },
      }),
      transformResponse: (res: Record<'data', IContents[]>) => res.data,
      onQueryStarted: (a, { queryFulfilled }) => {
        queryFulfilled.then(res => images.initiate(res.data.at(0)?.id || 0))
      },
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === HYDRATE) return action.payload[reducerPath]
  },
})

export const {
  useGetContentsQuery,
  useGetImagesQuery,
  endpoints: { getContents, getImages },
  util: { getRunningQueriesThunk },
  reducer,
  reducerPath,
  middleware,
} = contentsApi
