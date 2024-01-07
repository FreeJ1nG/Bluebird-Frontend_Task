import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/router';
import queryString from 'query-string';

import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from '@/common/components/atoms';
import { useVehicleContext } from '@/common/contexts/vehicleContext';
import useToaster from '@/common/hooks/useToaster';
import { PATH_DASHBOARD } from '@/common/routes/path';
import { selectWishlist } from '@/features/vehicles/selectors/getBookings';
import {
  bookingAdded,
  wishlistAdded,
  wishlistDeleted,
} from '@/features/vehicles/vehiclesSlice';
import { VehicleType } from '@/modules/types/models';

export interface VehicleDetailSectionProps {
  vehicleTypes: VehicleType[];
}

export default function VehicleDetailSection({
  vehicleTypes,
}: VehicleDetailSectionProps) {
  const theme = useTheme();
  const toaster = useToaster();
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    id: selectedUniqueId,
    vehicleId: selectedVehicleId,
    vehicleType: selectedVehicleType,
  } = useVehicleContext();

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

  const wishlist = useSelector(selectWishlist);

  const isInsideWishlist = useMemo(
    () => wishlist.some(({ id }) => id === selectedUniqueId),
    [wishlist, selectedUniqueId],
  );

  const handleShareClick = useCallback(() => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(
      `${window.origin}?${queryString.stringify({
        vId: selectedVehicleId,
        vTp: selectedVehicleType,
      })}`,
    );
    toaster.launch({
      color: 'success',
      message: 'Link copied to your clipboard',
      duration: 4000,
    });
  }, [toaster, selectedVehicleId, selectedVehicleType]);

  const handleLikeClick = useCallback(() => {
    const payload = {
      id: selectedUniqueId,
      timestamp: new Date().getTime(),
    };
    if (isInsideWishlist) {
      dispatch(wishlistDeleted(payload.id));
    } else {
      dispatch(wishlistAdded(payload));
    }
  }, [isInsideWishlist, selectedUniqueId, dispatch]);

  const handleBookClick = useCallback(() => {
    dispatch(
      bookingAdded({
        id: selectedUniqueId,
        timestamp: new Date().getTime(),
      }),
    );
    router.push(PATH_DASHBOARD.myBookings);
  }, [router, selectedUniqueId, dispatch]);

  return (
    vehicleDetail && (
      <Stack width="100%" alignItems="center">
        <Stack direction="row" gap={4} alignItems="center">
          <Image
            src={vehicleDetail.imageURL}
            alt={vehicleDetail.vehicle}
            width={280}
            height={160}
            objectFit="cover"
          />
          <Stack>
            <Typography variant="h5">{vehicleDetail.vehicle}</Typography>
            <Typography variant="h5" color={theme.palette.primary.main}>
              {vehicleDetail.price}
            </Typography>
            <Stack direction="row" gap="6px 12px" mt={1} flexWrap="wrap">
              {vehicleDetail.description.map((desc) => (
                <Chip key={desc} label={desc} color="primary" size="medium" />
              ))}
            </Stack>
            <Stack direction="row" gap={2} mt={2}>
              <Button
                onClick={handleShareClick}
                variant="outlined"
                endIcon={<SendIcon fontSize="small" />}
                size="medium"
              >
                Share
              </Button>
              <Button
                onClick={handleLikeClick}
                variant="outlined"
                color={isInsideWishlist ? 'error' : undefined}
                endIcon={<FavoriteIcon fontSize="small" />}
                size="medium"
              >
                {isInsideWishlist ? 'Remove From' : 'Add To'} Wishlist
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Box mt={3} />
        <Box width={300}>
          <Button onClick={handleBookClick} variant="contained" fullWidth>
            Book this ride
          </Button>
        </Box>
      </Stack>
    )
  );
}
