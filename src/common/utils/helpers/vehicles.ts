export function getVehicleId(vehicleId: number, vehicleType: string) {
  return `${vehicleId}-${vehicleType}`;
}

export function getVehicleIdAndVehicleType(id: string) {
  const idSplit = id.split('-');
  if (idSplit.length !== 2)
    throw Error("invalid id format, should contain 2 '-' seperated strings");
  const [vehicleId, vehicleType] = idSplit;
  return { vehicleId, vehicleType };
}
