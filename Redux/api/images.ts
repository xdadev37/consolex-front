import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'Redux/axiosQuery';
import { HYDRATE } from 'next-redux-wrapper';
import type { IBaseQueryById } from 'Types/BaseQuery';
import type { IImages } from 'Types/Redux/Images';

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
      transformResponse: (res: IBaseQueryById<IImages>) =>
        res.data.attributes.ContentsImages.data,
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) =>
    action.type === HYDRATE ? action.payload[reducerPath] : undefined,
});

export const { useLazyImagesQuery } = imagesApi;
export default imagesApi;
