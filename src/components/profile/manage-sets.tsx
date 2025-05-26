
"use client";

import type { MarkerSet } from '@/lib/types';
import { useMarkerData } from '@/hooks/use-marker-data';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Library, Palette } from 'lucide-react';

export function ManageSetsPage() {
  const { markerSets, ownedSetIds, updateOwnedSetIds, isInitialized, markers: allMarkers } = useMarkerData();

  if (!isInitialized) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-muted-foreground">
        <Palette className="h-12 w-12 text-primary animate-pulse mb-4" />
        <p>Loading your sets...</p>
      </div>
    );
  }

  const handleSetOwnershipChange = (setId: string, owned: boolean) => {
    let newOwnedSetIds;
    if (owned) {
      newOwnedSetIds = ownedSetIds.includes(setId) ? [...ownedSetIds] : [...ownedSetIds, setId];
    } else {
      newOwnedSetIds = ownedSetIds.filter(id => id !== setId);
    }
    updateOwnedSetIds(newOwnedSetIds);
  };

  const allMarkerIdsInOwnedSets = new Set<string>();
  if (ownedSetIds.length > 0) {
    allMarkers.forEach(marker => {
      if (marker.setIds.some(sid => ownedSetIds.includes(sid))) {
        allMarkerIdsInOwnedSets.add(marker.id);
      }
    });
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Library className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl">My Marker Sets</CardTitle>
          </div>
          <CardDescription>
            Select the Ohuhu marker sets you currently own. Markers from sets you don&apos;t own will be visually indicated in your palette.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {markerSets.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No marker sets are currently defined in the application.</p>
          ) : (
            markerSets.map(set => {
              const totalMarkersInSet = allMarkers.filter(m => m.setIds.includes(set.id)).length;
              const isSetOwned = ownedSetIds.includes(set.id);
              let uniqueMissingCount = 0;

              if (!isSetOwned) {
                const markersInThisUnownedSet = allMarkers.filter(m => m.setIds.includes(set.id));
                uniqueMissingCount = markersInThisUnownedSet.filter(m => !allMarkerIdsInOwnedSets.has(m.id)).length;
              }

              return (
                <div
                  key={set.id}
                  className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
                  onClick={() => handleSetOwnershipChange(set.id, !isSetOwned)}
                  role="checkbox"
                  aria-checked={isSetOwned}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') handleSetOwnershipChange(set.id, !isSetOwned)}}
                >
                  <Checkbox
                    id={`set-${set.id}`}
                    checked={isSetOwned}
                    onCheckedChange={(checked) => {
                      handleSetOwnershipChange(set.id, !!checked);
                    }}
                    aria-labelledby={`label-set-${set.id}`}
                    className="mt-1" // Align checkbox with the first line of text
                  />
                  <div className="flex-grow">
                    <Label
                      htmlFor={`set-${set.id}`}
                      id={`label-set-${set.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {set.name}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Total: {totalMarkersInSet} markers
                      {!isSetOwned && uniqueMissingCount > 0 && (
                        <span className="ml-2 text-accent-foreground bg-accent/80 px-1.5 py-0.5 rounded-sm text-[10px] leading-none">
                          (+{uniqueMissingCount} unique to your collection)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
