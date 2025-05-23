
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
// Updated based on Ohuhu Honolulu 120 Set image (provided by user)
// and existing Ohuhu 104 data. Honolulu data takes precedence for shared IDs.
const existingMarkerData: Record<string, { name: string; hex: string }> = {
  // Ohuhu Honolulu 120 Set + Blender (Names & Hex from image)
  'Y1': { name: 'Pastel Yellow', hex: '#FEF9CC' },
  'Y2': { name: 'Sunflower', hex: '#FFDA00' },
  'Y3': { name: 'Barium Yellow', hex: '#FDEE6C' },
  'Y4': { name: 'Quince', hex: '#FCD975' },
  'Y5': { name: 'Rouge Orange', hex: '#F47A4A' },
  'Y6': { name: 'Lemon Yellow', hex: '#FFF200' }, // Same as Y7 in 104 set
  'Y7': { name: 'Dull Yellow', hex: '#FFE080' }, // Same as Y11 Honolulu old
  'Y8': { name: 'Olive Yellow', hex: '#CEC62C' },
  'Y9': { name: 'Yellow Orche', hex: '#E8B349' }, // Ochre
  'Y10': { name: 'Apricot', hex: '#FCC98A' },
  'Y11': { name: 'Brown Grey', hex: '#C1BBA0' },
  'Y12': { name: 'Mahogany', hex: '#8F5C3A' },
  'Y13': { name: 'Chestnut Brown', hex: '#7A4F31' },
  'YR1': { name: 'Dark Yellow', hex: '#FFBF00' }, // Same as R24 Honolulu old
  'YR2': { name: 'Marigold', hex: '#FCAE3A' },
  'YR3': { name: 'Orange', hex: '#FFA500' }, // Same as R23 Honolulu old
  'YR4': { name: 'Salmon Pink', hex: '#FF8C69' },
  'YR5': { name: 'Terra Cotta', hex: '#E2725B' }, // Same as R21 Honolulu old
  'YR33': { name: 'Melon Yellow', hex: '#FBC36F' },
  'BR1': { name: 'Raw Umber', hex: '#826644' },
  'BR2': { name: 'Potato Brown', hex: '#A37A55' },
  'BR3': { name: 'Rose Beige', hex: '#BC8F8F' },
  'R1': { name: 'Coral Pink', hex: '#F69088' }, // Same as R5 Honolulu old name
  'R2': { name: 'Vermilion', hex: '#F26522' }, // Same as R13 Honolulu old name
  'R3': { name: 'Coral Red', hex: '#FF7F50' },
  'R4': { name: 'Deep Red', hex: '#94181D' }, // Same as R8 Honolulu old name
  'R5': { name: 'Cherry Pink', hex: '#F26C7D' }, // Same as R4 Honolulu old name
  'R6': { name: 'Rose Red', hex: '#F15A24' }, // Same as R3 Honolulu old name
  'R7': { name: 'Old Red', hex: '#A02D2B' },
  'R8': { name: 'Geranium', hex: '#EC165D' }, // Same as R15 Honolulu old name
  'R9': { name: 'Pastel Rose', hex: '#FFD1DC' },
  'R10': { name: 'Pastel Pink', hex: '#FEEFED' }, // Same as R17 Honolulu old
  'R11': { name: 'Mauve Shadow', hex: '#D6B4C5' },
  'R12': { name: 'Rose Buvard', hex: '#E5A0B6' }, // Bouvard
  'R13': { name: 'Clematis', hex: '#C27BA0' },
  'R14': { name: 'Pale Purple', hex: '#D2B9D3' },
  'R15': { name: 'Cerise', hex: '#DE3163' },
  'R16': { name: 'Deep Violet', hex: '#713F83' },
  'R17': { name: 'Pansy', hex: '#7A3E9A' },
  'R18': { name: 'Pastel Peach', hex: '#FFDAB9' },
  'R19': { name: 'Barely Beige', hex: '#FFF0E1' },
  'R20': { name: 'Powder Pink', hex: '#FFE4E1' },
  'R21': { name: 'Fruit Pink', hex: '#FFB6C1' },
  'R22': { name: 'Dark blush', hex: '#E07A5F' }, // Dark Blush
  'R23': { name: 'Rose Pink', hex: '#FFC0CB' }, // Same as RP1 Honolulu old
  'R24': { name: 'Dark Violet Light', hex: '#9C87B6' },
  'R25': { name: 'Pale Blue Violet', hex: '#C2BBE2' },
  'P1': { name: 'Vivid Purple', hex: '#8F00FF' }, // Same as P3 Honolulu old name
  'P2': { name: 'Light Violet', hex: '#CF9FFF' }, // Same as P4 Honolulu old name
  'P3': { name: 'Pastel Violet', hex: '#D8BFD8' },
  'P4': { name: 'Lavender', hex: '#E6E6FA' }, // Same as P2 Honolulu old name
  'P5': { name: 'Aubergine', hex: '#4B0082' },
  'RP1': { name: 'Vivid Reddish Purple', hex: '#C71585' },
  'RP6': { name: 'Vivid Pink', hex: '#EC008C' }, // Same as R6 Honolulu old name
  'PB1': { name: 'Sky Blue', hex: '#87CEEB' }, // Same as PB2 Honolulu old name
  'PB2': { name: 'Brilliant Blue', hex: '#509AFF' },
  'PB3': { name: 'Cobalt Blue', hex: '#0047AB' }, // Same as PB5 Honolulu old name
  'PB4': { name: 'Napoleon Blue', hex: '#00205C' },
  'PB5': { name: 'Prussian Blue', hex: '#003153' }, // Same as PB7 Honolulu old name
  'PB6': { name: 'Royal Blue', hex: '#4169E1' }, // Same as PB6 Honolulu old
  'PB7': { name: 'Pastel Blue', hex: '#AEC6CF' }, // Same as PB1 Honolulu old
  'PB8': { name: 'Cerulean Blue', hex: '#2A52BE' },
  'PB9': { name: 'Cloud Blue', hex: '#ACE5EE' },
  'PB10': { name: 'Turquoise Green Light', hex: '#AFEEEE' }, // Same as B64 Honolulu old name
  'PB11': { name: 'Marine Blue', hex: '#002F6C' },
  'B64': { name: 'Indian Blue', hex: '#41719B' },
  'BG1': { name: 'Turquoise Green', hex: '#00A99D' }, // Same as G4 Honolulu old
  'BG2': { name: 'Deep Green', hex: '#00827A' },
  'BG3': { name: 'Blue Grey3', hex: '#9BAAAE' }, // Blue Grey 3 - same as BG3 old
  'BG4': { name: 'Mint Blue', hex: '#A2DCE2' },
  'BG5': { name: 'Dolphin Blue', hex: '#8FD4CF' },
  'BG6': { name: 'Peacock Green', hex: '#00806E' }, // Same as G9 Honolulu old
  'BG7': { name: 'Forest Green', hex: '#006837' }, // Same as G2 Honolulu old
  'BG8': { name: 'Teal', hex: '#008080' },
  'BG9': { name: 'Pigeon Blue', hex: '#6C8E9A' },
  'BG68': { name: 'Turquoise Blue', hex: '#40E0D0' }, // Same as BG68 Honolulu old
  'G1': { name: 'Emerald Green', hex: '#00A651' }, // Same as G1 Honolulu old
  'G2': { name: 'Vivid Green', hex: '#8DC63F' }, // Same as GY2 Honolulu old
  'G3': { name: 'Ocean Green', hex: '#48BF91' },
  'G4': { name: 'Mint Green Light', hex: '#C0E6B0' }, // Same as G5 Honolulu old name
  'G5': { name: 'Turquoise Ink Blue', hex: '#70CAD1' },
  'G6': { name: 'Dusty Jade Green', hex: '#85BFA1' },
  'G7': { name: 'Chromium Oxide Green', hex: '#6082B6' }, // Color more blueish grey
  'G8': { name: 'Glass Green', hex: '#8EBDA2' },
  'G9': { name: 'Meadow Green', hex: '#86B85C' },
  'GY1': { name: 'Pale Green', hex: '#D4E6B5' },
  'GY2': { name: 'Grass Green', hex: '#39B54A' }, // Same as GY3 Honolulu old
  'GY3': { name: 'Bud Green', hex: '#BADD78' }, // Same as GY5 Honolulu old name
  'GY4': { name: 'Yellow Green', hex: '#D0E07A' }, // Same as GY1 Honolulu old
  'GY5': { name: 'Absinthe', hex: '#C2D72F' },
  'GY6': { name: 'Anise', hex: '#CDDC39' }, // Same as GY42 Honolulu old name
  'GY7': { name: 'Sugarcane', hex: '#E9F0C9' },
  'GY8': { name: 'Petits Pois', hex: '#A5C882' },
  'GY42': { name: 'Bronze Green', hex: '#708238' },
  'GY43': { name: 'Deep Olive Green', hex: '#55701C' }, // Same as GY8 Honolulu old
  'GY172': { name: 'Spectrum Green', hex: '#A8B820' }, // Same as GY172 Honolulu old
  'GY173': { name: 'Dim Green', hex: '#A0A888' }, // Same as GY173 Honolulu old
  'CGII00': { name: 'Cool Grey II 0', hex: '#F5F5F5' }, // Was CGII00 old
  'CGII04': { name: 'Cool Grey II 4', hex: '#C2C2C2' }, // Was CGII04 old
  'CGII07': { name: 'Cool Grey II 7', hex: '#8D8D8D' }, // Was CGII07 old
  'CGII08': { name: 'Cool Grey II 8', hex: '#787878' }, // Was CGII08 old
  'CGII09': { name: 'Cool Grey II 9', hex: '#646464' }, // Was CGII09 old
  'CG2': { name: 'Cool Grey 2', hex: '#D9D9D9' }, // Was CG2 old
  'CG5': { name: 'Cool Grey 5', hex: '#A9A9A9' }, // Was CG5 old
  'GG1': { name: 'Green Grey 1', hex: '#DDE2DB' }, // Was GG1 old
  'GG3': { name: 'Green Grey 3', hex: '#BCC2BB' }, // Was GG3 old
  'GG5': { name: 'Green Grey 5', hex: '#9CA99A' }, // Was GG5 old
  'GG9': { name: 'Green Grey 9', hex: '#5A6B5D' }, // Was GG9 old
  'WG01': { name: 'Warm Grey 1', hex: '#F0F0F0' }, // WG01 was #F5F5F5
  'WG3': { name: 'Warm Grey 3', hex: '#D3D3D3' }, // WG3 old
  'WG4': { name: 'Warm Grey 4', hex: '#C0C0C0' }, // WG4 old
  'WG09': { name: 'Warm Grey 9', hex: '#696969' }, // WG09 old
  'BGII03': { name: 'Blue Grey II 3', hex: '#D8E0E6' }, // Was BGII03 old
  'BGII05': { name: 'Blue Grey II 5', hex: '#BCC6CF' }, // Was BGII05 old
  'BGII09': { name: 'Blue Grey II 9', hex: '#5A6874' }, // Was BGII09 old
  'NG03': { name: 'Neutral Grey 3', hex: '#D0D0D0' }, // NG03 old
  'NG06': { name: 'Neutral Grey 6', hex: '#9C9C9C' }, // NG06 old
  'NG07': { name: 'Neutral Grey 7', hex: '#888888' }, // NG07 old
  'NG09': { name: 'Neutral Grey 9', hex: '#5F5F5F' }, // NG09 old
  '120': { name: 'Black', hex: '#000000' }, // 120 old
  '0': { name: 'Colorless Blender', hex: '#FFFFFF' },

  // Ohuhu 104 Set names based on image - Corrected hex initialization
  'Y010': { name: 'Primrose', hex: '#FDF4A5' },
  'Y121': { name: 'Primrose', hex: '#FDF4A5' }, // Duplicate ID for Primrose in 104 set as per image
  'Y040': { name: 'Calamansi', hex: '#F9EC8F' },
  'Y070': { name: 'Acid Yellow', hex: '#FFF200' }, // Shared with Y6 Honolulu
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
  'RV250': { name: 'Peony', hex: '#E6A9BE'},
  'RV300': { name: 'Tender Pink', hex: '#F5C2D8' },
  'RV330': { name: 'Strawberry Pink', hex: '#E978A0' },
  'RV350': { name: 'Crimson', hex: '#DC143C' },
  'V050': { name: 'Pearl Violet', hex: '#DCCCE5' },
  'V070': { name: 'Eggplant Purple', hex: '#614051' },
  'V080': { name: 'Dark Violet', hex: '#583C5D' },
  'V150': { name: 'Mallow', hex: '#C8A2C8' }, // Shared with P1 Honolulu (was Lilac)
  'V210': { name: 'Signal Violet', hex: '#8A5E9A' },
  'V320': { name: 'Gentian Violet', hex: '#6A4D8A' },
  'V322': { name: 'Rain Flower Purple', hex: '#A08CB0' },
  'V330': { name: 'Prune', hex: '#704264' },
  'V340': { name: 'Lavender Blue', hex: '#967BB6' },
  'V390': { name: 'Dark Slate Blue', hex: '#483D8B' },
  'V450': { name: 'Dark Lavender', hex: '#734F96' },
  'B080': { name: 'Process Blue', hex: '#89CFF0' },
  'B090': { name: 'Pebble Blue', hex: '#A1B5CC' },
  'B110': { name: 'Crystal Blue', hex: '#A7D8DE' },
  'B180': { name: 'Vienna Blue', hex: '#2E5894' },
  'B190': { name: 'Ultramarine', hex: '#120A8F' }, // Shared with PB9 Honolulu
  'B270': { name: 'Vivid Blue', hex: '#007FFF' },
  'B440': { name: 'Cyanine Blue', hex: '#2A52BE' }, // Shared with PB8 Honolulu (Cerulean Blue name)
  'G030': { name: 'Crescent Yellow', hex: '#E0E69C' },
  'G050': { name: 'Celadon Green', hex: '#ACE1AF' },
  'G080': { name: 'Limeade', hex: '#BCE27F' },
  'G110': { name: 'Mignonette', hex: '#D6E69C' }, // Shared with GY4 Honolulu (was Yellow Green)
  'G130': { name: 'Acid Green', hex: '#B0BF1A' },
  'G260': { name: 'Apple Green', hex: '#8DB600' },
  'G270': { name: 'Moss', hex: '#8FBC8F' },
  'G300': { name: 'Dark Olive', hex: '#556B2F' }, // Shared with GY43 Honolulu (was Deep Olive Green)
  'G320': { name: 'Jade Green', hex: '#00A86B' },
  'G322': { name: 'Pale Aqua Mint', hex: '#BEE5D3' },
  'G324': { name: 'Aqua Blue', hex: '#ADD8E6' },
  'G326': { name: 'Bright Blue', hex: '#0096FF' },
  'G330': { name: 'Mineral Green', hex: '#829F82' },
  'G390': { name: 'Green', hex: '#008000' },
  'G410': { name: 'Light Holly Green', hex: '#98BF64' },
  'G470': { name: 'Pine Tree Green', hex: '#01796F' },
  'G490': { name: 'Viridian', hex: '#40826D' },
  'G500': { name: 'Peacock Blue', hex: '#00A0B0' }, // Shared with PB3 Honolulu (was Cobalt Blue)
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
    // This fallback should ideally not be hit if existingMarkerData is comprehensive
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

let allMarkers: Marker[] = [...honolulu120SetMarkers, ...ohuhu104SetMarkers];

// Add Colorless Blender if it exists in existingMarkerData
const blenderData = existingMarkerData['0'];
if (blenderData) {
  const blenderMarker: Marker = {
    id: '0',
    name: blenderData.name,
    hex: blenderData.hex,
    setId: 'ohuhu-honolulu-b' // Assign to Honolulu set
  };
  // Avoid duplicating if somehow already added
  if (!allMarkers.find(m => m.id === '0')) {
    allMarkers.push(blenderMarker);
  }
}
export const INITIAL_MARKERS: Marker[] = allMarkers;


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

    