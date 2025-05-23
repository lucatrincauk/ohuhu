
import type { Marker, MarkerSet } from './types';

export const INITIAL_MARKER_SETS: MarkerSet[] = [
  { id: 'ohuhu-honolulu-b', name: 'Ohuhu Honolulu 120 Set' },
  { id: 'ohuhu-104', name: 'Ohuhu 104 Set' },
];

// User-provided list of 120 marker IDs for the Ohuhu Honolulu 120 Set
const honolulu120MarkerIDs: string[] = [
  'B64', 'BG1', 'BG2', 'BG3', 'BG4', 'BG5', 'BG6', 'BG7', 'BG8', 'BG9', 'BG68',
  'BGII03', 'BGII05', 'BGII09', 'BR1', 'BR2', 'BR3', 'CG2', 'CG5', 'CGII00',
  'CGII04', 'CGII07', 'CGII08', 'CGII09', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6',
  'G7', 'G8', 'G9', 'GG1', 'GG3', 'GG5', 'GG9', 'GY1', 'GY2', 'GY3', 'GY4',
  'GY5', 'GY6', 'GY7', 'GY8', 'GY42', 'GY43', 'GY172', 'GY173', 'NG03', 'NG06',
  'NG07', 'NG09', 'P1', 'P2', 'P3', 'P4', 'P5', 'PB1', 'PB2', 'PB3', 'PB4',
  'PB5', 'PB6', 'PB7', 'PB8', 'PB9', 'PB10', 'PB11', 'R1', 'R2', 'R3', 'R4',
  'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12', 'R13', 'R14', 'R15',
  'R16', 'R17', 'R18', 'R19', 'R20', 'R21', 'R22', 'R23', 'R24', 'R25', 'RP1',
  'RP6', 'WG01', 'WG09', 'WG3', 'WG4', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'Y6',
  'Y7', 'Y8', 'Y9', 'Y10', 'Y11', 'Y12', 'Y13', 'YR1', 'YR2', 'YR3', 'YR4',
  'YR5', 'YR33', '120'
];

// User-provided list of 104 marker IDs for the Ohuhu 104 Set (actually 107 IDs based on user input)
const ohuhu104MarkerIDs: string[] = [
  'B080', 'B090', 'B110', 'B180', 'B190', 'B270', 'B440', 'BG060', 'BR208', 'CG030',
  'E010', 'E030', 'E080', 'E120', 'E130', 'E160', 'E260', 'E370', 'E430', 'E432',
  'E434', 'E450', 'E460', 'FY010', 'FY020', 'FY030', 'FY050', 'G030', 'G050', 'G080',
  'G110', 'G130', 'G260', 'G270', 'G300', 'G320', 'G322', 'G324', 'G326', 'G330',
  'G390', 'G410', 'G470', 'G490', 'G500', 'GG040', 'GG110', 'MG030', 'MG100', 'R29',
  'R050', 'R070', 'R150', 'R170', 'R180', 'R190', 'R230', 'R240', 'R242', 'R270',
  'R282', 'R284', 'R290', 'R340', 'R350', 'RG050', 'RG080', 'RV010', 'RV100', 'RV130',
  'RV240', 'RV250', 'RV300', 'RV330', 'RV350', 'V050', 'V070', 'V080', 'V150', 'V210', 'V320',
  'V322', 'V330', 'V340', 'V390', 'V450', 'WG070', 'WG090', 'WG130', 'Y010', 'Y040',
  'Y070', 'Y080', 'Y110', 'Y121', 'Y130', 'Y140', 'Y180', 'Y210', 'Y250', 'YR090',
  'YR172', 'YR180', 'YR220'
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
  'RP1': { name: 'Rose Pink', hex: '#FFC0CB' },
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

  // Ohuhu 104 Set names based on image - Corrected hex initialization
  'Y010': { name: 'Primrose', hex: '#FDF4A5' },
  'Y121': { name: 'Primrose', hex: '#FDF4A5' }, // Duplicate ID for Primrose in 104 set as per image
  'Y040': { name: 'Calamansi', hex: '#F9EC8F' },
  'Y070': { name: 'Acid Yellow', hex: '#FFF200' }, // Shared with Y7 Honolulu
  'Y080': { name: 'Lightning Yellow', hex: '#FFEC00' },
  'Y110': { name: 'Grayish Yellow', hex: '#E6D999' },
  'Y130': { name: 'Mustard', hex: '#FFDB58' },
  'Y140': { name: 'Nugget', hex: '#E8B63A' },
  'Y180': { name: 'Shallow Orange Cafe', hex: '#E0A953' },
  'Y210': { name: 'Deep Teak', hex: '#AD865A' },
  'Y250': { name: 'Flax', hex: '#EEDC82' },
  'YR090': { name: 'Peach Pie', hex: '#FDD4B7' },
  'YR172': { name: 'Tiger Lily', hex: '#F09B59' },
  'YR180': { name: 'Lipstick Orange', hex: '#F18C4D' },
  'YR220': { name: 'Yellowish Shade', hex: '#FDEB9C' },
  'R29': { name: 'Pear color', hex: '#F0A8AE' },
  'R050': { name: 'Chocolate Pink', hex: '#E5A09A' },
  'R070': { name: 'Agate', hex: '#D9837D' },
  'R150': { name: 'Zinnober', hex: '#E95E6F' },
  'R170': { name: 'Lipstick Red', hex: '#E4002B' }, // Specific to 104 set from image
  'R180': { name: 'Bright Red', hex: '#F03E4D' },    // Specific to 104 set from image
  'R190': { name: 'Bougainvillaea', hex: '#E85C83' }, // Specific to 104 set from image
  'R230': { name: 'Strong Red', hex: '#D93A4C' },   // Specific to 104 set from image
  'R240': { name: 'Garnet', hex: '#9E2B2F' },      // Specific to 104 set from image
  'R242': { name: 'Grayish Cherry', hex: '#B07A7F' },
  'R270': { name: 'Baby Blossoms', hex: '#F7CAC9' },
  'R282': { name: 'Colocasia Torino', hex: '#B87E79' },
  'R284': { name: 'Clove', hex: '#9A5E59' },
  'R290': { name: 'Cardinal', hex: '#C41E3A' },
  'R340': { name: 'Argyle Purple', hex: '#7B4A5E' },
  'R350': { name: 'Dark Purple Grey', hex: '#5C4E58' },
  'RV010': { name: 'Water Lily', hex: '#E0B8D0' },
  'RV100': { name: 'Red Onion', hex: '#A05E7C' },
  'RV130': { name: 'Queen Pink', hex: '#D98CB3' },
  'RV240': { name: 'Bronze Purple', hex: '#946E84' },
  'RV250': { name: 'Peony', hex: '#E6A9BE'}, // Added from user OCR
  'RV300': { name: 'Tender Pink', hex: '#F5C2D8' }, // Shared with R19 Honolulu
  'RV330': { name: 'Strawberry Pink', hex: '#E978A0' },
  'RV350': { name: 'Crimson', hex: '#DC143C' },
  'V050': { name: 'Pearl Violet', hex: '#DCCCE5' },
  'V070': { name: 'Eggplant Purple', hex: '#614051' },
  'V080': { name: 'Dark Violet', hex: '#583C5D' },
  'V150': { name: 'Mallow', hex: '#C8A2C8' }, // Shared with P1 Honolulu (Lilac)
  'V210': { name: 'Signal Violet', hex: '#8A5E9A' },
  'V320': { name: 'Gentian Violet', hex: '#6A4D8A' },
  'V322': { name: 'Rain Flower Purple', hex: '#A08CB0' },
  'V330': { name: 'Prune', hex: '#704264' },
  'V340': { name: 'Lavender Blue', hex: '#967BB6' },
  'V390': { name: 'Dark Slate Blue', hex: '#483D8B' },
  'V450': { name: 'Dark Lavender', hex: '#734F96' },
  'B080': { name: 'Process Blue', hex: '#89CFF0' }, // Different from PB4 Honolulu which is #00AEEF
  'B090': { name: 'Pebble Blue', hex: '#A1B5CC' },
  'B110': { name: 'Crystal Blue', hex: '#A7D8DE' },
  'B180': { name: 'Vienna Blue', hex: '#2E5894' },
  'B190': { name: 'Ultramarine', hex: '#120A8F' }, // Shared with PB9 Honolulu
  'B270': { name: 'Vivid Blue', hex: '#007FFF' },
  'B440': { name: 'Cyanine Blue', hex: '#2A52BE' },
  'G030': { name: 'Crescent Yellow', hex: '#E0E69C' },
  'G050': { name: 'Celadon Green', hex: '#ACE1AF' },
  'G080': { name: 'Limeade', hex: '#BCE27F' },
  'G110': { name: 'Mignonette', hex: '#D6E69C' }, // Shared with GY4 Honolulu
  'G130': { name: 'Acid Green', hex: '#B0BF1A' },
  'G260': { name: 'Apple Green', hex: '#8DB600' }, // Different from G8 Honolulu (#64A541)
  'G270': { name: 'Moss', hex: '#8FBC8F' },
  'G300': { name: 'Dark Olive', hex: '#556B2F' }, // Shared with GY43 Honolulu (Deep Olive)
  'G320': { name: 'Jade Green', hex: '#00A86B' },
  'G322': { name: 'Pale Aqua Mint', hex: '#BEE5D3' },
  'G324': { name: 'Aqua Blue', hex: '#ADD8E6' }, // Different from PB11 Honolulu (Light Blue), but same hex
  'G326': { name: 'Bright Blue', hex: '#0096FF' },
  'G330': { name: 'Mineral Green', hex: '#829F82' },
  'G390': { name: 'Green', hex: '#008000' },
  'G410': { name: 'Light Holly Green', hex: '#98BF64' },
  'G470': { name: 'Pine Tree Green', hex: '#01796F' },
  'G490': { name: 'Viridian', hex: '#40826D' },
  'G500': { name: 'Peacock Blue', hex: '#00A0B0' }, // Shared with PB3 Honolulu
  'BR208': { name: 'Black brown', hex: '#4A3B31' },
  'E010': { name: 'Pale Fruit Pink', hex: '#FADCD9' },
  'E030': { name: 'Pink Flamingo', hex: '#FC74FD' },
  'E080': { name: 'Praline', hex: '#C18F70' },
  'E120': { name: 'Reddish Brass', hex: '#B08D57' },
  'E130': { name: 'Copper', hex: '#B87333' },
  'E160': { name: 'Soft Sun', hex: '#FDEFB2' },
  'E260': { name: 'Leather', hex: '#967117' },
  'E370': { name: 'Light Walnut', hex: '#B49A7D' },
  'E430': { name: 'Pecan', hex: '#4A2511' },
  'E432': { name: 'Vert Celadon', hex: '#7FB09A' },
  'E434': { name: 'Dragon Well Tea', hex: '#A0A888' }, // Shared with GY173 Honolulu (Dim Green)
  'E450': { name: 'Fennel Seed', hex: '#BBA989' },
  'E460': { name: 'Military Olive', hex: '#78866B' },
  'CG030': { name: 'Neutral Grey 03', hex: '#D0D0D0' }, // Shared with NG03 Honolulu
  'BG060': { name: 'Deep Cool Grey', hex: '#8C92AC' },
  'WG070': { name: 'Warm Grey 07', hex: '#8C8C8C' },
  'WG090': { name: 'Warm Grey 09', hex: '#696969' }, // Shared with WG09 Honolulu
  'WG130': { name: 'Warm Grey 13', hex: '#545454' },
  'RG050': { name: 'Red Grey 05', hex: '#A89A9B' },
  'RG080': { name: 'Red Grey 08', hex: '#8B7D7E' },
  'MG030': { name: 'Blue Grey 03', hex: '#B0B8C8' },
  'MG100': { name: 'Blue Grey 09', hex: '#606878' },
  'GG040': { name: 'Light Jade Green Grey', hex: '#B2BEB5' },
  'GG110': { name: 'Toner Grey', hex: '#8A897C' },
  'FY010': { name: 'Fluorescent Yellow', hex: '#EFF700' },
  'FY020': { name: 'Fluorescent Orange', hex: '#FFBF00' }, // Shared with YR1 Honolulu
  'FY030': { name: 'Fluorescent Red', hex: '#FF0050' },
  'FY050': { name: 'Fluorescent Violet', hex: '#BC13FE' },
};

// Special mapping for user IDs to existing data keys if they differ
const idMapping: Record<string, string> = {
   // e.g. if user ID 'W01' should map to 'WG01' in existingMarkerData
   // 'W01': 'WG01'
};

const honolulu120SetMarkers: Marker[] = honolulu120MarkerIDs.map(id => {
  const effectiveId = idMapping[id] || id;
  const knownData = existingMarkerData[effectiveId];

  if (knownData) {
    return { id, name: knownData.name, hex: knownData.hex, setId: 'ohuhu-honolulu-b' };
  } else {
    return { id, name: id, hex: '#CCCCCC', setId: 'ohuhu-honolulu-b' };
  }
});

const ohuhu104SetMarkers: Marker[] = ohuhu104MarkerIDs.map(id => {
  const effectiveId = idMapping[id] || id;
  const knownData = existingMarkerData[effectiveId];

  if (knownData) {
    return { id, name: knownData.name, hex: knownData.hex, setId: 'ohuhu-104' };
  } else {
    return { id, name: id, hex: '#CCCCCC', setId: 'ohuhu-104' };
  }
});


export const INITIAL_MARKERS: Marker[] = [...honolulu120SetMarkers, ...ohuhu104SetMarkers];

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
