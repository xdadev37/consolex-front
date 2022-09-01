import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'Redux/axiosQuery';
import type { IBaseQuery } from 'Types/BaseQuery';
import type { IShop } from 'Types/Redux/Shop';

const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: baseQuery('shops'),
  endpoints: ({ query }) => ({
    shop: query({
      query: () => ({ url: '', method: 'GET' }),
      transformResponse: (res: IBaseQuery<IShop>) => res,
    }),
  }),
});

export const { useShopQuery } = shopApi;
export default shopApi;
