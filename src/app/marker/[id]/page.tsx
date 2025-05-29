
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMarkerData } from '@/hooks/use-marker-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Compass, Info, Heart, PlusCircle, SwatchBook, Library, XCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Marker, MarkerSet, MarkerPalette } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


export default function MarkerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { 
    getMarkerById, 
    markerSets, 
    isInitialized, 
    favoriteMarkerIds, 
    toggleFavoriteMarker,
    markerPalettes,
    addMarkerToPalette,
    removeMarkerFromPalette, // Added
    getPalettesForMarker,
  } = useMarkerData();
  const { toast } = useToast();

  const markerId = typeof params.id === 'string' ? params.id : '';
  const marker = getMarkerById(markerId);

  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('');

  useEffect(() => {
    if (isInitialized && !marker) {
      router.replace('/');
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

  const belongingMarkerPalettes = getPalettesForMarker(marker.id);
  const availablePalettesToAdd = markerPalettes.filter(p => !belongingMarkerPalettes.find(bp => bp.id === p.id));


  const handleExploreClick = () => {
    router.push(`/?activePage=explorer&exploreMarkerId=${marker.id}`);
  };

  const handleSetBadgeClick = (setId: string) => {
    router.push(`/?activePage=palette&filterSetId=${setId}`);
  };

  const handlePaletteBadgeClick = (paletteId: string) => {
    router.push(`/?activePage=palette&filterPaletteId=${paletteId}`);
  };

  const handleAddMarkerToPalette = () => {
    if (!selectedPaletteId) {
      toast({ title: 'No Palette Selected', description: 'Please select a palette to add the marker to.', variant: 'destructive'});
      return;
    }
    addMarkerToPalette(selectedPaletteId, marker.id);
    toast({ title: 'Marker Added to Palette', description: `${marker.name} added to selected palette.` });
    setSelectedPaletteId(''); 
  };

  const handleRemoveMarkerFromPalette = (paletteId: string, paletteName: string) => {
    removeMarkerFromPalette(paletteId, marker.id);
    toast({ title: 'Marker Removed', description: `${marker.name} removed from "${paletteName}" palette.` });
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-48 md:h-64 w-full shrink-0" style={{ backgroundColor: marker.hex }} aria-label={`Full color preview for ${marker.name}`} />
        
        <ScrollArea className="flex-1">
          <div className="p-6">
            <Card>
              <CardHeader className="flex flex-row items-baseline justify-between">
                <div>
                  <CardTitle className="mb-1">{marker.name}</CardTitle>
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
              <CardContent className="p-6 pt-0 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Belongs to Sets:</h4>
                  {belongingSets.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {belongingSets.map(set => (
                        <Badge 
                          key={set.id} 
                          variant="secondary" 
                          className="cursor-pointer hover:bg-primary/20"
                          onClick={() => handleSetBadgeClick(set.id)}
                          title={`View all markers in ${set.name} set`}
                        >
                          <Library className="mr-1 h-3 w-3" />
                          {set.name}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Not part of any defined sets.</p>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 mt-4">Belongs to Palettes:</h4> 
                  {belongingMarkerPalettes.length > 0 ? ( 
                    <ul className="space-y-2">
                      {belongingMarkerPalettes.map(palette => ( 
                        <li key={palette.id} className="flex items-center justify-between gap-2 p-2 border rounded-md hover:bg-muted/50">
                          <Badge 
                            variant="outline"
                            className="cursor-pointer hover:bg-accent/20 flex-grow text-left justify-start"
                            onClick={() => handlePaletteBadgeClick(palette.id)}
                            title={`View markers in "${palette.name}" palette`}
                          >
                            <SwatchBook className="mr-1 h-3 w-3" /> 
                            {palette.name}
                          </Badge>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 p-1 text-destructive hover:bg-destructive/10" title={`Remove from "${palette.name}" palette`}>
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Removal</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove marker "{marker.name}" from the "{palette.name}" palette?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRemoveMarkerFromPalette(palette.id, palette.name)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Not part of any custom palettes.</p> 
                  )}
                </div>

                {availablePalettesToAdd.length > 0 && ( 
                  <div className="mt-4 pt-4 border-t">
                    <Label htmlFor="palette-select" className="text-sm font-semibold text-foreground mb-2 block">Add to Palette:</Label> 
                    <div className="flex items-center gap-2">
                      <Select value={selectedPaletteId} onValueChange={setSelectedPaletteId}> 
                        <SelectTrigger id="palette-select" className="flex-grow"> 
                          <SelectValue placeholder="Select a palette" /> 
                        </SelectTrigger>
                        <SelectContent>
                          {availablePalettesToAdd.map(palette => ( 
                            <SelectItem key={palette.id} value={palette.id}>
                              {palette.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={handleAddMarkerToPalette} title="Add to selected palette" disabled={!selectedPaletteId}> 
                        <PlusCircle className="mr-2 h-4 w-4" /> Add
                      </Button>
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          </div>
        </ScrollArea>
        
        <div className="p-6 pt-0 shrink-0">
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button onClick={() => router.push('/')} variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Palette
            </Button>
            <Button onClick={handleExploreClick} className="w-full sm:w-auto">
              <Compass className="mr-2 h-4 w-4" />
              Explore in Color Explorer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

