import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BoardItem } from '@/types/board';
import { GridButton } from '@/components/board/grid-button';

interface GridBoardProps {
  items: BoardItem[];
  gridSize: number;
  onItemPress: (item: BoardItem) => void;
}

const GAP = 4;
const PADDING = 8;
const TAB_BAR_HEIGHT = 50;

export function GridBoard({ items, gridSize, onItemPress }: GridBoardProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const availableW = width - insets.left - insets.right - PADDING * 2;
  const availableH = height - insets.top - insets.bottom - TAB_BAR_HEIGHT - PADDING * 2;

  const cellSize = Math.floor(
    Math.min(
      (availableW - GAP * (gridSize - 1)) / gridSize,
      (availableH - GAP * (gridSize - 1)) / gridSize,
    ),
  );

  const visibleItems = items.slice(0, gridSize * gridSize);

  const rows: BoardItem[][] = [];
  for (let i = 0; i < visibleItems.length; i += gridSize) {
    rows.push(visibleItems.slice(i, i + gridSize));
  }

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item) => (
            <GridButton key={item.id} item={item} size={cellSize} onPress={onItemPress} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: GAP,
  },
  row: {
    flexDirection: 'row',
    gap: GAP,
  },
});
