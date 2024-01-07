import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

import { Button, Stack, Typography } from '@/common/components/atoms';
import { VehicleDetail } from '@/modules/types/models';

export interface RemoveableVehicleCardProps {
  vehicle: VehicleDetail & { id: string; timestamp: number };
  onClick: () => void;
}

export default function RemoveableVehicleCard({
  vehicle,
  onClick,
}: RemoveableVehicleCardProps) {
  const theme = useTheme();

  return (
    <Stack direction="row" boxShadow={6} borderRadius={1} p={2} gap={4}>
      <Image
        src={vehicle.imageURL}
        alt={vehicle.vehicle}
        width={280}
        height={160}
        objectFit="cover"
      />
      <Stack justifyContent="center">
        <Typography variant="h4">{vehicle.vehicle}</Typography>
        <Typography variant="h5" color={theme.palette.primary.main}>
          {vehicle.price}
        </Typography>
        <Typography variant="body1" mb={1.5}>
          {new Date(vehicle.timestamp).toLocaleString('en-UK', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </Typography>
        <Button onClick={onClick} variant="contained">
          See vehicle detail
        </Button>
      </Stack>
    </Stack>
  );
}
