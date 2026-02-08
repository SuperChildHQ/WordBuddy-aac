import { useCallback } from 'react';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

import { BoardItem } from '@/types/board';

export function useAudio() {
  const playItem = useCallback(async (item: BoardItem) => {
    if (item.audioFile) {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri: item.audioFile });
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
          }
        });
        await sound.playAsync();
      } catch {
        // Fall back to TTS if audio file fails
        Speech.stop();
        Speech.speak(item.label, { language: 'en-US', rate: 0.9 });
      }
    } else {
      Speech.stop();
      Speech.speak(item.label, { language: 'en-US', rate: 0.9 });
    }
  }, []);

  return { playItem };
}
