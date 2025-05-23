
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
// Input removed as per request
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateShadeVariations, type GenerateShadeVariationsInput, type GenerateShadeVariationsOutput, type ShadeVariationResult } from '@/ai/flows/shade-variation-generator';
import { useToast } from '@/hooks/use-toast';
import type { Marker } from '@/lib/types';
import { ColorSwatch } from '@/components/core/color-swatch';
import { Layers, Palette } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';

interface ShadeVariationGeneratorProps {
  inventory: Marker[];
  selectedMarkerForShades?: Marker | null; // Optional prop to pre-fill from MarkerCard
  onClearSelectedMarker?: () => void; // Callback to clear selection
}

// hexColorRegex removed as manual input is gone

export function ShadeVariationGenerator({ inventory, selectedMarkerForShades, onClearSelectedMarker }: ShadeVariationGeneratorProps) {
  const [baseColor, setBaseColor] = useState<string>(''); // This will now only store hex from selected inventory marker
  const [numShades, setNumShades] = useState<number>(5);
  const [generatedShades, setGeneratedShades] = useState<ShadeVariationResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // previewColor state and its useEffect removed
  const { toast } = useToast();

  useEffect(() => {
    if (selectedMarkerForShades) {
      setBaseColor(selectedMarkerForShades.hex);
    } else {
      // If selectedMarkerForShades is cleared externally, ensure baseColor is also cleared
      // if it matched the cleared marker. This might be redundant if onClearSelectedMarker also clears baseColor.
      setBaseColor(''); 
    }
  }, [selectedMarkerForShades]);

  // useEffect for previewColor removed

  const handleGenerateShades = async () => {
    if (!baseColor) { // Check if a base color is selected from inventory
      toast({
        title: 'No Color Selected',
        description: 'Please select a base color from your inventory.',
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

    const markerInventoryForAI = inventory.map(m => ({
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
          description: 'Could not find suitable shade variations in your inventory for this color.',
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

  const handleMarkerSelect = (markerId: string) => {
    const selected = inventory.find(m => m.id === markerId);
    if (selected) {
      setBaseColor(selected.hex);
      if (onClearSelectedMarker && selectedMarkerForShades && selectedMarkerForShades.id !== markerId) {
        onClearSelectedMarker();
      }
    }
  };
  
  const handleClearSelection = () => {
    setBaseColor('');
    setGeneratedShades([]);
    if (onClearSelectedMarker) onClearSelectedMarker();
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
            <Select 
              onValueChange={handleMarkerSelect} 
              value={inventory.find(m => m.hex.toLowerCase() === baseColor.toLowerCase())?.id || ""}
              disabled={isLoading}
            >
              <SelectTrigger className="flex-grow">
                <SelectValue placeholder="Select from inventory" />
              </SelectTrigger>
              <SelectContent>
                {inventory.map(marker => (
                  <SelectItem key={marker.id} value={marker.id}>
                    <div className="flex items-center gap-2">
                      <ColorSwatch hexColor={marker.hex} size="sm" />
                      {marker.name} ({marker.id})
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
             {(baseColor || selectedMarkerForShades) && ( // Show clear if a baseColor is set (from inventory) or pre-selected
              <Button variant="ghost" size="sm" onClick={handleClearSelection} disabled={isLoading}>Clear</Button>
            )}
          </div>
          {/* Manual hex input and its preview swatch removed */}
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
            <h4 className="font-semibold">Suggested Shades from Your Inventory:</h4>
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
