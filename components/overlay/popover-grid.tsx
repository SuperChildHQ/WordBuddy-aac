import { Image } from 'expo-image';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BoardItem } from '@/types/board';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface PopoverGridProps {
  visible: boolean;
  items: BoardItem[];
  title: string;
  onItemPress: (item: BoardItem) => void;
  onClose: () => void;
}

const CELL_SIZE = 80;
const GAP = 4;
const COLS = 4;

export function PopoverGrid({ visible, items, title, onItemPress, onClose }: PopoverGridProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const labelHeight = 16;
  const imageSize = CELL_SIZE - labelHeight;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={[styles.container, { backgroundColor: colors.background }]} onPress={(e) => e.stopPropagation()}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
            {items.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  onItemPress(item);
                  onClose();
                }}
                style={({ pressed }) => [
                  styles.cell,
                  {
                    backgroundColor: item.backgroundColor ?? '#ddd',
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}>
                <View style={[styles.labelContainer, { height: labelHeight }]}>
                  <Text style={styles.label} numberOfLines={1}>{item.label}</Text>
                </View>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: imageSize, height: imageSize }}
                  contentFit="contain"
                />
              </Pressable>
            ))}
            {items.length === 0 && (
              <Text style={[styles.emptyText, { color: colors.icon }]}>Nog geen items</Text>
            )}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 16,
    padding: 16,
    maxWidth: (CELL_SIZE + GAP) * COLS + 32,
    maxHeight: '70%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    justifyContent: 'center',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },
  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontStyle: 'italic',
    padding: 20,
  },
});
