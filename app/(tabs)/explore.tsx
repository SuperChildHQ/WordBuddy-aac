import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { GridSizePicker } from '@/components/settings/grid-size-picker';
import { useSettingsContext } from '@/contexts/settings-context';

export default function SettingsScreen() {
  const { settings, updateSettings } = useSettingsContext();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Settings
      </ThemedText>
      <ThemedView style={styles.setting}>
        <ThemedText type="subtitle">Grid Size</ThemedText>
        <GridSizePicker
          value={settings.gridSize}
          onChange={(gridSize) => updateSettings({ gridSize })}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
  },
  title: {
    marginBottom: 32,
  },
  setting: {
    gap: 16,
  },
});
