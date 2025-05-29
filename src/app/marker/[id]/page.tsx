
'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMarkerData } from '@/hooks/use-marker-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Compass, Info, Heart } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Marker, MarkerSet } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function MarkerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { getMarkerById, markerSets, isInitialized, favoriteMarkerIds, toggleFavoriteMarker } = useMarkerData();

  const markerId = typeof params.id === 'string' ? params.id : '';
  const marker = getMarkerById(markerId);

  useEffect(() => {
    if (isInitialized && !marker) {
      // Optional: redirect if marker not found after initialization
      // router.replace('/'); 
    }
  }, [isInitialized, marker, router]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Compass className="h-16 w-16 text-primary animate-pulse" />
        <p className="ml-4 text-xl text-foreground">Loading marker data...</p>
      </div>
    );
  }

  if (!marker) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
        <Info className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold text-foreground mb-2">Marker Not Found</h1>
        <p className="text-muted-foreground mb-6">The marker with ID "{markerId}" could not be found.</p>
        <Button onClick={() => router.push('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Palette
        </Button>
      </div>
    );
  }

  const isFavorite = favoriteMarkerIds.includes(marker.id);

  const belongingSets = marker.setIds
    .map(id => markerSets.find(s => s.id === id))
    .filter(Boolean as unknown as (value: MarkerSet | undefined) => value is MarkerSet);

  const handleExploreClick = () => {
    router.push(`/?activePage=explorer&exploreMarkerId=${marker.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => router.push('/')}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to Palette</span>
        </Button>
        <h1 className="font-semibold text-lg md:text-xl">{marker.name} ({marker.id})</h1>
      </header>

      <ScrollArea className="flex-1">
        <div className="w-full h-48 md:h-80" style={{ backgroundColor: marker.hex }} aria-label={`Full color preview for ${marker.name}`} />
        
        <main className="p-4 md:p-6 grid gap-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{marker.name}</CardTitle>
                <CardDescription>{marker.id}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavoriteMarker(marker.id)}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                className="h-8 w-8 p-1 text-muted-foreground hover:text-red-500"
              >
                <Heart className={cn("h-5 w-5", isFavorite ? "text-red-500 fill-current" : "")} />
              </Button>
            </CardHeader>
            <CardContent className="p-6 pt-0"> {/* Adjusted padding to match typical Card structure */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Belongs to Sets:</h4>
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
            </CardContent>
          </Card>

          <Button onClick={handleExploreClick} className="w-full sm:w-auto justify-self-start">
            <Compass className="mr-2 h-4 w-4" />
            Explore in Color Explorer
          </Button>
        </main>
      </ScrollArea>
    </div>
  );
}
