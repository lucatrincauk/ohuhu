
import type { Marker, MarkerSet } from './types';

export const INITIAL_MARKER_SETS: MarkerSet[] = [
  { id: 'ohuhu-honolulu-b', name: 'Ohuhu Honolulu 120 Set' },
  { id: 'ohuhu-104', name: 'Ohuhu 104 Set' },
  { id: 'ohuhu-midtones-48', name: 'Honolulu Midtones 48' },
  { id: 'ohuhu-pastels-48', name: 'Pastels 48' },
  { id: 'ohuhu-new-pastels-48', name: 'New Pastels 48' },
];

// User-provided list of 120 marker IDs for the Honolulu 120
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

// User-provided list of 104 marker IDs for the Honolulu 104
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

// Honolulu Midtones 48 IDs
const honoluluMidtones48MarkerIDs: string[] = [
  'Y050', 'Y260', 'Y270', 'YR170', 'YR190', 'YR250', 'YR260', 'R160', 'R200', 'R280',
  'RV070', 'RV080', 'RV200', 'RV270', 'RV320', 'V060', 'V160', 'V250', 'V270', 'V370',
  'B070', 'B140', 'B260', 'B290', 'B350', 'B380', 'G060', 'G070', 'G170', 'G190',
  'G240', 'G360', 'G440', 'E060', 'E110', 'E170', 'E240', 'E300', 'E310', 'E400',
  'E440', 'E490', 'CG070', 'BG070', 'YG080', 'RG150', 'MG060', 'GG060'
];

// Pastels 48 IDs
const pastels48MarkerIDs: string[] = [
  'Y030', 'Y120', 'Y230', 'YR030', 'YR070', 'YR110', 'YR240', 'R080',
  'R110', 'R120', 'R250', 'RV030', 'RV160', 'RV180', 'RV260', 'RV280',
  'V020', 'V030', 'V230', 'B030', 'B050', 'B120', 'B220', 'B250',
  'B340', 'G020', 'G120', 'G140', 'G220', 'G340', 'G420', 'E050',
  'E090', 'E210', 'E220', 'E280', 'E380', 'E470', 'CG050', 'CG020',
  'BG050', 'WG050', 'YG040', 'RG030', 'RG110', 'RG120', 'MG020', 'GG020'
];

// New Pastels 48 IDs (Blossoming Set)
const newPastels48MarkerIDs: string[] = [
  'Y010', 'BR208', 'RV010', 'R24', 'G030', 'G326', 'GY172', 'CG030', 'Y110', 'R19',
  'RV130', 'R25', 'G050', 'G410', 'GY173', 'CG2', 'Y040', 'R29', 'RV300', 'PB1',
  'G110', 'G8', 'E010', 'GG1', 'Y3', 'R050', 'V150', 'BG3', 'G130', 'GY1',
  'E020', 'WG01', 'YR220', 'R090', 'V322', 'BG4', 'G320', 'GY6', 'E030', 'BGII03',
  'YR4', 'R242', 'V330', 'B110', 'G322', 'GY7', 'CGII00', 'BG9'
];


// Data for known marker IDs to pull existing names/hex when IDs match.
// Honolulu data takes precedence for shared IDs.
const existingMarkerData: Record<string, { name: string; hex: string }> = {
  // Honolulu 120 + Blender (Names & Hex from image)
  'Y1': { name: 'Pastel Yellow', hex: '#FEF9CC' },
  'Y2': { name: 'Sunflower', hex: '#FFDA00' },
  'Y3': { name: 'Barium Yellow', hex: '#FDF5B6' },
  'Y4': { name: 'Quince', hex: '#FCD975' },
  'Y5': { name: 'Rouge Orange', hex: '#F47A4A' },
  'Y6': { name: 'Lemon Yellow', hex: '#FFF200' },
  'Y7': { name: 'Dull Yellow', hex: '#FFE080' },
  'Y8': { name: 'Olive Yellow', hex: '#CEC62C' },
  'Y9': { name: 'Yellow Ochre', hex: '#E8B349' },
  'Y10': { name: 'Apricot', hex: '#FCC98A' },
  'Y11': { name: 'Brown Grey', hex: '#C1BBA0' },
  'Y12': { name: 'Mahogany', hex: '#8F5C3A' },
  'Y13': { name: 'Chestnut Brown', hex: '#7A4F31' },
  'YR1': { name: 'Dark Yellow', hex: '#FFBF00' },
  'YR2': { name: 'Marigold', hex: '#FCAE3A' },
  'YR3': { name: 'Orange', hex: '#FFA500' },
  'YR4': { name: 'Salmon Pink', hex: '#FCDCD4' },
  'YR5': { name: 'Terra Cotta', hex: '#E2725B' },
  'YR33': { name: 'Melon Yellow', hex: '#FBC36F' },
  'BR1': { name: 'Raw Umber', hex: '#826644' },
  'BR2': { name: 'Potato Brown', hex: '#A37A55' },
  'BR3': { name: 'Rose Beige', hex: '#BC8F8F' },
  'R1': { name: 'Coral Pink', hex: '#F69088' },
  'R2': { name: 'Vermilion', hex: '#F26522' },
  'R3': { name: 'Coral Red', hex: '#FF7F50' },
  'R4': { name: 'Deep Red', hex: '#94181D' },
  'R5': { name: 'Cherry Pink', hex: '#F26C7D' },
  'R6': { name: 'Rose Red', hex: '#F15A24' },
  'R7': { name: 'Old Red', hex: '#A02D2B' },
  'R8': { name: 'Geranium', hex: '#EC165D' },
  'R9': { name: 'Pastel Rose', hex: '#FFD1DC' },
  'R10': { name: 'Pastel Pink', hex: '#FEEFED' },
  'R11': { name: 'Mauve Shadow', hex: '#D6B4C5' },
  'R12': { name: 'Rose Buvard', hex: '#E5A0B6' },
  'R13': { name: 'Clematis', hex: '#C27BA0' },
  'R14': { name: 'Pale Purple', hex: '#D2B9D3' },
  'R15': { name: 'Cerise', hex: '#DE3163' },
  'R16': { name: 'Deep Violet', hex: '#9400D3' },
  'R17': { name: 'Pansy', hex: '#7A3E9A' },
  'R18': { name: 'Pastel Peach', hex: '#FFDAB9' },
  'R19': { name: 'Barely Beige', hex: '#FDF0E9' },
  'R20': { name: 'Fluorescent Pink', hex: '#FF77FF' },
  'R21': { name: 'Fruit Pink', hex: '#FFB6C1' },
  'R22': { name: 'Dark Blush', hex: '#E07A5F' },
  'R23': { name: 'Rose Pink', hex: '#FFC0CB' },
  'R24': { name: 'Dark Violet Light', hex: '#D2C8E6' },
  'R25': { name: 'Pale Blue Violet', hex: '#D4DDEB' },
  'P1': { name: 'Vivid Purple', hex: '#8F00FF' },
  'P2': { name: 'Light Violet', hex: '#CF9FFF' },
  'P3': { name: 'Pastel Violet', hex: '#D8BFD8' },
  'P4': { name: 'Lavender', hex: '#E6E6FA' },
  'P5': { name: 'Aubergine', hex: '#4B0082' },
  'RP1': { name: 'Vivid Reddish Purple', hex: '#C71585' },
  'RP6': { name: 'Vivid Pink', hex: '#EC008C' },
  'PB1': { name: 'Sky Blue', hex: '#C5DCEC' },
  'PB2': { name: 'Brilliant Blue', hex: '#509AFF' },
  'PB3': { name: 'Cobalt Blue', hex: '#0047AB' },
  'PB4': { name: 'Napoleon Blue', hex: '#00205C' },
  'PB5': { name: 'Prussian Blue', hex: '#003153' },
  'PB6': { name: 'Royal Blue', hex: '#4169E1' },
  'PB7': { name: 'Pastel Blue', hex: '#AEC6CF' },
  'PB8': { name: 'Cerulean Blue', hex: '#2A52BE' },
  'PB9': { name: 'Cloud Blue', hex: '#ACE5EE' },
  'PB10': { name: 'Turquoise Green Light', hex: '#AFEEEE' },
  'PB11': { name: 'Marine Blue', hex: '#002F6C' },
  'B64': { name: 'Indian Blue', hex: '#41719B' },
  'BG1': { name: 'Turquoise Green', hex: '#00A99D' },
  'BG2': { name: 'Deep Green', hex: '#00827A' },
  'BG3': { name: 'Blue Grey3', hex: '#D6E0EA' },
  'BG4': { name: 'Mint Blue', hex: '#D9E8EC' },
  'BG5': { name: 'Dolphin Blue', hex: '#8FD4CF' },
  'BG6': { name: 'Peacock Green', hex: '#00806E' },
  'BG7': { name: 'Forest Green', hex: '#006837' },
  'BG8': { name: 'Teal', hex: '#008080' },
  'BG9': { name: 'Pigeon Blue', hex: '#DAE2E7' },
  'BG68': { name: 'Turquoise Blue', hex: '#40E0D0' },
  'G1': { name: 'Emerald Green', hex: '#00A651' },
  'G2': { name: 'Vivid Green', hex: '#8DC63F' },
  'G3': { name: 'Ocean Green', hex: '#48BF91' },
  'G4': { name: 'Mint Green Light', hex: '#C0E6B0' },
  'G5': { name: 'Turquoise Ink Blue', hex: '#70CAD1' },
  'G6': { name: 'Dusty Jade Green', hex: '#85BFA1' },
  'G7': { name: 'Chromium Oxide Green', hex: '#6082B6' },
  'G8': { name: 'Glass Green', hex: '#C9E2CF' },
  'G9': { name: 'Meadow Green', hex: '#86B85C' },
  'GY1': { name: 'Pale Green', hex: '#E2EDD5' },
  'GY2': { name: 'Spring Dim Green', hex: '#C6D5A9' },
  'GY3': { name: 'Bud Green', hex: '#BADD78' },
  'GY4': { name: 'Yellow Green', hex: '#D0E07A' },
  'GY5': { name: 'Absinthe', hex: '#C2D72F' },
  'GY6': { name: 'Anise', hex: '#F4F5D5' },
  'GY7': { name: 'Sugarcane', hex: '#F2F5DC' },
  'GY8': { name: 'Mignonette Green', hex: '#B4C882' },
  'GY42': { name: 'Bronze Green', hex: '#708238' },
  'GY43': { name: 'Deep Olive Green', hex: '#556B2F' },
  'GY172': { name: 'Spectrum Green', hex: '#BDE29A' },
  'GY173': { name: 'Dim Green', hex: '#E5E8D8' },
  'CGII00': { name: 'Cool Grey II 0', hex: '#F0F1F2' },
  'CGII04': { name: 'Cool Grey II 4', hex: '#C2C2C2' },
  'CGII07': { name: 'Cool Grey II 7', hex: '#8D8D8D' },
  'CGII08': { name: 'Cool Grey II 8', hex: '#787878' },
  'CGII09': { name: 'Cool Grey II 9', hex: '#646464' },
  'CG2': { name: 'Cool Grey II 2', hex: '#EBECEE' },
  'CG5': { name: 'Cool Grey 5', hex: '#A9A9A9' },
  'GG1': { name: 'Green Grey 1', hex: '#E8EAE6' },
  'GG3': { name: 'Green Grey 3', hex: '#BCC2BB' },
  'GG5': { name: 'Green Grey 5', hex: '#9CA99A' },
  'GG9': { name: 'Green Grey 9', hex: '#5A6B5D' },
  'WG01': { name: 'Warm Grey 1', hex: '#EFEFEE' },
  'WG3': { name: 'Warm Grey 3', hex: '#D3D3D3' },
  'WG4': { name: 'Warm Grey 4', hex: '#C0C0C0' },
  'WG09': { name: 'Warm Grey 9', hex: '#696969' },
  'BGII03': { name: 'Blue Grey II 3', hex: '#DCE2E8' },
  'BGII05': { name: 'Blue Grey II 5', hex: '#BCC6CF' },
  'BGII09': { name: 'Blue Grey II 9', hex: '#5A6874' },
  'NG03': { name: 'Neutral Grey 3', hex: '#D0D0D0' },
  'NG06': { name: 'Neutral Grey 6', hex: '#9C9C9C' },
  'NG07': { name: 'Neutral Grey 7', hex: '#888888' },
  'NG09': { name: 'Neutral Grey 9', hex: '#5F5F5F' },
  '120': { name: 'Black', hex: '#000000' },
  '0': { name: 'Colorless Blender', hex: '#FFFFFF' },

  // Honolulu 104 names based on image
  'Y010': { name: 'Primrose', hex: '#FFF9E6' }, // Updated by New Pastels
  'Y121': { name: 'Primrose', hex: '#FDF4A5' },
  'Y040': { name: 'Calamansi', hex: '#FBF5C8' }, // Updated by New Pastels
  'Y070': { name: 'Acid Yellow', hex: '#FFF200' },
  'Y080': { name: 'Lightning Yellow', hex: '#FFEC00' },
  'Y110': { name: 'Grayish Yellow', hex: '#F8F0D0' }, // Updated by New Pastels
  'Y130': { name: 'Mustard', hex: '#FFDB58' },
  'Y140': { name: 'Nugget', hex: '#E8B63A' },
  'Y180': { name: 'Shallow Orange Cafe', hex: '#E0A953' },
  'Y210': { name: 'Deep Teak', hex: '#AD865A' },
  'Y250': { name: 'Flax', hex: '#EEDC82' },
  'YR090': { name: 'Peach Pie', hex: '#FDD4B7' },
  'YR172': { name: 'Tiger Lily', hex: '#F09B59' },
  'YR180': { name: 'Lipstick Orange', hex: '#F18C4D' },
  'YR220': { name: 'Yellowish Shade', hex: '#FBEFE1' }, // Updated by New Pastels
  'R29': { name: 'Pear color', hex: '#FCE8E7' }, // Updated by New Pastels
  'R050': { name: 'Chocolate Pink', hex: '#F3D7D6' }, // Updated by New Pastels
  'R070': { name: 'Agate', hex: '#D9837D' },
  'R150': { name: 'Zinnober', hex: '#E95E6F' },
  'R170': { name: 'Lipstick Red', hex: '#E4002B' },
  'R180': { name: 'Bright Red', hex: '#F03E4D' },
  'R190': { name: 'Bougainvillaea', hex: '#E85C83' },
  'R230': { name: 'Strong Red', hex: '#D93A4C' },
  'R240': { name: 'Garnet', hex: '#9E2B2F' },
  'R242': { name: 'Grayish Cherry', hex: '#EEDFE2' }, // Updated by New Pastels
  'R270': { name: 'Baby Blossoms', hex: '#F7CAC9' },
  'R282': { name: 'Colocasia Torino', hex: '#B87E79' },
  'R284': { name: 'Clove', hex: '#9A5E59' },
  'R290': { name: 'Cardinal', hex: '#C41E3A' },
  'R340': { name: 'Argyle Purple', hex: '#7B4A5E' },
  'R350': { name: 'Dark Purple Grey', hex: '#5C4E58' },
  'RV010': { name: 'Water Lily', hex: '#F5E6F0' }, // Updated by New Pastels
  'RV100': { name: 'Red Onion', hex: '#A05E7C' },
  'RV130': { name: 'Queen Pink', hex: '#F7D6E2' }, // Updated by New Pastels
  'RV240': { name: 'Bronze Purple', hex: '#946E84' },
  'RV250': { name: 'Peony', hex: '#E6A9BE'},
  'RV300': { name: 'Tender Pink', hex: '#F5D0DA' }, // Updated by New Pastels
  'RV330': { name: 'Strawberry Pink', hex: '#E978A0' },
  'RV350': { name: 'Crimson', hex: '#DC143C' },
  'V050': { name: 'Pearl Violet', hex: '#DCCCE5' },
  'V070': { name: 'Eggplant Purple', hex: '#614051' },
  'V080': { name: 'Dark Violet', hex: '#583C5D' },
  'V150': { name: 'Mallow', hex: '#E1D3E6' }, // Updated by New Pastels
  'V210': { name: 'Signal Violet', hex: '#8A5E9A' },
  'V320': { name: 'Gentian Violet', hex: '#6A4D8A' },
  'V322': { name: 'Rain Flower Purple', hex: '#E0DAEA' }, // Updated by New Pastels
  'V330': { name: 'Prune', hex: '#DCD5E6' }, // Updated by New Pastels
  'V340': { name: 'Lavender Blue', hex: '#967BB6' },
  'V390': { name: 'Dark Slate Blue', hex: '#483D8B' },
  'V450': { name: 'Dark Lavender', hex: '#734F96' },
  'B080': { name: 'Process Blue', hex: '#89CFF0' },
  'B090': { name: 'Pebble Blue', hex: '#A1B5CC' },
  'B110': { name: 'Crystal Blue', hex: '#D2E5EB' }, // Updated by New Pastels
  'B180': { name: 'Vienna Blue', hex: '#2E5894' },
  'B190': { name: 'Ultramarine', hex: '#120A8F' },
  'B270': { name: 'Vivid Blue', hex: '#007FFF' },
  'B440': { name: 'Cyanine Blue', hex: '#2A52BE' },
  'G030': { name: 'Crescent Yellow', hex: '#EFF5D6' }, // Updated by New Pastels
  'G050': { name: 'Celadon Green', hex: '#DCEAD6' }, // Updated by New Pastels
  'G080': { name: 'Limeade', hex: '#BCE27F' },
  'G110': { name: 'Mignonette', hex: '#EAF2DA' }, // Updated by New Pastels
  'G130': { name: 'Acid Green', hex: '#D8E7C0' }, // Updated by New Pastels
  'G260': { name: 'Apple Green', hex: '#8DB600' },
  'G270': { name: 'Moss', hex: '#8FBC8F' },
  'G300': { name: 'Dark Olive', hex: '#556B2F' },
  'G320': { name: 'Jade Green', hex: '#DCE9E0' }, // Updated by New Pastels
  'G322': { name: 'Pale Aqua Mint', hex: '#D4E7E3' }, // Updated by New Pastels
  'G324': { name: 'Aqua Blue', hex: '#ADD8E6' },
  'G326': { name: 'Bright Blue', hex: '#A9D9D9' }, // Updated by New Pastels
  'G330': { name: 'Mineral Green', hex: '#829F82' },
  'G390': { name: 'Green', hex: '#008000' },
  'G410': { name: 'Light Holly Green', hex: '#D2E3D9' }, // Updated by New Pastels
  'G470': { name: 'Pine Tree Green', hex: '#01796F' },
  'G490': { name: 'Viridian', hex: '#40826D' },
  'G500': { name: 'Peacock Blue', hex: '#00A0B0' },
  'BR208': { name: 'Black brown', hex: '#D9B38C' }, // Updated by New Pastels
  'E010': { name: 'Pale Fruit Pink', hex: '#FBEAE4' }, // Updated by New Pastels
  'E030': { name: 'Pink Flamingo', hex: '#FADBD7' }, // Updated by New Pastels
  'E080': { name: 'Praline', hex: '#C18F70' },
  'E120': { name: 'Reddish Brass', hex: '#B08D57' },
  'E130': { name: 'Copper', hex: '#B87333' },
  'E160': { name: 'Soft Sun', hex: '#FDEFB2' },
  'E260': { name: 'Leather', hex: '#967117' },
  'E370': { name: 'Light Walnut', hex: '#B49A7D' },
  'E430': { name: 'Pecan', hex: '#4A2511' },
  'E432': { name: 'Vert Celadon', hex: '#7FB09A' },
  'E434': { name: 'Dragon Well Tea', hex: '#A0A888' },
  'E450': { name: 'Fennel Seed', hex: '#BBA989' },
  'E460': { name: 'Military Olive', hex: '#78866B' },
  'CG030': { name: 'Neutral Grey 03', hex: '#EAEAEA' }, // Updated by New Pastels
  'BG060': { name: 'Deep Cool Grey', hex: '#8C92AC' },
  'WG070': { name: 'Warm Grey 07', hex: '#8C8C8C' },
  'WG090': { name: 'Warm Grey 09', hex: '#696969' },
  'WG130': { name: 'Warm Grey 13', hex: '#545454' },
  'RG050': { name: 'Red Grey 05', hex: '#A89A9B' },
  'RG080': { name: 'Red Grey 08', hex: '#8B7D7E' },
  'MG030': { name: 'Blue Grey 03', hex: '#B0B8C8' },
  'MG100': { name: 'Blue Grey 09', hex: '#606878' },
  'GG040': { name: 'Light Jade Green Grey', hex: '#B2BEB5' },
  'GG110': { name: 'Toner Grey', hex: '#8A897C' },
  'FY010': { name: 'Fluorescent Yellow', hex: '#EFF700' },
  'FY020': { name: 'Fluorescent Orange', hex: '#FFBF00' },
  'FY030': { name: 'Fluorescent Red', hex: '#FF0050' },
  'FY050': { name: 'Fluorescent Violet', hex: '#BC13FE' },

  // Honolulu Midtones 48
  'Y050': { name: 'Summer Lemon', hex: '#FFFACD' },
  'Y260': { name: 'Yellow Dahlia', hex: '#FFF8DC' },
  'Y270': { name: 'Pale Ocre', hex: '#FAF0E6' },
  'YR170': { name: 'Chrome Orange', hex: '#FFA500' },
  'YR190': { name: 'Cadmium Orange', hex: '#FF8C00' },
  'YR250': { name: 'Moccasin', hex: '#FFE4B5' },
  'YR260': { name: 'Yellowish Brown', hex: '#F5DEB3' },
  'R160': { name: 'Cadmium Red', hex: '#E32636' },
  'R200': { name: 'Coralessence', hex: '#FF7F50' },
  'R280': { name: 'Currant', hex: '#960018' },
  'RV070': { name: 'Sakura Pink', hex: '#FFB7C5' },
  'RV080': { name: 'Bright Pink', hex: '#FF007F' },
  'RV200': { name: 'Dark Orchid', hex: '#9932CC' },
  'RV270': { name: 'Shadow Pink', hex: '#EBCFEA' },
  'RV320': { name: 'Apricot Pink', hex: '#FFDAB9' },
  'V060': { name: 'Amethyst', hex: '#9966CC' },
  'V160': { name: 'Deep Lilac', hex: '#C8A2C8' },
  'V250': { name: 'Light lavender', hex: '#D8BFD8' },
  'V270': { name: 'Lobelia', hex: '#663399' },
  'V370': { name: 'Blue Bell', hex: '#A2A2D0' },
  'B070': { name: 'Tahitian Blue', hex: '#00FFFF' },
  'B140': { name: 'Aquamarine', hex: '#7FFFD4' },
  'B260': { name: 'Smoky Blue', hex: '#778899' },
  'B290': { name: 'Antwerp Blue', hex: '#003366' },
  'B350': { name: 'Cornflower Blue', hex: '#6495ED' },
  'B380': { name: 'Capri Blue', hex: '#00BFFF' },
  'G060': { name: 'Celery Yellow', hex: '#E0FFC0' },
  'G070': { name: 'Lemon Green', hex: '#ADFF2F' },
  'G170': { name: 'May Green', hex: '#4CAF50' },
  'G190': { name: 'Olive Green', hex: '#808000' },
  'G240': { name: 'Beige Green', hex: '#BDB76B' },
  'G360': { name: 'Pond Green', hex: '#008080' },
  'G440': { name: 'Leaf Green', hex: '#90EE90' },
  'E060': { name: 'Light Mahogany', hex: '#C04000' },
  'E110': { name: 'Dark Suntan', hex: '#D2B48C' },
  'E170': { name: 'Caribe Cocoa', hex: '#A0522D' },
  'E240': { name: 'Chamois', hex: '#F0E68C' },
  'E300': { name: 'Clay', hex: '#AFA090' },
  'E310': { name: 'Dark Brown', hex: '#654321' },
  'E400': { name: 'Cocoa Brown', hex: '#964B00' },
  'E440': { name: 'Khaki', hex: '#C3B091' },
  'E490': { name: 'Deep Orange', hex: '#FF4500' },
  'CG070': { name: 'Neutral Grey 070', hex: '#808080' },
  'BG070': { name: 'Cool Grey 07', hex: '#708090' },
  'YG080': { name: 'Yellow Grey 08', hex: '#BEBEBE' },
  'RG150': { name: 'Red Grey 150', hex: '#B0A0A0' },
  'MG060': { name: 'Blue Grey 060', hex: '#A0A8B0' },
  'GG060': { name: 'Green Grey 06', hex: '#A8B0A0' },

  // Pastels 48
  'Y030': { name: 'Lemon Chiffon', hex: '#FFFACD' },
  'Y120': { name: 'Buttercup Yellow', hex: '#FFFDD0' },
  'Y230': { name: 'Deep Cream', hex: '#FFF8DC' },
  'YR030': { name: 'Carmine Red', hex: '#FFDAB9' },
  'YR070': { name: 'Light Orange', hex: '#FFE4C4' },
  'YR110': { name: 'Mellow Peach', hex: '#FFDEAD' },
  'YR240': { name: 'Cream', hex: '#FFFDD0' },
  'R080': { name: 'Pale Cherry Pink', hex: '#FFC0CB' },
  'R110': { name: 'Sardonyx', hex: '#FFD1DC' },
  'R120': { name: 'Light Prawn', hex: '#FFB6C1' },
  'R250': { name: 'Antique Fuchsia', hex: '#E6E6FA' },
  'RV030': { name: 'Light Hot Pink', hex: '#FFB2D8' },
  'RV160': { name: 'Thistle', hex: '#D8BFD8' },
  'RV180': { name: 'Hollyhock', hex: '#FFC4E1' },
  'RV260': { name: 'Pink', hex: '#FFDAE9' },
  'RV280': { name: 'Light Pink', hex: '#FFE0F0' },
  'V020': { name: 'Pale Lilac', hex: '#E6E0FA' },
  'V030': { name: 'Mauve', hex: '#D8BFD8' },
  'V230': { name: 'Viola', hex: '#CCCCFF' },
  'B030': { name: 'Frost Blue', hex: '#E0FFFF' },
  'B050': { name: 'Robin\'s Egg Blue', hex: '#AFEEEE' },
  'B120': { name: 'Pale Blue', hex: '#ADD8E6' },
  'B220': { name: 'Pale Grayish Blue', hex: '#B0C4DE' },
  'B250': { name: 'Light Blue', hex: '#C0DFFF' },
  'B340': { name: 'Lavender Mist', hex: '#E6E6FA' },
  'G020': { name: 'Pale Lemon Yellow', hex: '#F0FFF0' },
  'G120': { name: 'Yellowish Green', hex: '#D0F0C0' },
  'G140': { name: 'Horseradish', hex: '#C1FFC1' },
  'G220': { name: 'Lime Green', hex: '#E0F8E0' },
  'G340': { name: 'Horizon Green', hex: '#B0E0E6' },
  'G420': { name: 'Green Shadow', hex: '#C8E6C8' },
  'E050': { name: 'Lipstick Natural', hex: '#FFD8D6' },
  'E090': { name: 'Eggshell White', hex: '#FAF0E6' },
  'E210': { name: 'Brick Beige', hex: '#F5E9D3' },
  'E220': { name: 'Sand', hex: '#F4F0CB' },
  'E280': { name: 'Sand White', hex: '#FAF5EF' },
  'E380': { name: 'Ash Rose', hex: '#E0D8D0' },
  'E470': { name: 'Tea Rose', hex: '#F8C3C3' },
  'CG050': { name: 'Neutral Grey 05', hex: '#D3D3D3' },
  'CG020': { name: 'Neutral Grey 02', hex: '#EAEAEA' },
  'BG050': { name: 'Cool Grey 05', hex: '#C5D0DE' },
  'WG050': { name: 'Warm Grey 05', hex: '#DCDCDC' },
  'YG040': { name: 'Yellow Grey 04', hex: '#E0E0D0' },
  'RG030': { name: 'Red Grey 03', hex: '#E0D8D8' },
  'RG110': { name: 'Red Grey 11', hex: '#EAE0E0' },
  'RG120': { name: 'Red Grey 12', hex: '#EBE2E2' },
  'MG020': { name: 'Blue Grey 02', hex: '#DDEEFF' },
  'GG020': { name: 'Green Grey 02', hex: '#DDEEDD' },

  // New Pastels 48 (Blossoming Set)
  'E020': { name: 'Cotton Pearl', hex: '#F9E9E2' }, // This was already Y010 in 104, now it's E020. Name taken from image.
  // ... (The rest of the markers will be merged, prioritizing names/hex from this new set if IDs overlap)
};

// Overwrite/add New Pastel 48 markers - this ensures their names/hexes take precedence
const newPastels48DataFromImage: Record<string, { name: string; hex: string }> = {
  'Y010': { name: 'Primrose', hex: '#FFF9E6' },
  'BR208': { name: 'Black brown', hex: '#D9B38C' }, // Name from OCR, hex from swatch
  'RV010': { name: 'Water Lily', hex: '#F5E6F0' },
  'R24': { name: 'Dark Violet Light', hex: '#D2C8E6' },
  'G030': { name: 'Crescent Yellow', hex: '#EFF5D6' },
  'G326': { name: 'Bright Blue', hex: '#A9D9D9' },
  'GY172': { name: 'Spectrum Green', hex: '#BDE29A' },
  'CG030': { name: 'Neutral Grey 03', hex: '#EAEAEA' },
  'Y110': { name: 'Grayish Yellow', hex: '#F8F0D0' },
  'R19': { name: 'Barely Beige', hex: '#FDF0E9' },
  'RV130': { name: 'Queen Pink', hex: '#F7D6E2' },
  'R25': { name: 'Pale Blue Violet', hex: '#D4DDEB' },
  'G050': { name: 'Celadon Green', hex: '#DCEAD6' },
  'G410': { name: 'Light Holly Green', hex: '#D2E3D9' },
  'GY173': { name: 'Dim Green', hex: '#E5E8D8' },
  'CG2': { name: 'Cool Grey II 2', hex: '#EBECEE' },
  'Y040': { name: 'Calamansi', hex: '#FBF5C8' },
  'R29': { name: 'Pear color', hex: '#FCE8E7' },
  'RV300': { name: 'Tender Pink', hex: '#F5D0DA' },
  'PB1': { name: 'Sky Blue', hex: '#C5DCEC' },
  'G110': { name: 'Mignonette', hex: '#EAF2DA' },
  'G8': { name: 'Glass Green', hex: '#C9E2CF' },
  'E010': { name: 'Pale Fruit Pink', hex: '#FBEAE4' },
  'GG1': { name: 'Green Grey 1', hex: '#E8EAE6' },
  'Y3': { name: 'Barium Yellow', hex: '#FDF5B6' },
  'R050': { name: 'Chocolate Pink', hex: '#F3D7D6' },
  'V150': { name: 'Mallow', hex: '#E1D3E6' },
  'BG3': { name: 'Blue Grey3', hex: '#D6E0EA' },
  'G130': { name: 'Acid Green', hex: '#D8E7C0' },
  'GY1': { name: 'Pale Green', hex: '#E2EDD5' },
  'E020': { name: 'Cotton Pearl', hex: '#F9E9E2' },
  'WG01': { name: 'Warm Grey 1', hex: '#EFEFEE' },
  'YR220': { name: 'Yellowish Shade', hex: '#FBEFE1' },
  'R090': { name: 'Light Tea Rose', hex: '#FBD9D9' },
  'V322': { name: 'Rain Flower Purple', hex: '#E0DAEA' },
  'BG4': { name: 'Mint Blue', hex: '#D9E8EC' },
  'G320': { name: 'Jade Green', hex: '#DCE9E0' },
  'GY6': { name: 'Anise', hex: '#F4F5D5' },
  'E030': { name: 'Pink Flamingo', hex: '#FADBD7' },
  'BGII03': { name: 'Blue Grey II 3', hex: '#DCE2E8' },
  'YR4': { name: 'Salmon Pink', hex: '#FCDCD4' },
  'R242': { name: 'Grayish Cherry', hex: '#EEDFE2' },
  'V330': { name: 'Prune', hex: '#DCD5E6' },
  'B110': { name: 'Crystal Blue', hex: '#D2E5EB' },
  'G322': { name: 'Pale Aqua Mint', hex: '#D4E7E3' },
  'GY7': { name: 'Sugarcane', hex: '#F2F5DC' },
  'CGII00': { name: 'Cool Grey II 0', hex: '#F0F1F2' },
  'BG9': { name: 'Pigeon Blue', hex: '#DAE2E7' },
};

// Merge New Pastel 48 data into existingMarkerData
for (const id in newPastels48DataFromImage) {
  existingMarkerData[id] = newPastels48DataFromImage[id];
}


// Special mapping for user IDs to existing data keys if they differ
const idMapping: Record<string, string> = {
   // e.g. if user ID 'W01' should map to 'WG01' in existingMarkerData
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

const honoluluMidtones48Markers: Marker[] = honoluluMidtones48MarkerIDs.map(id => {
  const effectiveId = idMapping[id] || id;
  const knownData = existingMarkerData[effectiveId];

  if (knownData) {
    return { id, name: knownData.name, hex: knownData.hex, setId: 'ohuhu-midtones-48' };
  } else {
    return { id, name: id, hex: '#CCCCCC', setId: 'ohuhu-midtones-48' };
  }
});

const honoluluPastels48SetMarkers: Marker[] = pastels48MarkerIDs.map(id => {
  const effectiveId = idMapping[id] || id;
  const knownData = existingMarkerData[effectiveId];

  if (knownData) {
    return { id, name: knownData.name, hex: knownData.hex, setId: 'ohuhu-pastels-48' };
  } else {
    return { id, name: id, hex: '#CCCCCC', setId: 'ohuhu-pastels-48' };
  }
});

const newPastels48SetMarkers: Marker[] = newPastels48MarkerIDs.map(id => {
  const effectiveId = idMapping[id] || id;
  const knownData = existingMarkerData[effectiveId];

  if (knownData) {
    return { id, name: knownData.name, hex: knownData.hex, setId: 'ohuhu-new-pastels-48' };
  } else {
    // This case should ideally not be hit if existingMarkerData is updated correctly above
    return { id, name: id, hex: '#CCCCCC', setId: 'ohuhu-new-pastels-48' };
  }
});


let allMarkers: Marker[] = [
  ...honolulu120SetMarkers,
  ...ohuhu104SetMarkers,
  ...honoluluMidtones48Markers,
  ...honoluluPastels48SetMarkers,
  ...newPastels48SetMarkers,
];

const blenderData = existingMarkerData['0'];
if (blenderData) {
  const blenderMarker: Marker = {
    id: '0',
    name: blenderData.name,
    hex: blenderData.hex,
    // Assign blender to a primary set for consistency, or make it set-agnostic if needed
    setId: 'ohuhu-honolulu-b'
  };
  // Ensure blender is only added once, or update if already present
  const existingBlenderIndex = allMarkers.findIndex(m => m.id === '0');
  if (existingBlenderIndex === -1) {
    allMarkers.push(blenderMarker);
  } else {
    // If it exists from another set, ensure its details are from existingMarkerData['0']
    // and decide which set it "belongs" to, or if it should be outside a set.
    // For now, keeping it assigned to 'ohuhu-honolulu-b' if it was already there.
     allMarkers[existingBlenderIndex] = { ...blenderMarker, setId: allMarkers[existingBlenderIndex].setId || 'ohuhu-honolulu-b' };
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
