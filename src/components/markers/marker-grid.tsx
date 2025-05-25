
import type { Marker } from '@/lib/types';
import { MarkerCard } from './marker-card';

interface MarkerGridProps {
  markers: Marker[];
  onSelectMarkerForShades?: (marker: Marker) => void;
  onEditMarker?: (marker: Marker) => void;
  ownedSetIds?: string[];
}

export function MarkerGrid({ markers, onSelectMarkerForShades, onEditMarker, ownedSetIds }: MarkerGridProps) {
  if (!markers || markers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-box-select mb-4"><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M14 3h1"/><path d="M9 21h1"/><path d="M14 21h1"/><path d="M3 9v1"/><path d="M3 14v1"/><path d="M21 9v1"/><path d="M21 14v1"/></svg>
        <p className="text-lg">No markers found.</p>
        <p className="text-sm">Add some markers to your inventory to see them here or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 p-3 md:p-4">
      {markers.map((marker) => (
        <MarkerCard 
          key={marker.id} 
          marker={marker} 
          onSelectForShades={onSelectMarkerForShades}
          onEditMarker={onEditMarker}
          isOwned={ownedSetIds ? ownedSetIds.includes(marker.setId) : true}
        />
      ))}
    </div>
  );
}
