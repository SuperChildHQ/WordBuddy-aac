export interface NormalizedPosition {
  row: number; // 0.0 (top) to 1.0 (bottom)
  col: number; // 0.0 (left) to 1.0 (right)
}

export interface BoardItem {
  id: string;
  label: string;
  imageUrl: string;
  symbolId?: number; // ARASAAC pictogram ID
  audioFile?: string;
  backgroundColor?: string;
  position?: NormalizedPosition;
  type?: 'word' | 'folder' | 'popover';
  linkedBoardId?: string;
}

export interface Board {
  id: string;
  name: string;
  items: BoardItem[];
}

export interface AppSettings {
  gridSize: number;
  sentenceBarEnabled: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  gridSize: 4,
  sentenceBarEnabled: false,
};
