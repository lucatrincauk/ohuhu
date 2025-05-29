
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Compass, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const belongingSetNames = marker.setIds
    .map(id => markerSets.find(s => s.id === id)?.name)
    .filter(Boolean as unknown as (value: string | undefined) => value is string)
    .join(', ');

  const handleExploreClick = () => {
    onExplore(marker);
    // onClose will be called by onExplore if navigation happens
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div 
          className="w-full h-64 md:h-80"
          style={{ backgroundColor: marker.hex }}
          aria-label={`Full color preview for ${marker.name}`}
        />
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold">{marker.name}</DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground">{marker.id}</DialogDescription>
        </DialogHeader>
        
        <div className="px-6 pb-4 space-y-3">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Sets:</h4>
            {belongingSetNames ? (
              <p className="text-sm text-muted-foreground">{belongingSetNames}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">Not part of any defined sets.</p>
            )}
          </div>
        </div>

        <DialogFooter className="p-6 pt-0 border-t">
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
