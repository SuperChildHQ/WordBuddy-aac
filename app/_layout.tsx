import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { SettingsProvider } from '@/contexts/settings-context';
import { BoardStorageProvider } from '@/contexts/board-storage-context';
import { BoardNavigationProvider } from '@/contexts/board-navigation-context';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <SettingsProvider>
        <BoardStorageProvider>
          <BoardNavigationProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
            </Stack>
          </BoardNavigationProvider>
        </BoardStorageProvider>
      </SettingsProvider>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
