import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Favorite } from '@mui/icons-material';
import Image from 'next/image';

import { Box, Stack, Typography } from '@/common/components/atoms';
import { useVehicleContext } from '@/common/contexts/vehicleContext';
import { getVehicleId } from '@/common/utils/helpers/vehicles';
import { selectWishlist } from '@/features/vehicles/selectors/getBookings';
import { VehicleType } from '@/modules/types/models';

export interface VehicleTypeSelectionProps {
  vehicleTypes: VehicleType[];
}

export default function VehicleTypeSelection({
  vehicleTypes,
}: VehicleTypeSelectionProps) {
  const wishlist = useSelector(selectWishlist);

  const { vehicleId: selectedVehicleId, setVehicleType } = useVehicleContext();

  const handleVehicleTypeClick = useCallback(
    (vehicleType: string) => () => {
      if (!setVehicleType) return;
      setVehicleType(vehicleType);
    },
    [setVehicleType],
  );

  return (
    <Stack gap={3} mt={6}>
      <Typography variant="h5">Select your ride</Typography>
      <Stack direction="row" gap={4} justifyContent="center" maxWidth="100%">
        {vehicleTypes
          .find(({ category_id }) => category_id === selectedVehicleId)
          ?.car_type.map((vehicleDetail) => (
            <Stack
              onClick={handleVehicleTypeClick(vehicleDetail.vehicle)}
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
              position="relative"
            >
              {selectedVehicleId &&
                wishlist.find(
                  (vehicle) =>
                    vehicle.id ===
                    getVehicleId(selectedVehicleId, vehicleDetail.vehicle),
                ) && (
                  <Box position="absolute" top={12} left={12}>
                    <Favorite color="error" />
                  </Box>
                )}
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
