import {
  ChildrenProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  getVehicleId,
  getVehicleIdAndVehicleType,
} from '@/common/utils/helpers/vehicles';

interface IVehicleContext {
  vehicleId: number | null;
  vehicleType: string | null;
  id?: string;
  setVehicle?: (id: string) => void;
  setVehicleId?: (vehicleId: number | null) => void;
  setVehicleType?: (vehicleType: string | null) => void;
}

const VehicleContext = createContext<IVehicleContext>({
  vehicleId: null,
  vehicleType: null,
  id: undefined,
  setVehicle: undefined,
  setVehicleId: undefined,
  setVehicleType: undefined,
});

export function VehicleContextProvider({ children }: ChildrenProps) {
  const [vehicleId, setVehicleId] = useState<number | null>(null);
  const [vehicleType, setVehicleType] = useState<string | null>(null);

  const handleVehicleChange = useCallback((id: string) => {
    // This id should be in the format of {vehicleId}-{vehicleType}
    const { vehicleId: newVehicleId, vehicleType: newVehicleType } =
      getVehicleIdAndVehicleType(id);

    if (newVehicleId === '') setVehicleId(null);
    else setVehicleId(parseInt(newVehicleId, 10));

    if (newVehicleType === '') setVehicleType(null);
    else setVehicleType(newVehicleType);
  }, []);

  const vehicleContextProviderValue = useMemo(
    () => ({
      vehicleId,
      vehicleType,
      setVehicleId,
      setVehicleType,
      setVehicle: handleVehicleChange,
      ...(vehicleId &&
        vehicleType && {
          id: getVehicleId(vehicleId, vehicleType),
        }),
    }),
    [vehicleId, vehicleType, handleVehicleChange, setVehicleId, setVehicleType],
  );

  return (
    <VehicleContext.Provider value={vehicleContextProviderValue}>
      {children}
    </VehicleContext.Provider>
  );
}

export const useVehicleContext = () => {
  return useContext(VehicleContext);
};
