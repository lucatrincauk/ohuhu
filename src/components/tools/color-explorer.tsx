
"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Marker, MarkerSet, MarkerInventoryItem } from '@/lib/types';
import { useMarkerData } from '@/hooks/use-marker-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { MarkerCard } from '@/components/markers/marker-card';
import { ColorSwatch } from '@/components/core/color-swatch';
import { findSimilarColors, type FindSimilarColorsInput, type FindSimilarColorsOutput } from '@/ai/flows/similar-color-finder';
import { generateShadeVariations, type GenerateShadeVariationsInput, type ShadeVariationResult } from '@/ai/flows/shade-variation-generator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Compass, Palette, Sparkles, Layers, Check, ChevronsUpDown } from 'lucide-react';

interface ColorExplorerProps {
  inventory: Marker[];
  initialSelectedMarker?: Marker | null;
  onClearSelectedMarker?: () => void;
}

// Helper functions for color conversion and hue extraction
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  if (!hex) return null;
  let normalizedHex = hex.replace(/^#/, '');
  if (normalizedHex.length === 3) normalizedHex = normalizedHex.split('').map(char => char + char).join('');
  if (normalizedHex.length !== 6) return null;
  const num = parseInt(normalizedHex, 16);
  if (isNaN(num)) return null;
  return { r: (num >> 16) & 0xFF, g: (num >> 8) & 0xFF, b: (num >> 0) & 0xFF };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max === min) { h = s = 0; } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

function getHueFromHex(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 361;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  if (hsl.s < 0.1) return 360 + (1 - hsl.l) * 100;
  return hsl.h;
}

export function ColorExplorer({ inventory, initialSelectedMarker, onClearSelectedMarker }: ColorExplorerProps) {
  const { markerSets, ownedSetIds, getMarkerById } = useMarkerData();
  const { toast } = useToast();

  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(initialSelectedMarker || null);
  const [numShades, setNumShades] = useState<number>(5);
  const [searchScope, setSearchScope] = useState<'all' | 'owned'>('all');
  
  const [similarColorsResults, setSimilarColorsResults] = useState<FindSimilarColorsOutput>([]);
  const [shadeVariationsResults, setShadeVariationsResults] = useState<ShadeVariationResult[]>([]);
  
  const [isLoadingSimilar, setIsLoadingSimilar] = useState<boolean>(false);
  const [isLoadingShades, setIsLoadingShades] = useState<boolean>(false);
  const [comboboxOpen, setComboboxOpen] = useState(false);

  const sortedInventory = useMemo(() => {
    return [...inventory].sort((a, b) => getHueFromHex(a.hex) - getHueFromHex(b.hex));
  }, [inventory]);

  useEffect(() => {
    if (initialSelectedMarker) {
      setSelectedMarker(initialSelectedMarker);
    }
  }, [initialSelectedMarker]);

  const handleMarkerSelect = (markerId: string) => {
    const newlySelected = inventory.find(m => m.id === markerId);
    if (newlySelected) {
      setSelectedMarker(newlySelected);
      // Clear previous results when a new marker is selected
      setSimilarColorsResults([]);
      setShadeVariationsResults([]);
      if (onClearSelectedMarker && initialSelectedMarker && initialSelectedMarker.id !== markerId) {
        onClearSelectedMarker();
      }
    }
    setComboboxOpen(false);
  };

  const handleClearSelection = () => {
    setSelectedMarker(null);
    setSimilarColorsResults([]);
    setShadeVariationsResults([]);
    if (onClearSelectedMarker) {
      onClearSelectedMarker();
    }
  };

  const handleAnalyzeMarker = async () => {
    if (!selectedMarker) {
      toast({ title: 'No Marker Selected', description: 'Please select a marker from your inventory to explore.', variant: 'destructive' });
      return;
    }

    let inventoryToSearch = inventory;
    if (searchScope === 'owned') {
      if (ownedSetIds.length === 0) {
        toast({ title: 'No Owned Sets', description: 'Please select "Search all markers" or update your owned sets.', variant: 'destructive' });
        return;
      }
      inventoryToSearch = inventory.filter(marker => marker.setIds.some(sid => ownedSetIds.includes(sid)));
      if (inventoryToSearch.length === 0) {
        toast({ title: 'No Markers in Owned Sets', description: 'There are no markers in your owned sets to search.', variant: 'destructive' });
        return;
      }
    }
     if (inventoryToSearch.length === 0 && inventory.length > 0) {
         toast({
          title: 'No Markers to Search',
          description: 'The current filter (e.g. "owned sets") resulted in no markers to search for variations.',
          variant: 'destructive',
        });
        return;
    }


    if (inventory.length === 0) {
      toast({ title: 'Empty Inventory', description: 'Your marker inventory is empty.', variant: 'destructive' });
      return;
    }


    // Find Similar Colors
    setIsLoadingSimilar(true);
    setSimilarColorsResults([]);
    const similarColorsInput: FindSimilarColorsInput = {
      targetColorHex: selectedMarker.hex,
      markerInventory: inventoryToSearch.map(m => ({ id: m.id, name: m.name, hex: m.hex })),
    };
    try {
      const similarResult = await findSimilarColors(similarColorsInput);
      setSimilarColorsResults(similarResult);
    } catch (error) {
      console.error('Error finding similar colors:', error);
      toast({ title: 'Error Finding Similar Colors', description: 'Failed to find similar colors. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoadingSimilar(false);
    }

    // Generate Shade Variations
    setIsLoadingShades(true);
    setShadeVariationsResults([]);
    const shadeVariationsInput: GenerateShadeVariationsInput = {
      hexColor: selectedMarker.hex,
      numShades: numShades,
      markerInventory: inventoryToSearch.map(m => ({ id: m.id, name: m.name, hex: m.hex, setId: m.setIds[0] || '' })),
    };
    try {
      const shadesResult = await generateShadeVariations(shadeVariationsInput);
      const sortedShades = shadesResult.shades.sort((a,b) => getHueFromHex(a.hex) - getHueFromHex(b.hex));
      setShadeVariationsResults(sortedShades);
    } catch (error) {
      console.error('Error generating shades:', error);
      toast({ title: 'Error Generating Shades', description: 'Failed to generate shades. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoadingShades(false);
    }
  };

  const isLoading = isLoadingSimilar || isLoadingShades;

  return (
    <Card className="shadow-sm bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          <CardTitle>Color Explorer</CardTitle>
        </div>
        <CardDescription>Select a marker to find similar colors and generate shade variations from your inventory.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Base Marker</Label>
          <div className="flex items-center gap-2">
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={comboboxOpen}
                  className="w-full justify-between flex-grow"
                  disabled={isLoading || inventory.length === 0}
                  title={inventory.length === 0 ? "Add markers to inventory first" : "Select base marker"}
                >
                  {selectedMarker
                    ? (
                      <div className="flex items-center gap-2 truncate">
                        <ColorSwatch hexColor={selectedMarker.hex} size="sm" />
                        <span className="truncate">{selectedMarker.name} ({selectedMarker.id})</span>
                      </div>
                    )
                    : "Select from inventory..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Search marker..." />
                  <CommandList>
                    <CommandEmpty>No marker found.</CommandEmpty>
                    <CommandGroup>
                      {sortedInventory.map((marker) => (
                        <CommandItem
                          key={marker.id}
                          value={`${marker.name} ${marker.id} ${marker.hex}`}
                          onSelect={() => handleMarkerSelect(marker.id)}
                        >
                          <Check className={cn("mr-2 h-4 w-4", selectedMarker?.id === marker.id ? "opacity-100" : "opacity-0")} />
                          <div className="flex items-center gap-2">
                            <ColorSwatch hexColor={marker.hex} size="sm" />
                            {marker.name} ({marker.id})
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedMarker && (
              <Button variant="ghost" size="sm" onClick={handleClearSelection} disabled={isLoading}>Clear</Button>
            )}
          </div>
        </div>

        {selectedMarker && (
          <Card className="bg-muted/30 p-4">
            <CardTitle className="text-lg mb-2">Selected: {selectedMarker.name} ({selectedMarker.id})</CardTitle>
            <ColorSwatch hexColor={selectedMarker.hex} size="lg" />
          </Card>
        )}

        <div className="space-y-2">
          <Label htmlFor="numShadesSlider" className="text-sm font-medium">Number of Shades for Variation: {numShades}</Label>
          <Slider id="numShadesSlider" min={3} max={9} step={1} value={[numShades]} onValueChange={(v) => setNumShades(v[0])} disabled={isLoading} />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Search Scope for AI</Label>
          <RadioGroup value={searchScope} onValueChange={(v: 'all' | 'owned') => setSearchScope(v)} className="flex space-x-4" disabled={isLoading}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="scope-all-explorer" />
              <Label htmlFor="scope-all-explorer" className="font-normal">All markers in inventory</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="owned" id="scope-owned-explorer" disabled={ownedSetIds.length === 0} />
              <Label htmlFor="scope-owned-explorer" className={cn("font-normal", ownedSetIds.length === 0 && "text-muted-foreground cursor-not-allowed")}>
                Only markers from my owned sets
              </Label>
            </div>
          </RadioGroup>
          {searchScope === 'owned' && ownedSetIds.length === 0 && (
            <p className="text-xs text-muted-foreground">You don't have any owned sets. Go to "My Sets" to update.</p>
          )}
        </div>

        <Button onClick={handleAnalyzeMarker} disabled={isLoading || !selectedMarker || inventory.length === 0} className="w-full">
          {isLoading ? (
            <><Compass className="mr-2 h-4 w-4 animate-pulse" />Analyzing...</>
          ) : (
            <><Compass className="mr-2 h-4 w-4" />Analyze Selected Marker</>
          )}
        </Button>

        <Separator />

        {/* Similar Colors Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-lg">Similar Colors from Inventory</h4>
          </div>
          {isLoadingSimilar && (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2 p-2 border rounded-md bg-muted/30">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <div className="space-y-1"><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-16" /></div>
                </div>
              ))}
            </div>
          )}
          {!isLoadingSimilar && similarColorsResults.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-0">
              {similarColorsResults.slice(0, 8).map((result) => { // Display up to 8 similar colors
                 const fullMarker = getMarkerById(result.id);
                 if (!fullMarker) return null;
                 return (
                    <MarkerCard
                      key={`similar-${fullMarker.id}`}
                      marker={fullMarker}
                      markerSets={markerSets}
                      isOwned={fullMarker.setIds.some(sid => ownedSetIds.includes(sid))}
                    />
                 );
              })}
            </div>
          )}
          {!isLoadingSimilar && similarColorsResults.length === 0 && selectedMarker && !isLoading && (
            <p className="text-sm text-muted-foreground">No significantly similar colors found in the selected scope.</p>
          )}
        </div>

        <Separator />

        {/* Shade Variations Section */}
        <div className="space-y-3">
           <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-lg">Shade Variations from Inventory</h4>
          </div>
          {isLoadingShades && (
             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 p-0">
              {[...Array(numShades)].map((_, i) => (
                <div key={`skel-shade-${i}`} className="flex flex-col items-center">
                  <div className="p-2 border rounded-md space-y-1 bg-muted/30 w-full">
                    <Skeleton className="h-20 w-full rounded-t-md" />
                    <div className="p-2 space-y-0.5"><Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-1/2" /></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!isLoadingShades && shadeVariationsResults.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 p-0">
              {shadeVariationsResults.map((shade) => {
                const fullMarker = getMarkerById(shade.id);
                if (!fullMarker) return null;
                return (
                  <MarkerCard
                    key={`shade-${fullMarker.id}`}
                    marker={fullMarker}
                    markerSets={markerSets}
                    isOwned={fullMarker.setIds.some(sid => ownedSetIds.includes(sid))}
                  />
                );
              })}
            </div>
          )}
           {!isLoadingShades && shadeVariationsResults.length === 0 && selectedMarker && !isLoading && (
            <p className="text-sm text-muted-foreground">No suitable shade variations found in the selected scope.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

