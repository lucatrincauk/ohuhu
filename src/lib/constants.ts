
import type { Marker, MarkerSet } from './types';

export const INITIAL_MARKER_SETS: MarkerSet[] = [
  { id: 'ohuhu-honolulu-b', name: 'Ohuhu Honolulu 120 Set' },
  { id: 'ohuhu-104', name: 'Ohuhu 104 Set' },
  { id: 'ohuhu-midtones-48', name: 'Honolulu Midtones 48' },
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

// User-provided list of 104 marker IDs for the Ohuhu 104 Set
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

// Honolulu Midtones 48 Set IDs
const honoluluMidtones48MarkerIDs: string[] = [
  'Y050', 'Y260', 'Y270', 'YR170', 'YR190', 'YR250', 'YR260', 'R160', 'R200', 'R280',
  'RV070', 'RV080', 'RV200', 'RV270', 'RV320', 'V060', 'V160', 'V250', 'V270', 'V370',
  'B070', 'B140', 'B260', 'B290', 'B350', 'B380', 'G060', 'G070', 'G170', 'G190',
  'G240', 'G360', 'G440', 'E060', 'E110', 'E170', 'E240', 'E300', 'E310', 'E400',
  'E440', 'E490', 'CG070', 'BG070', 'YG080', 'RG150', 'MG060', 'GG060'
  // Note: '0' Colorless Blender is part of this set in the image, but we use one shared '0' marker.
];


// Data for known marker IDs to pull existing names/hex when IDs match.
// Honolulu data takes precedence for shared IDs.
const existingMarkerData: Record<string, { name: string; hex: string }> = {
  // Honolulu 120 + Blender (Names & Hex from image)
  'Y1': { name: 'Pastel Yellow', hex: '#FEF9CC' },
  'Y2': { name: 'Sunflower', hex: '#FFDA00' },
  'Y3': { name: 'Barium Yellow', hex: '#FDEE6C' },
  'Y4': { name: 'Quince', hex: '#FCD975' },
  'Y5': { name: 'Rouge Orange', hex: '#F47A4A' },
  'Y6': { name: 'Lemon Yellow', hex: '#FFF200' },
  'Y7': { name: 'Dull Yellow', hex: '#FFE080' },
  'Y8': { name: 'Olive Yellow', hex: '#CEC62C' },
  'Y9': { name: 'Yellow Ochre', hex: '#E8B349' }, // Corrected spelling
  'Y10': { name: 'Apricot', hex: '#FCC98A' },
  'Y11': { name: 'Brown Grey', hex: '#C1BBA0' },
  'Y12': { name: 'Mahogany', hex: '#8F5C3A' },
  'Y13': { name: 'Chestnut Brown', hex: '#7A4F31' },
  'YR1': { name: 'Dark Yellow', hex: '#FFBF00' },
  'YR2': { name: 'Marigold', hex: '#FCAE3A' },
  'YR3': { name: 'Orange', hex: '#FFA500' },
  'YR4': { name: 'Salmon Pink', hex: '#FF8C69' },
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
  'R12': { name: 'Rose Buvard', hex: '#E5A0B6' }, // Bouvard
  'R13': { name: 'Clematis', hex: '#C27BA0' },
  'R14': { name: 'Pale Purple', hex: '#D2B9D3' },
  'R15': { name: 'Cerise', hex: '#DE3163' },
  'R17': { name: 'Pansy', hex: '#7A3E9A' }, // R16 in 120 set is different
  'R18': { name: 'Pastel Peach', hex: '#FFDAB9' },
  'R19': { name: 'Barely Beige', hex: '#FFF0E1' },
  'R21': { name: 'Fruit Pink', hex: '#FFB6C1' },
  'R22': { name: 'Dark Blush', hex: '#E07A5F' },
  'R23': { name: 'Rose Pink', hex: '#FFC0CB' },
  'R24': { name: 'Dark Violet Light', hex: '#9C87B6' },
  'R25': { name: 'Pale Blue Violet', hex: '#C2BBE2' },
  'P1': { name: 'Vivid Purple', hex: '#8F00FF' },
  'P2': { name: 'Light Violet', hex: '#CF9FFF' },
  'P3': { name: 'Pastel Violet', hex: '#D8BFD8' },
  'P4': { name: 'Lavender', hex: '#E6E6FA' },
  'P5': { name: 'Aubergine', hex: '#4B0082' },
  'RP1': { name: 'Vivid Reddish Purple', hex: '#C71585' },
  'RP6': { name: 'Vivid Pink', hex: '#EC008C' },
  'PB1': { name: 'Sky Blue', hex: '#87CEEB' },
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
  'BG3': { name: 'Blue Grey3', hex: '#9BAAAE' },
  'BG4': { name: 'Mint Blue', hex: '#A2DCE2' },
  'BG5': { name: 'Dolphin Blue', hex: '#8FD4CF' },
  'BG6': { name: 'Peacock Green', hex: '#00806E' },
  'BG7': { name: 'Forest Green', hex: '#006837' },
  'BG8': { name: 'Teal', hex: '#008080' },
  'BG9': { name: 'Pigeon Blue', hex: '#6C8E9A' },
  'BG68': { name: 'Turquoise Blue', hex: '#40E0D0' },
  'G1': { name: 'Emerald Green', hex: '#00A651' },
  'G2': { name: 'Vivid Green', hex: '#8DC63F' },
  'G3': { name: 'Ocean Green', hex: '#48BF91' },
  'G4': { name: 'Mint Green Light', hex: '#C0E6B0' },
  'G5': { name: 'Turquoise Ink Blue', hex: '#70CAD1' }, // Honolulu 120 set
  'G6': { name: 'Dusty Jade Green', hex: '#85BFA1' }, // Honolulu 120 set
  'G7': { name: 'Chromium Oxide Green', hex: '#6082B6' }, // Honolulu 120 set
  'G8': { name: 'Glass Green', hex: '#8EBDA2' }, // Honolulu 120 set
  'G9': { name: 'Meadow Green', hex: '#86B85C' }, // Honolulu 120 set
  'GY1': { name: 'Pale Green', hex: '#D4E6B5' },
  'GY3': { name: 'Bud Green', hex: '#BADD78' },
  'GY4': { name: 'Yellow Green', hex: '#D0E07A' },
  'GY5': { name: 'Absinthe', hex: '#C2D72F' },
  'GY6': { name: 'Anise', hex: '#CDDC39' },
  'GY7': { name: 'Sugarcane', hex: '#E9F0C9' },
  'GY42': { name: 'Bronze Green', hex: '#708238' },
  'GY172': { name: 'Spectrum Green', hex: '#A8B820' },
  'GY173': { name: 'Dim Green', hex: '#A0A888' },
  'CGII00': { name: 'Cool Grey II 0', hex: '#F5F5F5' },
  'CGII04': { name: 'Cool Grey II 4', hex: '#C2C2C2' },
  'CGII07': { name: 'Cool Grey II 7', hex: '#8D8D8D' },
  'CGII08': { name: 'Cool Grey II 8', hex: '#787878' },
  'CGII09': { name: 'Cool Grey II 9', hex: '#646464' },
  'CG2': { name: 'Cool Grey 2', hex: '#D9D9D9' },
  'CG5': { name: 'Cool Grey 5', hex: '#A9A9A9' },
  'GG1': { name: 'Green Grey 1', hex: '#DDE2DB' },
  'GG3': { name: 'Green Grey 3', hex: '#BCC2BB' },
  'GG5': { name: 'Green Grey 5', hex: '#9CA99A' },
  'GG9': { name: 'Green Grey 9', hex: '#5A6B5D' },
  'WG01': { name: 'Warm Grey 1', hex: '#F0F0F0' },
  'WG3': { name: 'Warm Grey 3', hex: '#D3D3D3' },
  'WG4': { name: 'Warm Grey 4', hex: '#C0C0C0' },
  'WG09': { name: 'Warm Grey 9', hex: '#696969' },
  'BGII03': { name: 'Blue Grey II 3', hex: '#D8E0E6' },
  'BGII05': { name: 'Blue Grey II 5', hex: '#BCC6CF' },
  'BGII09': { name: 'Blue Grey II 9', hex: '#5A6874' },
  'NG03': { name: 'Neutral Grey 3', hex: '#D0D0D0' },
  'NG06': { name: 'Neutral Grey 6', hex: '#9C9C9C' },
  'NG07': { name: 'Neutral Grey 7', hex: '#888888' },
  'NG09': { name: 'Neutral Grey 9', hex: '#5F5F5F' },
  '120': { name: 'Black', hex: '#000000' },
  '0': { name: 'Colorless Blender', hex: '#FFFFFF' },

  // Ohuhu 104 Set names based on image
  'Y010': { name: 'Primrose', hex: '#FDF4A5' },
  'Y121': { name: 'Primrose', hex: '#FDF4A5' },
  'Y040': { name: 'Calamansi', hex: '#F9EC8F' },
  'Y070': { name: 'Acid Yellow', hex: '#FFF200' },
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
  'R29': { name: 'Pear color', hex: '#F0A8AE' }, // 104 set
  'R050': { name: 'Chocolate Pink', hex: '#E5A09A' },
  'R070': { name: 'Agate', hex: '#D9837D' },
  'R150': { name: 'Zinnober', hex: '#E95E6F' },
  'R170': { name: 'Lipstick Red', hex: '#E4002B' },
  // 'R180' from 104 set: { name: 'Bright Red', hex: '#F03E4D' }, // R180 is YR190 in Midtones
  'R190': { name: 'Bougainvillaea', hex: '#E85C83' },
  'R230': { name: 'Strong Red', hex: '#D93A4C' },
  'R240': { name: 'Garnet', hex: '#9E2B2F' },
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
  'V150': { name: 'Mallow', hex: '#C8A2C8' },
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
  'B190': { name: 'Ultramarine', hex: '#120A8F' },
  'B270': { name: 'Vivid Blue', hex: '#007FFF' },
  'B440': { name: 'Cyanine Blue', hex: '#2A52BE' },
  'G030': { name: 'Crescent Yellow', hex: '#E0E69C' },
  'G050': { name: 'Celadon Green', hex: '#ACE1AF' }, // Honolulu 104 set
  'G080': { name: 'Limeade', hex: '#BCE27F' },
  'G110': { name: 'Mignonette', hex: '#D6E69C' },
  'G130': { name: 'Acid Green', hex: '#B0BF1A' },
  'G260': { name: 'Apple Green', hex: '#8DB600' },
  'G270': { name: 'Moss', hex: '#8FBC8F' },
  'G300': { name: 'Dark Olive', hex: '#556B2F' },
  'G320': { name: 'Jade Green', hex: '#00A86B' },
  'G322': { name: 'Pale Aqua Mint', hex: '#BEE5D3' },
  'G324': { name: 'Aqua Blue', hex: '#ADD8E6' },
  'G326': { name: 'Bright Blue', hex: '#0096FF' },
  'G330': { name: 'Mineral Green', hex: '#829F82' },
  'G390': { name: 'Green', hex: '#008000' },
  'G410': { name: 'Light Holly Green', hex: '#98BF64' },
  'G470': { name: 'Pine Tree Green', hex: '#01796F' },
  'G490': { name: 'Viridian', hex: '#40826D' },
  'G500': { name: 'Peacock Blue', hex: '#00A0B0' },
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
  'E434': { name: 'Dragon Well Tea', hex: '#A0A888' },
  'E450': { name: 'Fennel Seed', hex: '#BBA989' },
  'E460': { name: 'Military Olive', hex: '#78866B' },
  'CG030': { name: 'Neutral Grey 03', hex: '#D0D0D0' },
  'BG060': { name: 'Deep Cool Grey', hex: '#8C92AC' },
  'WG070': { name: 'Warm Grey 07', hex: '#8C8C8C' },
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

  // Honolulu Midtones 48 Set
  'Y050': { name: 'Summer Lemon', hex: '#FFFACD' },
  'Y260': { name: 'Yellow Dahlia', hex: '#FFF8DC' },
  'Y270': { name: 'Pale Ocre', hex: '#FAF0E6' }, // Corrected spelling
  'YR170': { name: 'Chrome Orange', hex: '#FFA500' },
  'YR190': { name: 'Cadmium Orange', hex: '#FF8C00' },
  'YR250': { name: 'Moccasin', hex: '#FFE4B5' },
  'YR260': { name: 'Yellowish Brown', hex: '#F5DEB3' },
  'R160': { name: 'Cadmium Red', hex: '#E32636' }, // Midtones set specific
  'R200': { name: 'Coralessence', hex: '#FF7F50' },
  'R280': { name: 'Currant', hex: '#960018' },
  'RV070': { name: 'Sakura Pink', hex: '#FFB7C5' },
  'RV080': { name: 'Bright Pink', hex: '#FF007F' },
  'RV200': { name: 'Dark Orchid', hex: '#9932CC' }, // Corrected spelling
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
  'E400': { name: 'Cocoa Brown', hex: '#964B00' }, // Adjusted Cocoa Brown
  'E440': { name: 'Khaki', hex: '#C3B091' },
  'E490': { name: 'Deep Orange', hex: '#FF4500' }, // OrangeRed for Deep Orange
  'CG070': { name: 'Neutral Grey 070', hex: '#808080' },
  'BG070': { name: 'Cool Grey 07', hex: '#708090' }, // Adjusted Cool Grey
  'YG080': { name: 'Yellow Grey 08', hex: '#BEBEBE' },
  'RG150': { name: 'Red Grey 150', hex: '#B0A0A0' },
  'MG060': { name: 'Blue Grey 060', hex: '#A0A8B0' },
  'GG060': { name: 'Green Grey 06', hex: '#A8B0A0' },
};

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

const honoluluMidtones48Markers: Marker[] = honoluluMidtones48MarkerIDs.map(id => {
  const effectiveId = idMapping[id] || id;
  const knownData = existingMarkerData[effectiveId];

  if (knownData) {
    return { id, name: knownData.name, hex: knownData.hex, setId: 'ohuhu-midtones-48' };
  } else {
    // This fallback indicates missing data in existingMarkerData for this set
    return { id, name: id, hex: '#CCCCCC', setId: 'ohuhu-midtones-48' };
  }
});


let allMarkers: Marker[] = [
  ...honolulu120SetMarkers,
  ...ohuhu104SetMarkers,
  ...honoluluMidtones48Markers,
];

// Add Colorless Blender if it exists in existingMarkerData and isn't already added
// The blender '0' is universal, but we only want one instance in INITIAL_MARKERS.
// It's already included in honolulu120SetMarkers if '0' is in honolulu120MarkerIDs.
// Let's ensure it's there based on the master list.
const blenderData = existingMarkerData['0'];
if (blenderData) {
  const blenderMarker: Marker = {
    id: '0',
    name: blenderData.name,
    hex: blenderData.hex,
    // Assign to a primary set, or make it neutral if sets don't claim it
    setId: 'ohuhu-honolulu-b'
  };
  // Avoid duplicating if '0' was already processed through one of the set ID lists
  if (!allMarkers.find(m => m.id === '0')) {
    allMarkers.push(blenderMarker);
  } else {
    // Ensure the existing '0' marker has the correct data
    allMarkers = allMarkers.map(m => m.id === '0' ? { ...blenderMarker, setId: m.setId } : m);
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
