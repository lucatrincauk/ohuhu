
"use client";

import type { MarkerSet } from '@/lib/types';
import { useMarkerData } from '@/hooks/use-marker-data';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Library, Palette } from 'lucide-react'; // Changed UserCog to Library

export function ManageSetsPage() {
  const { markerSets, ownedSetIds, updateOwnedSetIds, isInitialized } = useMarkerData();

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
      // Add if not already present
      newOwnedSetIds = ownedSetIds.includes(setId) ? [...ownedSetIds] : [...ownedSetIds, setId];
    } else {
      // Remove
      newOwnedSetIds = ownedSetIds.filter(id => id !== setId);
    }
    updateOwnedSetIds(newOwnedSetIds);
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Library className="h-7 w-7 text-primary" /> {/* Changed UserCog to Library */}
            <CardTitle className="text-2xl">My Marker Sets</CardTitle> {/* Changed title */}
          </div>
          <CardDescription>
            Select the Ohuhu marker sets you currently own. Markers from sets you don&apos;t own will be visually indicated in your palette.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {markerSets.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No marker sets are currently defined in the application.</p>
          ) : (
            markerSets.map(set => (
              <div
                key={set.id}
                className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
                onClick={() => handleSetOwnershipChange(set.id, !ownedSetIds.includes(set.id))}
                role="checkbox"
                aria-checked={ownedSetIds.includes(set.id)}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') handleSetOwnershipChange(set.id, !ownedSetIds.includes(set.id))}}
              >
                <Checkbox
                  id={`set-${set.id}`}
                  checked={ownedSetIds.includes(set.id)}
                  onCheckedChange={(checked) => { // This will still work, but the div click is more encompassing
                    handleSetOwnershipChange(set.id, !!checked);
                  }}
                  aria-labelledby={`label-set-${set.id}`}
                />
                <Label
                  htmlFor={`set-${set.id}`}
                  id={`label-set-${set.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-grow cursor-pointer"
                >
                  {set.name}
                </Label>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
