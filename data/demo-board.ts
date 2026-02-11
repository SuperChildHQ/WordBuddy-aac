import { Board } from '@/types/board';
import { getSymbolImageUrl } from '@/utils/arasaac';

export const DEMO_BOARD: Board = {
  id: 'home',
  name: 'Kernwoorden',
  items: [
    // Sociaal (oranje)
    { id: '1', label: 'ik', imageUrl: getSymbolImageUrl(3030), symbolId: 3030, backgroundColor: '#FF8C00', position: { row: 0, col: 0 } },
    { id: '2', label: 'hallo', imageUrl: getSymbolImageUrl(6522), symbolId: 6522, backgroundColor: '#FF8C00', position: { row: 0, col: 0.33 } },
    { id: '3', label: 'dag', imageUrl: getSymbolImageUrl(6028), symbolId: 6028, backgroundColor: '#FF8C00', position: { row: 0, col: 0.67 } },
    { id: '4', label: 'ja', imageUrl: getSymbolImageUrl(5584), symbolId: 5584, backgroundColor: '#FF8C00', position: { row: 0, col: 1 } },

    // Belangrijk / ontkenning (rood)
    { id: '5', label: 'nee', imageUrl: getSymbolImageUrl(39149), symbolId: 39149, backgroundColor: '#E74C3C', position: { row: 0.33, col: 0 } },
    { id: '6', label: 'stop', imageUrl: getSymbolImageUrl(2499), symbolId: 2499, backgroundColor: '#E74C3C', position: { row: 0.33, col: 0.33 } },
    { id: '7', label: 'help', imageUrl: getSymbolImageUrl(19524), symbolId: 19524, backgroundColor: '#E74C3C', position: { row: 0.33, col: 0.67 } },
    { id: '8', label: 'meer', imageUrl: getSymbolImageUrl(5508), symbolId: 5508, backgroundColor: '#E74C3C', position: { row: 0.33, col: 1 } },

    // Werkwoorden (groen)
    { id: '9', label: 'wil', imageUrl: getSymbolImageUrl(5441), symbolId: 5441, backgroundColor: '#27AE60', position: { row: 0.67, col: 0 } },
    { id: '10', label: 'gaan', imageUrl: getSymbolImageUrl(15501), symbolId: 15501, backgroundColor: '#27AE60', position: { row: 0.67, col: 0.33 } },
    { id: '11', label: 'eten', imageUrl: getSymbolImageUrl(15420), symbolId: 15420, backgroundColor: '#27AE60', position: { row: 0.67, col: 0.67 } },
    { id: '12', label: 'drinken', imageUrl: getSymbolImageUrl(30403), symbolId: 30403, backgroundColor: '#27AE60', position: { row: 0.67, col: 1 } },

    // Werkwoorden (groen) vervolg
    { id: '13', label: 'spelen', imageUrl: getSymbolImageUrl(17437), symbolId: 17437, backgroundColor: '#27AE60', position: { row: 1, col: 0 } },
    { id: '14', label: 'leuk', imageUrl: getSymbolImageUrl(2418), symbolId: 2418, backgroundColor: '#27AE60', position: { row: 1, col: 0.33 } },

    // Gevoelens (paars)
    { id: '15', label: 'blij', imageUrl: getSymbolImageUrl(23563), symbolId: 23563, backgroundColor: '#8E44AD', position: { row: 1, col: 0.67 } },
    { id: '16', label: 'verdrietig', imageUrl: getSymbolImageUrl(23608), symbolId: 23608, backgroundColor: '#8E44AD', position: { row: 1, col: 1 } },
  ],
};
