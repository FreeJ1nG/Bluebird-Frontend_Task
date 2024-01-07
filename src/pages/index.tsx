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
  const { vehicleId: selectedVehicleId, vehicleType: selectedVehicleType } =
    useVehicleContext();

  return (
    <Stack>
      <VehicleCategorySelection vehicles={vehicles} />
      {selectedVehicleId && !selectedVehicleType && (
        <VehicleTypeSelection vehicleTypes={vehicleTypes} />
      )}
      {selectedVehicleId && selectedVehicleType && (
        <>
          <Box mt={8} />
          <VehicleDetailSection vehicleTypes={vehicleTypes} />
        </>
      )}
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
