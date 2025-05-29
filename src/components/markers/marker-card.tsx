
import type { Marker, MarkerSet } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MarkerCardProps {
  marker: Marker;
  markerSets: MarkerSet[];
  onCardClick?: (marker: Marker) => void;
  isOwned?: boolean;
}

export function MarkerCard({ marker, markerSets, onCardClick, isOwned = true }: MarkerCardProps) {
  
  let setNameDisplay = 'Unknown Set';
  if (marker.setIds && marker.setIds.length > 0) {
    const setNames = marker.setIds
      .map(id => {
        const set = markerSets.find(s => s.id === id);
        return set ? set.name : id; 
      })
      .join(', ');
    setNameDisplay = setNames;
  }

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(marker);
    }
  };

  return (
    <Card 
      className={cn(
        "flex flex-col overflow-hidden transition-all hover:shadow-lg relative",
        onCardClick && "cursor-pointer"
      )}
      onClick={onCardClick ? handleCardClick : undefined}
    >
      <CardHeader className="p-0">
        <div
          className="h-12 w-full" 
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
        <p className="text-xs font-semibold text-foreground/90">{marker.id}</p>
      </CardContent>
      {/* Footer can be added back if other actions are needed */}
      {/* <CardFooter className="p-2 pt-0 flex flex-col space-y-1"></CardFooter> */}
    </Card>
  );
}
