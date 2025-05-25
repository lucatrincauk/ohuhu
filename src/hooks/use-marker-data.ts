
"use client";

import type { Marker, MarkerSet } from '@/lib/types';
import { INITIAL_MARKERS, INITIAL_MARKER_SETS } from '@/lib/constants';
import { useState, useEffect, useCallback } from 'react';

const MARKERS_STORAGE_KEY = 'ohuhuHarmony_markers';
const SETS_STORAGE_KEY = 'ohuhuHarmony_markerSets';
const OWNED_SETS_STORAGE_KEY = 'ohuhuHarmony_ownedSetIds';

export function useMarkerData() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [markerSets, setMarkerSets] = useState<MarkerSet[]>([]);
  const [ownedSetIds, setOwnedSetIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      setMarkers(INITIAL_MARKERS);
      localStorage.setItem(MARKERS_STORAGE_KEY, JSON.stringify(INITIAL_MARKERS));

      setMarkerSets(INITIAL_MARKER_SETS);
      localStorage.setItem(SETS_STORAGE_KEY, JSON.stringify(INITIAL_MARKER_SETS));

      const storedOwnedSetIds = localStorage.getItem(OWNED_SETS_STORAGE_KEY);
      if (storedOwnedSetIds) {
        setOwnedSetIds(JSON.parse(storedOwnedSetIds));
      } else {
        setOwnedSetIds([]); // Default to owning no sets
        localStorage.setItem(OWNED_SETS_STORAGE_KEY, JSON.stringify([]));
      }

    } catch (error) {
      console.error("Failed to access localStorage or initialize data:", error);
      setMarkers(INITIAL_MARKERS);
      setMarkerSets(INITIAL_MARKER_SETS);
      setOwnedSetIds([]);
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

  const addMarker = useCallback((newMarker: Omit<Marker, 'id'> & { id?: string }) => {
    const markerWithId: Marker = { ...newMarker, id: newMarker.id || `custom-${Date.now()}` };
    setMarkers(prevMarkers => {
      const updatedMarkers = [...prevMarkers, markerWithId];
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
      updateLocalStorage(SETS_STORAGE_KEY, updatedSets);
      return updatedSets;
    });
  }, [updateLocalStorage]);

  const updateOwnedSetIds = useCallback((newOwnedSetIds: string[]) => {
    setOwnedSetIds(newOwnedSetIds);
    updateLocalStorage(OWNED_SETS_STORAGE_KEY, newOwnedSetIds);
  }, [updateLocalStorage]);

  return {
    markers,
    markerSets,
    addMarker,
    addMarkerSet,
    updateMarker,
    getMarkerById,
    isInitialized,
    setMarkers, // For filtering purposes
    ownedSetIds,
    updateOwnedSetIds,
  };
}
