import { useCallback, useState } from 'react';
import * as Speech from 'expo-speech';

import { BoardItem } from '@/types/board';

export function useSentenceBar() {
  const [items, setItems] = useState<BoardItem[]>([]);

  const addItem = useCallback((item: BoardItem) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const playAll = useCallback(() => {
    if (items.length === 0) return;
    Speech.stop();
    const sentence = items.map((i) => i.label).join(' ');
    Speech.speak(sentence, { language: 'en-US', rate: 0.9 });
  }, [items]);

  return { items, addItem, clear, playAll };
}
