
import type { Marker } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ColorSwatch } from '@/components/core/color-swatch';
import { Button } from '@/components/ui/button';
import { Palette, Pencil } from 'lucide-react';

interface MarkerCardProps {
  marker: Marker;
  onSelectForShades?: (marker: Marker) => void;
  onEditMarker?: (marker: Marker) => void;
}

export function MarkerCard({ marker, onSelectForShades, onEditMarker }: MarkerCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div
          className="h-24 w-full"
          style={{ backgroundColor: marker.hex }}
          aria-label={`Color preview for ${marker.name}`}
        />
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
