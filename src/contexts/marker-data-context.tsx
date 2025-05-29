
"use client";

import type { Marker, MarkerSet, MarkerGroup } from '@/lib/types';
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { INITIAL_MARKERS, INITIAL_MARKER_SETS } from '@/lib/constants';

const MARKERS_STORAGE_KEY = 'ohuhuHarmony_markers';
const SETS_STORAGE_KEY = 'ohuhuHarmony_markerSets';
const OWNED_SETS_STORAGE_KEY = 'ohuhuHarmony_ownedSetIds';
const FAVORITE_MARKERS_STORAGE_KEY = 'ohuhuHarmony_favoriteMarkerIds';
const MARKER_GROUPS_STORAGE_KEY = 'ohuhuHarmony_markerGroups';

export interface MarkerDataContextType {
  markers: Marker[];
  markerSets: MarkerSet[];
  ownedSetIds: string[];
  favoriteMarkerIds: string[];
  markerGroups: MarkerGroup[];
  isInitialized: boolean;
  addMarker: (newMarkerData: { id?: string; name: string; hex: string; setId: string }) => void;
  updateMarker: (markerId: string, updates: Partial<Omit<Marker, 'id' | 'setIds'>>) => void;
  getMarkerById: (id: string) => Marker | undefined;
  addMarkerSet: (newSet: Omit<MarkerSet, 'id'> & { id?: string }) => void;
  updateOwnedSetIds: (newOwnedSetIds: string[]) => void;
  toggleFavoriteMarker: (markerId: string) => void;
  createMarkerGroup: (name: string) => void;
  addMarkerToGroup: (groupId: string, markerId: string) => void;
  removeMarkerFromGroup: (groupId: string, markerId: string) => void;
  getGroupsForMarker: (markerId: string) => MarkerGroup[];
}

export const MarkerDataContext = createContext<MarkerDataContextType | undefined>(undefined);

export const MarkerDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [markersState, setMarkersState] = useState<Marker[]>([]);
  const [markerSetsState, setMarkerSetsState] = useState<MarkerSet[]>([]);
  const [ownedSetIdsState, setOwnedSetIdsState] = useState<string[]>([]);
  const [favoriteMarkerIdsState, setFavoriteMarkerIdsState] = useState<string[]>([]);
  const [markerGroupsState, setMarkerGroupsState] = useState<MarkerGroup[]>([]);
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

      const storedMarkerGroups = localStorage.getItem(MARKER_GROUPS_STORAGE_KEY);
      setMarkerGroupsState(storedMarkerGroups ? JSON.parse(storedMarkerGroups) : []);

    } catch (error) {
      console.error("Failed to access localStorage or initialize data:", error);
      // Fallback to defaults if localStorage fails
      setMarkersState(INITIAL_MARKERS);
      setMarkerSetsState(INITIAL_MARKER_SETS);
      setOwnedSetIdsState([]);
      setFavoriteMarkerIdsState([]);
      setMarkerGroupsState([]);
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

  const createMarkerGroup = useCallback((name: string) => {
    const newGroup: MarkerGroup = {
      id: `group-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name,
      markerIds: [],
    };
    setMarkerGroupsState(prevGroups => {
      const updatedGroups = [...prevGroups, newGroup];
      updateLocalStorage(MARKER_GROUPS_STORAGE_KEY, updatedGroups);
      return updatedGroups;
    });
  }, [updateLocalStorage]);

  const addMarkerToGroup = useCallback((groupId: string, markerId: string) => {
    setMarkerGroupsState(prevGroups => {
      const updatedGroups = prevGroups.map(group => {
        if (group.id === groupId) {
          if (!group.markerIds.includes(markerId)) {
            return { ...group, markerIds: [...group.markerIds, markerId] };
          }
        }
        return group;
      });
      updateLocalStorage(MARKER_GROUPS_STORAGE_KEY, updatedGroups);
      return updatedGroups;
    });
  }, [updateLocalStorage]);

  const removeMarkerFromGroup = useCallback((groupId: string, markerId: string) => {
    setMarkerGroupsState(prevGroups => {
      const updatedGroups = prevGroups.map(group => {
        if (group.id === groupId) {
          return { ...group, markerIds: group.markerIds.filter(id => id !== markerId) };
        }
        return group;
      });
      updateLocalStorage(MARKER_GROUPS_STORAGE_KEY, updatedGroups);
      return updatedGroups;
    });
  }, [updateLocalStorage]);
  
  const getGroupsForMarker = useCallback((markerId: string): MarkerGroup[] => {
    return markerGroupsState.filter(group => group.markerIds.includes(markerId));
  }, [markerGroupsState]);

  return (
    <MarkerDataContext.Provider value={{
      markers: markersState,
      markerSets: markerSetsState,
      ownedSetIds: ownedSetIdsState,
      favoriteMarkerIds: favoriteMarkerIdsState,
      markerGroups: markerGroupsState,
      isInitialized,
      addMarker,
      updateMarker,
      getMarkerById,
      addMarkerSet,
      updateOwnedSetIds,
      toggleFavoriteMarker,
      createMarkerGroup,
      addMarkerToGroup,
      removeMarkerFromGroup,
      getGroupsForMarker,
    }}>
      {children}
    </MarkerDataContext.Provider>
  );
};
