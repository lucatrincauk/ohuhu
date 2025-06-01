
"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Marker, MarkerSet } from '@/lib/types';
import { useMarkerData } from '@/hooks/use-marker-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { Compass, Palette, Sparkles, Layers, Check, ChevronsUpDown, SearchCode, Save, PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


interface ColorExplorerProps {
  inventory: Marker[];
  initialSelectedMarker?: Marker | null;
  onClearSelectedMarker?: () => void;
}

const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

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
  const { 
    markerSets, 
    ownedSetIds, 
    getMarkerById, 
    markerPalettes, 
    createMarkerPalette, 
    addMarkerToPalette 
  } = useMarkerData();
  const { toast } = useToast();

  const [activeColorHex, setActiveColorHex] = useState<string>(initialSelectedMarker?.hex || '');
  const [analysisMode, setAnalysisMode] = useState<'similar' | 'shades'>('similar');
  
  const [numShades, setNumShades] = useState<number>(5);
  const [searchScope, setSearchScope] = useState<'all' | 'owned'>('all');
  
  const [similarColorsResults, setSimilarColorsResults] = useState<FindSimilarColorsOutput>([]);
  const [shadeVariationsResults, setShadeVariationsResults] = useState<ShadeVariationResult[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comboboxOpen, setComboboxOpen] = useState(false);

  // State for saving results to palettes
  const [isCreatePaletteDialogOpenForExplorer, setIsCreatePaletteDialogOpenForExplorer] = useState(false);
  const [newPaletteNameInputForExplorer, setNewPaletteNameInputForExplorer] = useState('');
  const [isAddToExistingPaletteDialogOpenForExplorer, setIsAddToExistingPaletteDialogOpenForExplorer] = useState(false);
  const [paletteIdToSaveToForExplorer, setPaletteIdToSaveToForExplorer] = useState<string>('');

  const sortedInventory = useMemo(() => {
    return [...inventory].sort((a, b) => getHueFromHex(a.hex) - getHueFromHex(b.hex));
  }, [inventory]);

  const currentSelectedMarkerFromHex = useMemo(() => {
    if (!activeColorHex || !hexColorRegex.test(activeColorHex)) return null;
    return inventory.find(m => m.hex.toLowerCase() === activeColorHex.toLowerCase()) || null;
  }, [activeColorHex, inventory]);

  useEffect(() => {
    if (initialSelectedMarker) {
      setActiveColorHex(initialSelectedMarker.hex);
    }
  }, [initialSelectedMarker]);

  const handleComboboxSelect = (markerId: string) => {
    const newlySelected = inventory.find(m => m.id === markerId);
    if (newlySelected) {
      setActiveColorHex(newlySelected.hex);
      if (onClearSelectedMarker && initialSelectedMarker && initialSelectedMarker.id !== markerId) {
        onClearSelectedMarker(); 
      }
    }
    setComboboxOpen(false);
    setSimilarColorsResults([]);
    setShadeVariationsResults([]);
  };

  const handleHexInputChange = (hex: string) => {
    setActiveColorHex(hex.toUpperCase());
    if (onClearSelectedMarker && initialSelectedMarker && initialSelectedMarker.hex.toLowerCase() !== hex.toLowerCase()) {
      onClearSelectedMarker();
    }
    setSimilarColorsResults([]);
    setShadeVariationsResults([]);
  };

  const handleClearSelection = () => {
    setActiveColorHex('');
    setSimilarColorsResults([]);
    setShadeVariationsResults([]);
    if (onClearSelectedMarker) {
      onClearSelectedMarker();
    }
  };

  const handleAnalyzeMarker = async () => {
    if (!hexColorRegex.test(activeColorHex)) {
      toast({ title: 'Invalid Hex Color', description: 'Please enter or select a valid hex color.', variant: 'destructive' });
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

    setIsLoading(true);
    setSimilarColorsResults([]);
    setShadeVariationsResults([]);

    if (analysisMode === 'similar') {
      const similarColorsInput: FindSimilarColorsInput = {
        targetColorHex: activeColorHex,
        markerInventory: inventoryToSearch.map(m => ({ id: m.id, name: m.name, hex: m.hex })),
      };
      try {
        const similarResult = await findSimilarColors(similarColorsInput);
        setSimilarColorsResults(similarResult);
         if(similarResult.length === 0) toast({ title: 'No Similar Colors', description: 'No similar colors found in the selected scope.' });
      } catch (error) {
        console.error('Error finding similar colors:', error);
        toast({ title: 'Error Finding Similar Colors', description: 'Failed to find similar colors. Please try again.', variant: 'destructive' });
      }
    } else if (analysisMode === 'shades') {
      const shadeVariationsInput: GenerateShadeVariationsInput = {
        hexColor: activeColorHex,
        numShades: numShades,
        markerInventory: inventoryToSearch.map(m => ({ id: m.id, name: m.name, hex: m.hex, setId: m.setIds[0] || '' })),
      };
      try {
        const shadesResult = await generateShadeVariations(shadeVariationsInput);
        const sortedShades = shadesResult.shades.sort((a,b) => getHueFromHex(a.hex) - getHueFromHex(b.hex));
        setShadeVariationsResults(sortedShades);
        if(sortedShades.length === 0) toast({ title: 'No Shade Variations', description: 'No shade variations found in the selected scope.' });
      } catch (error) {
        console.error('Error generating shades:', error);
        toast({ title: 'Error Generating Shades', description: 'Failed to generate shades. Please try again.', variant: 'destructive' });
      }
    }
    setIsLoading(false);
  };

  const getCurrentExplorerResultsIds = (): string[] => {
    if (analysisMode === 'similar' && similarColorsResults.length > 0) {
      return similarColorsResults.map(m => m.id);
    }
    if (analysisMode === 'shades' && shadeVariationsResults.length > 0) {
      return shadeVariationsResults.map(m => m.id);
    }
    return [];
  };

  const handleCreateAndSaveResultsToNewPalette = () => {
    if (newPaletteNameInputForExplorer.trim() === '') {
      toast({ title: 'Palette Name Required', description: 'Please enter a name for the new palette.', variant: 'destructive' });
      return;
    }
    const markerIdsToSave = getCurrentExplorerResultsIds();
    if (markerIdsToSave.length === 0) {
      toast({ title: 'No Results to Save', description: 'There are no explorer results to save.', variant: 'destructive' });
      return;
    }

    const newPaletteId = createMarkerPalette(newPaletteNameInputForExplorer.trim());
    markerIdsToSave.forEach(markerId => {
      addMarkerToPalette(newPaletteId, markerId);
    });

    toast({ title: 'Palette Created & Results Saved', description: `Palette "${newPaletteNameInputForExplorer.trim()}" created and ${markerIdsToSave.length} marker(s) added.` });
    setIsCreatePaletteDialogOpenForExplorer(false);
    setNewPaletteNameInputForExplorer('');
  };

  const handleSaveResultsToExistingPalette = () => {
    if (!paletteIdToSaveToForExplorer) {
      toast({ title: 'No Palette Selected', description: 'Please select an existing palette from the dropdown.', variant: 'destructive' });
      return;
    }
    const markerIdsToSave = getCurrentExplorerResultsIds();
    if (markerIdsToSave.length === 0) {
      toast({ title: 'No Results to Save', description: 'There are no explorer results to save.', variant: 'destructive' });
      return;
    }

    const selectedPalette = markerPalettes.find(p => p.id === paletteIdToSaveToForExplorer);
    if (!selectedPalette) {
       toast({ title: 'Palette Not Found', description: 'The selected palette could not be found.', variant: 'destructive' });
       return;
    }

    markerIdsToSave.forEach(markerId => {
      addMarkerToPalette(paletteIdToSaveToForExplorer, markerId);
    });
    
    toast({ title: 'Results Saved', description: `${markerIdsToSave.length} marker(s) added to "${selectedPalette.name}". Markers already present were not duplicated.` });
    setIsAddToExistingPaletteDialogOpenForExplorer(false);
    setPaletteIdToSaveToForExplorer('');
  };

  const showSaveResultsSection = !isLoading && (similarColorsResults.length > 0 || shadeVariationsResults.length > 0);

  return (
    <>
      <Card className="shadow-sm bg-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            <CardTitle>Color Explorer</CardTitle>
          </div>
          <CardDescription>Select or enter a color to find similar colors or generate shade variations from your inventory.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Base Color</Label>
            <div className="flex items-center gap-2 flex-wrap">
              <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={comboboxOpen}
                    className="w-full md:w-auto justify-between flex-grow min-w-[200px]"
                    disabled={isLoading || inventory.length === 0}
                    title={inventory.length === 0 ? "Add markers to inventory first" : "Select base marker from inventory"}
                  >
                    {currentSelectedMarkerFromHex
                      ? (
                        <div className="flex items-center gap-2 truncate">
                          <ColorSwatch hexColor={currentSelectedMarkerFromHex.hex} size="sm" />
                          <span className="truncate">{currentSelectedMarkerFromHex.name} ({currentSelectedMarkerFromHex.id})</span>
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
                            onSelect={() => handleComboboxSelect(marker.id)}
                          >
                            <Check className={cn("mr-2 h-4 w-4", currentSelectedMarkerFromHex?.id === marker.id ? "opacity-100" : "opacity-0")} />
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
              <span className="text-sm text-muted-foreground hidden md:inline">OR</span>
              <div className="flex items-center gap-2 flex-grow w-full md:w-auto">
                  <Input
                      type="text"
                      placeholder="#RRGGBB"
                      value={activeColorHex}
                      onChange={(e) => handleHexInputChange(e.target.value)}
                      className="flex-grow min-w-[100px]"
                      disabled={isLoading}
                      aria-label="Hex color input"
                  />
                  <input
                      type="color"
                      value={hexColorRegex.test(activeColorHex) ? activeColorHex : '#FFFFFF'}
                      onChange={(e) => handleHexInputChange(e.target.value)}
                      className="h-10 w-10 p-1 border rounded-md cursor-pointer shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isLoading}
                      title="Pick a color"
                      aria-label="HTML color picker"
                  />
              </div>
              {activeColorHex && (
                <Button variant="ghost" size="sm" onClick={handleClearSelection} disabled={isLoading} className="shrink-0">Clear</Button>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-sm font-medium">Analysis Type</Label>
            <RadioGroup value={analysisMode} onValueChange={(v: 'similar' | 'shades') => { setAnalysisMode(v); setSimilarColorsResults([]); setShadeVariationsResults([]);}} className="flex space-x-4" disabled={isLoading}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="similar" id="mode-similar" />
                <Label htmlFor="mode-similar" className="font-normal">Find Similar Colors</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="shades" id="mode-shades" />
                <Label htmlFor="mode-shades" className="font-normal">Generate Shade Variations</Label>
              </div>
            </RadioGroup>
          </div>

          {analysisMode === 'shades' && (
            <div className="space-y-2">
              <Label htmlFor="numShadesSlider" className="text-sm font-medium">Number of Shades for Variation: {numShades}</Label>
              <Slider id="numShadesSlider" min={3} max={9} step={1} value={[numShades]} onValueChange={(v) => setNumShades(v[0])} disabled={isLoading} />
            </div>
          )}

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

          <Button onClick={handleAnalyzeMarker} disabled={isLoading || !hexColorRegex.test(activeColorHex) || inventory.length === 0} className="w-full">
            {isLoading ? (
              <><Compass className="mr-2 h-4 w-4 animate-pulse" />Analyzing...</>
            ) : (
              <><Compass className="mr-2 h-4 w-4" />Analyze Color</>
            )}
          </Button>

          <Separator />

          {/* Similar Colors Section */}
          {analysisMode === 'similar' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <SearchCode className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-lg">Similar Colors from Inventory</h4>
              </div>
              {isLoading && <Skeleton className="h-24 w-full" />}
              {!isLoading && similarColorsResults.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-0">
                  {similarColorsResults.slice(0, 8).map((result) => { 
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
              {!isLoading && similarColorsResults.length === 0 && hexColorRegex.test(activeColorHex) && (
                <p className="text-sm text-muted-foreground">No significantly similar colors found in the selected scope.</p>
              )}
            </div>
          )}

          {/* Shade Variations Section */}
          {analysisMode === 'shades' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-lg">Shade Variations from Inventory</h4>
              </div>
              {isLoading && (
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
              {!isLoading && shadeVariationsResults.length > 0 && (
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
              {!isLoading && shadeVariationsResults.length === 0 && hexColorRegex.test(activeColorHex) && (
                <p className="text-sm text-muted-foreground">No suitable shade variations found in the selected scope.</p>
              )}
            </div>
          )}

          {/* Save Results Section */}
          {showSaveResultsSection && (
            <div className="pt-4 border-t">
              <h4 className="text-md font-semibold mb-2">Save Explorer Results</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={() => {
                    setNewPaletteNameInputForExplorer('');
                    setIsCreatePaletteDialogOpenForExplorer(true);
                  }} 
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Save to New Palette
                </Button>
                <Button 
                  onClick={() => {
                    setPaletteIdToSaveToForExplorer('');
                    setIsAddToExistingPaletteDialogOpenForExplorer(true);
                  }}
                  variant="outline"
                  className="w-full sm:w-auto"
                  disabled={markerPalettes.length === 0}
                >
                  <Save className="mr-2 h-4 w-4" /> Save to Existing Palette
                </Button>
              </div>
               {markerPalettes.length === 0 && isAddToExistingPaletteDialogOpenForExplorer && (
                <p className="text-xs text-muted-foreground mt-1">No existing palettes. Create a new one first.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog for Creating a New Palette for Explorer Results */}
      <Dialog open={isCreatePaletteDialogOpenForExplorer} onOpenChange={setIsCreatePaletteDialogOpenForExplorer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Palette for Explorer Results</DialogTitle>
            <DialogDescription>
              Enter a name for the new palette. The current explorer results will be added to it.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="New palette name..."
              value={newPaletteNameInputForExplorer}
              onChange={(e) => setNewPaletteNameInputForExplorer(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleCreateAndSaveResultsToNewPalette} disabled={newPaletteNameInputForExplorer.trim() === ''}>
              Create & Save Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for Adding Explorer Results to Existing Palette */}
      <Dialog open={isAddToExistingPaletteDialogOpenForExplorer} onOpenChange={setIsAddToExistingPaletteDialogOpenForExplorer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Explorer Results to Existing Palette</DialogTitle>
            <DialogDescription>
              Select an existing palette to add the current explorer results to.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <Label htmlFor="existing-palette-select-explorer">Select Palette:</Label>
            <Select 
              value={paletteIdToSaveToForExplorer} 
              onValueChange={setPaletteIdToSaveToForExplorer}
              disabled={markerPalettes.length === 0}
            > 
              <SelectTrigger id="existing-palette-select-explorer" className="flex-grow"> 
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
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={() => setPaletteIdToSaveToForExplorer('')}>Cancel</Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={handleSaveResultsToExistingPalette} 
              disabled={!paletteIdToSaveToForExplorer || markerPalettes.length === 0}
            >
              Add Results to Palette
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
