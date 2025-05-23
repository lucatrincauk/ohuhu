
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

export function ShadeVariationGenerator({ inventory, selectedMarkerForShades, onClearSelectedMarker }: ShadeVariationGeneratorProps) {
  const [baseColor, setBaseColor] = useState<string>('');
  const [numShades, setNumShades] = useState<number>(5);
  const [generatedShades, setGeneratedShades] = useState<ShadeVariationResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewColor, setPreviewColor] = useState<string>('transparent');
  const { toast } = useToast();

  useEffect(() => {
    if (selectedMarkerForShades) {
      setBaseColor(selectedMarkerForShades.hex);
    }
  }, [selectedMarkerForShades]);

  useEffect(() => {
    if (hexColorRegex.test(baseColor)) {
      setPreviewColor(baseColor);
    } else {
      setPreviewColor('transparent');
    }
  }, [baseColor]);

  const handleGenerateShades = async () => {
    if (!hexColorRegex.test(baseColor)) {
      toast({
        title: 'Invalid Color',
        description: 'Please enter or select a valid hex color code.',
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
      // If the selected marker for shades was set via prop, clear it
      // so direct selection takes over.
      if (onClearSelectedMarker && selectedMarkerForShades && selectedMarkerForShades.id !== markerId) {
        onClearSelectedMarker();
      }
    }
  };
  
  const handleClearSelection = () => {
    setBaseColor('');
    setGeneratedShades([]); // Clear results when base color is cleared
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
              value={inventory.find(m => m.hex.toLowerCase() === baseColor.toLowerCase())?.id || ""} // Match ignoring case for hex
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
             {(baseColor || selectedMarkerForShades) && (
              <Button variant="ghost" size="sm" onClick={handleClearSelection} disabled={isLoading}>Clear</Button>
            )}
          </div>
          <div className="flex items-center gap-2">
             <Input
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              placeholder="Or enter #RRGGBB"
              className="flex-grow"
              disabled={isLoading}
            />
            <ColorSwatch hexColor={previewColor} size="md" />
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
                  key={marker.id + '-' + index} // Ensure unique key if same marker appears multiple times
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
