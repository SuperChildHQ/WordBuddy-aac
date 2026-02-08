import { Board } from '@/types/board';

export const DEMO_BOARD: Board = {
  id: 'home',
  name: 'Kernwoorden',
  items: [
    // Sociaal (oranje)
    { id: '1', label: 'ik', imageUrl: 'https://placehold.co/200x200/FF8C00/fff?text=ik', backgroundColor: '#FF8C00', position: { row: 0, col: 0 } },
    { id: '2', label: 'hallo', imageUrl: 'https://placehold.co/200x200/FF8C00/fff?text=hallo', backgroundColor: '#FF8C00', position: { row: 0, col: 0.33 } },
    { id: '3', label: 'dag', imageUrl: 'https://placehold.co/200x200/FF8C00/fff?text=dag', backgroundColor: '#FF8C00', position: { row: 0, col: 0.67 } },
    { id: '4', label: 'ja', imageUrl: 'https://placehold.co/200x200/FF8C00/fff?text=ja', backgroundColor: '#FF8C00', position: { row: 0, col: 1 } },

    // Belangrijk / ontkenning (rood)
    { id: '5', label: 'nee', imageUrl: 'https://placehold.co/200x200/E74C3C/fff?text=nee', backgroundColor: '#E74C3C', position: { row: 0.33, col: 0 } },
    { id: '6', label: 'stop', imageUrl: 'https://placehold.co/200x200/E74C3C/fff?text=stop', backgroundColor: '#E74C3C', position: { row: 0.33, col: 0.33 } },
    { id: '7', label: 'help', imageUrl: 'https://placehold.co/200x200/E74C3C/fff?text=help', backgroundColor: '#E74C3C', position: { row: 0.33, col: 0.67 } },
    { id: '8', label: 'meer', imageUrl: 'https://placehold.co/200x200/E74C3C/fff?text=meer', backgroundColor: '#E74C3C', position: { row: 0.33, col: 1 } },

    // Werkwoorden (groen)
    { id: '9', label: 'wil', imageUrl: 'https://placehold.co/200x200/27AE60/fff?text=wil', backgroundColor: '#27AE60', position: { row: 0.67, col: 0 } },
    { id: '10', label: 'gaan', imageUrl: 'https://placehold.co/200x200/27AE60/fff?text=gaan', backgroundColor: '#27AE60', position: { row: 0.67, col: 0.33 } },
    { id: '11', label: 'eten', imageUrl: 'https://placehold.co/200x200/27AE60/fff?text=eten', backgroundColor: '#27AE60', position: { row: 0.67, col: 0.67 } },
    { id: '12', label: 'drinken', imageUrl: 'https://placehold.co/200x200/27AE60/fff?text=drinken', backgroundColor: '#27AE60', position: { row: 0.67, col: 1 } },

    // Werkwoorden (groen) vervolg
    { id: '13', label: 'spelen', imageUrl: 'https://placehold.co/200x200/27AE60/fff?text=spelen', backgroundColor: '#27AE60', position: { row: 1, col: 0 } },
    { id: '14', label: 'leuk', imageUrl: 'https://placehold.co/200x200/27AE60/fff?text=leuk', backgroundColor: '#27AE60', position: { row: 1, col: 0.33 } },

    // Gevoelens (paars)
    { id: '15', label: 'blij', imageUrl: 'https://placehold.co/200x200/8E44AD/fff?text=blij', backgroundColor: '#8E44AD', position: { row: 1, col: 0.67 } },
    { id: '16', label: 'verdrietig', imageUrl: 'https://placehold.co/200x200/8E44AD/fff?text=verdrietig', backgroundColor: '#8E44AD', position: { row: 1, col: 1 } },
  ],
};
