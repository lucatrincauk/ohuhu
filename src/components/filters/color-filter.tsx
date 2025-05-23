"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { COMMON_COLORS_FILTER } from '@/lib/constants';
import type { Marker } from '@/lib/types';
import { ColorSwatch } from '@/components/core/color-swatch';
import { Filter, ListFilter } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ColorFilterProps {
  allMarkers: Marker[];
  onFilterChange: (filteredMarkers: Marker[]) => void;
}

// Simple heuristic to determine if a color belongs to a category
// This is a very basic approach and can be improved with more sophisticated color math.
function isColorInCategory(markerHex: string, categoryHex: string): boolean {
  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  };

  const markerRgb = hexToRgb(markerHex);
  const categoryRgb = hexToRgb(categoryHex);

  if (!markerRgb || !categoryRgb) return false;

  // Very basic check: dominant channel comparison (highly simplified)
  // This is not perceptually accurate but a starting point.
  // For "Grey", "Black", "White", check luminance and saturation.
  const {r: mr, g: mg, b: mb} = markerRgb;
  const maxMarker = Math.max(mr, mg, mb);
  const minMarker = Math.min(mr, mg, mb);

  if (categoryHex === "#808080" || categoryHex === "#000000" || categoryHex === "#FFFFFF") { // Grey, Black, White
     const luminance = 0.2126 * mr + 0.7152 * mg + 0.0722 * mb;
     const saturation = (maxMarker - minMarker) / maxMarker;
     if (categoryHex === "#000000") return luminance < 50 && saturation < 0.2;
     if (categoryHex === "#FFFFFF") return luminance > 200 && saturation < 0.2;
     if (categoryHex === "#808080") return saturation < 0.2 && luminance >=50 && luminance <=200; // Grey
  }


  const {r: cr, g: cg, b: cb} = categoryRgb;
  
  // Check if marker's dominant channel aligns with category's dominant channel
  if (cr > cg && cr > cb) return mr > mg && mr > mb; // Red-ish
  if (cg > cr && cg > cb) return mg > mr && mg > mb; // Green-ish
  if (cb > cr && cb > cg) return mb > mr && mb > mg; // Blue-ish
  
  // For mixed colors like orange, yellow, purple, pink, brown this is harder.
  // This basic filter will primarily work for primary-like colors.
  // A proper solution would involve HSL/HSV conversion and range checks.
  
  // Fallback: if no dominant primary, it's hard to categorize simply.
  // This example will be limited.
  return false; 
}


export function ColorFilter({ allMarkers, onFilterChange }: ColorFilterProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilter = (categoryName: string, categoryHex: string) => {
    if (activeFilter === categoryName) {
      setActiveFilter(null);
      onFilterChange(allMarkers); // Reset to all markers
    } else {
      setActiveFilter(categoryName);
      const filtered = allMarkers.filter(marker => isColorInCategory(marker.hex, categoryHex));
      onFilterChange(filtered);
    }
  };
  
  const resetFilter = () => {
    setActiveFilter(null);
    onFilterChange(allMarkers);
  }

  return (
    <Card className="shadow-sm bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ListFilter className="h-6 w-6 text-primary" />
          <CardTitle>Color Filter</CardTitle>
        </div>
        <CardDescription>Filter markers by common color categories.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48"> {/* Limit height and make scrollable */}
          <div className="grid grid-cols-3 gap-2">
            {COMMON_COLORS_FILTER.map((color) => (
              <Button
                key={color.name}
                variant={activeFilter === color.name ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilter(color.name, color.hexBase)}
                className="flex flex-col h-auto p-2 items-center gap-1"
              >
                <ColorSwatch hexColor={color.hexBase} size="sm" />
                <span className="text-xs">{color.name}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
        {activeFilter && (
          <Button onClick={resetFilter} variant="ghost" className="w-full mt-4">
            Clear Filter
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
