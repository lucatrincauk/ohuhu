
"use client";

import { useState } from 'react';
import type { MarkerSet } from '@/lib/types';
import { useMarkerData } from '@/hooks/use-marker-data';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Library, Palette, Search, ExternalLink } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ManageSetsPageProps {
  onViewSetActive: (setId: string) => void;
}

export function ManageSetsPage({ onViewSetActive }: ManageSetsPageProps) {
  const { markerSets, ownedSetIds, updateOwnedSetIds, isInitialized, markers: allMarkers } = useMarkerData();
  const [setSearchTerm, setSetSearchTerm] = useState('');

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

  const sortedMarkerSets = [...markerSets].sort((a, b) => a.name.localeCompare(b.name));

  const filteredMarkerSets = sortedMarkerSets.filter(set =>
    set.name.toLowerCase().includes(setSearchTerm.toLowerCase())
  );

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
          <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search sets..."
              value={setSearchTerm}
              onChange={(e) => setSetSearchTerm(e.target.value)}
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-1"> {/* Reduced space-y for denser list */}
          {filteredMarkerSets.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              {markerSets.length === 0 ? "No marker sets are currently defined." : "No sets match your search."}
            </p>
          ) : (
            <ScrollArea className="h-[calc(100vh-280px)] md:h-[calc(100vh-300px)]"> {/* Adjust height as needed */}
              <div className="pr-3 space-y-2">
                {filteredMarkerSets.map(set => {
                  const isSetOwned = ownedSetIds.includes(set.id);
                  let uniqueMissingCount = 0;

                  if (!isSetOwned) {
                    const markersInThisUnownedSet = allMarkers.filter(m => m.setIds.includes(set.id));
                    uniqueMissingCount = markersInThisUnownedSet.filter(m => !allMarkerIdsInOwnedSets.has(m.id)).length;
                  }

                  return (
                    <div
                      key={set.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/10 transition-colors"
                    >
                      <Checkbox
                        id={`set-${set.id}`}
                        checked={isSetOwned}
                        onCheckedChange={(checked) => {
                          handleSetOwnershipChange(set.id, !!checked);
                        }}
                        aria-labelledby={`label-set-${set.id}`}
                        className="mt-1"
                      />
                      <div className="flex-grow cursor-pointer" onClick={() => handleSetOwnershipChange(set.id, !isSetOwned)}>
                        <Label
                          htmlFor={`set-${set.id}`}
                          id={`label-set-${set.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {set.name}
                        </Label>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {!isSetOwned && uniqueMissingCount > 0 && (
                            <span className="text-accent-foreground bg-accent/80 px-1.5 py-0.5 rounded-sm text-[10px] leading-none">
                              (+{uniqueMissingCount} unique to your collection)
                            </span>
                          )}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => onViewSetActive(set.id)}
                        title={`View ${set.name} in palette`}
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View {set.name} in palette</span>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
