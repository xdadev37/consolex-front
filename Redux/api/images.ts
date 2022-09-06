import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'Redux/axiosQuery';
import { HYDRATE } from 'next-redux-wrapper';
import type { IBaseQuery } from 'Types/BaseQuery';
import type { IImages } from 'Types/Redux/Images';

const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: baseQuery('images'),
  endpoints: ({ query }) => ({
    images: query({
      query: (id: string) => ({
        url: id,
        method: 'GET',
        params: { populate: '*' },
      }),
      transformResponse: (res: IBaseQuery<IImages>) => res,
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) =>
    action.type === HYDRATE ? action.payload[reducerPath] : undefined,
});

export const { useImagesQuery } = imagesApi;
export default imagesApi;
