
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { findSimilarColors, type FindSimilarColorsInput, type FindSimilarColorsOutput } from '@/ai/flows/similar-color-finder';
import { useToast } from '@/hooks/use-toast';
import type { Marker, MarkerInventoryItem } from '@/lib/types';
import { ColorSwatch } from '@/components/core/color-swatch';
import { Sparkles, SearchCode } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SimilarColorFinderProps {
  inventory: Marker[];
}

const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

export function SimilarColorFinder({ inventory }: SimilarColorFinderProps) {
  const [targetColor, setTargetColor] = useState<string>('');
  const [similarColors, setSimilarColors] = useState<FindSimilarColorsOutput>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewColor, setPreviewColor] = useState<string>('transparent');
  const { toast } = useToast();

  useEffect(() => {
    if (hexColorRegex.test(targetColor)) {
      setPreviewColor(targetColor);
    } else {
      setPreviewColor('transparent');
    }
  }, [targetColor]);

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

  const handleMarkerSelect = (markerId: string) => {
    const selected = inventory.find(m => m.id === markerId);
    if (selected) {
      setTargetColor(selected.hex);
    }
  };

  const handleClearSelection = () => {
    setTargetColor('');
    setSimilarColors([]);
  };

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
          <label className="text-sm font-medium">Target Color</label>
          <div className="flex items-center gap-2">
            <Select
              onValueChange={handleMarkerSelect}
              value={inventory.find(m => m.hex.toLowerCase() === targetColor.toLowerCase())?.id || ""}
              disabled={isLoading}
            >
              <SelectTrigger className="flex-grow-[2]"> {/* Give more space to select */}
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
            {targetColor && (
              <Button variant="ghost" size="sm" onClick={handleClearSelection} disabled={isLoading}>Clear</Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="targetColorInput"
              value={targetColor}
              onChange={(e) => setTargetColor(e.target.value)}
              placeholder="Or enter #RRGGBB"
              className="flex-grow"
              disabled={isLoading}
            />
            <ColorSwatch hexColor={previewColor} size="md" />
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
