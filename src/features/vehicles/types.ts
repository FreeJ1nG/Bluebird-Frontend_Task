import { Vehicle, VehicleType } from '@/modules/types/models';

export interface GetVehiclesResponse {
  category: Vehicle[];
  type: VehicleType[];
}
