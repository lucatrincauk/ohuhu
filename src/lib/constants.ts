
import type { Marker, MarkerSet } from './types';

export const INITIAL_MARKER_SETS: MarkerSet[] = [
  { id: 'ohuhu-honolulu-b', name: 'Ohuhu Honolulu 120 Set' },
];

// List of 120 marker IDs provided by the user
const userProvidedMarkerIDs: string[] = [
  'Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'Y6', 'Y7', 'Y8', 'Y9', 'Y10', 'Y11', 'Y12', 'Y13',
  'YR1', 'YR2', 'YR3', 'YR4', 'YR5', 'YR33',
  'RP1', 'RP6',
  'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12', 'R13', 'R14', 'R15', 'R16', 'R17', 'R18', 'R19', 'R20', 'R21', 'R22', 'R23', 'R24', 'R25',
  'P1', 'P2', 'P3', 'P4', 'P5',
  'PB1', 'PB2', 'PB3', 'PB4', 'PB5', 'PB6', 'PB7', 'PB8', 'PB9', 'PB10', 'PB11',
  '120', // Black
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

// Data for known marker IDs to pull existing names/hex when IDs match.
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
  'R19': { name: 'Tender Pink', hex: '#FADADD' },
  'R20': { name: 'Fluorescent Pink', hex: '#FF7BAC' },
  'R21': { name: 'Terra Cotta', hex: '#E2725B' },
  'R22': { name: 'French Vermillion', hex: '#FF4D00' },
  'R23': { name: 'Orange', hex: '#FFA500' },
  'R24': { name: 'Marigold', hex: '#FFBF00' },
  'R25': { name: 'Pale Cherry Pink', hex: '#FFB7C5' },
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
  'YR1': { name: 'Orange Yellow', hex: '#FFBF00' },
  'YR2': { name: 'Light Orange', hex: '#FFDAB9' },
  'YR3': { name: 'Yellow Ochre', hex: '#E8B349' },
  'YR4': { name: 'Chrome Orange', hex: '#FF8C00' },
  'YR5': { name: 'Dark Yellow', hex: '#FFD700' },
  'YR33': { name: 'Melon Yellow', hex: '#FBC36F' },
  'RP1': { name: 'Rose Pink', hex: '#FFC0CB' }, // Placeholder, may need specific Rose Pink
  'RP6': { name: 'Deep Salmon Pink', hex: '#FF91A4' },
  'P1': { name: 'Lilac', hex: '#C8A2C8' },
  'P2': { name: 'Lavender', hex: '#E6E6FA' },
  'P3': { name: 'Violet', hex: '#8F00FF' },
  'P4': { name: 'Light Violet', hex: '#CF9FFF' },
  'P5': { name: 'Pale Lilac', hex: '#E2CCFF' },
  'PB1': { name: 'Pastel Blue', hex: '#AEC6CF' },
  'PB2': { name: 'Sky Blue', hex: '#87CEEB' },
  'PB3': { name: 'Peacock Blue', hex: '#00A0B0' },
  'PB4': { name: 'Process Blue', hex: '#00AEEF' },
  'PB5': { name: 'Cobalt Blue', hex: '#0047AB' },
  'PB6': { name: 'Royal Blue', hex: '#4169E1' },
  'PB7': { name: 'Prussian Blue', hex: '#003153' },
  'PB8': { name: 'Baby Blue', hex: '#E0FFFF' },
  'PB9': { name: 'Ultramarine', hex: '#120A8F' },
  'PB10': { name: 'Deep Blue', hex: '#000080' },
  'PB11': { name: 'Light Blue', hex: '#ADD8E6' },
  '120': { name: 'Black', hex: '#000000' },
  'BG1': { name: 'Blue Grey 1', hex: '#BEC8D1' },
  'BG2': { name: 'Blue Grey 2', hex: '#ADB9C4' },
  'BG3': { name: 'Blue Grey 3', hex: '#9BAAAE' },
  'BG4': { name: 'Blue Grey 4', hex: '#899BA8' },
  'BG5': { name: 'Blue Grey 5', hex: '#768B9C' },
  'BG6': { name: 'Blue Grey 6', hex: '#647C90' },
  'BG7': { name: 'Blue Grey 7', hex: '#526D84' },
  'BG8': { name: 'Blue Grey 8', hex: '#405E78' },
  'BG9': { name: 'Blue Grey 9', hex: '#2E4F6C' },
  'BG68': { name: 'Turquoise Blue', hex: '#40E0D0' },
  'BGII03': { name: 'Pale Blue Grey', hex: '#D8E0E6' },
  'BGII05': { name: 'Dull Blue Grey', hex: '#BCC6CF' },
  'BGII09': { name: 'Dark Blue Grey', hex: '#5A6874' },
  'B64': { name: 'Pale Blue', hex: '#AFEEEE' },
  'BR1': { name: 'Raw Umber', hex: '#826644' },
  'BR2': { name: 'Burnt Sienna', hex: '#E97451' },
  'BR3': { name: 'Chocolate', hex: '#7B3F00' },
  'WG01': { name: 'Warm Grey 01', hex: '#F5F5F5' },
  'WG09': { name: 'Warm Grey 09', hex: '#696969' },
  'WG3': { name: 'Warm Grey 3', hex: '#D3D3D3' },
  'WG4': { name: 'Warm Grey 4', hex: '#C0C0C0' },
  'CG2': { name: 'Cool Grey 2', hex: '#D9D9D9' },
  'CG5': { name: 'Cool Grey 5', hex: '#A9A9A9' },
  'CGII00': { name: 'Cool Grey II 00', hex: '#FBFBFB' },
  'CGII04': { name: 'Cool Grey II 04', hex: '#C2C2C2' },
  'CGII07': { name: 'Cool Grey II 07', hex: '#8D8D8D' },
  'CGII08': { name: 'Cool Grey II 08', hex: '#787878' },
  'CGII09': { name: 'Cool Grey II 09', hex: '#646464' },
  'NG03': { name: 'Neutral Grey 03', hex: '#D0D0D0' },
  'NG06': { name: 'Neutral Grey 06', hex: '#9C9C9C' },
  'NG07': { name: 'Neutral Grey 07', hex: '#888888' },
  'NG09': { name: 'Neutral Grey 09', hex: '#5F5F5F' },
  'GG1': { name: 'Green Grey 1', hex: '#DDE2DB' },
  'GG3': { name: 'Green Grey 3', hex: '#BCC2BB' },
  'GG5': { name: 'Green Grey 5', hex: '#9CA99A' },
  'GG9': { name: 'Green Grey 9', hex: '#5A6B5D' },
  'GY1': { name: 'Yellow Green', hex: '#D0E07A' },
  'GY2': { name: 'Vivid Green', hex: '#8DC63F' },
  'GY3': { name: 'Grass Green', hex: '#39B54A' },
  'GY4': { name: 'Mignonette', hex: '#D6E69C' },
  'GY5': { name: 'Chartreuse', hex: '#BADD78' },
  'GY6': { name: 'Spring Green', hex: '#C4DF9B' },
  'GY7': { name: 'Olive Green', hex: '#698220' },
  'GY8': { name: 'Deep Olive Green', hex: '#55701C' },
  'GY42': { name: 'Anise', hex: '#CDDC39' },
  'GY43': { name: 'Deep Olive', hex: '#556B2F' },
  'GY172': { name: 'Lime Peel', hex: '#A8B820' },
  'GY173': { name: 'Dim Green', hex: '#A0A888' },
  'G1': { name: 'Emerald Green', hex: '#00A651' },
  'G2': { name: 'Forest Green', hex: '#006837' },
  'G3': { name: 'Lime Green', hex: '#8CC63F' },
  'G4': { name: 'Turquoise Green', hex: '#00A99D' },
  'G5': { name: 'Mint Green Light', hex: '#C0E6B0' },
  'G6': { name: 'Ice Green', hex: '#AFDDCD' },
  'G7': { name: 'Pastel Green', hex: '#97D3A9' },
  'G8': { name: 'Apple Green', hex: '#64A541' },
  'G9': { name: 'Peacock Green', hex: '#00806E' },
};

// Special mapping for user IDs to existing data keys if they differ
const idMapping: Record<string, string> = {
   // User WG01 -> My WG01
  'WG09': 'WG09',
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

