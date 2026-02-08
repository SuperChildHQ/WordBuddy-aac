import { Board } from '@/types/board';

export const DEMO_BOARD: Board = {
  id: 'demo',
  name: 'Core Words',
  items: [
    // Social (orange)
    { id: '1', label: 'I', imageUrl: 'https://placehold.co/200x200/FF8C00/fff?text=I', backgroundColor: '#FF8C00' },
    { id: '2', label: 'hello', imageUrl: 'https://placehold.co/200x200/FF8C00/fff?text=hello', backgroundColor: '#FF8C00' },
    { id: '3', label: 'bye', imageUrl: 'https://placehold.co/200x200/FF8C00/fff?text=bye', backgroundColor: '#FF8C00' },
    { id: '4', label: 'yes', imageUrl: 'https://placehold.co/200x200/FF8C00/fff?text=yes', backgroundColor: '#FF8C00' },

    // Important / negation (red)
    { id: '5', label: 'no', imageUrl: 'https://placehold.co/200x200/E74C3C/fff?text=no', backgroundColor: '#E74C3C' },
    { id: '6', label: 'stop', imageUrl: 'https://placehold.co/200x200/E74C3C/fff?text=stop', backgroundColor: '#E74C3C' },
    { id: '7', label: 'help', imageUrl: 'https://placehold.co/200x200/E74C3C/fff?text=help', backgroundColor: '#E74C3C' },
    { id: '8', label: 'more', imageUrl: 'https://placehold.co/200x200/E74C3C/fff?text=more', backgroundColor: '#E74C3C' },

    // Verbs (green)
    { id: '9', label: 'want', imageUrl: 'https://placehold.co/200x200/27AE60/fff?text=want', backgroundColor: '#27AE60' },
    { id: '10', label: 'go', imageUrl: 'https://placehold.co/200x200/27AE60/fff?text=go', backgroundColor: '#27AE60' },
    { id: '11', label: 'eat', imageUrl: 'https://placehold.co/200x200/27AE60/fff?text=eat', backgroundColor: '#27AE60' },
    { id: '12', label: 'drink', imageUrl: 'https://placehold.co/200x200/27AE60/fff?text=drink', backgroundColor: '#27AE60' },

    // Verbs (green) continued
    { id: '13', label: 'play', imageUrl: 'https://placehold.co/200x200/27AE60/fff?text=play', backgroundColor: '#27AE60' },
    { id: '14', label: 'like', imageUrl: 'https://placehold.co/200x200/27AE60/fff?text=like', backgroundColor: '#27AE60' },

    // Feelings (purple)
    { id: '15', label: 'happy', imageUrl: 'https://placehold.co/200x200/8E44AD/fff?text=happy', backgroundColor: '#8E44AD' },
    { id: '16', label: 'sad', imageUrl: 'https://placehold.co/200x200/8E44AD/fff?text=sad', backgroundColor: '#8E44AD' },
  ],
};
