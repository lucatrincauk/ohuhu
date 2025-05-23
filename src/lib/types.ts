export interface Marker {
  id: string; // User-defined ID, e.g., "R12" or a unique number like "101"
  name: string;
  hex: string; // Hex color code, e.g., "#A59AC4"
  setId: string; // ID of the marker set it belongs to
}

export interface MarkerSet {
  id: string; // Unique identifier for the set
  name: string; // Name of the marker set, e.g., "Ohuhu Honolulu B - 216 Colors"
}

export type MarkerInventoryItem = {
  id: string;
  name: string;
  hex: string;
};
