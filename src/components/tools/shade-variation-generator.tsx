"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateShadeVariations, type GenerateShadeVariationsInput, type GenerateShadeVariationsOutput } from '@/ai/flows/shade-variation-generator';
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
  const [generatedShades, setGeneratedShades] = useState<string[]>([]);
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

    setIsLoading(true);
    setGeneratedShades([]);

    const input: GenerateShadeVariationsInput = {
      hexColor: baseColor,
      numShades: numShades,
    };

    try {
      const result = await generateShadeVariations(input);
      setGeneratedShades(result.shades);
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
    }
  };
  
  const handleClearSelection = () => {
    setBaseColor('');
    if (onClearSelectedMarker) onClearSelectedMarker();
  };


  return (
    <Card className="shadow-sm bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-primary" />
          <CardTitle>Shade Variation Generator</CardTitle>
        </div>
        <CardDescription>Generate lighter and darker shades from a base color.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Base Color</label>
          <div className="flex items-center gap-2">
            <Select onValueChange={handleMarkerSelect} value={inventory.find(m => m.hex === baseColor)?.id || ""}>
              <SelectTrigger className="flex-grow" disabled={isLoading}>
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

        <Button onClick={handleGenerateShades} disabled={isLoading || !baseColor} className="w-full">
          {isLoading ? (
            <>
              <Palette className="mr-2 h-4 w-4 animate-pulse" />
              Generating...
            </>
          ) : (
            <>
              <Palette className="mr-2 h-4 w-4" />
              Generate Shades
            </>
          )}
        </Button>

        {isLoading && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {[...Array(numShades)].map((_, i) => (
               <Skeleton key={i} className="h-12 w-12 rounded-md" />
            ))}
          </div>
        )}

        {!isLoading && generatedShades.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold">Generated Shades:</h4>
            <div className="flex flex-wrap gap-2 justify-center p-2 border rounded-md bg-muted/30">
              {generatedShades.map((shade, index) => (
                <ColorSwatch 
                  key={index} 
                  hexColor={shade} 
                  size="md"
                  className="transition-transform hover:scale-110"
                  onClick={() => {
                    navigator.clipboard.writeText(shade);
                    toast({ title: "Copied!", description: `${shade} copied to clipboard.` });
                  }}
                >
                   <span className="text-xs font-mono mix-blend-difference text-white p-1 rounded-sm bg-black/30">{shade.toUpperCase()}</span>
                </ColorSwatch>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
