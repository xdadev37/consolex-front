import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'Redux/axiosQuery';
import type { IBaseQuery } from 'Types/BaseQuery';
import type { IContents } from 'Types/Redux/Contents';

const contentsApi = createApi({
  reducerPath: 'contentsApi',
  baseQuery: baseQuery('contents'),
  endpoints: ({ query }) => ({
    content: query({
      query: () => ({ url: '', method: 'GET', params: { populate: '*' } }),
      transformResponse: (res: IBaseQuery<IContents>) => res,
    }),
  }),
});

export const { useContentQuery } = contentsApi;
export default contentsApi;
