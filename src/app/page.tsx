
"use client";

import { useState, useEffect } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/core/app-logo';
import { AddMarkerForm } from '@/components/markers/add-marker-form';
import { MarkerGrid } from '@/components/markers/marker-grid';
import { SimilarColorFinder } from '@/components/tools/similar-color-finder';
import { ShadeVariationGenerator } from '@/components/tools/shade-variation-generator';
import { ColorFilter } from '@/components/filters/color-filter';
import { SetFilter } from '@/components/filters/set-filter';
import { EditMarkerDialog } from '@/components/markers/edit-marker-dialog';
import { useMarkerData } from '@/hooks/use-marker-data';
import type { Marker } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Palette, PlusSquare, SearchCode, Layers, ListFilter, PanelLeft, Search, Tags, Edit } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';


type ActiveTool = 'add' | 'similar' | 'shades' | 'filter' | 'setFilter' | null;

// Helper functions for color conversion and hue extraction
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let normalizedHex = hex.replace(/^#/, '');
  if (normalizedHex.length === 3) {
    normalizedHex = normalizedHex.split('').map(char => char + char).join('');
  }
  if (normalizedHex.length !== 6) {
    return null; // Invalid hex length
  }
  const num = parseInt(normalizedHex, 16);
  if (isNaN(num)) {
    return null; // Invalid hex characters
  }
  return {
    r: (num >> 16) & 0xFF,
    g: (num >>  8) & 0xFF,
    b: (num >>  0) & 0xFF,
  };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
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
  if (!rgb) return 361; // Place invalid colors last or handle as error (using 361 to sort them after 0-360 hues)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  // For greyscale colors (saturation is 0), hue is often 0.
  // To group them, we can check saturation or lightness.
  // For simple hue sort, hsl.h is fine.
  // If saturation is very low, consider it greyscale and give a high hue or special value
  if (hsl.s < 0.05) { // low saturation, likely grey/white/black
    // Sort greys by lightness: darker greys first (lower lightness value)
    // To make them sort after colors, we can add a large offset to hue, then use lightness.
    // E.g., hue = 360 + hsl.l * 100 (scales lightness to 0-100 for secondary sort key)
    // For now, just use raw hue.
    return hsl.h;
  }
  return hsl.h;
}


export default function OhuhuHarmonyPage() {
  const { markers: allMarkers, markerSets, addMarker, updateMarker, isInitialized } = useMarkerData();
  const [displayedMarkers, setDisplayedMarkers] = useState<Marker[]>([]);
  const [markersFilteredByColor, setMarkersFilteredByColor] = useState<Marker[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<ActiveTool>('add');
  const [selectedMarkerForShades, setSelectedMarkerForShades] = useState<Marker | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingMarker, setEditingMarker] = useState<Marker | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isInitialized) {
      setMarkersFilteredByColor(allMarkers); 
    }
  }, [allMarkers, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    let tempResults = [...allMarkers];

    // 1. Apply Set Filter
    if (selectedSetId) {
      tempResults = tempResults.filter(marker => marker.setId === selectedSetId);
    }

    // 2. Apply Color Category Filter
    const isColorFilterToolActive = markersFilteredByColor.length < allMarkers.length || (activeTool === 'filter' && markersFilteredByColor.length !== allMarkers.filter(m => selectedSetId ? m.setId === selectedSetId : true).length);

    if (isColorFilterToolActive) {
      const baseForColor = selectedSetId ? allMarkers.filter(m => m.setId === selectedSetId) : allMarkers;
      if(markersFilteredByColor.length < baseForColor.length) {
        const colorFilteredIds = new Set(markersFilteredByColor.map(m => m.id));
        tempResults = tempResults.filter(marker => colorFilteredIds.has(marker.id));
      }
    }
    
    // 3. Apply Search Term
    if (searchTerm.trim() !== '') {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempResults = tempResults.filter(
        (marker) =>
          marker.name.toLowerCase().includes(lowerSearchTerm) ||
          marker.id.toLowerCase().includes(lowerSearchTerm) ||
          marker.hex.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // 4. Sort by Hue
    tempResults.sort((a, b) => {
      const hueA = getHueFromHex(a.hex);
      const hueB = getHueFromHex(b.hex);
      
      // Primary sort by hue
      if (hueA !== hueB) {
        return hueA - hueB;
      }
      
      // Secondary sort for greyscale/low saturation: by lightness (darker first)
      // This helps if many colors have hue 0 (e.g. greys, some reds)
      const rgbA = hexToRgb(a.hex);
      const rgbB = hexToRgb(b.hex);
      if (rgbA && rgbB) {
        const hslA = rgbToHsl(rgbA.r, rgbA.g, rgbA.b);
        const hslB = rgbToHsl(rgbB.r, rgbB.g, rgbB.b);
        if (hslA.s < 0.1 && hslB.s < 0.1) { // If both are greyscale-ish
            return hslA.l - hslB.l; // Sort by lightness
        }
        // If only one is greyscale, it might have hue 0. 
        // The primary hue sort should handle distinct non-greys correctly.
        // Potentially, sort greys after colors:
        // if (hslA.s < 0.1 && hslB.s >= 0.1) return 1; // A is grey, B is color, A comes after
        // if (hslA.s >= 0.1 && hslB.s < 0.1) return -1; // A is color, B is grey, A comes before
      }
      return 0;
    });
    
    setDisplayedMarkers(tempResults);

  }, [searchTerm, markersFilteredByColor, selectedSetId, allMarkers, isInitialized, activeTool]);


  const handleColorFilterChange = (filteredMarkersFromColorTool: Marker[]) => {
    let baseMarkersForColorFilter = allMarkers;
    if (selectedSetId) {
        baseMarkersForColorFilter = allMarkers.filter(marker => marker.setId === selectedSetId);
    }
    
    if (filteredMarkersFromColorTool.length < baseMarkersForColorFilter.length) {
         setMarkersFilteredByColor(filteredMarkersFromColorTool);
    } else {
        setMarkersFilteredByColor(baseMarkersForColorFilter);
    }
  };

  const handleSetFilterChange = (setId: string | null) => {
    setSelectedSetId(setId);
    const newBaseForColorFilter = setId ? allMarkers.filter(marker => marker.setId === setId) : allMarkers;
    // Reset color filter to operate on the new base set of markers
    setMarkersFilteredByColor(newBaseForColorFilter); 
  };

  const handleSelectMarkerForShades = (marker: Marker) => {
    setSelectedMarkerForShades(marker);
    setActiveTool('shades');
  };
  
  const clearSelectedMarkerForShades = () => {
    setSelectedMarkerForShades(null);
  }

  const handleOpenEditDialog = (marker: Marker) => {
    setEditingMarker(marker);
  };

  const handleCloseEditDialog = () => {
    setEditingMarker(null);
  };

  const handleSaveChanges = (markerId: string, updates: { name: string; hex: string }) => {
    updateMarker(markerId, updates);
    toast({
      title: 'Marker Updated',
      description: `${updates.name || editingMarker?.name} has been updated.`,
    });
    handleCloseEditDialog();
  };


  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Palette className="h-16 w-16 text-primary animate-pulse" />
        <p className="ml-4 text-xl text-foreground">Loading Ohuhu Harmony...</p>
      </div>
    );
  }
  
  const renderTool = () => {
    const markersForColorFilterTool = selectedSetId 
      ? allMarkers.filter(marker => marker.setId === selectedSetId) 
      : allMarkers;

    switch (activeTool) {
      case 'add':
        return <AddMarkerForm markerSets={markerSets} onAddMarker={addMarker} />;
      case 'similar':
        return <SimilarColorFinder inventory={allMarkers} />;
      case 'shades':
        return <ShadeVariationGenerator inventory={allMarkers} selectedMarkerForShades={selectedMarkerForShades} onClearSelectedMarker={clearSelectedMarkerForShades} />;
      case 'filter':
        return <ColorFilter allMarkers={markersForColorFilterTool} onFilterChange={handleColorFilterChange} />;
      case 'setFilter':
        return <SetFilter markerSets={markerSets} onSetSelect={handleSetFilterChange} currentSetId={selectedSetId} />;
      default:
        return <p className="p-4 text-center text-muted-foreground">Select a tool from the menu.</p>;
    }
  };

  const toolIcons = {
    add: PlusSquare,
    similar: SearchCode,
    shades: Layers,
    filter: ListFilter,
    setFilter: Tags,
  };

  const toolNames = {
    add: "Add Marker",
    similar: "Similar Colors",
    shades: "Shade Variations",
    filter: "Filter by Color",
    setFilter: "Filter by Set",
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon" variant="sidebar" className="border-r shadow-md">
          <SidebarHeader className="p-4 border-b">
            <AppLogo />
          </SidebarHeader>
          <SidebarContent className="p-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {(['add', 'similar', 'shades', 'filter', 'setFilter'] as ActiveTool[]).map(toolKey => {
                  if (!toolKey) return null;
                  const Icon = toolIcons[toolKey];
                  const name = toolNames[toolKey];
                  return (
                    <Button
                      key={toolKey}
                      variant={activeTool === toolKey ? 'default' : 'ghost'}
                      className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                      onClick={() => {
                        setActiveTool(toolKey);
                        if (toolKey !== 'shades') setSelectedMarkerForShades(null);
                        if (toolKey === 'filter') {
                             const currentBaseForColorFilter = selectedSetId ? allMarkers.filter(m => m.setId === selectedSetId) : allMarkers;
                             setMarkersFilteredByColor(currentBaseForColorFilter);
                        }
                      }}
                      title={name}
                    >
                      <Icon className="mr-2 h-5 w-5 group-data-[collapsible=icon]:mr-0" />
                      <span className="group-data-[collapsible=icon]:hidden">{name}</span>
                    </Button>
                  );
                })}
              </div>
              <Separator className="my-4 group-data-[collapsible=icon]:hidden" />
              <div className="p-4 group-data-[collapsible=icon]:hidden">
                {renderTool()}
              </div>
            </ScrollArea>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t group-data-[collapsible=icon]:hidden">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Ohuhu Harmony</p>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 bg-background">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <SidebarTrigger className="md:hidden">
                <PanelLeft />
                <span className="sr-only">Toggle Sidebar</span>
            </SidebarTrigger>
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-foreground whitespace-nowrap">My Marker Palette</h2>
              <span className="ml-2 text-sm text-muted-foreground">({displayedMarkers.length} marker{displayedMarkers.length === 1 ? '' : 's'})</span>
            </div>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search markers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
             <MarkerGrid 
                markers={displayedMarkers} 
                onSelectMarkerForShades={handleSelectMarkerForShades}
                onEditMarker={handleOpenEditDialog} 
            />
          </main>
        </SidebarInset>
      </div>
      {editingMarker && (
        <EditMarkerDialog
          marker={editingMarker}
          isOpen={!!editingMarker}
          onClose={handleCloseEditDialog}
          onSave={handleSaveChanges}
        />
      )}
    </SidebarProvider>
  );
}
