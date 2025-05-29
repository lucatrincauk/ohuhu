
"use client";

import type { Marker, MarkerSet } from '@/lib/types';
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { INITIAL_MARKERS, INITIAL_MARKER_SETS } from '@/lib/constants';

const MARKERS_STORAGE_KEY = 'ohuhuHarmony_markers';
const SETS_STORAGE_KEY = 'ohuhuHarmony_markerSets';
const OWNED_SETS_STORAGE_KEY = 'ohuhuHarmony_ownedSetIds';
const FAVORITE_MARKERS_STORAGE_KEY = 'ohuhuHarmony_favoriteMarkerIds';

export interface MarkerDataContextType {
  markers: Marker[];
  markerSets: MarkerSet[];
  ownedSetIds: string[];
  favoriteMarkerIds: string[];
  isInitialized: boolean;
  addMarker: (newMarkerData: { id?: string; name: string; hex: string; setId: string }) => void;
  updateMarker: (markerId: string, updates: Partial<Omit<Marker, 'id' | 'setIds'>>) => void;
  getMarkerById: (id: string) => Marker | undefined;
  addMarkerSet: (newSet: Omit<MarkerSet, 'id'> & { id?: string }) => void;
  updateOwnedSetIds: (newOwnedSetIds: string[]) => void;
  toggleFavoriteMarker: (markerId: string) => void;
}

export const MarkerDataContext = createContext<MarkerDataContextType | undefined>(undefined);

export const MarkerDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [markersState, setMarkersState] = useState<Marker[]>([]);
  const [markerSetsState, setMarkerSetsState] = useState<MarkerSet[]>([]);
  const [ownedSetIdsState, setOwnedSetIdsState] = useState<string[]>([]);
  const [favoriteMarkerIdsState, setFavoriteMarkerIdsState] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      setMarkersState(INITIAL_MARKERS);
      localStorage.setItem(MARKERS_STORAGE_KEY, JSON.stringify(INITIAL_MARKERS));

      setMarkerSetsState(INITIAL_MARKER_SETS);
      localStorage.setItem(SETS_STORAGE_KEY, JSON.stringify(INITIAL_MARKER_SETS));

      const storedOwnedSetIds = localStorage.getItem(OWNED_SETS_STORAGE_KEY);
      if (storedOwnedSetIds) {
        setOwnedSetIdsState(JSON.parse(storedOwnedSetIds));
      } else {
        setOwnedSetIdsState([]);
        localStorage.setItem(OWNED_SETS_STORAGE_KEY, JSON.stringify([]));
      }

      const storedFavoriteMarkerIds = localStorage.getItem(FAVORITE_MARKERS_STORAGE_KEY);
      if (storedFavoriteMarkerIds) {
        setFavoriteMarkerIdsState(JSON.parse(storedFavoriteMarkerIds));
      } else {
        setFavoriteMarkerIdsState([]);
        localStorage.setItem(FAVORITE_MARKERS_STORAGE_KEY, JSON.stringify([]));
      }

    } catch (error) {
      console.error("Failed to access localStorage or initialize data:", error);
      setMarkersState(INITIAL_MARKERS);
      setMarkerSetsState(INITIAL_MARKER_SETS);
      setOwnedSetIdsState([]);
      setFavoriteMarkerIdsState([]);
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

  return (
    <MarkerDataContext.Provider value={{
      markers: markersState,
      markerSets: markerSetsState,
      ownedSetIds: ownedSetIdsState,
      favoriteMarkerIds: favoriteMarkerIdsState,
      isInitialized,
      addMarker,
      updateMarker,
      getMarkerById,
      addMarkerSet,
      updateOwnedSetIds,
      toggleFavoriteMarker,
    }}>
      {children}
    </MarkerDataContext.Provider>
  );
};
