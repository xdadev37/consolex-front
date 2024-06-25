import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from 'Redux/axiosQuery'
import { HYDRATE } from 'next-redux-wrapper'
import type { IBanners } from 'Types/Redux/Banners.d'

const bannersApi = createApi({
  reducerPath: 'bannersApi',
  baseQuery: baseQuery('banners'),
  endpoints: ({ query }) => ({
    getBanners: query({
      query: () => ({
        url: '',
        method: 'GET',
        params: {
          sort: 'updatedAt:desc',
          'populate[image][fields][0]': 'formats',
          'populate[image][fields][1]': 'url',
        },
      }),
      transformResponse: (res: Record<'data', IBanners[]>) => res,
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === HYDRATE) return action.payload[reducerPath]
  },
})

export const {
  endpoints: { getBanners },
  reducer,
  reducerPath,
  middleware,
  useGetBannersQuery,
} = bannersApi
