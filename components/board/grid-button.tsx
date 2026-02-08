import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BoardItem } from '@/types/board';

interface GridButtonProps {
  item: BoardItem;
  size: number;
  onPress: (item: BoardItem) => void;
  editMode?: boolean;
  onDelete?: (item: BoardItem) => void;
}

export function GridButton({ item, size, onPress, editMode = false, onDelete }: GridButtonProps) {
  const labelHeight = Math.max(20, Math.floor(size * 0.2));
  const fontSize = Math.max(10, Math.floor(size * 0.12));
  const imageSize = size - labelHeight;
  const isFolder = item.type === 'folder';
  const isPopover = item.type === 'popover';

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [
        styles.button,
        {
          width: size,
          height: size,
          backgroundColor: item.backgroundColor ?? '#ddd',
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={item.label}>
      <View style={[styles.labelContainer, { height: labelHeight }]}>
        <Text style={[styles.label, { fontSize }]} numberOfLines={1}>
          {item.label}
        </Text>
      </View>
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: imageSize, height: imageSize }}
        contentFit="contain"
      />
      {isFolder && (
        <View style={styles.folderBadge}>
          <Text style={styles.folderIcon}>📁</Text>
        </View>
      )}
      {isPopover && (
        <View style={styles.folderBadge}>
          <Text style={styles.folderIcon}>▼</Text>
        </View>
      )}
      {editMode && (
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onDelete?.(item);
          }}
          style={styles.deleteBadge}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Verwijder ${item.label}`}>
          <Text style={styles.deleteIcon}>✕</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
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
    color: '#333',
    fontWeight: '700',
    textAlign: 'center',
  },
  folderBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
  folderIcon: {
    fontSize: 16,
  },
  deleteBadge: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
