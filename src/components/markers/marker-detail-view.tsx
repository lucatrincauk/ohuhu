
"use client";

import type { Marker, MarkerSet } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Compass } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MarkerDetailViewProps {
  marker: Marker | null;
  markerSets: MarkerSet[];
  isOpen: boolean;
  onClose: () => void;
  onExplore: (marker: Marker) => void;
}

export function MarkerDetailView({ marker, markerSets, isOpen, onClose, onExplore }: MarkerDetailViewProps) {
  if (!marker) {
    return null;
  }

  const belongingSets = marker.setIds
    .map(id => markerSets.find(s => s.id === id))
    .filter(Boolean as unknown as (value: MarkerSet | undefined) => value is MarkerSet);

  const handleExploreClick = () => {
    onExplore(marker);
    // onClose will be called by onExplore if navigation happens (e.g., page change)
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 flex flex-col max-h-[85vh]">
        <div
          className="w-full h-48 md:h-64 shrink-0"
          style={{ backgroundColor: marker.hex }}
          aria-label={`Full color preview for ${marker.name}`}
        />

        <ScrollArea className="flex-1 p-6">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-2xl font-bold">{marker.name}</DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground">{marker.id}</DialogDescription>
          </DialogHeader>

          <div className="pt-4 pb-4 space-y-3"> {/* Adjusted padding for scroll area */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Sets:</h4>
              {belongingSets.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {belongingSets.map(set => (
                    <Badge key={set.id} variant="secondary">{set.name}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">Not part of any defined sets.</p>
              )}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 pt-4 border-t shrink-0 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2">
          <Button variant="outline" onClick={handleExploreClick} className="w-full sm:w-auto">
            <Compass className="mr-2 h-4 w-4" />
            Explore in Color Explorer
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full sm:w-auto mt-2 sm:mt-0">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
