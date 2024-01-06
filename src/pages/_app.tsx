import { Provider as ReduxProvider } from 'react-redux';
import type { AppProps } from 'next/app';

import { Box, Stack } from '@/common/components/atoms';
import { Footer, Navbar } from '@/common/components/templates';
import { FOOTER_HEIGHT, NAV_HEIGHT } from '@/common/constant/config';
import { SettingsProvider } from '@/common/contexts/settingsContext/settingContext';
import { ToasterContextProvider } from '@/common/contexts/toasterContext';
import { VehicleContextProvider } from '@/common/contexts/vehicleContext';
import ThemeProvider from '@/modules/mui/theme';
import store from '@/modules/redux/store';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <ReduxProvider store={store}>
          <ToasterContextProvider>
            <VehicleContextProvider>
              <Stack position="relative">
                <Box position="fixed" left={0} right={0} top={0}>
                  <Navbar />
                </Box>
                <Box height={NAV_HEIGHT} />
                <Component {...pageProps} />
                <Box position="fixed" left={0} right={0} bottom={0}>
                  <Footer />
                </Box>
                <Box height={FOOTER_HEIGHT} />
              </Stack>
            </VehicleContextProvider>
          </ToasterContextProvider>
        </ReduxProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}
