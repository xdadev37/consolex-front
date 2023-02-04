import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from 'Redux/axiosQuery'
import { HYDRATE } from 'next-redux-wrapper'
import type { ICategories, IMenu_3 } from 'Types/Redux/Categories.d'

const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQuery(''),
  endpoints: ({ query }) => ({
    getMenu_3: query({
      query: () => ({
        url: 'menu-3s',
        method: 'GET',
        params: { 'populate[menu_2s][populate]': 'menu_1' },
      }),
      transformResponse: (res: Record<'data', ICategories<IMenu_3>[]>) => res,
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) =>
    action.type === HYDRATE ? action.payload[reducerPath] : undefined,
})

export const {
  useGetMenu_3Query,
  reducer,
  reducerPath,
  middleware,
  endpoints: { getMenu_3 },
} = categoriesApi
