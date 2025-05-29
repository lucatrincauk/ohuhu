
"use client";

import type { Marker, MarkerSet, MarkerPalette } from '@/lib/types'; // Changed MarkerGroup to MarkerPalette
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { INITIAL_MARKERS, INITIAL_MARKER_SETS } from '@/lib/constants';

const MARKERS_STORAGE_KEY = 'ohuhuHarmony_markers';
const SETS_STORAGE_KEY = 'ohuhuHarmony_markerSets';
const OWNED_SETS_STORAGE_KEY = 'ohuhuHarmony_ownedSetIds';
const FAVORITE_MARKERS_STORAGE_KEY = 'ohuhuHarmony_favoriteMarkerIds';
const MARKER_PALETTES_STORAGE_KEY = 'ohuhuHarmony_markerPalettes'; // Renamed from MARKER_GROUPS_STORAGE_KEY

export interface MarkerDataContextType {
  markers: Marker[];
  markerSets: MarkerSet[];
  ownedSetIds: string[];
  favoriteMarkerIds: string[];
  markerPalettes: MarkerPalette[]; // Renamed from markerGroups
  isInitialized: boolean;
  addMarker: (newMarkerData: { id?: string; name: string; hex: string; setId: string }) => void;
  updateMarker: (markerId: string, updates: Partial<Omit<Marker, 'id' | 'setIds'>>) => void;
  getMarkerById: (id: string) => Marker | undefined;
  addMarkerSet: (newSet: Omit<MarkerSet, 'id'> & { id?: string }) => void;
  updateOwnedSetIds: (newOwnedSetIds: string[]) => void;
  toggleFavoriteMarker: (markerId: string) => void;
  createMarkerPalette: (name: string) => void; // Renamed from createMarkerGroup
  addMarkerToPalette: (paletteId: string, markerId: string) => void; // Renamed from addMarkerToGroup
  removeMarkerFromPalette: (paletteId: string, markerId: string) => void; // Renamed from removeMarkerFromGroup
  getPalettesForMarker: (markerId: string) => MarkerPalette[]; // Renamed from getGroupsForMarker
}

export const MarkerDataContext = createContext<MarkerDataContextType | undefined>(undefined);

export const MarkerDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [markersState, setMarkersState] = useState<Marker[]>([]);
  const [markerSetsState, setMarkerSetsState] = useState<MarkerSet[]>([]);
  const [ownedSetIdsState, setOwnedSetIdsState] = useState<string[]>([]);
  const [favoriteMarkerIdsState, setFavoriteMarkerIdsState] = useState<string[]>([]);
  const [markerPalettesState, setMarkerPalettesState] = useState<MarkerPalette[]>([]); // Renamed from markerGroupsState
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      setMarkersState(INITIAL_MARKERS);
      localStorage.setItem(MARKERS_STORAGE_KEY, JSON.stringify(INITIAL_MARKERS));

      setMarkerSetsState(INITIAL_MARKER_SETS);
      localStorage.setItem(SETS_STORAGE_KEY, JSON.stringify(INITIAL_MARKER_SETS));

      const storedOwnedSetIds = localStorage.getItem(OWNED_SETS_STORAGE_KEY);
      setOwnedSetIdsState(storedOwnedSetIds ? JSON.parse(storedOwnedSetIds) : []);

      const storedFavoriteMarkerIds = localStorage.getItem(FAVORITE_MARKERS_STORAGE_KEY);
      setFavoriteMarkerIdsState(storedFavoriteMarkerIds ? JSON.parse(storedFavoriteMarkerIds) : []);

      const storedMarkerPalettes = localStorage.getItem(MARKER_PALETTES_STORAGE_KEY); // Renamed
      setMarkerPalettesState(storedMarkerPalettes ? JSON.parse(storedMarkerPalettes) : []); // Renamed

    } catch (error) {
      console.error("Failed to access localStorage or initialize data:", error);
      setMarkersState(INITIAL_MARKERS);
      setMarkerSetsState(INITIAL_MARKER_SETS);
      setOwnedSetIdsState([]);
      setFavoriteMarkerIdsState([]);
      setMarkerPalettesState([]); // Renamed
    }
    setIsInitialized(true);
  }, []);

  const updateLocalStorage = useCallback((key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to update localStorage:", error);
    }
  }, []);

  const addMarker = useCallback((newMarkerData: { id?: string; name: string; hex: string; setId: string }) => {
    const markerWithIdAndSetIds: Marker = {
      id: newMarkerData.id || `custom-${Date.now()}`,
      name: newMarkerData.name,
      hex: newMarkerData.hex,
      setIds: [newMarkerData.setId],
    };
    setMarkersState(prevMarkers => {
      const updatedMarkers = [...prevMarkers, markerWithIdAndSetIds];
      updateLocalStorage(MARKERS_STORAGE_KEY, updatedMarkers);
      return updatedMarkers;
    });
  }, [updateLocalStorage]);

  const updateMarker = useCallback((markerId: string, updates: Partial<Omit<Marker, 'id' | 'setIds'>>) => {
    setMarkersState(prevMarkers => {
      const updatedMarkers = prevMarkers.map(marker =>
        marker.id === markerId ? { ...marker, ...updates } : marker
      );
      updateLocalStorage(MARKERS_STORAGE_KEY, updatedMarkers);
      return updatedMarkers;
    });
  }, [updateLocalStorage]);

  const getMarkerById = useCallback((id: string): Marker | undefined => {
    return markersState.find(marker => marker.id === id);
  }, [markersState]);

  const addMarkerSet = useCallback((newSet: Omit<MarkerSet, 'id'> & { id?: string }) => {
    const setWithId: MarkerSet = { ...newSet, id: newSet.id || `set-${Date.now()}` };
    setMarkerSetsState(prevSets => {
      const updatedSets = [...prevSets, setWithId];
      updateLocalStorage(SETS_STORAGE_KEY, updatedSets);
      return updatedSets;
    });
  }, [updateLocalStorage]);

  const updateOwnedSetIds = useCallback((newOwnedSetIds: string[]) => {
    setOwnedSetIdsState(newOwnedSetIds);
    updateLocalStorage(OWNED_SETS_STORAGE_KEY, newOwnedSetIds);
  }, [updateLocalStorage]);

  const toggleFavoriteMarker = useCallback((markerId: string) => {
    setFavoriteMarkerIdsState(prevFavorites => {
      const isFavorited = prevFavorites.includes(markerId);
      let updatedFavorites;
      if (isFavorited) {
        updatedFavorites = prevFavorites.filter(id => id !== markerId);
      } else {
        updatedFavorites = [...prevFavorites, markerId];
      }
      updateLocalStorage(FAVORITE_MARKERS_STORAGE_KEY, updatedFavorites);
      return updatedFavorites;
    });
  }, [updateLocalStorage]);

  const createMarkerPalette = useCallback((name: string) => { // Renamed from createMarkerGroup
    const newPalette: MarkerPalette = { // Renamed from newGroup
      id: `palette-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, // Renamed from group-
      name,
      markerIds: [],
    };
    setMarkerPalettesState(prevPalettes => { // Renamed from prevGroups
      const updatedPalettes = [...prevPalettes, newPalette]; // Renamed
      updateLocalStorage(MARKER_PALETTES_STORAGE_KEY, updatedPalettes); // Renamed
      return updatedPalettes;
    });
  }, [updateLocalStorage]);

  const addMarkerToPalette = useCallback((paletteId: string, markerId: string) => { // Renamed from addMarkerToGroup
    setMarkerPalettesState(prevPalettes => { // Renamed
      const updatedPalettes = prevPalettes.map(palette => { // Renamed
        if (palette.id === paletteId) {
          if (!palette.markerIds.includes(markerId)) {
            return { ...palette, markerIds: [...palette.markerIds, markerId] };
          }
        }
        return palette;
      });
      updateLocalStorage(MARKER_PALETTES_STORAGE_KEY, updatedPalettes); // Renamed
      return updatedPalettes;
    });
  }, [updateLocalStorage]);

  const removeMarkerFromPalette = useCallback((paletteId: string, markerId: string) => { // Renamed from removeMarkerFromGroup
    setMarkerPalettesState(prevPalettes => { // Renamed
      const updatedPalettes = prevPalettes.map(palette => { // Renamed
        if (palette.id === paletteId) {
          return { ...palette, markerIds: palette.markerIds.filter(id => id !== markerId) };
        }
        return palette;
      });
      updateLocalStorage(MARKER_PALETTES_STORAGE_KEY, updatedPalettes); // Renamed
      return updatedPalettes;
    });
  }, [updateLocalStorage]);
  
  const getPalettesForMarker = useCallback((markerId: string): MarkerPalette[] => { // Renamed from getGroupsForMarker
    return markerPalettesState.filter(palette => palette.markerIds.includes(markerId)); // Renamed
  }, [markerPalettesState]); // Renamed

  return (
    <MarkerDataContext.Provider value={{
      markers: markersState,
      markerSets: markerSetsState,
      ownedSetIds: ownedSetIdsState,
      favoriteMarkerIds: favoriteMarkerIdsState,
      markerPalettes: markerPalettesState, // Renamed
      isInitialized,
      addMarker,
      updateMarker,
      getMarkerById,
      addMarkerSet,
      updateOwnedSetIds,
      toggleFavoriteMarker,
      createMarkerPalette, // Renamed
      addMarkerToPalette, // Renamed
      removeMarkerFromPalette, // Renamed
      getPalettesForMarker, // Renamed
    }}>
      {children}
    </MarkerDataContext.Provider>
  );
};
