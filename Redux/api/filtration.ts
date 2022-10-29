import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from 'Redux/axiosQuery'
import { HYDRATE } from 'next-redux-wrapper'

const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQuery('categories'),
  endpoints: ({ query }) => ({
    categories: query({
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

export const { useCategoriesQuery } = categoriesApi
export default categoriesApi
