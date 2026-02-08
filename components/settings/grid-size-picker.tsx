import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface GridSizePickerProps {
  value: number;
  onChange: (size: number) => void;
  min?: number;
  max?: number;
}

export function GridSizePicker({ value, onChange, min = 2, max = 12 }: GridSizePickerProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onChange(Math.max(min, value - 1))}
        style={[styles.button, { backgroundColor: colors.accent }]}
        disabled={value <= min}
        accessibilityLabel="Rastergrootte verkleinen"
        accessibilityRole="button">
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
      <Text style={[styles.value, { color: colors.text }]}>
        {value} x {value}
      </Text>
      <Pressable
        onPress={() => onChange(Math.min(max, value + 1))}
        style={[styles.button, { backgroundColor: colors.accent }]}
        disabled={value >= max}
        accessibilityLabel="Rastergrootte vergroten"
        accessibilityRole="button">
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  value: {
    fontSize: 24,
    fontWeight: '600',
    minWidth: 80,
    textAlign: 'center',
  },
});
