import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'Redux/axiosQuery';
import { HYDRATE } from 'next-redux-wrapper';
import type { IShop } from 'Types/Redux/Shop';

const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: baseQuery('shop'),
  endpoints: ({ query }) => ({
    shop: query({
      query: () => ({ url: '', method: 'GET' }),
      transformResponse: (res: IShop[]) => res,
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) =>
    action.type === HYDRATE ? action.payload[reducerPath] : undefined,
});

export const { useShopQuery } = shopApi;
export default shopApi;
