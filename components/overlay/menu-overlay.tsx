import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { GridSizePicker } from '@/components/settings/grid-size-picker';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface MenuOverlayProps {
  visible: boolean;
  onClose: () => void;
  editMode: boolean;
  onToggleEditMode: () => void;
  sentenceBarEnabled: boolean;
  onToggleSentenceBar: () => void;
  gridSize: number;
  onGridSizeChange: (size: number) => void;
}

export function MenuOverlay({
  visible,
  onClose,
  editMode,
  onToggleEditMode,
  sentenceBarEnabled,
  onToggleSentenceBar,
  gridSize,
  onGridSizeChange,
}: MenuOverlayProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={[styles.menu, { backgroundColor: colors.background }]} onPress={(e) => e.stopPropagation()}>
          <Text style={[styles.title, { color: colors.text }]}>Instellingen</Text>

          <Pressable
            onPress={onToggleEditMode}
            style={[styles.toggleRow, { borderColor: colors.buttonBorder }]}>
            <Text style={[styles.toggleLabel, { color: colors.text }]}>Bewerkingsmodus</Text>
            <View style={[styles.toggleIndicator, editMode && styles.toggleActive]}>
              <Text style={styles.toggleText}>{editMode ? 'AAN' : 'UIT'}</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={onToggleSentenceBar}
            style={[styles.toggleRow, { borderColor: colors.buttonBorder }]}>
            <Text style={[styles.toggleLabel, { color: colors.text }]}>Zinnenbalk</Text>
            <View style={[styles.toggleIndicator, sentenceBarEnabled && styles.toggleActive]}>
              <Text style={styles.toggleText}>{sentenceBarEnabled ? 'AAN' : 'UIT'}</Text>
            </View>
          </Pressable>

          <View style={[styles.sizeRow, { borderColor: colors.buttonBorder }]}>
            <Text style={[styles.toggleLabel, { color: colors.text }]}>Rastergrootte</Text>
            <GridSizePicker value={gridSize} onChange={onGridSizeChange} />
          </View>

          <Pressable onPress={onClose} style={[styles.closeButton, { backgroundColor: colors.accent }]}>
            <Text style={styles.closeText}>Sluiten</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  toggleLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  toggleIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#ccc',
  },
  toggleActive: {
    backgroundColor: '#27AE60',
  },
  toggleText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  sizeRow: {
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  closeButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
