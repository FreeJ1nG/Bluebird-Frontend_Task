import Image from 'next/image';

import { Stack, Typography } from '@/common/components/atoms';
import { VehicleType } from '@/modules/types/models';

export interface VehicleTypeSelectionProps {
  vehicleTypes: VehicleType[];
  selectedVehicleId: number | null;
  onClickWithVehicleType: (vehicleType: string) => () => void;
}

export default function VehicleTypeSelection({
  vehicleTypes,
  selectedVehicleId,
  onClickWithVehicleType,
}: VehicleTypeSelectionProps) {
  return (
    <Stack gap={3} mt={6}>
      <Typography variant="h5">Select your ride</Typography>
      <Stack direction="row" gap={4} justifyContent="center" maxWidth="100%">
        {vehicleTypes
          .find(({ category_id }) => category_id === selectedVehicleId)
          ?.car_type.map((vehicleDetail) => (
            <Stack
              onClick={onClickWithVehicleType(vehicleDetail.vehicle)}
              borderRadius={1}
              boxShadow={6}
              p={2}
              key={vehicleDetail.vehicle}
              alignItems="center"
              minWidth={300}
              sx={{
                '&:hover': {
                  color: 'blue',
                  transition: 'all',
                  transitionDuration: '300ms',
                  cursor: 'grab',
                },
              }}
            >
              <Image
                src={vehicleDetail.imageURL}
                alt={vehicleDetail.vehicle}
                width={280}
                height={160}
                objectFit="cover"
              />
              <Typography variant="subtitle1">
                {vehicleDetail.vehicle}
              </Typography>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
}
