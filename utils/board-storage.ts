import { File, Directory, Paths } from 'expo-file-system';

import { Board } from '@/types/board';
import { DEMO_BOARD } from '@/data/demo-board';

const BOARDS_DIR_NAME = 'boards';

function getBoardsDir(): Directory {
  return new Directory(Paths.document, BOARDS_DIR_NAME);
}

function getBoardFile(boardId: string): File {
  return new File(getBoardsDir(), `${boardId}.json`);
}

export function generateBoardId(): string {
  return `board_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

export function generateImageUrl(label: string, bgColor = '#888'): string {
  const hex = bgColor.replace('#', '');
  return `https://placehold.co/200x200/${hex}/fff?text=${encodeURIComponent(label)}`;
}

export function initializeBoardsIfNeeded(): void {
  const boardsDir = getBoardsDir();
  if (!boardsDir.exists) {
    boardsDir.create();
  }
  const homeFile = getBoardFile('home');
  if (!homeFile.exists) {
    homeFile.create();
    homeFile.write(JSON.stringify(DEMO_BOARD));
  }
}

export function loadBoard(boardId: string): Board | null {
  const file = getBoardFile(boardId);
  if (!file.exists) return null;
  const raw = file.textSync();
  return JSON.parse(raw) as Board;
}

export function saveBoard(board: Board): void {
  const boardsDir = getBoardsDir();
  if (!boardsDir.exists) {
    boardsDir.create();
  }
  const file = getBoardFile(board.id);
  if (!file.exists) {
    file.create();
  }
  file.write(JSON.stringify(board));
}

export function deleteBoard(boardId: string): void {
  const file = getBoardFile(boardId);
  if (file.exists) {
    file.delete();
  }
}

export function createBoard(name: string): Board {
  const board: Board = {
    id: generateBoardId(),
    name,
    items: [],
  };
  saveBoard(board);
  return board;
}

export function boardExists(boardId: string): boolean {
  return getBoardFile(boardId).exists;
}
