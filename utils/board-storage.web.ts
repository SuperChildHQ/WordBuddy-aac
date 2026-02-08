import { Board } from '@/types/board';
import { DEMO_BOARD } from '@/data/demo-board';

const STORAGE_PREFIX = 'wordbuddy_board_';

export function generateBoardId(): string {
  return `board_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

export function generateImageUrl(label: string, bgColor = '#888'): string {
  const hex = bgColor.replace('#', '');
  return `https://placehold.co/200x200/${hex}/fff?text=${encodeURIComponent(label)}`;
}

export function initializeBoardsIfNeeded(): void {
  const homeKey = `${STORAGE_PREFIX}home`;
  if (!localStorage.getItem(homeKey)) {
    localStorage.setItem(homeKey, JSON.stringify(DEMO_BOARD));
  }
}

export function loadBoard(boardId: string): Board | null {
  const raw = localStorage.getItem(`${STORAGE_PREFIX}${boardId}`);
  if (!raw) return null;
  return JSON.parse(raw) as Board;
}

export function saveBoard(board: Board): void {
  localStorage.setItem(`${STORAGE_PREFIX}${board.id}`, JSON.stringify(board));
}

export function deleteBoard(boardId: string): void {
  localStorage.removeItem(`${STORAGE_PREFIX}${boardId}`);
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
  return localStorage.getItem(`${STORAGE_PREFIX}${boardId}`) !== null;
}
