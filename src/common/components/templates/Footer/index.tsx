import { useTheme } from '@mui/material/styles';

import { Stack, Typography } from '@/common/components/atoms';
import { FOOTER_HEIGHT } from '@/common/constant/config';

export default function Footer() {
  const theme = useTheme();

  return (
    <Stack
      data-testid="footer-container"
      alignItems="center"
      justifyContent="center"
      height={FOOTER_HEIGHT}
      bgcolor={theme.palette.grey[300]}
    >
      <Typography variant="subtitle2">
        © 2024 Bluebird. All Rights Reserved.
      </Typography>
      <Typography variant="caption">
        Notice. Bluebird uses cookies to provide necessary website
        functionality, improve your experience and analyze our traffic
      </Typography>
    </Stack>
  );
}
