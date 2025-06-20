
import type { Marker, MarkerSet } from '@/lib/types';
import { MarkerCard } from './marker-card';

interface MarkerGridProps {
  markers: Marker[];
  markerSets: MarkerSet[];
  onMarkerCardClick?: (marker: Marker) => void;
  ownedSetIds?: string[];
  favoriteMarkerIds?: string[];
  onToggleFavorite?: (markerId: string) => void;
}

export function MarkerGrid({ markers, markerSets, onMarkerCardClick, ownedSetIds, favoriteMarkerIds, onToggleFavorite }: MarkerGridProps) {
  if (!markers || markers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-box-select mb-4"><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M14 3h1"/><path d="M9 21h1"/><path d="M14 21h1"/><path d="M3 9v1"/><path d="M3 14v1"/><path d="M21 9v1"/><path d="M21 14v1"/></svg>
        <p className="text-lg">No markers found.</p>
        <p className="text-sm">Add some markers to your inventory to see them here or adjust your filters.</p>
      </div>
    );
  }

  const currentOwnedSetIds = ownedSetIds || [];
  const currentFavoriteMarkerIds = favoriteMarkerIds || [];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 p-2 md:p-3">
      {markers.map((marker) => (
        <MarkerCard
          key={marker.id}
          marker={marker}
          markerSets={markerSets}
          onCardClick={onMarkerCardClick}
          isOwned={marker.setIds.some(sid => currentOwnedSetIds.includes(sid))}
          isFavorite={currentFavoriteMarkerIds.includes(marker.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
