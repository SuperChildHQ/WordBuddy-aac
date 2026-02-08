import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import { GridBoard } from '@/components/board/grid-board';
import { BottomToolbar, TOOLBAR_HEIGHT } from '@/components/toolbar/bottom-toolbar';
import { SentenceBar, SENTENCE_BAR_HEIGHT } from '@/components/sentence-bar/sentence-bar';
import { MenuOverlay } from '@/components/overlay/menu-overlay';
import { PopoverGrid } from '@/components/overlay/popover-grid';
import { ItemEditor } from '@/components/board/item-editor';
import { ThemedView } from '@/components/themed-view';
import { useAudio } from '@/hooks/use-audio';
import { useSettingsContext } from '@/contexts/settings-context';
import { useBoardNavigation } from '@/contexts/board-navigation-context';
import { useBoardStorage } from '@/contexts/board-storage-context';
import { useSentenceBar } from '@/hooks/use-sentence-bar';
import { loadBoard, saveBoard } from '@/utils/board-storage';
import { BoardItem, NormalizedPosition } from '@/types/board';

const BACK_ITEM_ID = '__back__';

export default function MainScreen() {
  const { settings, updateSettings, isLoaded, editMode, setEditMode } = useSettingsContext();
  const { currentBoard, isHome, navigateToBoard, goBack, goHome, reloadCurrentBoard } =
    useBoardNavigation();
  const { isReady } = useBoardStorage();
  const { playItem } = useAudio();
  const sentenceBar = useSentenceBar();

  const [menuVisible, setMenuVisible] = useState(false);
  const [editorVisible, setEditorVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<BoardItem | null>(null);
  const [editingPosition, setEditingPosition] = useState<NormalizedPosition | undefined>(undefined);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverItems, setPopoverItems] = useState<BoardItem[]>([]);
  const [popoverTitle, setPopoverTitle] = useState('');

  if (!isLoaded || !isReady || !currentBoard) {
    return <ThemedView style={styles.container} />;
  }

  const topOffset = settings.sentenceBarEnabled ? SENTENCE_BAR_HEIGHT : 0;
  const bottomOffset = TOOLBAR_HEIGHT;

  const boardItems = useMemo(() => {
    if (isHome) return currentBoard.items;
    const backItem: BoardItem = {
      id: BACK_ITEM_ID,
      label: '← Terug',
      imageUrl: 'https://placehold.co/200x200/555/fff?text=%E2%86%90',
      backgroundColor: '#555',
      position: { row: 0, col: 0 },
    };
    return [backItem, ...currentBoard.items];
  }, [isHome, currentBoard.items]);

  const handlePopoverItemPress = (item: BoardItem) => {
    if (settings.sentenceBarEnabled) {
      sentenceBar.addItem(item);
    }
    playItem(item);
  };

  const handleItemPress = (item: BoardItem) => {
    if (item.id === BACK_ITEM_ID) {
      goBack();
      return;
    }
    if (editMode) {
      setEditingItem(item);
      setEditingPosition(undefined);
      setEditorVisible(true);
      return;
    }
    if (item.type === 'folder' && item.linkedBoardId) {
      navigateToBoard(item.linkedBoardId);
      return;
    }
    if (item.type === 'popover' && item.linkedBoardId) {
      const board = loadBoard(item.linkedBoardId);
      if (board) {
        setPopoverItems(board.items);
        setPopoverTitle(item.label);
        setPopoverVisible(true);
      }
      return;
    }
    if (settings.sentenceBarEnabled) {
      sentenceBar.addItem(item);
    }
    playItem(item);
  };

  const handleOpenFolder = (boardId: string) => {
    setEditorVisible(false);
    setEditingItem(null);
    navigateToBoard(boardId);
  };

  const handleEmptyCellPress = (row: number, col: number) => {
    const gridSize = settings.gridSize;
    const normalizedPosition: NormalizedPosition = {
      row: gridSize > 1 ? row / (gridSize - 1) : 0,
      col: gridSize > 1 ? col / (gridSize - 1) : 0,
    };
    setEditingItem(null);
    setEditingPosition(normalizedPosition);
    setEditorVisible(true);
  };

  const handleItemDelete = (item: BoardItem) => {
    if (item.id === BACK_ITEM_ID) return;
    const updatedBoard = {
      ...currentBoard,
      items: currentBoard.items.filter((i) => i.id !== item.id),
    };
    saveBoard(updatedBoard);
    reloadCurrentBoard();
  };

  const handleEditorSave = (item: BoardItem) => {
    let updatedItems: BoardItem[];
    const existingIndex = currentBoard.items.findIndex((i) => i.id === item.id);
    if (existingIndex >= 0) {
      updatedItems = [...currentBoard.items];
      updatedItems[existingIndex] = item;
    } else {
      updatedItems = [...currentBoard.items, item];
    }
    saveBoard({ ...currentBoard, items: updatedItems });
    reloadCurrentBoard();
    setEditorVisible(false);
    setEditingItem(null);
    setEditingPosition(undefined);
  };

  return (
    <ThemedView style={styles.container}>
      {settings.sentenceBarEnabled && (
        <SentenceBar
          items={sentenceBar.items}
          onClear={sentenceBar.clear}
          onPlay={sentenceBar.playAll}
        />
      )}

      <GridBoard
        items={boardItems}
        gridSize={settings.gridSize}
        onItemPress={handleItemPress}
        topOffset={topOffset}
        bottomOffset={bottomOffset}
        editMode={editMode}
        onEmptyCellPress={handleEmptyCellPress}
        onItemDelete={handleItemDelete}
      />

      <BottomToolbar
        isHome={isHome}
        onBack={goBack}
        onHome={goHome}
        onAI={() => {/* TODO: AI feature */}}
        onSettings={() => setMenuVisible(true)}
      />

      <MenuOverlay
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        editMode={editMode}
        onToggleEditMode={() => {
          setEditMode(!editMode);
          setMenuVisible(false);
        }}
        sentenceBarEnabled={settings.sentenceBarEnabled}
        onToggleSentenceBar={() => {
          updateSettings({ sentenceBarEnabled: !settings.sentenceBarEnabled });
          setMenuVisible(false);
        }}
        gridSize={settings.gridSize}
        onGridSizeChange={(gridSize) => updateSettings({ gridSize })}
      />

      <PopoverGrid
        visible={popoverVisible}
        items={popoverItems}
        title={popoverTitle}
        onItemPress={handlePopoverItemPress}
        onClose={() => setPopoverVisible(false)}
      />

      <ItemEditor
        visible={editorVisible}
        onClose={() => {
          setEditorVisible(false);
          setEditingItem(null);
          setEditingPosition(undefined);
        }}
        onSave={handleEditorSave}
        onOpenFolder={handleOpenFolder}
        item={editingItem}
        position={editingPosition}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
