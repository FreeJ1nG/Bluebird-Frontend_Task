import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from '@/common/components/atoms';
import useToaster from '@/common/hooks/useToaster';
import { selectWishlist } from '@/features/vehicles/selectors/getBookings';
import { bookingAdded, wishlistAdded } from '@/features/vehicles/vehiclesSlice';
import { VehicleDetail } from '@/modules/types/models';

export interface VehicleDetailSectionProps {
  selectedUniqueId: string | undefined;
  vehicleDetail: VehicleDetail;
}

export default function VehicleDetailSection({
  selectedUniqueId,
  vehicleDetail,
}: VehicleDetailSectionProps) {
  const theme = useTheme();
  const toaster = useToaster();
  const dispatch = useDispatch();

  const wishlist = useSelector(selectWishlist);

  const isInsideWishlist = useMemo(
    () => wishlist.some(({ id }) => id === selectedUniqueId),
    [wishlist, selectedUniqueId],
  );

  const handleShareClick = useCallback(() => {
    toaster.launch({
      color: 'success',
      message: 'Link copied to your clipboard',
      duration: 4000,
    });
  }, [toaster]);

  const handleLikeClick = useCallback(() => {
    dispatch(
      wishlistAdded({
        id: selectedUniqueId,
        timestamp: new Date().getTime(),
      }),
    );
  }, [selectedUniqueId, dispatch]);

  const handleBookClick = useCallback(() => {
    dispatch(
      bookingAdded({
        id: selectedUniqueId,
        timestamp: new Date().getTime(),
      }),
    );
  }, [selectedUniqueId, dispatch]);

  return (
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
  );
}
