import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';

import { BoardItem, NormalizedPosition } from '@/types/board';
import { createBoard, generateImageUrl } from '@/utils/board-storage';
import { getSymbolImageUrl } from '@/utils/arasaac';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SymbolPicker } from '@/components/board/symbol-picker';

interface ItemEditorProps {
  visible: boolean;
  onClose: () => void;
  onSave: (item: BoardItem) => void;
  onOpenFolder?: (boardId: string) => void;
  item: BoardItem | null;
  position?: NormalizedPosition;
}

const COLOR_OPTIONS = [
  '#FF8C00', // orange
  '#E74C3C', // red
  '#27AE60', // green
  '#8E44AD', // purple
  '#3498DB', // blue
  '#F39C12', // yellow
  '#1ABC9C', // teal
  '#E91E63', // pink
];

export function ItemEditor({ visible, onClose, onSave, onOpenFolder, item, position }: ItemEditorProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [label, setLabel] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [itemType, setItemType] = useState<'word' | 'folder' | 'popover'>('word');
  const [symbolId, setSymbolId] = useState<number | undefined>(undefined);
  const [symbolImageUrl, setSymbolImageUrl] = useState<string | undefined>(undefined);
  const [symbolPickerVisible, setSymbolPickerVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      if (item) {
        setLabel(item.label);
        setSelectedColor(item.backgroundColor ?? COLOR_OPTIONS[0]);
        setItemType(item.type ?? 'word');
        setSymbolId(item.symbolId);
        setSymbolImageUrl(item.symbolId ? getSymbolImageUrl(item.symbolId) : undefined);
      } else {
        setLabel('');
        setSelectedColor(COLOR_OPTIONS[0]);
        setItemType('word');
        setSymbolId(undefined);
        setSymbolImageUrl(undefined);
      }
    }
  }, [visible, item]);

  const hasLinkedBoard = (item?.type === 'folder' || item?.type === 'popover') && !!item.linkedBoardId;

  const handleSave = () => {
    const trimmed = label.trim();
    if (!trimmed) return;

    const itemPosition = item?.position ?? position;
    const id = item?.id ?? `item_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const imageUrl = symbolImageUrl ?? generateImageUrl(trimmed, selectedColor);

    const baseItem: BoardItem = {
      id,
      label: trimmed,
      imageUrl,
      symbolId,
      backgroundColor: selectedColor,
      position: itemPosition,
    };

    if (itemType === 'folder' || itemType === 'popover') {
      const linkedBoardId = item?.linkedBoardId ?? createBoard(trimmed).id;
      onSave({ ...baseItem, type: itemType, linkedBoardId });
    } else {
      onSave({ ...baseItem, type: 'word' });
    }
  };

  const handleSymbolSelect = (id: number, imageUrl: string) => {
    setSymbolId(id);
    setSymbolImageUrl(imageUrl);
    setSymbolPickerVisible(false);
  };

  const handleClearSymbol = () => {
    setSymbolId(undefined);
    setSymbolImageUrl(undefined);
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View style={styles.backdrop}>
          <View style={[styles.editor, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>
              {item ? 'Item bewerken' : 'Nieuw item'}
            </Text>

            <TextInput
              value={label}
              onChangeText={setLabel}
              placeholder="Label"
              placeholderTextColor={colors.icon}
              style={[styles.input, { color: colors.text, borderColor: colors.buttonBorder }]}
              autoFocus
            />

            <Text style={[styles.sectionLabel, { color: colors.text }]}>Symbool</Text>
            <View style={styles.symbolRow}>
              {symbolImageUrl ? (
                <View style={styles.symbolPreviewContainer}>
                  <Image
                    source={{ uri: symbolImageUrl }}
                    style={styles.symbolPreview}
                    contentFit="contain"
                  />
                  <Pressable onPress={handleClearSymbol} style={styles.clearSymbolButton}>
                    <Text style={styles.clearSymbolText}>✕</Text>
                  </Pressable>
                </View>
              ) : null}
              <Pressable
                onPress={() => setSymbolPickerVisible(true)}
                style={[styles.symbolButton, { borderColor: colors.buttonBorder }]}>
                <Text style={[styles.symbolButtonText, { color: colors.accent }]}>
                  {symbolImageUrl ? 'Wijzig symbool' : 'Kies symbool'}
                </Text>
              </Pressable>
            </View>

            <Text style={[styles.sectionLabel, { color: colors.text }]}>Kleur</Text>
            <View style={styles.colorRow}>
              {COLOR_OPTIONS.map((color) => (
                <Pressable
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: color },
                    selectedColor === color && styles.colorSelected,
                  ]}>
                  {selectedColor === color && <Text style={styles.checkmark}>✓</Text>}
                </Pressable>
              ))}
            </View>

            {!hasLinkedBoard && (
              <>
                <Text style={[styles.sectionLabel, { color: colors.text }]}>Type</Text>
                <View style={styles.typeRow}>
                  <Pressable
                    onPress={() => setItemType('word')}
                    style={[styles.typeButton, itemType === 'word' && { backgroundColor: colors.accent }]}>
                    <Text style={[styles.typeText, itemType === 'word' && styles.typeTextActive]}>Woord</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setItemType('folder')}
                    style={[styles.typeButton, itemType === 'folder' && { backgroundColor: colors.accent }]}>
                    <Text style={[styles.typeText, itemType === 'folder' && styles.typeTextActive]}>Map</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setItemType('popover')}
                    style={[styles.typeButton, itemType === 'popover' && { backgroundColor: colors.accent }]}>
                    <Text style={[styles.typeText, itemType === 'popover' && styles.typeTextActive]}>Popover</Text>
                  </Pressable>
                </View>
              </>
            )}

            {hasLinkedBoard && item!.linkedBoardId && (
              <Pressable
                onPress={() => onOpenFolder?.(item!.linkedBoardId!)}
                style={[styles.openFolderButton, { backgroundColor: colors.accent }]}>
                <Text style={styles.openFolderText}>
                  {item!.type === 'popover' ? 'Popover items bewerken' : 'Map openen'}
                </Text>
              </Pressable>
            )}

            <View style={styles.buttonRow}>
              <Pressable onPress={onClose} style={[styles.cancelButton, { borderColor: colors.buttonBorder }]}>
                <Text style={[styles.cancelText, { color: colors.text }]}>Annuleren</Text>
              </Pressable>
              <Pressable onPress={handleSave} style={[styles.saveButton, { backgroundColor: colors.accent }]}>
                <Text style={styles.saveText}>Opslaan</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <SymbolPicker
        visible={symbolPickerVisible}
        onClose={() => setSymbolPickerVisible(false)}
        onSelect={handleSymbolSelect}
        initialQuery={label}
      />
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  editor: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  symbolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  symbolPreviewContainer: {
    position: 'relative',
  },
  symbolPreview: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  clearSymbolButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSymbolText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  symbolButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  symbolButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSelected: {
    borderWidth: 3,
    borderColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  checkmark: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  typeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  typeTextActive: {
    color: '#fff',
  },
  openFolderButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  openFolderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
