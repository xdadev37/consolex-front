import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from 'Redux/axiosQuery'
import { HYDRATE } from 'next-redux-wrapper'
import type { ICategories, IMenu_3 } from 'Types/Redux/Categories.d'
import type { IParams } from 'Types/Redux/Shop.d'

const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQuery('menu-3s'),
  endpoints: ({ query }) => ({
    getMenu_3: query({
      query: (params?: IParams) => ({
        url: '',
        method: 'GET',
        params: {
          ...params,
          'populate[menu_2s][populate]': 'menu_1s',
          'populate[image][fields][0]': 'formats',
          sort: 'pos:asc',
        },
      }),
      transformResponse: (res: Record<'data', ICategories<IMenu_3>[]>) =>
        res.data,
    }),
    getBanners: query({
      query: () => ({
        url: 'banners',
        method: 'GET',
      }),
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === HYDRATE) return action.payload[reducerPath]
  },
})

export const {
  useGetMenu_3Query,
  useGetBannersQuery,
  reducer,
  reducerPath,
  middleware,
  endpoints: { getMenu_3, getBanners },
} = categoriesApi
