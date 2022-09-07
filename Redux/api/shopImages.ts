import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'Redux/axiosQuery';
import { HYDRATE } from 'next-redux-wrapper';
import type { IBaseQueryById } from 'Types/BaseQuery';
import type { IImages } from 'Types/Redux/ShopImages';

const shopImagesApi = createApi({
  reducerPath: 'shopImagesApi',
  baseQuery: baseQuery('shopImages'),
  endpoints: ({ query }) => ({
    shopImages: query({
      query: (id: number) => ({
        url: id.toString(),
        method: 'GET',
        params: { populate: '*' },
      }),
      transformResponse: (res: IBaseQueryById<IImages>) =>
        res.data.attributes.ShopImages.data,
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) =>
    action.type === HYDRATE ? action.payload[reducerPath] : undefined,
});

export const { useLazyShopImagesQuery } = shopImagesApi;
export default shopImagesApi;
