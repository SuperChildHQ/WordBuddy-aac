import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BoardItem } from '@/types/board';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SentenceBarProps {
  items: BoardItem[];
  onClear: () => void;
  onPlay: () => void;
}

const ITEM_SIZE = 56;
const LABEL_HEIGHT = 14;
const LABEL_FONT = 9;

export const SENTENCE_BAR_HEIGHT = ITEM_SIZE + 12;

export function SentenceBar({ items, onClear, onPlay }: SentenceBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: insets.top, borderBottomColor: colors.buttonBorder }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}>
        {items.map((item, index) => (
          <View
            key={`${item.id}-${index}`}
            style={[styles.item, { backgroundColor: item.backgroundColor ?? '#ddd' }]}>
            <View style={styles.labelContainer}>
              <Text style={styles.label} numberOfLines={1}>{item.label}</Text>
            </View>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              contentFit="contain"
            />
          </View>
        ))}
        {items.length === 0 && (
          <Text style={[styles.placeholder, { color: colors.icon }]}>Tik op woorden om een zin te maken...</Text>
        )}
      </ScrollView>
      <Pressable onPress={onPlay} style={[styles.actionButton, { backgroundColor: '#000' }]} accessibilityLabel="Zin afspelen">
        <Text style={styles.actionIcon}>▶</Text>
      </Pressable>
      <Pressable onPress={onClear} style={[styles.actionButton, { backgroundColor: '#999' }]} accessibilityLabel="Zin wissen">
        <Text style={styles.actionIcon}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SENTENCE_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 6,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    gap: 4,
    paddingRight: 4,
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 6,
    overflow: 'hidden',
    alignItems: 'center',
  },
  labelContainer: {
    height: LABEL_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: LABEL_FONT,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  image: {
    width: ITEM_SIZE - LABEL_HEIGHT,
    height: ITEM_SIZE - LABEL_HEIGHT,
  },
  placeholder: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
