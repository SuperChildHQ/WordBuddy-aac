export interface BoardItem {
  id: string;
  label: string;
  imageUrl: string;
  audioFile?: string;
  backgroundColor?: string;
}

export interface Board {
  id: string;
  name: string;
  items: BoardItem[];
}

export interface AppSettings {
  gridSize: number;
}

export const DEFAULT_SETTINGS: AppSettings = {
  gridSize: 4,
};
