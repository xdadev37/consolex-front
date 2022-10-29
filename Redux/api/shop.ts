import { createApi,skipToken } from '@reduxjs/toolkit/query/react'
import baseQuery from 'Redux/axiosQuery'
import { HYDRATE } from 'next-redux-wrapper'
import type { IShop } from 'Types/Redux/Shop'

const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: baseQuery('shops'),
  endpoints: ({ query }) => ({
    getShop: query({
      query: (params?: Record<'categories.key', string>) => ({
        url: '',
        method: 'GET',
        params,
      }),
      transformResponse: (res: IShop[]) => res,
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) =>
    action.type === HYDRATE ? action.payload[reducerPath] : undefined,
})

export const {
  endpoints: { getShop },
  util: { getRunningOperationPromises },
  reducer,
  reducerPath,
  middleware,
  useGetShopQuery,
} = shopApi
