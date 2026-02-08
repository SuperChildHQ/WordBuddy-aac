import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { Board } from '@/types/board';
import { loadBoard } from '@/utils/board-storage';
import { useBoardStorage } from '@/contexts/board-storage-context';

interface BoardNavigationContextValue {
  currentBoard: Board | null;
  isHome: boolean;
  navigateToBoard: (boardId: string) => void;
  goBack: () => void;
  goHome: () => void;
  reloadCurrentBoard: () => void;
}

const BoardNavigationContext = createContext<BoardNavigationContextValue | null>(null);

export function BoardNavigationProvider({ children }: { children: React.ReactNode }) {
  const { isReady } = useBoardStorage();
  const [boardStack, setBoardStack] = useState<string[]>(['home']);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);

  const currentBoardId = boardStack[boardStack.length - 1];

  const loadCurrentBoard = useCallback(() => {
    const board = loadBoard(currentBoardId);
    setCurrentBoard(board);
  }, [currentBoardId]);

  useEffect(() => {
    if (isReady) {
      loadCurrentBoard();
    }
  }, [isReady, loadCurrentBoard]);

  const navigateToBoard = useCallback((boardId: string) => {
    setBoardStack((prev) => [...prev, boardId]);
  }, []);

  const goBack = useCallback(() => {
    setBoardStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const goHome = useCallback(() => {
    setBoardStack(['home']);
  }, []);

  const reloadCurrentBoard = useCallback(() => {
    loadCurrentBoard();
  }, [loadCurrentBoard]);

  return (
    <BoardNavigationContext.Provider
      value={{
        currentBoard,
        isHome: boardStack.length <= 1,
        navigateToBoard,
        goBack,
        goHome,
        reloadCurrentBoard,
      }}>
      {children}
    </BoardNavigationContext.Provider>
  );
}

export function useBoardNavigation() {
  const ctx = useContext(BoardNavigationContext);
  if (!ctx) {
    throw new Error('useBoardNavigation must be used within a BoardNavigationProvider');
  }
  return ctx;
}
