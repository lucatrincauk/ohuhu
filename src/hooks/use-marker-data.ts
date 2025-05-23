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
      const storedMarkers = localStorage.getItem(MARKERS_STORAGE_KEY);
      if (storedMarkers) {
        setMarkers(JSON.parse(storedMarkers));
      } else {
        setMarkers(INITIAL_MARKERS);
        localStorage.setItem(MARKERS_STORAGE_KEY, JSON.stringify(INITIAL_MARKERS));
      }

      const storedSets = localStorage.getItem(SETS_STORAGE_KEY);
      if (storedSets) {
        setMarkerSets(JSON.parse(storedSets));
      } else {
        setMarkerSets(INITIAL_MARKER_SETS);
        localStorage.setItem(SETS_STORAGE_KEY, JSON.stringify(INITIAL_MARKER_SETS));
      }
    } catch (error) {
      console.error("Failed to access localStorage or parse data:", error);
      // Fallback to initial data if localStorage is unavailable or corrupt
      setMarkers(INITIAL_MARKERS);
      setMarkerSets(INITIAL_MARKER_SETS);
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
    // Allow providing an ID, or generate one. For Ohuhu, users likely enter the marker's actual code.
    const markerWithId: Marker = { ...newMarker, id: newMarker.id || `custom-${Date.now()}` };
    setMarkers(prevMarkers => {
      const updatedMarkers = [...prevMarkers, markerWithId];
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

  return {
    markers,
    markerSets,
    addMarker,
    addMarkerSet,
    getMarkerById,
    isInitialized,
    setMarkers // For filtering purposes
  };
}
