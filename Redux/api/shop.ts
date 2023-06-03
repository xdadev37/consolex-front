import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from 'Redux/axiosQuery'
import { HYDRATE } from 'next-redux-wrapper'
import type { IShop, IParams } from 'Types/Redux/Shop'

const commonParams = {
  sort: 'updatedAt:desc',
  'populate[images][fields][0]': 'id',
  'populate[image][fields][0]': 'formats',
  'pagination[pageSize]': 100,
}

const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: baseQuery(''),
  endpoints: ({ query }) => ({
    getShop: query({
      query: (params?: IParams) => ({
        url: 'shops',
        method: 'GET',
        params: { ...params, ...commonParams },
      }),
      transformResponse: (res: Record<'data', IShop[]>) => res.data,
    }),
    getSony: query({
      query: () => ({
        url: 'sonies',
        method: 'GET',
        params: commonParams,
      }),
      transformResponse: (res: Record<'data', IShop[]>) => res.data,
    }),
    getMicrosoft: query({
      query: () => ({
        url: 'microsofts',
        method: 'GET',
        params: commonParams,
      }),
      transformResponse: (res: Record<'data', IShop[]>) => res.data,
    }),
    getConsoles: query({
      query: () => ({
        url: 'consoles',
        method: 'GET',
        params: commonParams,
      }),
      transformResponse: (res: Record<'data', IShop[]>) => res.data,
    }),
    getOffers: query({
      query: () => ({
        url: 'offers',
        method: 'GET',
        params: commonParams,
      }),
      transformResponse: (res: Record<'data', IShop[]>) => res.data,
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === HYDRATE) return action.payload[reducerPath]
  },
})

export const {
  endpoints: { getShop, getConsoles, getSony, getMicrosoft, getOffers },
  util: { getRunningQueriesThunk },
  reducer,
  reducerPath,
  middleware,
  useGetShopQuery,
  useGetConsolesQuery,
  useGetMicrosoftQuery,
  useGetSonyQuery,
  useGetOffersQuery,
} = shopApi
