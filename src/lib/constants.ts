
import type { Marker, MarkerSet } from './types';

export const INITIAL_MARKER_SETS: MarkerSet[] = [
  { id: 'ohuhu-honolulu-b', name: 'Ohuhu Honolulu B (Brush & Chisel)' },
];

const userProvidedMarkerIDs: string[] = [
  'Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'Y6', 'Y7', 'Y8', 'Y9', 'Y10', 'Y11', 'Y12', 'Y13',
  'YR1', 'YR2', 'YR3', 'YR4', 'YR5', 'YR33',
  'RP1', 'RP6',
  'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12', 'R13', 'R14', 'R15', 'R16', 'R17', 'R18', 'R19', 'R20', 'R21', 'R22', 'R23', 'R24', 'R25',
  'P1', 'P2', 'P3', 'P4', 'P5',
  'PB1', 'PB2', 'PB3', 'PB4', 'PB5', 'PB6', 'PB7', 'PB8', 'PB9', 'PB10', 'PB11',
  '120',
  'BG1', 'BG2', 'BG3', 'BG4', 'BG5', 'BG6', 'BG7', 'BG8', 'BG9', 'BG68', 'BGII03', 'BGII05', 'BGII09',
  'B64',
  'BR1', 'BR2', 'BR3',
  'WG01', 'WG09', 'WG3', 'WG4',
  'CG2', 'CG5', 'CGII00', 'CGII04', 'CGII07', 'CGII08', 'CGII09',
  'NG03', 'NG06', 'NG07', 'NG09',
  'GG1', 'GG3', 'GG5', 'GG9',
  'GY1', 'GY2', 'GY3', 'GY4', 'GY5', 'GY6', 'GY7', 'GY8', 'GY42', 'GY43', 'GY172', 'GY173',
  'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9'
];

// Data from the previous version of INITIAL_MARKERS to pull existing names/hex when IDs match.
const existingMarkerData: Record<string, { name: string; hex: string }> = {
  'R1': { name: 'Carmine', hex: '#D1002C' },
  'R2': { name: 'Scarlet', hex: '#ED1C24' },
  'R3': { name: 'Rose Red', hex: '#F15A24' },
  'R4': { name: 'Cherry Pink', hex: '#F26C7D' },
  'R5': { name: 'Coral Pink', hex: '#F69088' },
  'R6': { name: 'Vivid Pink', hex: '#EC008C' },
  'R7': { name: 'Cosmos', hex: '#CE0071' },
  'R8': { name: 'Deep Red', hex: '#94181D' },
  'R9': { name: 'Pale Pink', hex: '#FDECF1' },
  'R10': { name: 'Wine Red', hex: '#790000' },
  'R11': { name: 'Dark Geranium', hex: '#C62930' },
  'R12': { name: 'Rose Pink', hex: '#FBB4C4' },
  'R13': { name: 'Vermillion', hex: '#F26522' },
  'R14': { name: 'Light Pink', hex: '#FED6E0' },
  'R15': { name: 'Geranium', hex: '#EC165D' },
  'R16': { name: 'Lipstick Red', hex: '#BD1030' },
  'R17': { name: 'Pastel Pink', hex: '#FEEFED' },
  'R18': { name: 'Salmon Pink', hex: '#FF8988' },
  'Y1': { name: 'Lemon Yellow', hex: '#FFF500' },
  'Y2': { name: 'Canary Yellow', hex: '#FFEE00' },
  'Y3': { name: 'Yellow', hex: '#FFDD00' },
  'Y4': { name: 'Naples Yellow', hex: '#FDD97B' },
  'Y5': { name: 'Cream', hex: '#FFF7D7' },
  'Y6': { name: 'Honey', hex: '#F8B95A' },
  'Y7': { name: 'Acid Yellow', hex: '#FFF200' },
  'Y8': { name: 'Deep Yellow', hex: '#FFC90E' },
  'Y9': { name: 'Golden Yellow', hex: '#FFC20E' },
  'Y10': { name: 'Pastel Yellow', hex: '#FFFDEB' },
  'Y11': { name: 'Mellow Yellow', hex: '#FFE080' },
  'Y12': { name: 'Barium Yellow', hex: '#F7EA4A' },
  'Y13': { name: 'Buttercup Yellow', hex: '#FAE931' },
  'YG1': { name: 'Yellow Green', hex: '#D0E07A' }, // Will be mapped to GY1
  'YG2': { name: 'Vivid Green', hex: '#8DC63F' },  // Will be mapped to GY2
  'YG3': { name: 'Grass Green', hex: '#39B54A' },  // Will be mapped to GY3
  'YG4': { name: 'Mignonette', hex: '#D6E69C' }, // Will be mapped to GY4
  'YG5': { name: 'Chartreuse', hex: '#BADD78' },  // Will be mapped to GY5
  'YG6': { name: 'Spring Green', hex: '#C4DF9B' },  // Will be mapped to GY6
  'YG7': { name: 'Olive Green', hex: '#698220' },  // Will be mapped to GY7
  'YG8': { name: 'Deep Olive Green', hex: '#55701C' },// Will be mapped to GY8
  'G1': { name: 'Emerald Green', hex: '#00A651' },
  'G2': { name: 'Forest Green', hex: '#006837' },
  'G3': { name: 'Lime Green', hex: '#8CC63F' },
  'G4': { name: 'Turquoise Green', hex: '#00A99D' },
  'G5': { name: 'Mint Green Light', hex: '#C0E6B0' },
  'G6': { name: 'Ice Green', hex: '#AFDDCD' },
  'G7': { name: 'Pastel Green', hex: '#97D3A9' },
  'G8': { name: 'Apple Green', hex: '#64A541' },
  'G9': { name: 'Peacock Green', hex: '#00806E' },
  'P1': { name: 'Lilac', hex: '#C8A2C8' },
  'P2': { name: 'Lavender', hex: '#E6E6FA' },
  'P3': { name: 'Violet', hex: '#8F00FF' },
  'P4': { name: 'Light Violet', hex: '#CF9FFF' },
  'P5': { name: 'Pale Lilac', hex: '#E2CCFF' },
  'CG1': { name: 'Cool Grey 1', hex: '#E6E6E6' }, // WG01 from user is WG1
  'CG2': { name: 'Cool Grey 2', hex: '#D9D9D9' },
  'CG3': { name: 'Cool Grey 3', hex: '#CCCCCC' },
  'CG4': { name: 'Cool Grey 4', hex: '#BFBFBF' },
  'CG5': { name: 'Cool Grey 5', hex: '#A9A9A9' },
  'WG1': { name: 'Warm Grey 1', hex: '#EAE4DB' }, // User WG01 -> My WG1
  'WG3': { name: 'Warm Grey 3', hex: '#BCB6AF' },
  'WG4': { name: 'Warm Grey 4', hex: '#B0A99F' },
  'WG9': { name: 'Warm Grey 9', hex: '#625A4F' }, // User WG09 -> My WG9
  '120': { name: 'Black', hex: '#000000' },
};

// Special mapping for user IDs to existing data keys if they differ (e.g., GYx to YGx)
const idMapping: Record<string, string> = {
  'GY1': 'YG1', 'GY2': 'YG2', 'GY3': 'YG3', 'GY4': 'YG4',
  'GY5': 'YG5', 'GY6': 'YG6', 'GY7': 'YG7', 'GY8': 'YG8',
  'WG01': 'WG1', 'WG09': 'WG9',
};


const honolulu120SetMarkers: Marker[] = userProvidedMarkerIDs.map(id => {
  const effectiveId = idMapping[id] || id; // Use mapped ID if one exists
  const knownData = existingMarkerData[effectiveId];

  if (knownData) {
    return { id, name: knownData.name, hex: knownData.hex, setId: 'ohuhu-honolulu-b' };
  } else {
    // For new IDs, use ID as name and a placeholder hex
    return { id, name: id, hex: '#CCCCCC', setId: 'ohuhu-honolulu-b' };
  }
});

export const INITIAL_MARKERS: Marker[] = [...honolulu120SetMarkers];

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
