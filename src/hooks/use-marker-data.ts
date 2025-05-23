
"use client";

import type { Marker, MarkerSet } from '@/lib/types';
import { INITIAL_MARKERS, INITIAL_MARKER_SETS } from '@/lib/constants';
import { useState, useEffect, useCallback } from 'react';

const MARKERS_STORAGE_KEY = 'ohuhuHarmony_markers';
const SETS_STORAGE_KEY = 'ohuhuHarmony_markerSets';

export function useMarkerData() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [markerSets, setMarkerSets] = useState<MarkerSet[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      // Always initialize from constants to ensure the latest code changes are reflected.
      // This will overwrite any existing markers in local storage with the ones from constants.ts.
      setMarkers(INITIAL_MARKERS);
      localStorage.setItem(MARKERS_STORAGE_KEY, JSON.stringify(INITIAL_MARKERS));

      // Do the same for marker sets for consistency.
      setMarkerSets(INITIAL_MARKER_SETS);
      localStorage.setItem(SETS_STORAGE_KEY, JSON.stringify(INITIAL_MARKER_SETS));
    } catch (error) {
      console.error("Failed to access localStorage or write initial data:", error);
      // Fallback if localStorage operations fail, though setMarkers/setMarkerSets should still populate state.
      setMarkers(INITIAL_MARKERS);
      setMarkerSets(INITIAL_MARKER_SETS);
    }
    setIsInitialized(true);
  }, []); // Empty dependency array ensures this runs once on mount after initial render.

  const updateLocalStorage = useCallback((key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to update localStorage:", error);
    }
  }, []);

  const addMarker = useCallback((newMarker: Omit<Marker, 'id'> & { id?: string }) => {
    const markerWithId: Marker = { ...newMarker, id: newMarker.id || `custom-${Date.now()}` };
    setMarkers(prevMarkers => {
      const updatedMarkers = [...prevMarkers, markerWithId];
      // Markers added during the session will be saved to local storage,
      // but will be overwritten by INITIAL_MARKERS on the next full app load due to the useEffect logic.
      updateLocalStorage(MARKERS_STORAGE_KEY, updatedMarkers);
      return updatedMarkers;
    });
  }, [updateLocalStorage]);
  
  const updateMarker = useCallback((markerId: string, updates: Partial<Omit<Marker, 'id'>>) => {
    setMarkers(prevMarkers => {
      const updatedMarkers = prevMarkers.map(marker =>
        marker.id === markerId ? { ...marker, ...updates } : marker
      );
      updateLocalStorage(MARKERS_STORAGE_KEY, updatedMarkers);
      return updatedMarkers;
    });
  }, [updateLocalStorage]);

  const getMarkerById = useCallback((id: string): Marker | undefined => {
    return markers.find(marker => marker.id === id);
  }, [markers]);

  const addMarkerSet = useCallback((newSet: Omit<MarkerSet, 'id'> & { id?: string }) => {
    const setWithId: MarkerSet = { ...newSet, id: newSet.id || `set-${Date.now()}` };
    setMarkerSets(prevSets => {
      const updatedSets = [...prevSets, setWithId];
      // Similar to addMarker, changes to sets will be session-specific.
      updateLocalStorage(SETS_STORAGE_KEY, updatedSets);
      return updatedSets;
    });
  }, [updateLocalStorage]);

  return {
    markers,
    markerSets,
    addMarker,
    addMarkerSet,
    updateMarker,
    getMarkerById,
    isInitialized,
    setMarkers // For filtering purposes
  };
}
