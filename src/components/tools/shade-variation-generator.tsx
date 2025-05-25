
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateShadeVariations, type GenerateShadeVariationsInput, type ShadeVariationResult } from '@/ai/flows/shade-variation-generator';
import { useToast } from '@/hooks/use-toast';
import type { Marker, MarkerSet } from '@/lib/types';
import { ColorSwatch } from '@/components/core/color-swatch';
import { Layers, Palette, Check, ChevronsUpDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useMarkerData } from '@/hooks/use-marker-data';
import { cn } from '@/lib/utils';
import { MarkerCard } from '@/components/markers/marker-card'; // Import MarkerCard

interface ShadeVariationGeneratorProps {
  inventory: Marker[];
  selectedMarkerForShades?: Marker | null;
  onClearSelectedMarker?: () => void;
}

export function ShadeVariationGenerator({ inventory, selectedMarkerForShades, onClearSelectedMarker }: ShadeVariationGeneratorProps) {
  const [baseColor, setBaseColor] = useState<string>(''); // Stores the hex of the selected base marker
  const [numShades, setNumShades] = useState<number>(5);
  const [generatedShades, setGeneratedShades] = useState<ShadeVariationResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [selectedMarkerIdForTrigger, setSelectedMarkerIdForTrigger] = useState<string>("");
  const [searchScope, setSearchScope] = useState<'all' | 'owned'>('all');
  const { ownedSetIds, markerSets } = useMarkerData(); // Get markerSets and ownedSetIds


  useEffect(() => {
    if (selectedMarkerForShades) {
      setBaseColor(selectedMarkerForShades.hex);
      setSelectedMarkerIdForTrigger(selectedMarkerForShades.id);
    } else {
      // Only clear if there was a baseColor or selectedMarkerIdForTrigger,
      // to avoid clearing on initial mount if no selectedMarkerForShades is passed.
      if (!baseColor && !selectedMarkerIdForTrigger && !selectedMarkerForShades) return;
      setBaseColor('');
      setSelectedMarkerIdForTrigger('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarkerForShades]);


  const handleMarkerSelect = (markerId: string) => {
    const selected = inventory.find(m => m.id === markerId);
    if (selected) {
      setBaseColor(selected.hex);
      setSelectedMarkerIdForTrigger(markerId);
      // If a marker was pre-selected via prop and user picks a different one, clear the prop's effect
      if (onClearSelectedMarker && selectedMarkerForShades && selectedMarkerForShades.id !== markerId) {
        onClearSelectedMarker();
      }
    }
    setComboboxOpen(false);
  };

  const handleClearSelection = () => {
    setBaseColor('');
    setGeneratedShades([]);
    setSelectedMarkerIdForTrigger("");
    if (onClearSelectedMarker) {
      onClearSelectedMarker();
    }
  };

  const handleGenerateShades = async () => {
    if (!baseColor) {
      toast({
        title: 'No Color Selected',
        description: 'Please select a base color from your inventory.',
        variant: 'destructive',
      });
      return;
    }

    let inventoryToSearch = inventory;
    if (searchScope === 'owned') {
      if (ownedSetIds.length === 0) {
        toast({
          title: 'No Owned Sets',
          description: 'You have not selected any owned sets. Please select "Search all markers" or update your owned sets.',
          variant: 'destructive',
        });
        return;
      }
      inventoryToSearch = inventory.filter(marker => ownedSetIds.includes(marker.setId));
      if (inventoryToSearch.length === 0) {
         toast({
          title: 'No Markers in Owned Sets',
          description: 'There are no markers in your selected owned sets to search for variations.',
          variant: 'destructive',
        });
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
      toast({
        title: 'Empty Inventory',
        description: 'Your marker inventory is empty. Add some markers first.',
        variant: 'destructive',
      });
      return;
    }


    setIsLoading(true);
    setGeneratedShades([]);

    // Ensure setId is included for the AI flow
    const markerInventoryForAI = inventoryToSearch.map(m => ({
      id: m.id,
      name: m.name,
      hex: m.hex,
      setId: m.setId, // Pass setId to AI
    }));

    const input: GenerateShadeVariationsInput = {
      hexColor: baseColor,
      numShades: numShades,
      markerInventory: markerInventoryForAI,
    };

    try {
      const result = await generateShadeVariations(input);
      setGeneratedShades(result.shades);
      if (!result.shades || result.shades.length === 0) {
        toast({
          title: 'No Variations Found',
          description: 'Could not find suitable shade variations in the selected marker scope for this color.',
        });
      }
    } catch (error) {
      console.error('Error generating shades:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate shades. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-primary" />
          <CardTitle>Shade Variation Generator</CardTitle>
        </div>
        <CardDescription>Select markers from your inventory that are lighter or darker variations of a base color.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Base Color</label>
          <div className="flex items-center gap-2">
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={comboboxOpen}
                  className="w-full justify-between flex-grow"
                  disabled={isLoading || inventory.length === 0}
                  title={inventory.length === 0 ? "Add markers to inventory first" : "Select base color"}
                >
                  {selectedMarkerIdForTrigger && inventory.find(m => m.id === selectedMarkerIdForTrigger)
                    ? (
                      <div className="flex items-center gap-2 truncate">
                        <ColorSwatch hexColor={inventory.find(m => m.id === selectedMarkerIdForTrigger)!.hex} size="sm" />
                         <span className="truncate">{inventory.find(m => m.id === selectedMarkerIdForTrigger)!.name}</span>
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
                      {inventory.map((marker) => (
                        <CommandItem
                          key={marker.id}
                          value={`${marker.name} ${marker.id} ${marker.hex}`}
                          onSelect={() => {
                            handleMarkerSelect(marker.id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedMarkerIdForTrigger === marker.id ? "opacity-100" : "opacity-0"
                            )}
                          />
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

            {(baseColor || selectedMarkerIdForTrigger) && (
              <Button variant="ghost" size="sm" onClick={handleClearSelection} disabled={isLoading}>Clear</Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="numShadesSlider" className="text-sm font-medium">
            Number of Shades: {numShades}
          </label>
          <Slider
            id="numShadesSlider"
            min={3}
            max={9}
            step={1}
            value={[numShades]}
            onValueChange={(value) => setNumShades(value[0])}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Search Scope</Label>
          <RadioGroup
            value={searchScope}
            onValueChange={(value: 'all' | 'owned') => setSearchScope(value)}
            className="flex space-x-4"
            disabled={isLoading}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="scope-all" />
              <Label htmlFor="scope-all" className="font-normal">All markers in inventory</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="owned" id="scope-owned" disabled={ownedSetIds.length === 0} />
              <Label htmlFor="scope-owned" className={cn("font-normal", ownedSetIds.length === 0 && "text-muted-foreground cursor-not-allowed")}>
                Only markers from my owned sets
              </Label>
            </div>
          </RadioGroup>
           {searchScope === 'owned' && ownedSetIds.length === 0 && (
            <p className="text-xs text-muted-foreground">
              You don't have any owned sets selected. Go to "My Sets" to update.
            </p>
          )}
        </div>


        <Button onClick={handleGenerateShades} disabled={isLoading || !baseColor || inventory.length === 0} className="w-full">
          {isLoading ? (
            <>
              <Palette className="mr-2 h-4 w-4 animate-pulse" />
              Generating...
            </>
          ) : (
            <>
              <Palette className="mr-2 h-4 w-4" />
              Suggest Shades from Inventory
            </>
          )}
        </Button>

        {isLoading && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[...Array(numShades)].map((_, i) => (
               <div key={i} className="flex flex-col items-center">
                <div className="p-2 border rounded-md space-y-1 bg-muted/30 w-full"> {/* Simulating card structure */}
                  <Skeleton className="h-20 w-full rounded-t-md" /> {/* For color swatch area */}
                  <div className="p-2 space-y-0.5">
                    <Skeleton className="h-3 w-3/4" /> {/* For name */}
                    <Skeleton className="h-3 w-1/2" /> {/* For ID */}
                    <Skeleton className="h-3 w-1/2" /> {/* For Set */}
                  </div>
                </div>
                <Skeleton className="h-3 w-1/4 mt-1" /> {/* For similarity score placeholder */}
              </div>
            ))}
          </div>
        )}

        {!isLoading && generatedShades.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold">Suggested Shades:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-3"> {/* Adjusted gap */}
              {generatedShades.map((shade, index) => (
                <div key={shade.id + '-' + index} className="flex flex-col items-center">
                  <MarkerCard
                    marker={{ id: shade.id, name: shade.name, hex: shade.hex, setId: shade.setId }}
                    markerSets={markerSets}
                    isOwned={ownedSetIds.includes(shade.setId)}
                    // onSelectForShades is not used here as these cards are results, not triggers
                  />
                  {shade.similarityScore !== undefined && (
                    <p className="text-xs text-primary/80 mt-1">
                      Score: {(shade.similarityScore * 100).toFixed(0)}%
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

