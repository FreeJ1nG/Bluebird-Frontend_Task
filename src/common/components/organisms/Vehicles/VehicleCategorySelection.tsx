import { useCallback } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Image from 'next/image';

import {
  LoadingComponent,
  Skeleton,
  Stack,
  Typography,
} from '@/common/components/atoms';
import { ClickableCard } from '@/common/components/molecules';
import { useVehicleContext } from '@/common/contexts/vehicleContext';
import { Vehicle } from '@/modules/types/models';

export interface VehicleCategorySelectionProps {
  vehicles: Vehicle[] | undefined;
  isLoading?: boolean;
}

export default function VehicleCategorySelection({
  vehicles,
  isLoading = false,
}: VehicleCategorySelectionProps) {
  const theme = useTheme();
  const {
    vehicleId: selectedVehicleId,
    setVehicleId,
    setVehicleType,
  } = useVehicleContext();

  const handleClickWithId = useCallback(
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

  return (
    <Stack direction="row" gap={4} justifyContent="center">
      <LoadingComponent
        isLoading={isLoading}
        loadingComponent={
          <>
            <Skeleton width={200} height={200} variant="rounded" />
            <Skeleton width={200} height={200} variant="rounded" />
            <Skeleton width={200} height={200} variant="rounded" />
            <Skeleton width={200} height={200} variant="rounded" />
          </>
        }
      >
        {vehicles?.map(({ id, name, imageURL }) => (
          <ClickableCard
            key={id}
            stackProps={{
              onClick: handleClickWithId(id),
              bgcolor:
                selectedVehicleId === id
                  ? alpha(theme.palette.success.light, 0.8)
                  : undefined,
              sx: {
                '&:hover': {
                  bgcolor:
                    selectedVehicleId === id
                      ? undefined
                      : alpha(theme.palette.success.lighter, 0.8),
                },
              },
            }}
          >
            <Image
              src={imageURL}
              alt={name}
              width={128}
              height={128}
              objectFit="cover"
            />
            <Typography variant="subtitle1">{name}</Typography>
          </ClickableCard>
        ))}
      </LoadingComponent>
    </Stack>
  );
}
