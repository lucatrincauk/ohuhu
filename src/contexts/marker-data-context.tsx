
"use client";

import type { Marker, MarkerSet, MarkerPalette } from '@/lib/types';
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { INITIAL_MARKERS, INITIAL_MARKER_SETS } from '@/lib/constants';

const MARKERS_STORAGE_KEY = 'ohuhuHarmony_markers';
const SETS_STORAGE_KEY = 'ohuhuHarmony_markerSets';
const OWNED_SETS_STORAGE_KEY = 'ohuhuHarmony_ownedSetIds';
const FAVORITE_MARKERS_STORAGE_KEY = 'ohuhuHarmony_favoriteMarkerIds';
const MARKER_PALETTES_STORAGE_KEY = 'ohuhuHarmony_markerPalettes';

export interface MarkerDataContextType {
  markers: Marker[];
  markerSets: MarkerSet[];
  ownedSetIds: string[];
  favoriteMarkerIds: string[];
  markerPalettes: MarkerPalette[];
  isInitialized: boolean;
  addMarker: (newMarkerData: { id?: string; name: string; hex: string; setId: string }) => void;
  updateMarker: (markerId: string, updates: Partial<Omit<Marker, 'id' | 'setIds'>>) => void;
  getMarkerById: (id: string) => Marker | undefined;
  addMarkerSet: (newSet: Omit<MarkerSet, 'id'> & { id?: string }) => void;
  updateOwnedSetIds: (newOwnedSetIds: string[]) => void;
  toggleFavoriteMarker: (markerId: string) => void;
  createMarkerPalette: (name: string) => void;
  addMarkerToPalette: (paletteId: string, markerId: string) => void;
  removeMarkerFromPalette: (paletteId: string, markerId: string) => void;
  getPalettesForMarker: (markerId: string) => MarkerPalette[];
  updateMarkerPaletteName: (paletteId: string, newName: string) => void;
  removeMarkerPalette: (paletteId: string) => void;
}

export const MarkerDataContext = createContext<MarkerDataContextType | undefined>(undefined);

export const MarkerDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [markersState, setMarkersState] = useState<Marker[]>([]);
  const [markerSetsState, setMarkerSetsState] = useState<MarkerSet[]>([]);
  const [ownedSetIdsState, setOwnedSetIdsState] = useState<string[]>([]);
  const [favoriteMarkerIdsState, setFavoriteMarkerIdsState] = useState<string[]>([]);
  const [markerPalettesState, setMarkerPalettesState] = useState<MarkerPalette[]>([]);
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

      const storedMarkerPalettes = localStorage.getItem(MARKER_PALETTES_STORAGE_KEY);
      setMarkerPalettesState(storedMarkerPalettes ? JSON.parse(storedMarkerPalettes) : []);

    } catch (error) {
      console.error("Failed to access localStorage or initialize data:", error);
      setMarkersState(INITIAL_MARKERS);
      setMarkerSetsState(INITIAL_MARKER_SETS);
      setOwnedSetIdsState([]);
      setFavoriteMarkerIdsState([]);
      setMarkerPalettesState([]);
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

  const createMarkerPalette = useCallback((name: string) => {
    const newPalette: MarkerPalette = {
      id: `palette-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name,
      markerIds: [],
    };
    setMarkerPalettesState(prevPalettes => {
      const updatedPalettes = [...prevPalettes, newPalette];
      updateLocalStorage(MARKER_PALETTES_STORAGE_KEY, updatedPalettes);
      return updatedPalettes;
    });
  }, [updateLocalStorage]);

  const addMarkerToPalette = useCallback((paletteId: string, markerId: string) => {
    setMarkerPalettesState(prevPalettes => {
      const updatedPalettes = prevPalettes.map(palette => {
        if (palette.id === paletteId) {
          if (!palette.markerIds.includes(markerId)) {
            return { ...palette, markerIds: [...palette.markerIds, markerId] };
          }
        }
        return palette;
      });
      updateLocalStorage(MARKER_PALETTES_STORAGE_KEY, updatedPalettes);
      return updatedPalettes;
    });
  }, [updateLocalStorage]);

  const removeMarkerFromPalette = useCallback((paletteId: string, markerId: string) => {
    setMarkerPalettesState(prevPalettes => {
      const updatedPalettes = prevPalettes.map(palette => {
        if (palette.id === paletteId) {
          return { ...palette, markerIds: palette.markerIds.filter(id => id !== markerId) };
        }
        return palette;
      });
      updateLocalStorage(MARKER_PALETTES_STORAGE_KEY, updatedPalettes);
      return updatedPalettes;
    });
  }, [updateLocalStorage]);
  
  const getPalettesForMarker = useCallback((markerId: string): MarkerPalette[] => {
    return markerPalettesState.filter(palette => palette.markerIds.includes(markerId));
  }, [markerPalettesState]);

  const updateMarkerPaletteName = useCallback((paletteId: string, newName: string) => {
    setMarkerPalettesState(prevPalettes => {
      const updatedPalettes = prevPalettes.map(palette =>
        palette.id === paletteId ? { ...palette, name: newName } : palette
      );
      updateLocalStorage(MARKER_PALETTES_STORAGE_KEY, updatedPalettes);
      return updatedPalettes;
    });
  }, [updateLocalStorage]);

  const removeMarkerPalette = useCallback((paletteId: string) => {
    setMarkerPalettesState(prevPalettes => {
      const updatedPalettes = prevPalettes.filter(palette => palette.id !== paletteId);
      updateLocalStorage(MARKER_PALETTES_STORAGE_KEY, updatedPalettes);
      return updatedPalettes;
    });
  }, [updateLocalStorage]);

  return (
    <MarkerDataContext.Provider value={{
      markers: markersState,
      markerSets: markerSetsState,
      ownedSetIds: ownedSetIdsState,
      favoriteMarkerIds: favoriteMarkerIdsState,
      markerPalettes: markerPalettesState,
      isInitialized,
      addMarker,
      updateMarker,
      getMarkerById,
      addMarkerSet,
      updateOwnedSetIds,
      toggleFavoriteMarker,
      createMarkerPalette,
      addMarkerToPalette,
      removeMarkerFromPalette,
      getPalettesForMarker,
      updateMarkerPaletteName,
      removeMarkerPalette,
    }}>
      {children}
    </MarkerDataContext.Provider>
  );
};

    