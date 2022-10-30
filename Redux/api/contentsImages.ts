import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from 'Redux/axiosQuery'
import { HYDRATE } from 'next-redux-wrapper'
import type { IContentsImages } from 'Types/Redux/Images'

const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: baseQuery('content-images'),
  endpoints: ({ query }) => ({
    images: query({
      query: (id: number) => ({
        url: id.toString(),
        method: 'GET',
      }),
      transformResponse: (res: IContentsImages) => res,
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) =>
    action.type === HYDRATE ? action.payload[reducerPath] : undefined,
})

export const { useLazyImagesQuery, reducer, reducerPath, middleware } =
  imagesApi
