import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'Redux/axiosQuery';
import { HYDRATE } from 'next-redux-wrapper';
import type { IShopImages } from 'Types/Redux/ShopImages';

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
  extractRehydrationInfo: (action, { reducerPath }) =>
    action.type === HYDRATE ? action.payload[reducerPath] : undefined,
});

export const { useLazyShopImagesQuery } = shopImagesApi;
export default shopImagesApi;
