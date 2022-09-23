import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'Redux/axiosQuery';
import { HYDRATE } from 'next-redux-wrapper';

const catalogsApi = createApi({
  reducerPath: 'catalogsApi',
  baseQuery: baseQuery('catalogs'),
  endpoints: ({ query }) => ({
    catalogs: query({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      transformResponse: (res: Record<string, any>[]) => res,
    }),
  }),
  extractRehydrationInfo: (action, { reducerPath }) =>
    action.type === HYDRATE ? action.payload[reducerPath] : undefined,
});

export const { useCatalogsQuery } = catalogsApi;
export default catalogsApi;
