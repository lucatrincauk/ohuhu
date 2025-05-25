
"use client";

import { useContext } from 'react';
import { MarkerDataContext, type MarkerDataContextType } from '@/contexts/marker-data-context';

export function useMarkerData(): MarkerDataContextType {
  const context = useContext(MarkerDataContext);
  if (context === undefined) {
    throw new Error('useMarkerData must be used within a MarkerDataProvider');
  }
  return context;
}
