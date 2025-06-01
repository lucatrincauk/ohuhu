
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMarkerData } from '@/hooks/use-marker-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Compass, Info, Heart, PlusCircle, SwatchBook, Library, XCircle, Edit3Icon, MoreHorizontal } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Marker, MarkerSet, MarkerPalette } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';


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
    removeMarkerFromPalette,
    getPalettesForMarker,
    createMarkerPalette,
  } = useMarkerData();
  const { toast } = useToast();

  const markerId = typeof params.id === 'string' ? params.id : '';
  const marker = getMarkerById(markerId);

  const [isCreatePaletteDialogOpen, setIsCreatePaletteDialogOpen] = useState(false);
  const [newPaletteNameInput, setNewPaletteNameInput] = useState('');
  
  const [isAddToExistingPaletteDialogOpen, setIsAddToExistingPaletteDialogOpen] = useState(false);
  const [paletteIdToAddTo, setPaletteIdToAddTo] = useState<string>('');


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
  
  const isMarkerAlreadyInSelectedAddToPalette = paletteIdToAddTo
    ? belongingMarkerPalettes.some(p => p.id === paletteIdToAddTo)
    : false;

  const handleExploreClick = () => {
    router.push(`/?activePage=explorer&exploreMarkerId=${marker.id}`);
  };

  const handleSetBadgeClick = (setId: string) => {
    router.push(`/?activePage=palette&filterSetId=${setId}`);
  };

  const handlePaletteBadgeClick = (paletteId: string) => {
    router.push(`/?activePage=palette&filterPaletteId=${paletteId}`);
  };

  const handleConfirmAddMarkerToExistingPalette = () => {
    if (!paletteIdToAddTo) {
      toast({ title: 'No Palette Selected', description: 'Please select an existing palette from the dropdown.', variant: 'destructive'});
      return;
    }
    if (isMarkerAlreadyInSelectedAddToPalette) {
       toast({ title: 'Already in Palette', description: `${marker.name} is already in the selected palette.`, variant: 'default' });
       return;
    }
    addMarkerToPalette(paletteIdToAddTo, marker.id);
    toast({ title: 'Marker Added', description: `${marker.name} added to the selected palette.` });
    setIsAddToExistingPaletteDialogOpen(false);
    setPaletteIdToAddTo('');
  };

  const handleRemoveMarkerFromPalette = (paletteId: string, paletteName: string) => {
    removeMarkerFromPalette(paletteId, marker.id);
    toast({ title: 'Marker Removed', description: `${marker.name} removed from "${paletteName}" palette.` });
  };
  
  const handleCreateAndAddMarkerToNewPalette = () => {
    if (newPaletteNameInput.trim() === '') {
      toast({ title: 'Palette Name Required', description: 'Please enter a name for the new palette.', variant: 'destructive' });
      return;
    }
    const newPaletteId = createMarkerPalette(newPaletteNameInput.trim());
    if (newPaletteId) {
      addMarkerToPalette(newPaletteId, marker.id);
      toast({ title: 'Palette Created & Marker Added', description: `Palette "${newPaletteNameInput.trim()}" created and ${marker.name} added.` });
    } else {
      toast({ title: 'Creation Failed', description: 'Could not create the new palette.', variant: 'destructive' });
    }
    setIsCreatePaletteDialogOpen(false);
    setNewPaletteNameInput('');
  };

  const openCreatePaletteDialog = () => {
    setNewPaletteNameInput('');
    setIsCreatePaletteDialogOpen(true);
  };


  return (
    <>
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

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-foreground">Belongs to Palettes:</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 p-1" title="Palette Actions">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setPaletteIdToAddTo(''); // Reset selection
                              setIsAddToExistingPaletteDialogOpen(true);
                            }}
                            disabled={markerPalettes.length === 0}
                          >
                            <PlusCircle className="mr-2 h-4 w-4" /> Add to existing palette...
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={openCreatePaletteDialog}>
                            <Edit3Icon className="mr-2 h-4 w-4" /> Create new palette & add...
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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

      {/* Dialog for Creating a New Palette */}
      <Dialog open={isCreatePaletteDialogOpen} onOpenChange={setIsCreatePaletteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Palette</DialogTitle>
            <DialogDescription>
              Enter a name for your new palette. The current marker ({marker.name}) will be added to it automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="New palette name..."
              value={newPaletteNameInput}
              onChange={(e) => setNewPaletteNameInput(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleCreateAndAddMarkerToNewPalette} disabled={newPaletteNameInput.trim() === ''}>
              Create & Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for Adding to Existing Palette */}
      <Dialog open={isAddToExistingPaletteDialogOpen} onOpenChange={setIsAddToExistingPaletteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Marker to Existing Palette</DialogTitle>
            <DialogDescription>
              Select an existing palette to add {marker.name} ({marker.id}) to.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <Label htmlFor="existing-palette-select">Select Palette:</Label>
            <Select 
              value={paletteIdToAddTo} 
              onValueChange={setPaletteIdToAddTo}
              disabled={markerPalettes.length === 0}
            > 
              <SelectTrigger id="existing-palette-select" className="flex-grow"> 
                <SelectValue placeholder={markerPalettes.length > 0 ? "Select existing palette" : "No palettes created yet"} /> 
              </SelectTrigger>
              <SelectContent>
                {markerPalettes.map(palette => ( 
                  <SelectItem key={palette.id} value={palette.id}>
                    {palette.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isMarkerAlreadyInSelectedAddToPalette && (
              <p className="text-xs text-destructive">This marker is already in the selected palette.</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={() => setPaletteIdToAddTo('')}>Cancel</Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={handleConfirmAddMarkerToExistingPalette} 
              disabled={!paletteIdToAddTo || isMarkerAlreadyInSelectedAddToPalette || markerPalettes.length === 0}
            >
              Add to Palette
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
    

    