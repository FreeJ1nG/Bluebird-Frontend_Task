import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Stack, Typography } from '@/common/components/atoms';
import { RemoveableVehicleCard } from '@/common/components/molecules';
import { VehicleCategorySelection } from '@/common/components/organisms';
import { useVehicleContext } from '@/common/contexts/vehicleContext';
import { PATH_DASHBOARD } from '@/common/routes/path';
import { getVehicleDetailFromId } from '@/common/utils/helpers/vehicles';
import { useGetVehiclesQuery } from '@/features/vehicles/api';
import { selectBookings } from '@/features/vehicles/selectors/getBookings';
import { VehicleDetail } from '@/modules/types/models';

export default function MyBookingsPage() {
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

  const bookings = useSelector(selectBookings);
  const sortedBookings = getVehicleDetailFromId(
    [...bookings].sort((a, b) => a.timestamp - b.timestamp),
    vehicleTypes,
  );

  const totalPrice = useMemo(
    () =>
      sortedBookings.reduce((acc, cur) => {
        if (!cur?.price) return acc;
        const priceString = cur.price.replace(/\D/g, '');
        return acc + parseInt(priceString, 10);
      }, 0),
    [sortedBookings],
  );

  const handleBookingCardClick = useCallback(
    (booking: VehicleDetail & { id: string; timestamp: number }) => () => {
      if (!setVehicle) return;
      setVehicle(booking.id);
      router.push(PATH_DASHBOARD.root);
    },
    [router, setVehicle],
  );

  return (
    <Stack>
      <VehicleCategorySelection vehicles={vehicles} isLoading={isLoading} />
      <Stack mt={4}>
        <Typography variant="h5" mb={2}>
          My Bookings
        </Typography>
        <Stack gap={3}>
          {sortedBookings?.map(
            (booking) =>
              booking && (
                <RemoveableVehicleCard
                  key={booking.id}
                  onClick={handleBookingCardClick(booking)}
                  vehicle={booking}
                />
              ),
          )}
        </Stack>
        <Stack alignItems="center" mt={4}>
          <Typography variant="h5">
            Total Price:{' '}
            {Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(totalPrice)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
