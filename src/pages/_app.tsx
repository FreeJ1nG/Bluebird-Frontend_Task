import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import type { AppProps } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';

import { Box, Stack } from '@/common/components/atoms';
import { Footer, Navbar } from '@/common/components/templates';
import { FOOTER_HEIGHT, NAV_HEIGHT } from '@/common/constant/config';
import { SettingsProvider } from '@/common/contexts/settingsContext/settingContext';
import { ToasterContextProvider } from '@/common/contexts/toasterContext';
import {
  useVehicleContext,
  VehicleContextProvider,
} from '@/common/contexts/vehicleContext';
import ThemeProvider from '@/modules/mui/theme';
import { persistor, store } from '@/modules/redux/store';

import '@/styles/globals.css';

function PageLayout({ Component, pageProps, router }: AppProps) {
  const { setVehicleId, setVehicleType } = useVehicleContext();

  useEffect(() => {
    const { vId, vTp } = router.query;
    if (vId && !Array.isArray(vId) && setVehicleId)
      setVehicleId(parseInt(vId, 10));
    if (vTp && !Array.isArray(vTp) && setVehicleType) setVehicleType(vTp);
  }, [router.query, setVehicleId, setVehicleType]);

  return (
    <Stack position="relative">
      <Box position="fixed" left={0} right={0} top={0}>
        <Navbar />
      </Box>
      <Box height={NAV_HEIGHT} />
      <Stack alignItems="center">
        <Stack mt={4} mb={4} alignItems="center" maxWidth={1000}>
          <Component {...pageProps} />
        </Stack>
      </Stack>
      <Box position="fixed" left={0} right={0} bottom={0}>
        <Footer />
      </Box>
      <Box height={FOOTER_HEIGHT} />
    </Stack>
  );
}

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToasterContextProvider>
              <VehicleContextProvider>
                <PageLayout
                  Component={Component}
                  pageProps={pageProps}
                  router={router}
                />
              </VehicleContextProvider>
            </ToasterContextProvider>
          </PersistGate>
        </ReduxProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}
