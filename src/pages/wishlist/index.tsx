import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Stack, Typography } from '@/common/components/atoms';
import { RemoveableVehicleCard } from '@/common/components/molecules';
import { VehicleCategorySelection } from '@/common/components/organisms';
import { useVehicleContext } from '@/common/contexts/vehicleContext';
import { PATH_DASHBOARD } from '@/common/routes/path';
import { getVehicleDetailFromId } from '@/common/utils/helpers/vehicles';
import { useGetVehiclesQuery } from '@/features/vehicles/api';
import { selectWishlist } from '@/features/vehicles/selectors/getBookings';
import { VehicleDetail } from '@/modules/types/models';

export default function WishlistPage() {
  const router = useRouter();
  const { setVehicle } = useVehicleContext();

  const { vehicles, vehicleTypes, isLoading } = useGetVehiclesQuery(undefined, {
    selectFromResult: ({ data: result, ...other }) => ({
      vehicles: result?.category.map(({ imageURL, ...otherProps }) => ({
        imageURL: imageURL.replace(' ', ''),
        ...otherProps,
      })),
      vehicleTypes: result?.type,
      ...other,
    }),
  });

  const wishlist = useSelector(selectWishlist);
  const sortedWishlist = getVehicleDetailFromId(
    [...wishlist].sort((a, b) => a.timestamp - b.timestamp),
    vehicleTypes,
  );

  const handleVehicleClick = useCallback(
    (vehicle: VehicleDetail & { id: string; timestamp: number }) => () => {
      if (!setVehicle) return;
      setVehicle(vehicle.id);
      router.push(PATH_DASHBOARD.root);
    },
    [router, setVehicle],
  );

  return (
    <Stack>
      <VehicleCategorySelection vehicles={vehicles} isLoading={isLoading} />
      <Stack mt={4}>
        <Typography variant="h5" mb={2}>
          My Wishlist
        </Typography>
        <Stack gap={3}>
          {sortedWishlist?.map(
            (vehicle) =>
              vehicle && (
                <RemoveableVehicleCard
                  key={vehicle.id}
                  onClick={handleVehicleClick(vehicle)}
                  vehicle={vehicle}
                />
              ),
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
