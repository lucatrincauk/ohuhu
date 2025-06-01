
import type { Marker, MarkerSet } from './types';
import { existingMarkerData } from './marker-definitions';

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
