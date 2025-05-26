
import type { Marker, MarkerSet } from './types';

export const INITIAL_MARKER_SETS: MarkerSet[] = [
  { id: 'ohuhu-honolulu-b', name: 'Honolulu 120' },
  { id: 'ohuhu-104', name: 'Honolulu 104' },
  { id: 'ohuhu-midtones-48', name: 'Midtones 48' },
  { id: 'ohuhu-pastels-48', name: 'Pastels 48' },
  { id: 'ohuhu-new-pastels-48', name: 'New Pastels 48' },
  { id: 'ohuhu-grey-tones-36', name: 'Grey Tones 36' },
  { id: 'ohuhu-skin-36', name: 'Skin 36' },
];

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

const ohuhu104MarkerIDs: string[] = [
  'B080', 'B090', 'B110', 'B180', 'B190', 'B270', 'B440', 'BG060', 'BR208', 'CG030',
  'E010', 'E030', 'E080', 'E120', 'E130', 'E160', 'E260', 'E370', 'E430', 'E432',
  'E434', 'E450', 'E460', 'FY010', 'FY020', 'FY030', 'FY050', 'G030', 'G050', 'G080',
  'G110', 'G130', 'G260', 'G270', 'G300', 'G320', 'G322', 'G324', 'G326', 'G330',
  'G390', 'G410', 'G470', 'G490', 'G500', 'GG040', 'GG110', 'MG030', 'MG100', 'R29',
  'R050', 'R070', 'R150', 'R170', 'R180', 'R190', 'R230', 'R240', 'R242', 'R270',
  'R282', 'R284', 'R290', 'R340', 'R350', 'RG050', 'RG080', 'RV010', 'RV100', 'RV130',
  'RV240', 'RV250', 'RV300', 'RV330', 'RV350', 'V050', 'V070', 'V080', 'V150', 'V210',
  'V320', 'V322', 'V330', 'V340', 'V390', 'V450', 'WG070', 'WG090', 'WG130', 'Y010',
  'Y040', 'Y070', 'Y080', 'Y110', 'Y121', 'Y130', 'Y140', 'Y180', 'Y210', 'Y250',
  'YR090', 'YR172', 'YR180', 'YR220'
];

const honoluluMidtones48MarkerIDs: string[] = [
  'Y050', 'Y260', 'Y270', 'YR170', 'YR190', 'YR250', 'YR260', 'R160', 'R200', 'R280',
  'RV070', 'RV080', 'RV200', 'RV270', 'RV320', 'V060', 'V160', 'V250', 'V270', 'V370',
  'B070', 'B140', 'B260', 'B290', 'B350', 'B380', 'G060', 'G070', 'G170', 'G190',
  'G240', 'G360', 'G440', 'E060', 'E110', 'E170', 'E240', 'E300', 'E310', 'E400',
  'E440', 'E490', 'CG070', 'BG070', 'YG080', 'RG150', 'MG060', 'GG060'
];

const pastels48MarkerIDs: string[] = [
  'Y030', 'Y120', 'Y230', 'YR030', 'YR070', 'YR110', 'YR240', 'R080',
  'R110', 'R120', 'R250', 'RV030', 'RV160', 'RV180', 'RV260', 'RV280',
  'V020', 'V030', 'V230', 'B030', 'B050', 'B120', 'B220', 'B250',
  'B340', 'G020', 'G120', 'G140', 'G220', 'G340', 'G420', 'E050',
  'E090', 'E210', 'E220', 'E280', 'E380', 'E470', 'CG050', 'CG020',
  'BG050', 'WG050', 'YG040', 'RG030', 'RG110', 'RG120', 'MG020', 'GG020'
];

const newPastels48MarkerIDs: string[] = [
  'Y010', 'BR208', 'RV010', 'R24', 'G030', 'G326', 'GY172', 'CG030', 'Y110', 'R19',
  'RV130', 'R25', 'G050', 'G410', 'GY173', 'CG2', 'Y040', 'R29', 'RV300', 'PB1',
  'G110', 'G8', 'E010', 'GG1', 'Y3', 'R050', 'V150', 'BG3', 'G130', 'GY1',
  'E020', 'WG01', 'YR220', 'R090', 'V322', 'BG4', 'G320', 'GY6', 'E030', 'BGII03',
  'YR4', 'R242', 'V330', 'B110', 'G322', 'GY7', 'CGII00', 'BG9'
];

const greyTones36MarkerIDs: string[] = [
    'WG0.5', 'WG050', 'WG01', 'WG4', 'WG09', 'CGII00', 'BG050', 'BG070', 'CGII04',
    'CGII07', 'CGII09', 'CG020', 'CG2', 'CG030', 'NG03', 'CG5', 'CG070', 'NG09',
    'MG020', 'BGII03', 'MG060', 'BGII05', 'BGII09', 'GG020', 'GG1', 'GG3', 'GG060',
    'GG5', 'GG9', 'YG040', 'YG080', 'YG100', 'RG030', 'RG110', 'RG120', 'RG150'
];

const skin36MarkerIDs: string[] = [
  'Y4', 'Y9', 'Y12', 'Y13', 'Y121', 'Y145', 'YR1', 'YR5', 'YR6', 'YR7', 'YR8', 'YR9',
  'YR10', 'YR20', 'YR34', 'YR91', 'YR92', 'YR95', 'YR107', 'YR148', 'YR205', 'YR209',
  'YR212', 'R18', 'R19', 'R20', 'R21', 'R26', 'R27', 'R28', 'R29', 'R30', 'WG0.5',
  'BR2', 'BR3', 'BR208'
];


// Base data for known markers. Names and hex codes here are prioritized.
// If a marker ID appears in multiple sets, the name/hex from the LATEST set added
// via setMarkerIdLists will effectively "win" during the mergedMarkersMap creation.
const existingMarkerData: Record<string, { name: string; hex: string }> = {
  // Honolulu 120 + Blender (Names from Ohuhu chart, hex visually approximated or common knowledge)
  'Y1': { name: 'Pastel Yellow', hex: '#FFF9C0' },
  'Y2': { name: 'Sunflower', hex: '#FFDD00' },
  'Y3': { name: 'Lemon Yellow', hex: '#FFF1A8' }, // From chart (was Barium Yellow)
  'Y4': { name: 'Quince', hex: '#FADCA5' }, // From chart (was Quince)
  'Y5': { name: 'Canary Yellow', hex: '#FFF8A8' }, // From chart (was Rouge Orange)
  'Y6': { name: 'Yellow', hex: '#FFEB00' }, // From chart (was Lemon Yellow)
  'Y7': { name: 'Acid Yellow', hex: '#FFE080' }, // From chart (was Dull Yellow)
  'Y8': { name: 'Deep Yellow', hex: '#FFCC33' }, // From chart (was Olive Yellow)
  'Y9': { name: 'Yellow Ochre', hex: '#E8B349' }, // From chart
  'Y10': { name: 'Apricot', hex: '#FCC98A' }, // From chart
  'Y11': { name: 'Brown Grey', hex: '#C1BBA0' }, // From chart
  'Y12': { name: 'Mahogany', hex: '#C08E7F' }, // From chart
  'Y13': { name: 'Chestnut Brown', hex: '#6A4F4B' }, // From chart
  'YR1': { name: 'Dark Yellow', hex: '#EFCB78' }, // From chart
  'YR2': { name: 'Marigold', hex: '#FCAE3A' }, // From chart
  'YR3': { name: 'Orange', hex: '#FFA500' }, // From chart
  'YR4': { name: 'Pastel Orange', hex: '#FCDCD4' }, // From chart (was Salmon Pink)
  'YR5': { name: 'Terra Cotta', hex: '#E2725B' }, // From chart
  'YR33': { name: 'Melon Yellow', hex: '#FBC36F' }, // From chart
  'BR1': { name: 'Raw Umber', hex: '#826644' }, // From chart
  'BR2': { name: 'Potato Brown', hex: '#C6A17D' }, // From chart
  'BR3': { name: 'Rose Beige', hex: '#DDC1B4' }, // From chart
  'R1': { name: 'Carmine', hex: '#F69088' }, // From chart (was Coral Pink)
  'R2': { name: 'Vermilion', hex: '#F26522' }, // From chart
  'R3': { name: 'Cosmos', hex: '#FF7F50' }, // From chart (was Coral Red)
  'R4': { name: 'Deep Red', hex: '#94181D' }, // From chart
  'R5': { name: 'Rose Red', hex: '#F26C7D' }, // From chart (was Cherry Pink)
  'R6': { name: 'Vivid Red', hex: '#F15A24' }, // From chart (was Rose Red)
  'R7': { name: 'Old Red', hex: '#A02D2B' }, // From chart
  'R8': { name: 'Geranium', hex: '#EC165D' }, // From chart
  'R9': { name: 'Pale Pink', hex: '#FFD1DC' }, // From chart (was Pastel Rose)
  'R10': { name: 'Rose Pink', hex: '#FEEFED' }, // From chart (was Pastel Pink)
  'R11': { name: 'Mauve Shadow', hex: '#D6B4C5' }, // From chart
  'R12': { name: 'Rose Buvard', hex: '#E5A0B6' }, // From chart
  'R13': { name: 'Clematis', hex: '#C27BA0' }, // From chart
  'R14': { name: 'Pale Purple', hex: '#D2B9D3' }, // From chart
  'R15': { name: 'Cerise', hex: '#DE3163' }, // From chart
  'R16': { name: 'Deep Violet', hex: '#9400D3' }, // From chart
  'R17': { name: 'Pansy', hex: '#7A3E9A' }, // From chart
  'R18': { name: 'Pastel Peach', hex: '#FFDAB9' }, // From chart
  'R19': { name: 'Barely Beige', hex: '#FDF0E9' }, // From chart
  'R20': { name: 'Powder Pink', hex: '#FFE9E5' }, // From chart (was Fluorescent Pink)
  'R21': { name: 'Fruit Pink', hex: '#FFDCD5' }, // From chart
  'R22': { name: 'Dark Blush', hex: '#E07A5F' }, // From chart
  'R23': { name: 'Light Pink', hex: '#FFC0CB' }, // From chart (was Rose Pink)
  'R24': { name: 'Dark Violet Light', hex: '#D2C8E6' }, // From chart
  'R25': { name: 'Pale Blue Violet', hex: '#D4DDEB' }, // From chart
  'P1': { name: 'Vivid Purple', hex: '#8F00FF' }, // From chart
  'P2': { name: 'Light Violet', hex: '#CF9FFF' }, // From chart
  'P3': { name: 'Pastel Violet', hex: '#D8BFD8' }, // From chart
  'P4': { name: 'Lavender', hex: '#E6E6FA' }, // From chart
  'P5': { name: 'Aubergine', hex: '#4B0082' }, // From chart
  'RP1': { name: 'Vivid Reddish Purple', hex: '#C71585' }, // From chart
  'RP6': { name: 'Vivid Pink', hex: '#EC008C' }, // From chart
  'PB1': { name: 'Sky Blue', hex: '#C5DCEC' }, // From chart
  'PB2': { name: 'Brilliant Blue', hex: '#509AFF' }, // From chart
  'PB3': { name: 'Cobalt Blue', hex: '#0047AB' }, // From chart
  'PB4': { name: 'Napoleon Blue', hex: '#00205C' }, // From chart
  'PB5': { name: 'Prussian Blue', hex: '#003153' }, // From chart
  'PB6': { name: 'Royal Blue', hex: '#4169E1' }, // From chart
  'PB7': { name: 'Pastel Blue', hex: '#AEC6CF' }, // From chart
  'PB8': { name: 'Cerulean Blue', hex: '#2A52BE' }, // From chart
  'PB9': { name: 'Cloud Blue', hex: '#ACE5EE' }, // From chart
  'PB10': { name: 'Turquoise Green Light', hex: '#AFEEEE' }, // From chart
  'PB11': { name: 'Marine Blue', hex: '#002F6C' }, // From chart
  'B64': { name: 'Indian Blue', hex: '#41719B' }, // From chart
  'BG1': { name: 'Turquoise Green', hex: '#00A99D' }, // From chart
  'BG2': { name: 'Deep Green', hex: '#00827A' }, // From chart
  'BG3': { name: 'Blue Grey3', hex: '#D6E0EA' }, // From chart
  'BG4': { name: 'Mint Blue', hex: '#D9E8EC' }, // From chart
  'BG5': { name: 'Dolphin Blue', hex: '#8FD4CF' }, // From chart
  'BG6': { name: 'Peacock Green', hex: '#00806E' }, // From chart
  'BG7': { name: 'Forest Green', hex: '#006837' }, // From chart
  'BG8': { name: 'Teal', hex: '#008080' }, // From chart
  'BG9': { name: 'Pigeon Blue', hex: '#DAE2E7' }, // From chart
  'BG68': { name: 'Turquoise Blue', hex: '#40E0D0' }, // From chart
  'G1': { name: 'Emerald Green', hex: '#00A651' }, // From chart
  'G2': { name: 'Vivid Green', hex: '#8DC63F' }, // From chart
  'G3': { name: 'Ocean Green', hex: '#48BF91' }, // From chart
  'G4': { name: 'Mint Green Light', hex: '#C0E6B0' }, // From chart
  'G5': { name: 'Ice Blue', hex: '#70CAD1' }, // From chart (was Turquoise Ink Blue)
  'G6': { name: 'Dusty Jade Green', hex: '#85BFA1' }, // From chart
  'G7': { name: 'Chromium Oxide Green', hex: '#6082B6' }, // From chart
  'G8': { name: 'Glass Green', hex: '#C9E2CF' }, // From chart
  'G9': { name: 'Meadow Green', hex: '#86B85C' }, // From chart
  'GY1': { name: 'Pale Green', hex: '#E2EDD5' }, // From chart
  'GY2': { name: 'Spring Dim Green', hex: '#C6D5A9' }, // From chart
  'GY3': { name: 'Bud Green', hex: '#BADD78' }, // From chart
  'GY4': { name: 'Yellow Green', hex: '#D0E07A' }, // From chart
  'GY5': { name: 'Absinthe', hex: '#C2D72F' }, // From chart
  'GY6': { name: 'Anise', hex: '#F4F5D5' }, // From chart
  'GY7': { name: 'Sugarcane', hex: '#F2F5DC' }, // From chart
  'GY8': { name: 'Mignonette Green', hex: '#B4C882' }, // From chart
  'GY42': { name: 'Bronze Green', hex: '#708238' }, // From chart
  'GY43': { name: 'Deep Olive Green', hex: '#556B2F' }, // From chart
  'GY172': { name: 'Spectrum Green', hex: '#BDE29A' }, // From chart
  'GY173': { name: 'Dim Green', hex: '#E5E8D8' }, // From chart
  'CGII00': { name: 'Cool Grey II 0', hex: '#F0F1F2' }, // From chart
  'CGII04': { name: 'Cool Grey II 4', hex: '#C2C2C2' }, // From chart
  'CGII07': { name: 'Cool Grey II 7', hex: '#8D8D8D' }, // From chart
  'CGII08': { name: 'Cool Grey II 8', hex: '#787878' }, // From chart
  'CGII09': { name: 'Cool Grey II 9', hex: '#646464' }, // From chart
  'CG2': { name: 'Cool Grey II 2', hex: '#EBECEE' }, // From chart
  'CG5': { name: 'Cool Grey II 5', hex: '#A9A9A9' }, // From chart
  'GG1': { name: 'Green Grey 1', hex: '#E8EAE6' }, // From chart
  'GG3': { name: 'Green Grey 3', hex: '#BCC2BB' }, // From chart
  'GG5': { name: 'Green Grey 5', hex: '#9CA99A' }, // From chart
  'GG9': { name: 'Green Grey 9', hex: '#5A6B5D' }, // From chart
  'WG01': { name: 'Warm Grey 1', hex: '#EFEFEE' }, // From chart
  'WG3': { name: 'Warm Grey 3', hex: '#D3D3D3' }, // From chart
  'WG4': { name: 'Warm Grey 4', hex: '#C0C0C0' }, // From chart
  'WG09': { name: 'Warm Grey 9', hex: '#696969' }, // From chart
  'BGII03': { name: 'Blue Grey II 3', hex: '#DCE2E8' }, // From chart
  'BGII05': { name: 'Blue Grey II 5', hex: '#BCC6CF' }, // From chart
  'BGII09': { name: 'Blue Grey II 9', hex: '#5A6874' }, // From chart
  'NG03': { name: 'Neutral Grey 3', hex: '#D0D0D0' }, // From chart
  'NG06': { name: 'Neutral Grey 6', hex: '#9C9C9C' }, // From chart
  'NG07': { name: 'Neutral Grey 7', hex: '#888888' }, // From chart
  'NG09': { name: 'Neutral Grey 9', hex: '#5F5F5F' }, // From chart
  '120': { name: 'Black', hex: '#000000' }, // From chart
  '0': { name: 'Colorless Blender', hex: '#FFFFFF' }, // From chart

  // Honolulu 104 Set
  'Y010': { name: 'Primrose', hex: '#FDF0E0' },
  'Y121': { name: 'Light Primrose', hex: '#FFF9E3' },
  'Y040': { name: 'Calamansi', hex: '#FBF5C8' },
  'Y070': { name: 'Acid Yellow', hex: '#FFF200' }, // Same as Y6
  'Y080': { name: 'Lightning Yellow', hex: '#FFEC00' },
  'Y110': { name: 'Grayish Yellow', hex: '#F8F0D0' },
  'Y130': { name: 'Mustard', hex: '#FFDB58' },
  'Y140': { name: 'Nugget', hex: '#E8B63A' },
  'Y180': { name: 'Shallow Orange Cafe', hex: '#E0A953' },
  'Y210': { name: 'Deep Teak', hex: '#AD865A' },
  'Y250': { name: 'Flax', hex: '#EEDC82' },
  'YR090': { name: 'Peach Pie', hex: '#FDD4B7' },
  'YR172': { name: 'Tiger Lily', hex: '#F09B59' },
  'YR180': { name: 'Lipstick Orange', hex: '#F18C4D' },
  'YR220': { name: 'Yellowish Shade', hex: '#FBEFE1' },
  'R29': { name: 'Pear Color', hex: '#FCE8E7' },
  'R050': { name: 'Chocolate Pink', hex: '#F3D7D6' },
  'R070': { name: 'Agate', hex: '#D9837D' },
  'R150': { name: 'Zinnober', hex: '#E95E6F' },
  'R170': { name: 'Lipstick Red', hex: '#E4002B' },
  'R180': { name: 'Bright Red', hex: '#F03E4D' },
  'R190': { name: 'Bougainvillaea', hex: '#E85C83' },
  'R230': { name: 'Strong Red', hex: '#D93A4C' },
  'R240': { name: 'Garnet', hex: '#9E2B2F' },
  'R242': { name: 'Grayish Cherry', hex: '#EEDFE2' },
  'R270': { name: 'Baby Blossoms', hex: '#F7CAC9' },
  'R282': { name: 'Colocasia Torino', hex: '#B87E79' },
  'R284': { name: 'Clove', hex: '#9A5E59' },
  'R290': { name: 'Cardinal', hex: '#C41E3A' },
  'R340': { name: 'Argyle Purple', hex: '#7B4A5E' },
  'R350': { name: 'Dark Purple Grey', hex: '#5C4E58' },
  'RV010': { name: 'Water Lily', hex: '#F5E6F0' },
  'RV100': { name: 'Red Onion', hex: '#A05E7C' },
  'RV130': { name: 'Queen Pink', hex: '#F7D6E2' },
  'RV240': { name: 'Bronze Purple', hex: '#946E84' },
  'RV250': { name: 'Peony', hex: '#E6A9BE' },
  'RV300': { name: 'Tender Pink', hex: '#F5D0DA' },
  'RV330': { name: 'Strawberry Pink', hex: '#E978A0' },
  'RV350': { name: 'Crimson', hex: '#DC143C' },
  'V050': { name: 'Pearl Violet', hex: '#DCCCE5' },
  'V070': { name: 'Eggplant Purple', hex: '#614051' },
  'V080': { name: 'Dark Violet', hex: '#583C5D' },
  'V150': { name: 'Mallow', hex: '#E1D3E6' },
  'V210': { name: 'Signal Violet', hex: '#8A5E9A' },
  'V320': { name: 'Gentian Violet', hex: '#6A4D8A' },
  'V322': { name: 'Rain Flower Purple', hex: '#E0DAEA' },
  'V330': { name: 'Prune', hex: '#DCD5E6' },
  'V340': { name: 'Lavender Blue', hex: '#967BB6' },
  'V390': { name: 'Dark Slate Blue', hex: '#483D8B' },
  'V450': { name: 'Dark Lavender', hex: '#734F96' },
  'B080': { name: 'Process Blue', hex: '#89CFF0' },
  'B090': { name: 'Pebble Blue', hex: '#A1B5CC' },
  'B110': { name: 'Crystal Blue', hex: '#D2E5EB' },
  'B180': { name: 'Vienna Blue', hex: '#2E5894' },
  'B190': { name: 'Ultramarine', hex: '#120A8F' },
  'B270': { name: 'Vivid Blue', hex: '#007FFF' },
  'B440': { name: 'Cyanine Blue', hex: '#2A52BE' },
  'G030': { name: 'Crescent Yellow', hex: '#EFF5D6' },
  'G050': { name: 'Celadon Green', hex: '#DCEAD6' },
  'G080': { name: 'Limeade', hex: '#BCE27F' },
  'G110': { name: 'Mignonette', hex: '#EAF2DA' },
  'G130': { name: 'Acid Green', hex: '#D8E7C0' },
  'G260': { name: 'Apple Green', hex: '#8DB600' },
  'G270': { name: 'Moss', hex: '#8FBC8F' },
  'G300': { name: 'Dark Olive', hex: '#556B2F' },
  'G320': { name: 'Jade Green', hex: '#DCE9E0' },
  'G322': { name: 'Pale Aqua Mint', hex: '#D4E7E3' },
  'G324': { name: 'Aqua Blue', hex: '#ADD8E6' },
  'G326': { name: 'Bright Blue', hex: '#A9D9D9' },
  'G330': { name: 'Mineral Green', hex: '#829F82' },
  'G390': { name: 'Green', hex: '#008000' },
  'G410': { name: 'Light Holly Green', hex: '#D2E3D9' },
  'G470': { name: 'Pine Tree Green', hex: '#01796F' },
  'G490': { name: 'Viridian', hex: '#40826D' },
  'G500': { name: 'Peacock Blue', hex: '#00A0B0' },
  'BR208': { name: 'Black Brown', hex: '#F0E0CF' }, // Skin tone name, light swatch
  'E010': { name: 'Pale Fruit Pink', hex: '#FBEAE4' },
  'E020': { name: 'Cotton Pearl', hex: '#F9E9E2' },
  'E030': { name: 'Pink Flamingo', hex: '#FADBD7' },
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
  'CG030': { name: 'Neutral Grey 03', hex: '#EAEAEA' },
  'BG060': { name: 'Deep Cool Grey', hex: '#8C92AC' },
  'WG070': { name: 'Warm Grey 07', hex: '#8C8C8C' },
  'WG090': { name: 'Warm Grey 09', hex: '#696969' }, // Not WG09 from Honolulu 120
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
  'Y050': { name: 'Summer Lemon', hex: '#FEF7DB' },
  'Y260': { name: 'Yellow Dahlia', hex: '#FDF4CE' },
  'Y270': { name: 'Pale Ocre', hex: '#FBF0E0' },
  'YR170': { name: 'Chrome Orange', hex: '#FFA724' },
  'YR190': { name: 'Cadmium Orange', hex: '#FF8E1C' },
  'YR250': { name: 'Moccasin', hex: '#FDE6B9' },
  'YR260': { name: 'Yellowish Brown', hex: '#F7DEB9' },
  'R160': { name: 'Cadmium Red', hex: '#E64D5A' },
  'R200': { name: 'Coralessence', hex: '#FA8072' },
  'R280': { name: 'Currant', hex: '#9A2832' },
  'RV070': { name: 'Sakura Pink', hex: '#FEC1CD' },
  'RV080': { name: 'Bright Pink', hex: '#FF338A' },
  'RV200': { name: 'Dark Orchid', hex: '#9F46D3' },
  'RV270': { name: 'Shadow Pink', hex: '#EFD5EE' },
  'RV320': { name: 'Apricot Pink', hex: '#FEDCC5' },
  'V060': { name: 'Amethyst', hex: '#A370D1' },
  'V160': { name: 'Deep Lilac', hex: '#CEADD3' },
  'V250': { name: 'Light lavender', hex: '#E0C7E0' },
  'V270': { name: 'Lobelia', hex: '#6F3DAA' },
  'V370': { name: 'Blue Bell', hex: '#A7A7D5' },
  'B070': { name: 'Tahitian Blue', hex: '#33FFFF' },
  'B140': { name: 'Aquamarine', hex: '#8AFDE4' },
  'B260': { name: 'Smoky Blue', hex: '#8093A4' },
  'B290': { name: 'Antwerp Blue', hex: '#284473' },
  'B350': { name: 'Cornflower Blue', hex: '#6E9BED' },
  'B380': { name: 'Capri Blue', hex: '#33C4FF' },
  'G060': { name: 'Celery Yellow', hex: '#E4FFCA' },
  'G070': { name: 'Lemon Green', hex: '#B3FF4A' },
  'G170': { name: 'May Green', hex: '#55B458' },
  'G190': { name: 'Olive Green', hex: '#858529' },
  'G240': { name: 'Beige Green', hex: '#C2BC76' },
  'G360': { name: 'Pond Green', hex: '#298585' },
  'G440': { name: 'Leaf Green', hex: '#95EE95' },
  'E060': { name: 'Light Mahogany', hex: '#C55A29' },
  'E110': { name: 'Dark Suntan', hex: '#D7BA91' },
  'E170': { name: 'Caribe Cocoa', hex: '#A5663D' },
  'E240': { name: 'Chamois', hex: '#F2E896' },
  'E300': { name: 'Clay', hex: '#B4A595' },
  'E310': { name: 'Dark Brown', hex: '#6A573B' },
  'E400': { name: 'Cocoa Brown', hex: '#9B5F29' },
  'E440': { name: 'Khaki', hex: '#C8B596' },
  'E490': { name: 'Deep Orange', hex: '#FF5A29' },
  'CG070': { name: 'Neutral Grey 07', hex: '#8C8C8C' },
  'BG070': { name: 'Cool Grey 07', hex: '#B0B9C4' },
  'YG080': { name: 'Yellow Grey 08', hex: '#C3C3BE' },
  'RG150': { name: 'Red Grey 150', hex: '#B5A5A5' },
  'MG060': { name: 'Blue Grey 06', hex: '#A5ADB5' },
  'GG060': { name: 'Green Grey 06', hex: '#ADB5A5' },

  // Pastels 48
  'Y030': { name: 'Lemon Chiffon', hex: '#FFFBD2' },
  'Y120': { name: 'Buttercup Yellow', hex: '#FFFED5' },
  'Y230': { name: 'Deep Cream', hex: '#FEFBDD' },
  'YR030': { name: 'Carmine Red', hex: '#FFDBC5' },
  'YR070': { name: 'Light Orange', hex: '#FFE6CA' },
  'YR110': { name: 'Mellow Peach', hex: '#FFDEB9' },
  'YR240': { name: 'Cream', hex: '#FEFED5' },
  'R080': { name: 'Pale Cherry Pink', hex: '#FFC5CB' },
  'R110': { name: 'Sardonyx', hex: '#FED6DC' },
  'R120': { name: 'Light Prawn', hex: '#FFBDC6' },
  'R250': { name: 'Antique Fuchsia', hex: '#EBEBFA' },
  'RV030': { name: 'Light Hot Pink', hex: '#FFB7DD' },
  'RV160': { name: 'Thistle', hex: '#DDC4DD' },
  'RV180': { name: 'Hollyhock', hex: '#FFC9E6' },
  'RV260': { name: 'Pink', hex: '#FFDBED' },
  'RV280': { name: 'Light Pink', hex: '#FFE5F2' },
  'V020': { name: 'Pale Lilac', hex: '#EBE5FA' },
  'V030': { name: 'Mauve', hex: '#DDC4DD' },
  'V230': { name: 'Viola', hex: '#D1D1FF' },
  'B030': { name: 'Frost Blue', hex: '#E5FFFF' },
  'B050': { name: 'Robin\'s Egg Blue', hex: '#B4F3F3' },
  'B120': { name: 'Pale Blue', hex: '#B2DBED' },
  'B220': { name: 'Pale Grayish Blue', hex: '#B5C9DE' },
  'B250': { name: 'Light Blue', hex: '#C5E4FF' },
  'B340': { name: 'Lavender Mist', hex: '#EBEBFA' },
  'G020': { name: 'Pale Lemon Yellow', hex: '#F5FFF5' },
  'G120': { name: 'Yellowish Green', hex: '#D5F5CA' },
  'G140': { name: 'Horseradish', hex: '#C6FFC6' },
  'G220': { name: 'Lime Green', hex: '#E5FDE5' },
  'G340': { name: 'Horizon Green', hex: '#B5E5EB' },
  'G420': { name: 'Green Shadow', hex: '#CEEBD3' },
  'E050': { name: 'Lipstick Natural', hex: '#FFDBD9' },
  'E090': { name: 'Eggshell White', hex: '#FAF5EB' },
  'E210': { name: 'Brick Beige', hex: '#F7EED8' },
  'E220': { name: 'Sand', hex: '#F6F2D0' },
  'E280': { name: 'Sand White', hex: '#FBF7F1' },
  'E380': { name: 'Ash Rose', hex: '#E5DDD5' },
  'E470': { name: 'Tea Rose', hex: '#FACCB8' },
  'CG050': { name: 'Neutral Grey 05', hex: '#D8D8D8' },
  'CG020': { name: 'Neutral Grey 02', hex: '#EDEDED' },
  'BG050': { name: 'Cool Grey 05', hex: '#CBD5E0' },
  'WG050': { name: 'Warm Grey 05', hex: '#DFDFDF' },
  'YG040': { name: 'Yellow Grey 04', hex: '#E5E5D5' },
  'RG030': { name: 'Red Grey 03', hex: '#E5DBDB' },
  'RG110': { name: 'Red Grey 11', hex: '#ECE5E5' },
  'RG120': { name: 'Red Grey 12', hex: '#EDE7E7' },
  'MG020': { name: 'Blue Grey 02', hex: '#E2EAEE' },
  'GG020': { name: 'Green Grey 02', hex: '#E2EEE2' },

  // New Pastels 48 (Blossoming) - Names from image, Hex visually approximated
  'R090': { name: 'Rose Mist', hex: '#F5A2A2' },

  // Grey Tones 36 - Names from image, hex visually approximated
  'WG0.5': { name: 'Warm Grey 0', hex: '#F5F1ED' },
  'YG100': { name: 'Yellow Grey 100', hex: '#BFBFA8' },

  // Skin Tones 36
  'Y145': { name: 'Buttercup Yellow', hex: '#FCEEB8' },
  'YR6': { name: 'Primary Yellow', hex: '#FDEB6E' },
  'YR7': { name: 'Cadmium Yellow', hex: '#F9E08C' },
  'YR8': { name: 'Salmon', hex: '#F9AA8F' },
  'YR9': { name: 'Yellow Ochre', hex: '#D8BCA2' }, // This is a different shade than Y9 'Yellow Ochre'
  'YR10': { name: 'Brun', hex: '#D37D5B' },
  'YR20': { name: 'Morin', hex: '#FBE1B8' },
  'YR34': { name: 'Yellow', hex: '#FBE59C' },
  'YR91': { name: 'Natural Oak', hex: '#AD6F49' },
  'YR92': { name: 'Chocolate', hex: '#B38B70' },
  'YR95': { name: 'Burnt Sienna', hex: '#AF6D4F' },
  'YR107': { name: 'Reddish Yellow', hex: '#EBCBA1' },
  'YR148': { name: 'Thin Persimmon', hex: '#F8D7C4' },
  'YR205': { name: 'Powdery Orange', hex: '#FCDCB1' },
  'YR209': { name: 'Hazelnuts', hex: '#F9E7D6' },
  'YR212': { name: 'Milk White', hex: '#FFF8EE' },
  'R26': { name: 'Honey', hex: '#F8D3BB' },
  'R27': { name: 'Pale Mauve', hex: '#EBB9B1' },
  'R28': { name: 'Colocasia Tonoimo', hex: '#D4AFAE' },
  'R30': { name: 'Pale Cherry Pink', hex: '#FEE7EA' },
};


const setMarkerIdLists: { setId: string, ids: string[] }[] = [
  { setId: 'ohuhu-honolulu-b', ids: honolulu120MarkerIDs },
  { setId: 'ohuhu-104', ids: ohuhu104MarkerIDs },
  { setId: 'ohuhu-midtones-48', ids: honoluluMidtones48MarkerIDs },
  { setId: 'ohuhu-pastels-48', ids: pastels48MarkerIDs },
  { setId: 'ohuhu-new-pastels-48', ids: newPastels48MarkerIDs },
  { setId: 'ohuhu-grey-tones-36', ids: greyTones36MarkerIDs },
  { setId: 'ohuhu-skin-36', ids: skin36MarkerIDs },
];

// This map will hold the consolidated marker data.
// The name and hex from the LATEST occurrence of an ID in existingMarkerData will be used.
const mergedMarkersMap = new Map<string, { name: string; hex: string; setIds: string[] }>();

// Populate the map with data from existingMarkerData first, so names/hexes are established.
// Then iterate through sets to associate setIds.

// Initialize with all known marker data, establishing the "canonical" name/hex
for (const id in existingMarkerData) {
  mergedMarkersMap.set(id, {
    name: existingMarkerData[id].name,
    hex: existingMarkerData[id].hex,
    setIds: [], // Initialize setIds, will be populated next
  });
}

// Iterate through each defined set and its list of marker IDs
setMarkerIdLists.forEach(setInfo => {
  setInfo.ids.forEach(id => {
    if (mergedMarkersMap.has(id)) {
      // If marker exists, add this set's ID to its list of setIds
      const markerEntry = mergedMarkersMap.get(id)!;
      if (!markerEntry.setIds.includes(setInfo.setId)) {
        markerEntry.setIds.push(setInfo.setId);
      }
    } else {
      // This case means an ID was in a set's list but not in existingMarkerData.
      // We'll create it with its ID as name and a default hex.
      // This is also where markers defined ONLY in an ID list (and not in existingMarkerData yet) get added.
      mergedMarkersMap.set(id, {
        name: id, // Default name to ID
        hex: '#CCCCCC', // Default hex
        setIds: [setInfo.setId],
      });
    }
  });
});


// Ensure Colorless Blender ('0') is included and has its canonical data and at least one set association
const blenderData = existingMarkerData['0'];
if (blenderData) {
  if (mergedMarkersMap.has('0')) {
    const blenderEntry = mergedMarkersMap.get('0')!;
    blenderEntry.name = blenderData.name; // Ensure correct name
    blenderEntry.hex = blenderData.hex;   // Ensure correct hex
    // Ensure it's associated with a primary set if it somehow lost its associations
    // Or if it wasn't in any of the `setMarkerIdLists` explicitly.
    if (blenderEntry.setIds.length === 0 && honolulu120MarkerIDs.includes('0')) {
       blenderEntry.setIds.push('ohuhu-honolulu-b');
    }
  } else {
    mergedMarkersMap.set('0', {
      name: blenderData.name,
      hex: blenderData.hex,
      setIds: ['ohuhu-honolulu-b'], // Default association if not in any explicit ID list
    });
  }
}


export const INITIAL_MARKERS: Marker[] = Array.from(mergedMarkersMap.values()).map(data => ({
  id: Object.keys(existingMarkerData).find(key => existingMarkerData[key].name === data.name && existingMarkerData[key].hex === data.hex) || data.setIds.join('-') + '-' + data.name, // Fallback key if id not directly on map value
  ...data
}));

// This logic ensures the ID of the marker is correctly set from the map's key
const finalInitialMarkers: Marker[] = [];
mergedMarkersMap.forEach((value, key) => {
  finalInitialMarkers.push({
    id: key,
    name: value.name,
    hex: value.hex,
    setIds: value.setIds,
  });
});

// Replace the previous INITIAL_MARKERS with the correctly keyed one
export const INITIAL_MARKERS_FINAL: Marker[] = finalInitialMarkers;
// For downstream compatibility, let's still export INITIAL_MARKERS as the final list
// but ensure it's the one with proper IDs.
// Re-assign after final processing.
const tempFinalMarkers = finalInitialMarkers; // to avoid direct self-reference if not allowed by linter
export { tempFinalMarkers as INITIAL_MARKERS };


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

