
import type { Marker, MarkerSet } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react'; // Changed from Star
import { cn } from '@/lib/utils';

interface MarkerCardProps {
  marker: Marker;
  markerSets: MarkerSet[];
  onCardClick?: (marker: Marker) => void;
  isOwned?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (markerId: string) => void;
}

export function MarkerCard({ marker, markerSets, onCardClick, isOwned = true, isFavorite = false, onToggleFavorite }: MarkerCardProps) {
  
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

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent click if the favorite button was clicked
    if ((e.target as HTMLElement).closest('.favorite-button')) {
      return;
    }
    if (onCardClick) {
      onCardClick(marker);
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent card click when favorite is clicked
    if (onToggleFavorite) {
      onToggleFavorite(marker.id);
    }
  };

  return (
    <Card 
      className={cn(
        "flex flex-col overflow-hidden transition-all hover:shadow-lg relative",
        onCardClick && "cursor-pointer"
      )}
      onClick={handleCardClick}
    >
      <CardHeader className="p-0 relative">
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
         {onToggleFavorite && (
          <Button
            variant="ghost"
            size="icon"
            className="favorite-button absolute bottom-1 right-1 h-7 w-7 p-1 bg-background/30 hover:bg-background/70 rounded-full"
            onClick={handleFavoriteToggle}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-4 w-4", isFavorite ? "text-red-500 fill-current" : "text-muted-foreground")} />
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-grow p-2 space-y-0.5"> 
        <CardTitle className="mb-0.5 text-sm leading-tight">{marker.name}</CardTitle> 
        <p className="text-xs font-semibold text-foreground/90">{marker.id}</p>
      </CardContent>
    </Card>
  );
}
