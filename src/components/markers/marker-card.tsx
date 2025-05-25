
import type { Marker, MarkerSet } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ColorSwatch } from '@/components/core/color-swatch';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarkerCardProps {
  marker: Marker;
  markerSets: MarkerSet[]; // Added markerSets prop
  onSelectForShades?: (marker: Marker) => void;
  isOwned?: boolean;
}

export function MarkerCard({ marker, markerSets, onSelectForShades, isOwned = true }: MarkerCardProps) {
  const set = markerSets.find(s => s.id === marker.setId);
  const setName = set ? set.name : 'Unknown Set';

  return (
    <Card className={cn(
      "flex flex-col overflow-hidden transition-all hover:shadow-lg relative",
      { "opacity-70 border-dashed border-muted-foreground/30": !isOwned }
    )}>
      <CardHeader className="p-0">
        <div
          className="h-20 w-full" // Reduced height slightly
          style={{ backgroundColor: marker.hex }}
          aria-label={`Color preview for ${marker.name}`}
        />
        {!isOwned && (
          <div
            className="absolute top-1 right-1 bg-secondary text-secondary-foreground/80 px-1.5 py-0.5 rounded-sm text-[10px] leading-none shadow"
            title="This marker belongs to a set you do not own."
          >
            Not Owned
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow p-2 space-y-0.5"> {/* Reduced padding */}
        <CardTitle className="mb-0.5 text-sm leading-tight">{marker.name}</CardTitle> {/* Reduced font size & margin */}
        <p className="text-xs text-muted-foreground">ID: {marker.id}</p>
        <p className="text-xs text-muted-foreground" title={setName}>Set: <span className="truncate">{setName}</span></p> {/* Added set name */}
      </CardContent>
      <CardFooter className="p-2 pt-0 flex flex-col space-y-1"> {/* Reduced padding & space */}
        {onSelectForShades && (
          <Button
            variant="outline"
            size="sm"
            className="w-full h-7 text-xs" // Reduced height and text size
            onClick={() => onSelectForShades(marker)}
            aria-label={`Generate shades for ${marker.name}`}
          >
            <Palette className="mr-1.5 h-3.5 w-3.5" /> {/* Adjusted icon margin */}
            Shades
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
