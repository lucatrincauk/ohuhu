
import type { Marker } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ColorSwatch } from '@/components/core/color-swatch';
import { Button } from '@/components/ui/button';
import { Palette, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarkerCardProps {
  marker: Marker;
  onSelectForShades?: (marker: Marker) => void;
  onEditMarker?: (marker: Marker) => void;
  isOwned?: boolean;
}

export function MarkerCard({ marker, onSelectForShades, onEditMarker, isOwned = true }: MarkerCardProps) {
  return (
    <Card className={cn(
      "flex flex-col overflow-hidden transition-all hover:shadow-lg relative",
      { "opacity-70 border-dashed border-muted-foreground/30": !isOwned }
    )}>
      <CardHeader className="p-0">
        <div
          className="h-24 w-full"
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
      <CardContent className="flex-grow p-3">
        <CardTitle className="mb-1 text-base">{marker.name}</CardTitle>
        <p className="text-xs text-muted-foreground">ID: {marker.id}</p>
        <p className="text-xs text-muted-foreground">HEX: {marker.hex.toUpperCase()}</p>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex flex-col space-y-2">
        {onSelectForShades && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onSelectForShades(marker)}
            aria-label={`Generate shades for ${marker.name}`}
          >
            <Palette className="mr-2 h-4 w-4" />
            Shades
          </Button>
        )}
        {onEditMarker && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onEditMarker(marker)}
            aria-label={`Edit ${marker.name}`}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
