import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from 'Redux/axiosQuery'
import { HYDRATE } from 'next-redux-wrapper'
import type { IShop, IParams } from 'Types/Redux/Shop'

const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: baseQuery('shops'),
  endpoints: ({ query }) => ({
    getShop: query({
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
      transformResponse: (res: Record<'data', IShop[]>) => res.data,
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) =>
    action.type === HYDRATE ? action.payload[reducerPath] : undefined,
})

export const {
  endpoints: { getShop },
  util: { getRunningQueriesThunk },
  reducer,
  reducerPath,
  middleware,
  useGetShopQuery,
} = shopApi
