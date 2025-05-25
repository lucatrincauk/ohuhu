
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateShadeVariations, type GenerateShadeVariationsInput, type ShadeVariationResult } from '@/ai/flows/shade-variation-generator';
import { useToast } from '@/hooks/use-toast';
import type { Marker } from '@/lib/types';
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

interface ShadeVariationGeneratorProps {
  inventory: Marker[];
  selectedMarkerForShades?: Marker | null;
  onClearSelectedMarker?: () => void;
}

export function ShadeVariationGenerator({ inventory, selectedMarkerForShades, onClearSelectedMarker }: ShadeVariationGeneratorProps) {
  const [baseColor, setBaseColor] = useState<string>('');
  const [numShades, setNumShades] = useState<number>(5);
  const [generatedShades, setGeneratedShades] = useState<ShadeVariationResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [selectedMarkerIdForTrigger, setSelectedMarkerIdForTrigger] = useState<string>("");
  const [searchScope, setSearchScope] = useState<'all' | 'owned'>('all');
  const { ownedSetIds } = useMarkerData();


  useEffect(() => {
    if (selectedMarkerForShades) {
      setBaseColor(selectedMarkerForShades.hex);
      setSelectedMarkerIdForTrigger(selectedMarkerForShades.id);
    } else {
      if (!baseColor && !selectedMarkerIdForTrigger) return;
      setBaseColor('');
      setSelectedMarkerIdForTrigger('');
    }
  }, [selectedMarkerForShades]);


  const handleMarkerSelect = (markerId: string) => {
    const selected = inventory.find(m => m.id === markerId);
    if (selected) {
      setBaseColor(selected.hex);
      setSelectedMarkerIdForTrigger(markerId);
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

    if (inventoryToSearch.length === 0 && inventory.length > 0) { // This case covers if all inventory exists, but owned filter results in zero
         toast({
          title: 'No Markers to Search',
          description: 'The current filter (e.g. "owned sets") resulted in no markers to search for variations.',
          variant: 'destructive',
        });
        return;
    }


    if (inventory.length === 0) { // General empty inventory check
      toast({
        title: 'Empty Inventory',
        description: 'Your marker inventory is empty. Add some markers first.',
        variant: 'destructive',
      });
      return;
    }


    setIsLoading(true);
    setGeneratedShades([]);

    const markerInventoryForAI = inventoryToSearch.map(m => ({
      id: m.id,
      name: m.name,
      hex: m.hex,
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
              <div key={i} className="p-2 border rounded-md space-y-1 bg-muted/30">
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && generatedShades.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold">Suggested Shades:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {generatedShades.map((marker, index) => (
                <Card
                  key={marker.id + '-' + index}
                  className="flex flex-col items-center p-2 text-center transition-transform hover:scale-105 cursor-pointer shadow-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(marker.hex);
                    toast({ title: "Copied!", description: `${marker.hex} (${marker.name}) copied to clipboard.` });
                  }}
                >
                  <ColorSwatch
                    hexColor={marker.hex}
                    size="md"
                    className="mb-1"
                  />
                  <p className="text-xs font-semibold truncate w-full" title={marker.name}>{marker.name}</p>
                  <p className="text-xs text-muted-foreground">({marker.id})</p>
                  <p className="text-xs text-muted-foreground">{marker.hex.toUpperCase()}</p>
                  {marker.similarityScore !== undefined && (
                    <p className="text-xs text-primary/80">Score: {(marker.similarityScore * 100).toFixed(0)}%</p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

