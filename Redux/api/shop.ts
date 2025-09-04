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
    getIndustrial: query({
      query: () => ({
        url: 'industrials',
        method: 'GET',
        params: commonParams,
      }),
      transformResponse: (res: Record<'data', IShop[]>) => res.data,
    }),
    getRadiology: query({
      query: () => ({
        url: 'radiologies',
        method: 'GET',
        params: commonParams,
      }),
      transformResponse: (res: Record<'data', IShop[]>) => res.data,
    }),
    getRadiotherapy: query({
      query: () => ({
        url: 'radiotherapies',
        method: 'GET',
        params: commonParams,
      }),
      transformResponse: (res: Record<'data', IShop[]>) => res.data,
    }),
    getNuclear: query({
      query: () => ({
        url: 'nuclears',
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
  endpoints: { getShop, getRadiotherapy, getIndustrial, getRadiology, getNuclear },
  util: { getRunningQueriesThunk },
  reducer,
  reducerPath,
  middleware,
  useGetShopQuery,
  useGetRadiotherapyQuery,
  useGetIndustrialQuery,
  useGetRadiologyQuery,
  useGetNuclearQuery,
} = shopApi
