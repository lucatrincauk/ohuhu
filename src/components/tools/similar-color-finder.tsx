
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { findSimilarColors, type FindSimilarColorsInput, type FindSimilarColorsOutput } from '@/ai/flows/similar-color-finder';
import { useToast } from '@/hooks/use-toast';
import type { Marker, MarkerInventoryItem } from '@/lib/types';
import { ColorSwatch } from '@/components/core/color-swatch';
import { Sparkles, SearchCode, Check, ChevronsUpDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface SimilarColorFinderProps {
  inventory: Marker[];
}

const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

export function SimilarColorFinder({ inventory }: SimilarColorFinderProps) {
  const [targetColor, setTargetColor] = useState<string>('');
  const [similarColors, setSimilarColors] = useState<FindSimilarColorsOutput>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [comboboxOpen, setComboboxOpen] = useState(false);
  // Stores the ID of the marker selected via combobox to help display its name in the trigger
  const [selectedMarkerIdForTrigger, setSelectedMarkerIdForTrigger] = useState<string>("");


  const handleMarkerSelect = (markerId: string) => {
    const selected = inventory.find(m => m.id === markerId);
    if (selected) {
      setTargetColor(selected.hex);
      setSelectedMarkerIdForTrigger(markerId);
    } else {
      // This case might happen if an invalid ID is passed or selection is cleared
      // If clearing, ensure targetColor and selectedMarkerIdForTrigger are reset
      // For now, assume a valid markerId is passed from combobox.
    }
    setComboboxOpen(false); // Close combobox on selection
  };

  const handleClearSelection = () => {
    setTargetColor('');
    setSimilarColors([]);
    setSelectedMarkerIdForTrigger("");
  };

  const handleFindSimilar = async () => {
    if (!hexColorRegex.test(targetColor)) {
      toast({
        title: 'Invalid Color',
        description: 'Please enter or select a valid hex color code (e.g., #RRGGBB).',
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
    setSimilarColors([]);

    const markerInventoryForAI: MarkerInventoryItem[] = inventory.map(m => ({
      id: m.id,
      name: m.name,
      hex: m.hex,
    }));

    const input: FindSimilarColorsInput = {
      targetColorHex: targetColor,
      markerInventory: markerInventoryForAI,
    };

    try {
      const result = await findSimilarColors(input);
      setSimilarColors(result);
      if (result.length === 0) {
        toast({
          title: 'No Similar Colors Found',
          description: 'Could not find any significantly similar markers in your inventory.',
        });
      }
    } catch (error) {
      console.error('Error finding similar colors:', error);
      toast({
        title: 'Error',
        description: 'Failed to find similar colors. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Effect to update selectedMarkerIdForTrigger if targetColor is changed manually
  // and matches an inventory item, or clear it if no match.
  useEffect(() => {
    if (targetColor && hexColorRegex.test(targetColor)) {
      const matchingMarker = inventory.find(m => m.hex.toLowerCase() === targetColor.toLowerCase());
      if (matchingMarker) {
        setSelectedMarkerIdForTrigger(matchingMarker.id);
      } else {
        setSelectedMarkerIdForTrigger(""); // targetColor is custom or invalid, no matching inventory item
      }
    } else if (!targetColor) {
       setSelectedMarkerIdForTrigger(""); // targetColor cleared
    }
  }, [targetColor, inventory]);


  return (
    <Card className="shadow-sm bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <SearchCode className="h-6 w-6 text-primary" />
          <CardTitle>Similar Color Finder</CardTitle>
        </div>
        <CardDescription>Find markers in your inventory similar to a target color.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="similarColorInventorySelect" className="text-sm font-medium">Target Color</label>
          <div className="flex items-center gap-2">
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={comboboxOpen}
                  className="w-full justify-between flex-grow"
                  disabled={isLoading || inventory.length === 0}
                  title={inventory.length === 0 ? "Add markers to inventory first" : "Select from inventory"}
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
                          value={`${marker.name} ${marker.id} ${marker.hex}`} // Value for searching
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

            {targetColor && ( // Show clear button only if a target color (from any source) is set
              <Button variant="ghost" size="sm" onClick={handleClearSelection} disabled={isLoading}>Clear</Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="targetColorInput"
              value={targetColor}
              onChange={(e) => {
                const newHex = e.target.value.toUpperCase();
                setTargetColor(newHex);
                // setSelectedMarkerIdForTrigger is handled by useEffect above
              }}
              placeholder="Or enter #RRGGBB"
              className="flex-grow"
              disabled={isLoading}
              aria-label="Target color hex input"
            />
            <input
              type="color"
              value={hexColorRegex.test(targetColor) ? targetColor : '#000000'}
              onChange={(e) => {
                const newHex = e.target.value.toUpperCase();
                setTargetColor(newHex);
                // setSelectedMarkerIdForTrigger is handled by useEffect above
              }}
              disabled={isLoading}
              className="h-10 w-10 p-1 border rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              title="Pick a color"
              aria-label="Pick a color"
            />
          </div>
        </div>
        <Button onClick={handleFindSimilar} disabled={isLoading || !targetColor || inventory.length === 0} className="w-full">
          {isLoading ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Finding...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Find Similar Markers
            </>
          )}
        </Button>

        {isLoading && (
          <div className="space-y-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2 p-2 border rounded-md">
                <Skeleton className="h-8 w-8 rounded-md" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && similarColors.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold">Results:</h4>
            <ScrollArea className="max-h-60">
              <ul className="space-y-2 pr-1">
                {similarColors.map((marker) => (
                  <li
                    key={marker.id}
                    className="flex items-center justify-between p-2 border rounded-md hover:bg-accent/10 transition-colors cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(marker.hex);
                      toast({ title: "Copied!", description: `${marker.hex} (${marker.name}) copied to clipboard.` });
                    }}
                    title={`Click to copy ${marker.hex}`}
                  >
                    <div className="flex items-center gap-2">
                      <ColorSwatch hexColor={marker.hex} size="sm" />
                      <div>
                        <p className="text-sm font-medium">{marker.name} ({marker.id})</p>
                        <p className="text-xs text-muted-foreground">Similarity: {(marker.similarityScore * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
