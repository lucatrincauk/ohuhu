import type { Marker, MarkerSet } from './types';

export const INITIAL_MARKER_SETS: MarkerSet[] = [
  { id: 'ohuhu-honolulu-b', name: 'Ohuhu Honolulu B (Brush & Chisel)' },
  { id: 'ohuhu-kaala', name: 'Ohuhu Kaala (Fine & Chisel)' },
  { id: 'ohuhu-maui', name: 'Ohuhu Maui (Broad & Fine)' },
  { id: 'other', name: 'Other/Uncategorized' },
];

export const INITIAL_MARKERS: Marker[] = [
  { id: 'R010', name: 'Coral', hex: '#FF7F50', setId: 'ohuhu-honolulu-b' },
  { id: 'Y030', name: 'Pale Yellow', hex: '#FFFFE0', setId: 'ohuhu-honolulu-b' },
  { id: 'B060', name: 'Sky Blue', hex: '#87CEEB', setId: 'ohuhu-kaala' },
  { id: 'G050', name: 'Mint Green', hex: '#98FF98', setId: 'ohuhu-maui' },
  { id: 'P020', name: 'Lavender', hex: '#E6E6FA', setId: 'ohuhu-honolulu-b' },
  { id: 'WG03', name: 'Warm Grey 3', hex: '#BCB6AF', setId: 'other' },
  { id: 'A59AC4-sample', name: 'App Primary', hex: '#A59AC4', setId: 'other' },
  { id: '79A3B1-sample', name: 'App Accent', hex: '#79A3B1', setId: 'other' },
];

export const COMMON_COLORS_FILTER = [
  { name: "Red", hexBase: "#FF0000" },
  { name: "Orange", hexBase: "#FFA500" },
  { name: "Yellow", hexBase: "#FFFF00" },
  { name: "Green", hexBase: "#008000" },
  { name: "Blue", hexBase: "#0000FF" },
  { name: "Purple", hexBase: "#800080" },
  { name: "Pink", hexBase: "#FFC0CB" },
  { name: "Brown", hexBase: "#A52A2A" },
  { name: "Grey", hexBase: "#808080" },
  { name: "Black", hexBase: "#000000" },
  { name: "White", hexBase: "#FFFFFF" },
];
