import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BoardItem } from '@/types/board';

interface GridButtonProps {
  item: BoardItem;
  size: number;
  onPress: (item: BoardItem) => void;
}

export function GridButton({ item, size, onPress }: GridButtonProps) {
  const labelHeight = Math.max(20, Math.floor(size * 0.2));
  const fontSize = Math.max(10, Math.floor(size * 0.12));
  const imageSize = size - labelHeight;

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
});
