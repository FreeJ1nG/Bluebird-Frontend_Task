import { alpha, useTheme } from '@mui/material/styles';
import Image from 'next/image';

import { Stack, Typography } from '@/common/components/atoms';
import { ClickableCard } from '@/common/components/molecules';
import { Vehicle } from '@/modules/types/models';

export interface VehicleCategorySelectionProps {
  vehicles: Vehicle[] | undefined;
  selectedVehicleId: number | null;
  onClickWithId: (id: number) => () => void;
}

export default function VehicleCategorySelection({
  vehicles,
  selectedVehicleId,
  onClickWithId,
}: VehicleCategorySelectionProps) {
  const theme = useTheme();

  return (
    <Stack direction="row" gap={4} justifyContent="center">
      {vehicles?.map(({ id, name, imageURL }) => (
        <ClickableCard
          key={id}
          stackProps={{
            onClick: onClickWithId(id),
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
    </Stack>
  );
}
