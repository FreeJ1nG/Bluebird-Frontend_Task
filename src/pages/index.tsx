import { useCallback, useMemo } from 'react';

import { Box, Stack } from '@/common/components/atoms';
import {
  VehicleCategorySelection,
  VehicleDetailSection,
  VehicleTypeSelection,
} from '@/common/components/organisms';
import { useVehicleContext } from '@/common/contexts/vehicleContext';
import { Vehicle, VehicleType } from '@/modules/types/models';

export default function Home({
  vehicles,
  vehicleTypes,
}: {
  vehicles: Vehicle[];
  vehicleTypes: VehicleType[];
}) {
  const {
    vehicleId: selectedVehicleId,
    vehicleType: selectedVehicleType,
    setVehicleId,
    setVehicleType,
  } = useVehicleContext();

  const handleVehicleClick = useCallback(
    (vehicleId: number) => () => {
      if (!setVehicleId) return;
      if (!setVehicleType) return;
      setVehicleType(null);
      if (selectedVehicleId === vehicleId) {
        setVehicleId(null);
      } else {
        setVehicleId(vehicleId);
      }
    },
    [selectedVehicleId, setVehicleId, setVehicleType],
  );

  const handleVehicleTypeClick = useCallback(
    (vehicleType: string) => () => {
      if (!setVehicleType) return;
      setVehicleType(vehicleType);
    },
    [setVehicleType],
  );

  const vehicleDetail = useMemo(() => {
    const vehicleType = vehicleTypes.find(
      ({ category_id }) => category_id === selectedVehicleId,
    );
    if (!vehicleType) return undefined;
    const carDetail = vehicleType?.car_type.find(
      ({ vehicle }) => vehicle === selectedVehicleType,
    );
    if (!carDetail) return undefined;
    return carDetail;
  }, [vehicleTypes, selectedVehicleId, selectedVehicleType]);

  return (
    <Stack alignItems="center">
      <Stack mt={4} alignItems="center" maxWidth={1000}>
        <VehicleCategorySelection
          vehicles={vehicles}
          selectedVehicleId={selectedVehicleId}
          onClickWithId={handleVehicleClick}
        />
        {selectedVehicleId && !selectedVehicleType && (
          <VehicleTypeSelection
            vehicleTypes={vehicleTypes}
            selectedVehicleId={selectedVehicleId}
            onClickWithVehicleType={handleVehicleTypeClick}
          />
        )}
        {selectedVehicleId && selectedVehicleType && vehicleDetail && (
          <>
            <Box mt={8} />
            <VehicleDetailSection vehicleDetail={vehicleDetail} />
          </>
        )}
      </Stack>
    </Stack>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles`, {
    method: 'GET',
  });
  if (!res.ok) return undefined;
  const data = await res.json();

  return {
    props: {
      vehicles: data.category.map((vehicle: Vehicle) => ({
        ...vehicle,
        // this handling is done due to the imageURL provided by the api being faulty
        imageURL: vehicle.imageURL.replace(' ', ''),
      })),
      vehicleTypes: data.type,
    },
  };
}
