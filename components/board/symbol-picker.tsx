import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Image } from 'expo-image';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ArasaacPictogram, getSymbolImageUrl, searchSymbols } from '@/utils/arasaac';

interface SymbolPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (symbolId: number, imageUrl: string) => void;
  initialQuery?: string;
}

export function SymbolPicker({ visible, onClose, onSelect, initialQuery = '' }: SymbolPickerProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ArasaacPictogram[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      const q = initialQuery.trim();
      setQuery(q);
      setResults([]);
      setSearched(false);
      if (q) {
        performSearch(q);
      }
    }
  }, [visible, initialQuery]);

  const performSearch = useCallback(async (text: string) => {
    if (!text.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    const data = await searchSymbols(text.trim());
    setResults(data);
    setLoading(false);
  }, []);

  const handleQueryChange = useCallback(
    (text: string) => {
      setQuery(text);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => performSearch(text), 400);
    },
    [performSearch],
  );

  const handleSelect = useCallback(
    (pictogram: ArasaacPictogram) => {
      const imageUrl = getSymbolImageUrl(pictogram._id);
      onSelect(pictogram._id, imageUrl);
    },
    [onSelect],
  );

  const renderItem = useCallback(
    ({ item }: { item: ArasaacPictogram }) => {
      const imageUrl = getSymbolImageUrl(item._id);
      const keyword = item.keywords[0]?.keyword ?? '';
      return (
        <Pressable
          onPress={() => handleSelect(item)}
          style={({ pressed }) => [
            styles.symbolItem,
            { backgroundColor: colors.buttonDefaultBackground, opacity: pressed ? 0.7 : 1 },
          ]}>
          <Image source={{ uri: imageUrl }} style={styles.symbolImage} contentFit="contain" />
          <Text style={[styles.symbolLabel, { color: colors.text }]} numberOfLines={1}>
            {keyword}
          </Text>
        </Pressable>
      );
    },
    [colors, handleSelect],
  );

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Symbool kiezen</Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <Text style={[styles.closeButton, { color: colors.icon }]}>Sluiten</Text>
            </Pressable>
          </View>

          <TextInput
            value={query}
            onChangeText={handleQueryChange}
            placeholder="Zoek symbolen..."
            placeholderTextColor={colors.icon}
            style={[styles.searchInput, { color: colors.text, borderColor: colors.buttonBorder }]}
            autoFocus
            returnKeyType="search"
            onSubmitEditing={() => performSearch(query)}
          />

          {loading && (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={colors.accent} />
            </View>
          )}

          {!loading && searched && results.length === 0 && (
            <View style={styles.centered}>
              <Text style={[styles.emptyText, { color: colors.icon }]}>
                Geen symbolen gevonden
              </Text>
            </View>
          )}

          {!loading && results.length > 0 && (
            <FlatList
              data={results}
              renderItem={renderItem}
              keyExtractor={(item) => String(item._id)}
              numColumns={3}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.grid}
            />
          )}

          {!loading && !searched && (
            <View style={styles.centered}>
              <Text style={[styles.emptyText, { color: colors.icon }]}>
                Typ om symbolen te zoeken
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  grid: {
    paddingBottom: 20,
  },
  row: {
    gap: 8,
    marginBottom: 8,
  },
  symbolItem: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    maxWidth: '33%',
  },
  symbolImage: {
    width: '70%',
    aspectRatio: 1,
  },
  symbolLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
});
