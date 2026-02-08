import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BoardItem } from '@/types/board';
import { GridButton } from '@/components/board/grid-button';
import { resolveGridLayout } from '@/utils/resolve-grid-layout';

interface GridBoardProps {
  items: BoardItem[];
  gridSize: number;
  onItemPress: (item: BoardItem) => void;
  topOffset?: number;
  bottomOffset?: number;
  editMode?: boolean;
  onEmptyCellPress?: (row: number, col: number) => void;
  onItemDelete?: (item: BoardItem) => void;
}

const GAP = 4;
const PADDING = 8;

export function GridBoard({
  items,
  gridSize,
  onItemPress,
  topOffset = 0,
  bottomOffset = 0,
  editMode = false,
  onEmptyCellPress,
  onItemDelete,
}: GridBoardProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const availableW = width - insets.left - insets.right - PADDING * 2;
  const availableH = height - insets.top - insets.bottom - topOffset - bottomOffset - PADDING * 2;

  const grid = useMemo(() => resolveGridLayout(items, gridSize), [items, gridSize]);

  const totalRows = grid.length;

  const cellSize = Math.floor(
    Math.min(
      (availableW - GAP * (gridSize - 1)) / gridSize,
      (availableH - GAP * (totalRows - 1)) / totalRows,
    ),
  );

  const gridHeight = totalRows * cellSize + GAP * (totalRows - 1);
  const needsScroll = gridHeight > availableH;

  const renderCell = (cell: BoardItem | null, rowIndex: number, colIndex: number, size: number) => {
    if (cell) {
      return (
        <GridButton
          key={cell.id}
          item={cell}
          size={size}
          onPress={onItemPress}
          editMode={editMode}
          onDelete={onItemDelete}
        />
      );
    }
    if (editMode) {
      return (
        <Pressable
          key={`empty-${rowIndex}-${colIndex}`}
          onPress={() => onEmptyCellPress?.(rowIndex, colIndex)}
          style={[styles.emptyCell, { width: size, height: size }]}>
          <Text style={styles.plusIcon}>+</Text>
        </Pressable>
      );
    }
    return <View key={`empty-${rowIndex}-${colIndex}`} style={{ width: size, height: size }} />;
  };

  const content = (
    <View style={needsScroll ? undefined : styles.container}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex, cellSize))}
        </View>
      ))}
    </View>
  );

  if (needsScroll) {
    const scrollCellSize = Math.floor(
      (availableW - GAP * (gridSize - 1)) / gridSize,
    );

    return (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex, scrollCellSize))}
          </View>
        ))}
      </ScrollView>
    );
  }

  return content;
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
  scrollContent: {
    alignItems: 'center',
    paddingVertical: PADDING,
    gap: GAP,
  },
  emptyCell: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 32,
    color: '#999',
    fontWeight: '300',
  },
});
