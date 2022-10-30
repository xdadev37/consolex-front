import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from 'Redux/axiosQuery'
import type { IShopImages } from 'Types/Redux/ShopImages'

const shopImagesApi = createApi({
  reducerPath: 'shopImagesApi',
  baseQuery: baseQuery('shop-images'),
  endpoints: ({ query }) => ({
    shopImages: query({
      query: (id: number) => ({
        url: id.toString(),
        method: 'GET',
      }),
      transformResponse: (res: IShopImages) => res,
    }),
  }),
})

export const { useLazyShopImagesQuery, reducer, reducerPath, middleware } =
  shopImagesApi
