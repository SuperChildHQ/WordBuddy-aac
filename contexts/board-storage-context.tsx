import { createContext, useContext, useEffect, useState } from 'react';

import { initializeBoardsIfNeeded } from '@/utils/board-storage';

interface BoardStorageContextValue {
  isReady: boolean;
}

const BoardStorageContext = createContext<BoardStorageContextValue | null>(null);

export function BoardStorageProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initializeBoardsIfNeeded();
    setIsReady(true);
  }, []);

  return (
    <BoardStorageContext.Provider value={{ isReady }}>
      {children}
    </BoardStorageContext.Provider>
  );
}

export function useBoardStorage() {
  const ctx = useContext(BoardStorageContext);
  if (!ctx) {
    throw new Error('useBoardStorage must be used within a BoardStorageProvider');
  }
  return ctx;
}
