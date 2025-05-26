
import type { Marker, MarkerSet } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ColorSwatch } from '@/components/core/color-swatch';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarkerCardProps {
  marker: Marker;
  markerSets: MarkerSet[];
  onSelectMarkerForShades?: (marker: Marker) => void;
  isOwned?: boolean;
}

export function MarkerCard({ marker, markerSets, onSelectMarkerForShades, isOwned = true }: MarkerCardProps) {
  
  let setNameDisplay = 'Unknown Set';
  if (marker.setIds && marker.setIds.length > 0) {
    if (marker.setIds.length === 1) {
      const set = markerSets.find(s => s.id === marker.setIds[0]);
      setNameDisplay = set ? set.name : 'Unknown Set';
    } else {
      setNameDisplay = 'Multiple Sets';
    }
  }


  return (
    <Card className={cn(
      "flex flex-col overflow-hidden transition-all hover:shadow-lg relative",
      { "opacity-70 border-dashed border-muted-foreground/30": !isOwned }
    )}>
      <CardHeader className="p-0">
        <div
          className="h-20 w-full" 
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
      <CardContent className="flex-grow p-2 space-y-0.5"> 
        <CardTitle className="mb-0.5 text-sm leading-tight">{marker.name}</CardTitle> 
        <p className="text-xs text-muted-foreground">ID: {marker.id}</p>
        <p className="text-xs text-muted-foreground" title={setNameDisplay}>Set: <span className="truncate">{setNameDisplay}</span></p> 
      </CardContent>
      <CardFooter className="p-2 pt-0 flex flex-col space-y-1"> 
        {onSelectMarkerForShades && (
          <Button
            variant="outline"
            size="sm"
            className="w-full h-7 text-xs" 
            onClick={() => onSelectMarkerForShades(marker)}
            aria-label={`Generate shades for ${marker.name}`}
          >
            <Palette className="mr-1.5 h-3.5 w-3.5" /> 
            Shades
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
