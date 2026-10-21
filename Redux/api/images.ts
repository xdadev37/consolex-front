import { createApi } from '@reduxjs/toolkit/query/react'
import { setImages } from 'slicers/category'
import baseQuery from 'Redux/axiosQuery'
import { HYDRATE } from 'next-redux-wrapper'
import type { IImages } from 'Types/Redux/Images'

const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: baseQuery('images'),
  endpoints: ({ query }) => ({
    images: query({
      query: (id: number) => ({
        url: id.toString(),
        method: 'GET',
        params: { populate: '*' },
      }),
      transformResponse: (res: Record<'data', Record<'attributes', IImages>>) =>
        res.data,
      onQueryStarted: (a, { queryFulfilled, dispatch }) => {
        queryFulfilled.then(res => {
          console.log(res.data.attributes,'sda')
          dispatch(setImages(res.data.attributes))
        })
      },
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === HYDRATE) return action.payload[reducerPath]
  },
})

export const {
  endpoints: { images },
  useImagesQuery,
  useLazyImagesQuery,
  reducer,
  reducerPath,
  middleware,
} = imagesApi
