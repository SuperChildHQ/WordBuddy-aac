import { StyleSheet } from 'react-native';

import { GridBoard } from '@/components/board/grid-board';
import { ThemedView } from '@/components/themed-view';
import { useAudio } from '@/hooks/use-audio';
import { useSettingsContext } from '@/contexts/settings-context';
import { DEMO_BOARD } from '@/data/demo-board';

export default function BoardScreen() {
  const { settings, isLoaded } = useSettingsContext();
  const { playItem } = useAudio();

  if (!isLoaded) {
    return <ThemedView style={styles.container} />;
  }

  return (
    <ThemedView style={styles.container}>
      <GridBoard
        items={DEMO_BOARD.items}
        gridSize={settings.gridSize}
        onItemPress={playItem}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
