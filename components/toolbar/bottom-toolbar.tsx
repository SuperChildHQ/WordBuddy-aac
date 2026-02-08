import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface BottomToolbarProps {
  isHome: boolean;
  onBack: () => void;
  onHome: () => void;
  onAI: () => void;
  onSettings: () => void;
}

export const TOOLBAR_HEIGHT = 56;

export function BottomToolbar({ isHome, onBack, onHome, onAI, onSettings }: BottomToolbarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, borderTopColor: colors.buttonBorder }]}>
      <View style={styles.row}>
        <View style={styles.section}>
          {!isHome && (
            <>
              <Pressable
                onPress={onBack}
                style={styles.button}
                accessibilityRole="button"
                accessibilityLabel="Ga terug">
                <IconSymbol name="chevron.left" size={28} color="#000" />
                <Text style={[styles.label, { color: '#000' }]}>Terug</Text>
              </Pressable>
              <Pressable
                onPress={onHome}
                style={styles.button}
                accessibilityRole="button"
                accessibilityLabel="Ga naar home">
                <IconSymbol name="house.fill" size={28} color="#000" />
                <Text style={[styles.label, { color: '#000' }]}>Home</Text>
              </Pressable>
            </>
          )}
        </View>
        <Pressable
          onPress={onAI}
          style={styles.button}
          accessibilityRole="button"
          accessibilityLabel="AI">
          <IconSymbol name="sparkles" size={28} color="#000" />
          <Text style={[styles.label, { color: '#000' }]}>AI</Text>
        </Pressable>
        <View style={[styles.section, styles.sectionEnd]}>
          <Pressable
            onPress={onSettings}
            style={styles.button}
            accessibilityRole="button"
            accessibilityLabel="Instellingen openen">
            <IconSymbol name="gearshape.fill" size={28} color="#000" />
            <Text style={[styles.label, { color: '#000' }]}>Instellingen</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  row: {
    height: TOOLBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: '600',
  },
  section: {
    flex: 1,
    flexDirection: 'row',
  },
  sectionEnd: {
    justifyContent: 'flex-end',
  },
});
