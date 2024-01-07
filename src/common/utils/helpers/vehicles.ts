import { VehicleType } from '@/modules/types/models';

export function getVehicleId(vehicleId: number, vehicleType: string) {
  return `${vehicleId}-${vehicleType}`;
}

export function getVehicleIdAndVehicleType(id: string) {
  const idSplit = id.split('-');
  if (idSplit.length !== 2)
    throw Error("invalid id format, should contain 2 '-' seperated strings");
  const [vehicleId, vehicleType] = idSplit;
  return { vehicleId: parseInt(vehicleId, 10), vehicleType };
}

export function getVehicleDetailFromId(
  ids: { id: string; timestamp: number }[],
  vehicleTypes: VehicleType[] | undefined,
) {
  return ids.map(({ id, timestamp }) => {
    const { vehicleId: bookingVehicleId, vehicleType: bookingVehicleType } =
      getVehicleIdAndVehicleType(id);
    const matchingVehicleType = vehicleTypes?.find(
      ({ category_id, car_type }) =>
        category_id === bookingVehicleId &&
        car_type.some(({ vehicle }) => vehicle === bookingVehicleType),
    );
    const matchingCar = matchingVehicleType?.car_type.find(
      ({ vehicle }) => vehicle === bookingVehicleType,
    );
    if (!matchingCar) return undefined;
    return { ...matchingCar, id, timestamp };
  });
}
