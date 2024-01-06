/* eslint-disable @typescript-eslint/naming-convention */
import { createSelector } from '@reduxjs/toolkit';

import { vehiclesApi } from '@/features/vehicles/api';

export const selectGetVehiclesResult =
  vehiclesApi.endpoints.getVehicles.select();

export const selectVehicles = createSelector(
  [selectGetVehiclesResult],
  (vehicles) => vehicles.data?.category,
);

export const selectVehicleTypes = createSelector(
  [selectGetVehiclesResult],
  (vehicles) => vehicles.data?.type,
);

export const selectVehiclesWithDetail = createSelector(
  [selectVehicles, selectVehicleTypes],
  (vehicles, vehicleTypes) =>
    vehicles?.map((vehicle) => {
      const matchingType = vehicleTypes?.find(
        ({ category_id }) => category_id === vehicle.id,
      );
      const { id, category_id, ...details } = matchingType || {};
      return {
        ...vehicle,
        ...details,
      };
    }),
);
