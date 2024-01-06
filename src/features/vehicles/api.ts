import api from '@/common/services/api';

import { GetVehiclesResponse } from './types';

export const vehiclesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query<GetVehiclesResponse, void>({
      query: () => ({
        url: '/vehicles',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetVehiclesQuery, useLazyGetVehiclesQuery } = vehiclesApi;
