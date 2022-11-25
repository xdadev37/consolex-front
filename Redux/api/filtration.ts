import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from 'Redux/axiosQuery'
import { REHYDRATE } from 'redux-persist'
import { HYDRATE } from 'next-redux-wrapper'

const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQuery('categories'),
  endpoints: ({ query }) => ({
    getCategories: query({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      transformResponse: (res: Record<string, any>[]) => res,
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) =>
    action.type === HYDRATE ? action.payload[reducerPath] : undefined,
})

export const {
  useGetCategoriesQuery,
  reducer,
  reducerPath,
  middleware,
  endpoints: { getCategories },
} = categoriesApi
