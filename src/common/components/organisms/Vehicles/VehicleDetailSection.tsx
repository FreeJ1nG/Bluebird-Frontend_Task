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
import { VehicleDetail } from '@/modules/types/models';

export interface VehicleDetailSectionProps {
  vehicleDetail: VehicleDetail;
}

export default function VehicleDetailSection({
  vehicleDetail,
}: VehicleDetailSectionProps) {
  const theme = useTheme();

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
              variant="outlined"
              endIcon={<SendIcon fontSize="small" />}
              size="medium"
            >
              Share
            </Button>
            <Button
              variant="outlined"
              endIcon={<FavoriteIcon fontSize="small" />}
              size="medium"
            >
              Like
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Box mt={3} />
      <Box width={300}>
        <Button variant="contained" fullWidth>
          Book this ride
        </Button>
      </Box>
    </Stack>
  );
}
