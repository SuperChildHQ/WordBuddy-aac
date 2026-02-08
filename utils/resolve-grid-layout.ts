import { BoardItem } from '@/types/board';

/** Maps a normalized 0-1 value to a grid cell index, clamped to valid range. */
function toGridIndex(normalized: number, gridSize: number): number {
  const clamped = Math.max(0, Math.min(1, normalized));
  return Math.round(clamped * (gridSize - 1));
}

/** Euclidean distance from item's normalized position to the center of a given cell. */
function distanceFromCellCenter(
  normRow: number,
  normCol: number,
  cellRow: number,
  cellCol: number,
  gridSize: number,
): number {
  const cellCenterRow = cellRow / (gridSize - 1 || 1);
  const cellCenterCol = cellCol / (gridSize - 1 || 1);
  return Math.sqrt((normRow - cellCenterRow) ** 2 + (normCol - cellCenterCol) ** 2);
}

/** Finds the nearest empty cell, searching overflow rows if needed. */
function findNearestEmptyCell(
  grid: (BoardItem | null)[][],
  targetRow: number,
  targetCol: number,
  normRow: number,
  normCol: number,
  gridSize: number,
): { row: number; col: number } | null {
  const totalRows = grid.length;
  let best: { row: number; col: number; manhattan: number; euclidean: number } | null = null;

  for (let r = 0; r < totalRows; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] !== null) continue;

      const manhattan = Math.abs(r - targetRow) + Math.abs(c - targetCol);
      const euclidean = distanceFromCellCenter(normRow, normCol, r, c, gridSize);

      if (
        best === null ||
        manhattan < best.manhattan ||
        (manhattan === best.manhattan && euclidean < best.euclidean)
      ) {
        best = { row: r, col: c, manhattan, euclidean };
      }
    }
  }

  return best ? { row: best.row, col: best.col } : null;
}

/** Adds an empty row to the grid and returns its index. */
function addOverflowRow(grid: (BoardItem | null)[][], gridSize: number): number {
  grid.push(Array.from({ length: gridSize }, () => null));
  return grid.length - 1;
}

/**
 * Resolves items into a 2D grid layout using normalized positions.
 *
 * Items with positions are placed at their target cells; collisions are resolved
 * by proximity. Items without positions fill remaining empty cells in reading order.
 *
 * When more items exist than fit in gridSize × gridSize, overflow rows are added
 * and the grid becomes vertically scrollable.
 */
export function resolveGridLayout(
  items: BoardItem[],
  gridSize: number,
): (BoardItem | null)[][] {
  // Initialize empty grid
  const grid: (BoardItem | null)[][] = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => null),
  );

  // Separate positioned and unpositioned items
  const positioned: { item: BoardItem; targetRow: number; targetCol: number; distance: number }[] = [];
  const unpositioned: BoardItem[] = [];

  for (const item of items) {
    if (item.position) {
      const targetRow = toGridIndex(item.position.row, gridSize);
      const targetCol = toGridIndex(item.position.col, gridSize);
      const distance = distanceFromCellCenter(
        item.position.row,
        item.position.col,
        targetRow,
        targetCol,
        gridSize,
      );
      positioned.push({ item, targetRow, targetCol, distance });
    } else {
      unpositioned.push(item);
    }
  }

  // Sort positioned items by distance (closest to target cell center first = highest priority)
  positioned.sort((a, b) => a.distance - b.distance);

  // Place positioned items
  const displaced: { item: BoardItem; targetRow: number; targetCol: number }[] = [];

  for (const { item, targetRow, targetCol } of positioned) {
    if (grid[targetRow][targetCol] === null) {
      grid[targetRow][targetCol] = item;
    } else {
      displaced.push({ item, targetRow, targetCol });
    }
  }

  // Relocate displaced items to nearest empty cell, adding overflow rows if needed
  for (const { item, targetRow, targetCol } of displaced) {
    let cell = findNearestEmptyCell(
      grid,
      targetRow,
      targetCol,
      item.position!.row,
      item.position!.col,
      gridSize,
    );
    if (!cell) {
      const newRow = addOverflowRow(grid, gridSize);
      cell = { row: newRow, col: 0 };
    }
    grid[cell.row][cell.col] = item;
  }

  // Fill remaining empty cells with unpositioned items in reading order
  let unposIdx = 0;
  for (let r = 0; r < grid.length && unposIdx < unpositioned.length; r++) {
    for (let c = 0; c < gridSize && unposIdx < unpositioned.length; c++) {
      if (grid[r][c] === null) {
        grid[r][c] = unpositioned[unposIdx++];
      }
    }
  }

  // If there are still unpositioned items left, add overflow rows
  while (unposIdx < unpositioned.length) {
    addOverflowRow(grid, gridSize);
    const lastRow = grid.length - 1;
    for (let c = 0; c < gridSize && unposIdx < unpositioned.length; c++) {
      grid[lastRow][c] = unpositioned[unposIdx++];
    }
  }

  return grid;
}
