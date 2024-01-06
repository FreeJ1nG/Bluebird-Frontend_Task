import { OptionProps, useCallback, useMemo } from 'react';
import Select, { SingleValue } from 'react-select';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  LoadingComponent,
  Skeleton,
  Stack,
  Typography,
} from '@/common/components/atoms';
import { NAV_HEIGHT } from '@/common/constant/config';
import { useVehicleContext } from '@/common/contexts/vehicleContext';
import { PATH_DASHBOARD } from '@/common/routes/path';
import { getVehicleId } from '@/common/utils/helpers/vehicles';
import { useGetVehiclesQuery } from '@/features/vehicles/api';

export default function Navbar() {
  const theme = useTheme();
  const router = useRouter();

  const { id: vehicleUniqueId, setVehicle } = useVehicleContext();
  const { vehicles, vehicleTypes, isLoading } = useGetVehiclesQuery(undefined, {
    selectFromResult: ({ data: result, ...other }) => ({
      vehicles: result?.category,
      vehicleTypes: result?.type,
      ...other,
    }),
  });

  const selectOptions = useMemo(
    () =>
      vehicles?.reduce((acc: OptionProps[], cur) => {
        const newVehicles = vehicleTypes?.find(
          ({ category_id }) => category_id === cur.id,
        );
        if (!newVehicles) return acc;
        return [
          ...acc,
          ...newVehicles.car_type.map(({ vehicle }) => ({
            value: getVehicleId(cur.id, vehicle),
            label: `${cur.name} - ${vehicle}`,
          })),
        ];
      }, []),
    [vehicles, vehicleTypes],
  );

  const handleRedirectToHome = useCallback(
    () => router.push(PATH_DASHBOARD.root),
    [router],
  );

  const handleSelectChange = useCallback(
    (newValue: SingleValue<OptionProps>) => {
      if (newValue && setVehicle) {
        setVehicle(newValue.value);
      }
    },
    [setVehicle],
  );

  return (
    <Stack
      data-testid="navbar-container"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      height={NAV_HEIGHT}
      bgcolor={theme.palette.common.black}
      px={3}
    >
      <Stack direction="row" gap={2}>
        <Image
          data-testid="navbar-logo-button"
          onClick={handleRedirectToHome}
          src="/logo.png"
          alt="Logo of bluebird"
          width={112}
          height={32}
        />
        <Button data-testid="navbar-wishlist-button">Wishlist</Button>
        <Button data-testid="navbar-mybook-button">MyBook</Button>
      </Stack>
      <LoadingComponent
        data-testid="navbar-select-loader"
        isLoading={isLoading}
        loadingComponent={
          <Skeleton width={300} height={40} variant="rounded" />
        }
      >
        <Typography variant="subtitle2">
          <Box width={300}>
            <Select
              data-testid="navbar-select"
              placeholder="Select your desired ride"
              options={selectOptions}
              onChange={handleSelectChange}
              value={
                selectOptions?.find(({ value }) => value === vehicleUniqueId) ??
                null
              }
            />
          </Box>
        </Typography>
      </LoadingComponent>
    </Stack>
  );
}
