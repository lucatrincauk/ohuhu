
import type { Marker, MarkerSet } from './types';

export let INITIAL_MARKER_SETS: MarkerSet[] = [
  { id: 'ohuhu-honolulu-b', name: 'Honolulu 120' },
  { id: 'ohuhu-104', name: 'Honolulu 104' },
  { id: 'ohuhu-midtones-48', name: 'Midtones 48' },
  { id: 'ohuhu-pastels-48', name: 'Pastels 48' },
  { id: 'ohuhu-new-pastels-48', name: 'New Pastels 48' },
  { id: 'ohuhu-grey-tones-36', name: 'Grey Tones 36' },
  { id: 'ohuhu-skin-36', name: 'Skin 36' },
  { id: 'ohuhu-skin-24', name: 'Skin 24' },
  { id: 'ohuhu-honolulu-168', name: 'Honolulu 168'},
  { id: 'ohuhu-honolulu-216', name: 'Honolulu 216'},
  { id: 'ohuhu-honolulu-320', name: 'Honolulu 320'},
  { id: 'ohuhu-pastels-96', name: 'Pastels 96' },
  { id: 'ohuhu-honolulu-72', name: 'Honolulu 72' },
  { id: 'ohuhu-honolulu-48', name: 'Honolulu 48' },
].sort((a, b) => a.name.localeCompare(b.name)); // Sort sets alphabetically by name

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
  'YR5', 'YR33', '120', '0' // Added '0' to ensure it's part of a primary set list
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
  'E440', 'E490', 'CG070', 'BG070', 'YG080', 'RG150', 'MG060', 'GG060', '0'
];

const pastels48MarkerIDs: string[] = [
  'Y030', 'Y120', 'Y230', 'YR030', 'YR070', 'YR110', 'YR240', 'R080',
  'R110', 'R120', 'R250', 'RV030', 'RV160', 'RV180', 'RV260', 'RV280',
  'V020', 'V030', 'V230', 'B030', 'B050', 'B120', 'B220', 'B250',
  'B340', 'G020', 'G120', 'G140', 'G220', 'G340', 'G420', 'E050',
  'E090', 'E210', 'E220', 'E280', 'E380', 'E470', 'CG050', 'CG020',
  'BG050', 'WG050', 'YG040', 'RG030', 'RG110', 'RG120', 'MG020', 'GG020', '0'
];

const newPastels48MarkerIDs: string[] = [
  'Y010', 'BR208', 'RV010', 'R24', 'G030', 'G326', 'GY172', 'CG030', 'Y110', 'R19',
  'RV130', 'R25', 'G050', 'G410', 'GY173', 'CG2', 'Y040', 'R29', 'RV300', 'PB1',
  'G110', 'G8', 'E010', 'GG1', 'Y3', 'R050', 'V150', 'BG3', 'G130', 'GY1',
  'E020', 'WG01', 'YR220', 'R090', 'V322', 'BG4', 'G320', 'GY6', 'E030', 'BGII03',
  'YR4', 'R242', 'V330', 'B110', 'G322', 'GY7', 'CGII00', 'BG9', '0'
];

const greyTones36MarkerIDs: string[] = [
    'WG0.5', 'WG050', 'WG01', 'WG4', 'WG09', 'CGII00', 'BG050', 'BG070', 'CGII04',
    'CGII07', 'CGII09', 'CG020', 'CG2', 'CG030', 'NG03', 'CG5', 'CG070', 'NG09',
    'MG020', 'BGII03', 'MG060', 'BGII05', 'BGII09', 'GG020', 'GG1', 'GG3', 'GG060',
    'GG5', 'GG9', 'YG040', 'YG080', 'YG100', 'RG030', 'RG110', 'RG120', 'RG150', '0'
];

const skin36MarkerIDs: string[] = [
  'Y4', 'Y9', 'Y12', 'Y121', 'Y145', 'YR1', 'YR5', 'YR6', 'YR7', 'YR8', 'YR9',
  'YR10', 'YR20', 'YR34', 'YR91', 'YR92', 'YR95', 'YR107', 'YR148', 'YR205', 'YR209',
  'YR212', 'R18', 'R19', 'R20', 'R21', 'R26', 'R27', 'R28', 'R29', 'R30', 'WG0.5',
  'BR2', 'BR3', 'BR208', '0'
];

const skin24MarkerIDs: string[] = [
  'Y4', 'Y9', 'Y12', 'YR5', 'YR7', 'YR10', 'YR20', 'YR91', 'YR95', 'YR107',
  'Y145', 'YR148', 'YR209', 'R18', 'R19', 'R20', 'R21', 'R26', 'R27', 'R28',
  'R29', 'R30', 'WG0.5', 'BR2', '0'
];

const honolulu168MarkerIDs: string[] = Array.from(new Set([...honolulu120MarkerIDs, ...pastels48MarkerIDs]));
const honolulu216MarkerIDs: string[] = Array.from(new Set([...honolulu168MarkerIDs, ...honoluluMidtones48MarkerIDs]));
const honolulu320MarkerIDs: string[] = Array.from(new Set([...honolulu216MarkerIDs, ...ohuhu104MarkerIDs]));
const pastels96MarkerIDs: string[] = Array.from(new Set([...newPastels48MarkerIDs, ...pastels48MarkerIDs]));

const honolulu72MarkerIDs: string[] = [
  'R1', 'R2', 'R4', 'R5', 'R7', 'R8', 'R9', 'R10',
  'R11', 'R12', 'R13', 'P1', 'P2', 'P3', 'P4', 'P5',
  'PB1', 'PB2', 'PB6', 'PB7', 'PB8', 'PB9', 'PB10', 'Y2',
  'Y3', 'Y4', 'Y5', 'YR1', 'YR2', 'YR3', 'YR4', 'YR5',
  'YR33', 'G1', 'G2', 'G4', 'G5', 'G6', 'G8', 'G9',
  'GY1', 'GY2', 'GY3', 'GY4', 'GY5', 'GY6', 'GY7', 'GY8',
  'B64', 'BR1', 'BR2', 'BR3', 'BG1', 'BG3', 'BG4', 'BG5',
  'GY172', 'GY173', 'RP1', 'RP6', 'GG1', 'GG3', 'GG5', 'WG01',
  'WG3', 'WG4', 'CG2', 'CG5', 'CGII00', 'CGII04', 'CGII07', '120',
  '0'
];

const honolulu48MarkerIDs: string[] = [
  'R1', 'R2', 'R4', 'R5', 'R7', 'R8', 'R9', 'R10', 'R11', 'RP1', 'BR1', 'BR2', 'BR3',
  'P1', 'P2', 'P3', 'P4', 'P5', 'Y2', 'Y3', 'YR1', 'YR2', 'YR3', 'YR4', 'YR5',
  'GY1', 'GY2', 'GY3', 'GY4', 'GY5', 'GY6', 'BG1', 'G1', 'G2', 'G5', 'G8',
  'PB1', 'PB2', 'PB6', 'PB7', 'PB8', 'PB9', 'PB10', 'WG01', 'CGII00', 'CGII04',
  'CGII07', '120', '0'
];


const existingMarkerData: Record<string, { name: string; hex: string }> = {
  // Honolulu 120 Set (and other base colors)
  'Y1': { name: 'Pastel Yellow', hex: '#FFFACD' },
  'Y2': { name: 'Sunflower', hex: '#FFDA03' },
  'Y3': { name: 'Barium Yellow', hex: '#FFF49C' },
  'Y4': { name: 'Quince', hex: '#FCE4A0' },
  'Y5': { name: 'Rouge Orange', hex: '#FCC98A' },
  'Y6': { name: 'Yellow', hex: '#FFED03' },
  'Y7': { name: 'Acid Yellow', hex: '#FFDE85' },
  'Y8': { name: 'Deep Yellow', hex: '#FFCC31' },
  'Y9': { name: 'Yellow Ochre', hex: '#EAB74C' },
  'Y10': { name: 'Apricot', hex: '#FCCA8D' },
  'Y11': { name: 'Brown Grey', hex: '#C5C2A6' },
  'Y12': { name: 'Mahogany', hex: '#C59183' },
  'Y13': { name: 'Chestnut Brown', hex: '#6F524F' },
  'YR1': { name: 'Dark Yellow', hex: '#F1CE7D' },
  'YR2': { name: 'Marigold', hex: '#FCB13F' },
  'YR3': { name: 'Orange', hex: '#FFA503' },
  'YR4': { name: 'Salmon Pink', hex: '#FBDED8' },
  'YR5': { name: 'Terra Cotta', hex: '#E5755E' },
  'YR33': { name: 'Melon Yellow', hex: '#FBC776' },
  'BR1': { name: 'Raw Umber', hex: '#876B4A' },
  'BR2': { name: 'Potato Brown', hex: '#C9A683' },
  'BR3': { name: 'Rose Beige', hex: '#DEC6BB' },
  'R1': { name: 'Coral Pink', hex: '#F7948D' },
  'R2': { name: 'Vermilion', hex: '#F46A2A' },
  'R3': { name: 'Cosmos', hex: '#FF8357' },
  'R4': { name: 'Deep Red', hex: '#9A1C20' },
  'R5': { name: 'Cherry Pink', hex: '#F47182' },
  'R6': { name: 'Vivid Red', hex: '#F35F2C' },
  'R7': { name: 'Old Red', hex: '#A53130' },
  'R8': { name: 'Geranium', hex: '#ED2063' },
  'R9': { name: 'Pastel Rose', hex: '#FFD5E0' },
  'R10': { name: 'Pastel Pink', hex: '#FEF3F7' },
  'R11': { name: 'Mauve Shadow', hex: '#D9B9CB' },
  'R12': { name: 'Rose Buvard', hex: '#E8A5BB' },
  'R13': { name: 'Clematis', hex: '#C680A5' },
  'R14': { name: 'Pale Purple', hex: '#D6BED7' },
  'R15': { name: 'Cerise', hex: '#E13669' },
  'R16': { name: 'Deep Violet', hex: '#9A06D9' },
  'R17': { name: 'Pansy', hex: '#7E449F' },
  'R18': { name: 'Pastel Peach', hex: '#FFDEBD' },
  'R19': { name: 'Barely Beige', hex: '#FEF4ED' },
  'R20': { name: 'Powder Pink', hex: '#FFECE9' },
  'R21': { name: 'Fruit Pink', hex: '#FFDFD9' },
  'R22': { name: 'Dark Blush', hex: '#E37E64' },
  'R23': { name: 'Light Pink', hex: '#FFC5CF' },
  'R24': { name: 'Dark Violet Light', hex: '#D6CFE9' },
  'R25': { name: 'Pale Blue Violet', hex: '#D8E1EF' },
  'P1': { name: 'Vivid Purple', hex: '#9306FF' },
  'P2': { name: 'Light Violet', hex: '#D2A4FF' },
  'P3': { name: 'Pastel Violet', hex: '#DCC3E0' },
  'P4': { name: 'Lavender', hex: '#EAEBFE' },
  'P5': { name: 'Aubergine', hex: '#500687' },
  'RP1': { name: 'Vivid Reddish Purple', hex: '#CA1A8B' },
  'RP6': { name: 'Vivid Pink', hex: '#EF0691' },
  'PB1': { name: 'Sky Blue', hex: '#C9E0EF' },
  'PB2': { name: 'Brilliant Blue', hex: '#579FFF' },
  'PB3': { name: 'Cobalt Blue', hex: '#064CB1' },
  'PB4': { name: 'Napoleon Blue', hex: '#062561' },
  'PB5': { name: 'Prussian Blue', hex: '#063658' },
  'PB6': { name: 'Royal Blue', hex: '#476FE7' },
  'PB7': { name: 'Pastel Blue', hex: '#B2CFD3' },
  'PB8': { name: 'Cerulean Blue', hex: '#3057C4' },
  'PB9': { name: 'Cloud Blue', hex: '#B0E9F1' },
  'PB10': { name: 'Turquoise Green Light', hex: '#B5F1F1' },
  'PB11': { name: 'Marine Blue', hex: '#063472' },
  'B64': { name: 'Indian Blue', hex: '#4776A0' },
  'BG1': { name: 'Turquoise Green', hex: '#06AEA2' },
  'BG2': { name: 'Deep Green', hex: '#06877F' },
  'BG3': { name: 'Blue Grey 3', hex: '#DCE4EC' },
  'BG4': { name: 'Mint Blue', hex: '#DDECEF' },
  'BG5': { name: 'Dolphin Blue', hex: '#93D8D3' },
  'BG6': { name: 'Peacock Green', hex: '#068573' },
  'BG7': { name: 'Forest Green', hex: '#066D3D' },
  'BG8': { name: 'Teal', hex: '#068585' },
  'BG9': { name: 'Pigeon Blue', hex: '#DDE6EB' },
  'BG68': { name: 'Turquoise Blue', hex: '#46E4D4' },
  'G1': { name: 'Emerald Green', hex: '#06A956' },
  'G2': { name: 'Vivid Green', hex: '#91CA46' },
  'G3': { name: 'Ocean Green', hex: '#4DC396' },
  'G4': { name: 'Mint Green Light', hex: '#C5EAB5' },
  'G5': { name: 'Turquoise Ink Blue', hex: '#75CCD5' },
  'G6': { name: 'Dusty Jade Green', hex: '#89C3A6' },
  'G7': { name: 'Chromium Oxide Green', hex: '#6687BA' },
  'G8': { name: 'Glass Green', hex: '#CDE6D3' },
  'G9': { name: 'Meadow Green', hex: '#8ABF62' },
  'GY1': { name: 'Pale Green', hex: '#E6F0DA' },
  'GY2': { name: 'Grass Green', hex: '#CADEAE' },
  'GY3': { name: 'Bud Green', hex: '#BEE180' },
  'GY4': { name: 'Yellow Green', hex: '#D4E47F' },
  'GY5': { name: 'Absinthe', hex: '#C6DB35' },
  'GY6': { name: 'Anise', hex: '#F6F8DA' },
  'GY7': { name: 'Sugarcane', hex: '#F4F8DF' },
  'GY8': { name: 'Petits Pois', hex: '#B8CC88' },
  'GY42': { name: 'Bronze Green', hex: '#75873D' },
  'GY43': { name: 'Deep Olive Green', hex: '#5A7035' },
  'GY172': { name: 'Spectrum Green', hex: '#C1E6A0' },
  'GY173': { name: 'Dim Green', hex: '#E9EBDC' },
  'CGII00': { name: 'Cool Grey II 0', hex: '#F2F3F4' },
  'CGII04': { name: 'Cool Grey II 4', hex: '#C6C6C6' },
  'CGII07': { name: 'Cool Grey II 7', hex: '#919191' },
  'CGII08': { name: 'Cool Grey II 8', hex: '#7C7C7C' },
  'CGII09': { name: 'Cool Grey II 9', hex: '#686868' },
  'CG2': { name: 'Cool Grey II 2', hex: '#EDEEF0' },
  'CG5': { name: 'Cool Grey II 5', hex: '#ADADAD' },
  'GG1': { name: 'Green Grey 1', hex: '#EAECE8' },
  'GG3': { name: 'Green Grey 3', hex: '#BEC6BF' },
  'GG5': { name: 'Green Grey 5', hex: '#A0AAA0' },
  'GG9': { name: 'Green Grey 9', hex: '#607063' },
  'WG01': { name: 'Warm Grey 1', hex: '#F1F1F0' },
  'WG3': { name: 'Warm Grey 3', hex: '#D7D7D7' },
  'WG4': { name: 'Warm Grey 4', hex: '#C4C4C4' },
  'WG09': { name: 'Warm Grey 9', hex: '#6D6D6D' },
  'BGII03': { name: 'Blue Grey II 3', hex: '#DFE6EC' },
  'BGII05': { name: 'Blue Grey II 5', hex: '#C0CACE' },
  'BGII09': { name: 'Blue Grey II 9', hex: '#606D78' },
  'NG03': { name: 'Neutral Grey 3', hex: '#D4D4D4' },
  'NG06': { name: 'Neutral Grey 6', hex: '#A0A0A0' },
  'NG07': { name: 'Neutral Grey 7', hex: '#8C8C8C' },
  'NG09': { name: 'Neutral Grey 9', hex: '#636363' },
  '120': { name: 'Black', hex: '#0A0A0A' },
  '0': { name: 'Colorless Blender', hex: '#FFFFFF' },

  // Ohuhu 104 Set
  'Y010': { name: 'Primrose', hex: '#FEF4E4' },
  'Y121': { name: 'Light Primrose', hex: '#FFFAE7' },
  'Y040': { name: 'Calamansi', hex: '#FDF9CE' },
  'Y070': { name: 'Acid Yellow', hex: '#FFF606' },
  'Y080': { name: 'Lightning Yellow', hex: '#FFEF06' },
  'Y110': { name: 'Grayish Yellow', hex: '#FAF4D4' },
  'Y130': { name: 'Mustard', hex: '#FFE05F' },
  'Y140': { name: 'Nugget', hex: '#ECBA3F' },
  'Y180': { name: 'Shallow Orange Cafe', hex: '#E4AD59' },
  'Y210': { name: 'Deep Teak', hex: '#B18B5F' },
  'Y250': { name: 'Flax', hex: '#F0E088' },
  'YR090': { name: 'Peach Pie', hex: '#FED8BC' },
  'YR172': { name: 'Tiger Lily', hex: '#F29F5F' },
  'YR180': { name: 'Lipstick Orange', hex: '#F39053' },
  'YR220': { name: 'Yellowish Shade', hex: '#FCF3E5' },
  'R29': { name: 'Pear Color', hex: '#FCECEB' },
  'R050': { name: 'Chocolate Pink', hex: '#F5DBDA' },
  'R070': { name: 'Agate', hex: '#DD8882' },
  'R150': { name: 'Zinnober', hex: '#EB6374' },
  'R170': { name: 'Lipstick Red', hex: '#E80631' },
  'R180': { name: 'Bright Red', hex: '#F24453' },
  'R190': { name: 'Bougainvillaea', hex: '#EC6288' },
  'R230': { name: 'Strong Red', hex: '#DB3F52' },
  'R240': { name: 'Garnet', hex: '#A22F35' },
  'R242': { name: 'Grayish Cherry', hex: '#F0E3E6' },
  'R270': { name: 'Baby Blossoms', hex: '#F9CFCE' },
  'R282': { name: 'Colocasia Torino', hex: '#BC837E' },
  'R284': { name: 'Clove', hex: '#9E635E' },
  'R290': { name: 'Cardinal', hex: '#C8223F' },
  'R340': { name: 'Argyle Purple', hex: '#7F5063' },
  'R350': { name: 'Dark Purple Grey', hex: '#61545D' },
  'RV010': { name: 'Water Lily', hex: '#F7EAEF' },
  'RV100': { name: 'Red Onion', hex: '#A46381' },
  'RV130': { name: 'Queen Pink', hex: '#F9DAE6' },
  'RV240': { name: 'Bronze Purple', hex: '#987389' },
  'RV250': { name: 'Peony', hex: '#E9AECA' },
  'RV300': { name: 'Tender Pink', hex: '#F7D4DD' },
  'RV330': { name: 'Strawberry Pink', hex: '#EC7DA5' },
  'RV350': { name: 'Crimson', hex: '#DF1841' },
  'V050': { name: 'Pearl Violet', hex: '#E0D0E9' },
  'V070': { name: 'Eggplant Purple', hex: '#664656' },
  'V080': { name: 'Dark Violet', hex: '#5C4162' },
  'V150': { name: 'Mallow', hex: '#E5D7E9' },
  'V210': { name: 'Signal Violet', hex: '#8E639F' },
  'V320': { name: 'Gentian Violet', hex: '#6E528E' },
  'V322': { name: 'Rain Flower Purple', hex: '#E4DEEE' },
  'V330': { name: 'Prune', hex: '#E0D9E9' },
  'V340': { name: 'Lavender Blue', hex: '#9A7FB9' },
  'V390': { name: 'Dark Slate Blue', hex: '#504390' },
  'V450': { name: 'Dark Lavender', hex: '#78559A' },
  'B080': { name: 'Process Blue', hex: '#8DD4F2' },
  'B090': { name: 'Pebble Blue', hex: '#A5B9D0' },
  'B110': { name: 'Crystal Blue', hex: '#D6E9EF' },
  'B180': { name: 'Vienna Blue', hex: '#345D98' },
  'B190': { name: 'Ultramarine', hex: '#180E93' },
  'B270': { name: 'Vivid Blue', hex: '#0683FF' },
  'B440': { name: 'Cyanine Blue', hex: '#3057C4' },
  'G030': { name: 'Crescent Yellow', hex: '#F1F8DB' },
  'G050': { name: 'Celadon Green', hex: '#DFEEDA' },
  'G080': { name: 'Limeade', hex: '#C0E685' },
  'G110': { name: 'Mignonette', hex: '#EDF6DE' },
  'G130': { name: 'Acid Green', hex: '#DCEBC5' },
  'G260': { name: 'Apple Green', hex: '#91BA06' },
  'G270': { name: 'Moss', hex: '#93C093' },
  'G300': { name: 'Dark Olive', hex: '#5A7035' },
  'G320': { name: 'Jade Green', hex: '#DFEDEA' },
  'G322': { name: 'Pale Aqua Mint', hex: '#D8EBE7' },
  'G324': { name: 'Aqua Blue', hex: '#B1DFE9' },
  'G326': { name: 'Bright Blue', hex: '#ADDDE0' },
  'G330': { name: 'Mineral Green', hex: '#87A387' },
  'G390': { name: 'Green', hex: '#068506' },
  'G410': { name: 'Light Holly Green', hex: '#D6E7DD' },
  'G470': { name: 'Pine Tree Green', hex: '#077E74' },
  'G490': { name: 'Viridian', hex: '#468772' },
  'G500': { name: 'Peacock Blue', hex: '#06A4B4' },
  'BR208': { name: 'Black Brown', hex: '#F2E4D3' },
  'E010': { name: 'Pale Fruit Pink', hex: '#FDEEE8' },
  'E020': { name: 'Cotton Pearl', hex: '#FBECE6' },
  'E030': { name: 'Pink Flamingo', hex: '#FBE0DD' },
  'E080': { name: 'Praline', hex: '#C59375' },
  'E120': { name: 'Reddish Brass', hex: '#B4915D' },
  'E130': { name: 'Copper', hex: '#BC7839' },
  'E160': { name: 'Soft Sun', hex: '#FEF3B8' },
  'E260': { name: 'Leather', hex: '#9A761C' },
  'E370': { name: 'Light Walnut', hex: '#B89E82' },
  'E430': { name: 'Pecan', hex: '#4E2B16' },
  'E432': { name: 'Vert Celadon', hex: '#83B49E' },
  'E434': { name: 'Dragon Well Tea', hex: '#A4AC8D' },
  'E450': { name: 'Fennel Seed', hex: '#BEAD8E' },
  'E460': { name: 'Military Olive', hex: '#7C8A6F' },
  'CG030': { name: 'Neutral Grey 03', hex: '#EBEEEC' },
  'BG060': { name: 'Deep Cool Grey', hex: '#9096B0' },
  'WG070': { name: 'Warm Grey 07', hex: '#8C8C8C' },
  'WG090': { name: 'Warm Grey 09', hex: '#696969' }, // This WG09 is darker than Honolulu's WG09. Kept distinct.
  'WG130': { name: 'Warm Grey 13', hex: '#585858' },
  'RG050': { name: 'Red Grey 05', hex: '#ACA0A1' },
  'RG080': { name: 'Red Grey 08', hex: '#8F8283' },
  'MG030': { name: 'Blue Grey 03', hex: '#B4BCCB' },
  'MG100': { name: 'Blue Grey 09', hex: '#656D7C' },
  'GG040': { name: 'Light Jade Green Grey', hex: '#B6C2B9' },
  'GG110': { name: 'Toner Grey', hex: '#8E8D80' },
  'FY010': { name: 'Fluorescent Yellow', hex: '#F1FB06' },
  'FY020': { name: 'Fluorescent Orange', hex: '#FFC306' },
  'FY030': { name: 'Fluorescent Red', hex: '#FF0655' },
  'FY050': { name: 'Fluorescent Violet', hex: '#C019FF' },

  // Midtones 48 Set
  'Y050': { name: 'Summer Lemon', hex: '#FEFBDC' },
  'Y260': { name: 'Yellow Dahlia', hex: '#FEF8D2' },
  'Y270': { name: 'Pale Ocre', hex: '#FCF4E4' },
  'YR170': { name: 'Chrome Orange', hex: '#FFAA2A' },
  'YR190': { name: 'Cadmium Orange', hex: '#FF9222' },
  'YR250': { name: 'Moccasin', hex: '#FEEABF' },
  'YR260': { name: 'Yellowish Brown', hex: '#F9E2BF' },
  'R160': { name: 'Cadmium Red', hex: '#E95360' },
  'R200': { name: 'Coralessence', hex: '#FC8578' },
  'R280': { name: 'Currant', hex: '#9E2E38' },
  'RV070': { name: 'Sakura Pink', hex: '#FEC5D1' },
  'RV080': { name: 'Bright Pink', hex: '#FF3990' },
  'RV200': { name: 'Dark Orchid', hex: '#A34CD7' },
  'RV270': { name: 'Shadow Pink', hex: '#F1D9F0' },
  'RV320': { name: 'Apricot Pink', hex: '#FEDFC9' },
  'V060': { name: 'Amethyst', hex: '#A775D5' },
  'V160': { name: 'Deep Lilac', hex: '#D2B1D7' },
  'V250': { name: 'Light lavender', hex: '#E4CBE4' },
  'V270': { name: 'Lobelia', hex: '#7343AF' },
  'V370': { name: 'Blue Bell', hex: '#AFAFDB' },
  'B070': { name: 'Tahitian Blue', hex: '#39FFFF' },
  'B140': { name: 'Aquamarine', hex: '#8FFFEB' },
  'B260': { name: 'Smoky Blue', hex: '#8497A8' },
  'B290': { name: 'Antwerp Blue', hex: '#2E4A77' },
  'B350': { name: 'Cornflower Blue', hex: '#72A2EF' },
  'B380': { name: 'Capri Blue', hex: '#39C8FF' },
  'G060': { name: 'Celery Yellow', hex: '#E8FFCF' },
  'G070': { name: 'Lemon Green', hex: '#B7FF50' },
  'G170': { name: 'May Green', hex: '#5BBC5E' },
  'G190': { name: 'Olive Green', hex: '#89892F' },
  'G240': { name: 'Beige Green', hex: '#C6C07B' },
  'G360': { name: 'Pond Green', hex: '#2F8989' },
  'G440': { name: 'Leaf Green', hex: '#99F299' },
  'E060': { name: 'Light Mahogany', hex: '#C95F2F' },
  'E110': { name: 'Dark Suntan', hex: '#DBBF95' },
  'E170': { name: 'Caribe Cocoa', hex: '#A96B43' },
  'E240': { name: 'Chamois', hex: '#F4EC9A' },
  'E300': { name: 'Clay', hex: '#B8A999' },
  'E310': { name: 'Dark Brown', hex: '#6E5C41' },
  'E400': { name: 'Cocoa Brown', hex: '#9F642F' },
  'E440': { name: 'Khaki', hex: '#CCB99A' },
  'E490': { name: 'Deep Orange', hex: '#FF602F' },
  'CG070': { name: 'Neutral Grey 07', hex: '#8C8C8C' },
  'BG070': { name: 'Cool Grey 07', hex: '#B4BCCA' },
  'YG080': { name: 'Yellow Grey 08', hex: '#C7C7C2' },
  'RG150': { name: 'Red Grey 150', hex: '#B9A9A9' },
  'MG060': { name: 'Blue Grey 06', hex: '#A9B1B9' },
  'GG060': { name: 'Green Grey 06', hex: '#B1B9A9' },

  // Pastels 48 Set
  'Y030': { name: 'Lemon Chiffon', hex: '#FFFDD6' },
  'Y120': { name: 'Buttercup Yellow', hex: '#FFFEDA' },
  'Y230': { name: 'Deep Cream', hex: '#FEFCE1' },
  'YR030': { name: 'Carmine Red', hex: '#FFE0CA' },
  'YR070': { name: 'Light Orange', hex: '#FFEBCE' },
  'YR110': { name: 'Mellow Peach', hex: '#FFE2BF' },
  'YR240': { name: 'Cream', hex: '#FFFEDA' },
  'R080': { name: 'Pale Cherry Pink', hex: '#FFCACF' },
  'R110': { name: 'Sardonyx', hex: '#FEDAE0' },
  'R120': { name: 'Light Prawn', hex: '#FFC1CA' },
  'R250': { name: 'Antique Fuchsia', hex: '#EFEEFC' },
  'RV030': { name: 'Light Hot Pink', hex: '#FFBBE1' },
  'RV160': { name: 'Thistle', hex: '#E0C8E1' },
  'RV180': { name: 'Hollyhock', hex: '#FFCEEA' },
  'RV260': { name: 'Pink', hex: '#FFE1F0' },
  'RV280': { name: 'Light Pink', hex: '#FFE9F6' },
  'V020': { name: 'Pale Lilac', hex: '#EFECFA' },
  'V030': { name: 'Mauve', hex: '#E0C8E1' },
  'V230': { name: 'Viola', hex: '#D5D5FF' },
  'B030': { name: 'Frost Blue', hex: '#E9FFFF' },
  'B050': { name: 'Robin\'s Egg Blue', hex: '#B8F7F7' },
  'B120': { name: 'Pale Blue', hex: '#B6DFEF' },
  'B220': { name: 'Pale Grayish Blue', hex: '#B9CDE2' },
  'B250': { name: 'Light Blue', hex: '#C9E8FF' },
  'B340': { name: 'Lavender Mist', hex: '#EFEEFC' },
  'G020': { name: 'Pale Lemon Yellow', hex: '#F9FFFA' },
  'G120': { name: 'Yellowish Green', hex: '#D9F9CE' },
  'G140': { name: 'Horseradish', hex: '#CAFFCA' },
  'G220': { name: 'Lime Green', hex: '#E9FEE9' },
  'G340': { name: 'Horizon Green', hex: '#B9E9EF' },
  'G420': { name: 'Green Shadow', hex: '#D2EFE7' },
  'E050': { name: 'Lipstick Natural', hex: '#FFE0DF' },
  'E090': { name: 'Eggshell White', hex: '#FBF9EF' },
  'E210': { name: 'Brick Beige', hex: '#F9F2DC' },
  'E220': { name: 'Sand', hex: '#F8F6D4' },
  'E280': { name: 'Sand White', hex: '#FCFBF5' },
  'E380': { name: 'Ash Rose', hex: '#E9E1DA' },
  'E470': { name: 'Tea Rose', hex: '#FDD0BF' },
  'CG050': { name: 'Neutral Grey 05', hex: '#DCDCDC' },
  'CG020': { name: 'Neutral Grey 02', hex: '#F1F1F1' },
  'BG050': { name: 'Cool Grey 05', hex: '#CFD9E4' },
  'WG050': { name: 'Warm Grey 05', hex: '#E3E3E3' },
  'YG040': { name: 'Yellow Grey 04', hex: '#E9E9DA' },
  'RG030': { name: 'Red Grey 03', hex: '#E9E0E0' },
  'RG110': { name: 'Red Grey 11', hex: '#F0E9E9' },
  'RG120': { name: 'Red Grey 12', hex: '#F1EBEC' },
  'MG020': { name: 'Blue Grey 02', hex: '#E6EDF0' },
  'GG020': { name: 'Green Grey 02', hex: '#E6F0E6' },

  // New Pastels 48 (Blossoming)
  'R090': { name: 'Rose Mist', hex: '#F7A6A6' },

  // Grey Tones 36
  'WG0.5': { name: 'Warm Grey 0.5', hex: '#F7F5F1' },
  'YG100': { name: 'Yellow Grey 100', hex: '#C3C3AD' },

  // Skin Tones 36
  'Y145': { name: 'Buttercup Yellow', hex: '#FDEFC2' },
  'YR6': { name: 'Primary Yellow', hex: '#FEF074' },
  'YR7': { name: 'Cadmium Yellow', hex: '#FAE490' },
  'YR8': { name: 'Salmon', hex: '#FBAE93' },
  'YR9': { name: 'Yellow Ochre', hex: '#EAB74C' }, // YR9 also in Honolulu 120. This version used if skin tone is loaded later.
  'YR10': { name: 'Brun', hex: '#D78260' },
  'YR20': { name: 'Morin', hex: '#FCE5BC' },
  'YR34': { name: 'Yellow', hex: '#FCE9A0' },
  'YR91': { name: 'Natural Oak', hex: '#B1744F' },
  'YR92': { name: 'Chocolate', hex: '#B79075' },
  'YR95': { name: 'Burnt Sienna', hex: '#B37255' },
  'YR107': { name: 'Reddish Yellow', hex: '#EFD0A5' },
  'YR148': { name: 'Thin Persimmon', hex: '#FADBC8' },
  'YR205': { name: 'Powdery Orange', hex: '#FED0B5' },
  'YR209': { name: 'Hazelnuts', hex: '#FBEDDA' },
  'YR212': { name: 'Milk White', hex: '#FFFBF2' },
  'R26': { name: 'Honey', hex: '#FAD7C0' },
  'R27': { name: 'Pale Mauve', hex: '#EFBFB5' },
  'R28': { name: 'Colocasia Tonoimo', hex: '#D8B3B2' },
  'R30': { name: 'Pale Cherry Pink', hex: '#FEEBEF' },
};


const setMarkerIdLists: { setId: string, ids: string[] }[] = [
  { setId: 'ohuhu-honolulu-b', ids: honolulu120MarkerIDs },
  { setId: 'ohuhu-104', ids: ohuhu104MarkerIDs },
  { setId: 'ohuhu-midtones-48', ids: honoluluMidtones48MarkerIDs },
  { setId: 'ohuhu-pastels-48', ids: pastels48MarkerIDs },
  { setId: 'ohuhu-new-pastels-48', ids: newPastels48MarkerIDs },
  { setId: 'ohuhu-grey-tones-36', ids: greyTones36MarkerIDs },
  { setId: 'ohuhu-skin-36', ids: skin36MarkerIDs },
  { setId: 'ohuhu-skin-24', ids: skin24MarkerIDs },
  { setId: 'ohuhu-honolulu-168', ids: honolulu168MarkerIDs },
  { setId: 'ohuhu-honolulu-216', ids: honolulu216MarkerIDs },
  { setId: 'ohuhu-honolulu-320', ids: honolulu320MarkerIDs },
  { setId: 'ohuhu-pastels-96', ids: pastels96MarkerIDs },
  { setId: 'ohuhu-honolulu-72', ids: honolulu72MarkerIDs },
  { setId: 'ohuhu-honolulu-48', ids: honolulu48MarkerIDs },
];

const mergedMarkersMap = new Map<string, { name: string; hex: string; setIds: string[] }>();

// Step 1: Populate with existingMarkerData, ensuring names/hexes are set.
// Marker IDs from set lists that aren't in existingMarkerData will get default name/hex.
const allUniqueMarkerIdsFromSets = new Set<string>();
setMarkerIdLists.forEach(setInfo => {
  setInfo.ids.forEach(id => allUniqueMarkerIdsFromSets.add(id));
});

allUniqueMarkerIdsFromSets.forEach(id => {
  const data = existingMarkerData[id];
  mergedMarkersMap.set(id, {
    name: data ? data.name : id, // Use ID as name if not in existingMarkerData
    hex: data ? data.hex : '#CCCCCC', // Default hex if not in existingMarkerData
    setIds: [],
  });
});

// If '0' wasn't in any set list but is in existingMarkerData, ensure it's in the map.
if (!mergedMarkersMap.has('0') && existingMarkerData['0']) {
  mergedMarkersMap.set('0', {
    name: existingMarkerData['0'].name,
    hex: existingMarkerData['0'].hex,
    setIds: [],
  });
}


// Step 2: Iterate through each set list and populate the setIds array.
setMarkerIdLists.forEach(setInfo => {
  setInfo.ids.forEach(id => {
    const markerEntry = mergedMarkersMap.get(id);
    if (markerEntry) { // Should always be true due to Step 1
      if (!markerEntry.setIds.includes(setInfo.setId)) {
        markerEntry.setIds.push(setInfo.setId);
      }
    }
    // If a marker ID was in a set list but NOT in existingMarkerData, it was added in Step 1 with default name/hex.
  });
});


const finalInitialMarkers: Marker[] = [];
mergedMarkersMap.forEach((value, key) => {
  finalInitialMarkers.push({
    id: key,
    name: value.name,
    hex: value.hex,
    setIds: value.setIds.length > 0 ? [...new Set(value.setIds)] : [],
  });
});

const tempFinalMarkers = finalInitialMarkers;
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
