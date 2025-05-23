
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
  SIDEBAR_TITLE_ID,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/core/app-logo';
import { AddMarkerForm } from '@/components/markers/add-marker-form';
import type { AddMarkerFormValues } from '@/components/markers/add-marker-form';
import { MarkerGrid } from '@/components/markers/marker-grid';
import { SimilarColorFinder } from '@/components/tools/similar-color-finder';
import { ShadeVariationGenerator } from '@/components/tools/shade-variation-generator';
import { EditMarkerDialog } from '@/components/markers/edit-marker-dialog';
import { useMarkerData } from '@/hooks/use-marker-data';
import type { Marker } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Palette, PlusSquare, SearchCode, Layers, ListFilter, PanelLeft, Search, Tags, Edit, LayoutGrid, ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import type { LucideIcon } from 'lucide-react';
import { COMMON_COLORS_FILTER } from '@/lib/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ColorSwatch } from '@/components/core/color-swatch';


type ActivePageContentType = 'palette' | 'add' | 'similar' | 'shades';
type ActiveSidebarContentType = null; // 'setFilter' and 'colorFilter' removed

// Helper functions for color conversion and hue extraction
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let normalizedHex = hex.replace(/^#/, '');
  if (normalizedHex.length === 3) {
    normalizedHex = normalizedHex.split('').map(char => char + char).join('');
  }
  if (normalizedHex.length !== 6) {
    return null;
  }
  const num = parseInt(normalizedHex, 16);
  if (isNaN(num)) {
    return null;
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
    h = s = 0;
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
  if (!rgb) return 361;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  if (hsl.s < 0.05) {
    return hsl.h + 360 + (1-hsl.l) * 100;
  }
  return hsl.h;
}

// Moved from color-filter.tsx and adapted to use hexToRgb from this file
function isColorInCategory(markerHex: string, categoryHex: string): boolean {
  const markerRgb = hexToRgb(markerHex); // Uses hexToRgb from page.tsx
  const categoryRgb = hexToRgb(categoryHex); // Uses hexToRgb from page.tsx

  if (!markerRgb || !categoryRgb) return false;

  const {r: mr, g: mg, b: mb} = markerRgb;
  const maxMarker = Math.max(mr, mg, mb);
  const minMarker = Math.min(mr, mg, mb);

  if (categoryHex === "#808080" || categoryHex === "#000000" || categoryHex === "#FFFFFF") {
     const luminance = 0.2126 * mr + 0.7152 * mg + 0.0722 * mb;
     const hslMarker = rgbToHsl(mr, mg, mb); // Use rgbToHsl from page.tsx for saturation
     const saturation = hslMarker.s;

     if (categoryHex === "#000000") return luminance < 50 && saturation < 0.15;
     if (categoryHex === "#FFFFFF") return luminance > 220 && saturation < 0.15;
     if (categoryHex === "#808080") return saturation < 0.15 && luminance >=50 && luminance <=220;
  }

  const {r: cr, g: cg, b: cb} = categoryRgb;

  // Calculate HSL for both colors for more accurate comparison
  const markerHsl = rgbToHsl(mr, mg, mb);
  const categoryHsl = rgbToHsl(cr, cg, cb);

  // Hue difference (circular)
  let hueDiff = Math.abs(markerHsl.h - categoryHsl.h);
  if (hueDiff > 180) hueDiff = 360 - hueDiff;

  // Check if hue is within a threshold (e.g., 30 degrees for broad categories)
  // and saturation is above a minimum (to distinguish from greys)
  const hueThreshold = 30; // Adjust as needed
  const saturationThreshold = 0.15; // Marker must have some color

  if (categoryHex === "#FF0000") { // Red
    return (markerHsl.h < 15 || markerHsl.h >= 345) && markerHsl.s > saturationThreshold;
  }
  if (categoryHex === "#FFA500") { // Orange
    return (markerHsl.h >= 15 && markerHsl.h < 45) && markerHsl.s > saturationThreshold;
  }
  if (categoryHex === "#FFFF00") { // Yellow
    return (markerHsl.h >= 45 && markerHsl.h < 75) && markerHsl.s > saturationThreshold;
  }
  if (categoryHex === "#008000") { // Green
    return (markerHsl.h >= 75 && markerHsl.h < 165) && markerHsl.s > saturationThreshold;
  }
  if (categoryHex === "#0000FF") { // Blue
    return (markerHsl.h >= 195 && markerHsl.h < 255) && markerHsl.s > saturationThreshold;
  }
  if (categoryHex === "#800080") { // Purple
    return (markerHsl.h >= 255 && markerHsl.h < 315) && markerHsl.s > saturationThreshold;
  }
  if (categoryHex === "#FFC0CB") { // Pink (treat as light red/magenta)
    return ((markerHsl.h >= 315 && markerHsl.h < 345) || (markerHsl.h < 15 && markerHsl.l > 0.6)) && markerHsl.s > saturationThreshold;
  }
   if (categoryHex === "#A52A2A") { // Brown (low saturation orange/red)
    return ((markerHsl.h >= 0 && markerHsl.h < 45) || (markerHsl.h >=340 && markerHsl.h <=360))  && markerHsl.s > 0.1 && markerHsl.s < 0.6 && markerHsl.l < 0.6 && markerHsl.l > 0.1;
  }

  // Fallback for less distinct categories using the general hue difference
  return hueDiff <= hueThreshold && markerHsl.s > saturationThreshold;
}


export default function OhuhuHarmonyPage() {
  const { markers: allMarkers, markerSets, addMarker, updateMarker, isInitialized } = useMarkerData();
  const [displayedMarkers, setDisplayedMarkers] = useState<Marker[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [selectedColorCategory, setSelectedColorCategory] = useState<{ name: string; hex: string } | null>(null);

  const [activePageContent, setActivePageContent] = useState<ActivePageContentType>('palette');
  const [activeSidebarContent, setActiveSidebarContent] = useState<ActiveSidebarContentType>(null);

  const [selectedMarkerForShades, setSelectedMarkerForShades] = useState<Marker | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingMarker, setEditingMarker] = useState<Marker | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!isInitialized) return;

    let tempResults = [...allMarkers];

    // 1. Filter by Set
    if (selectedSetId) {
      tempResults = tempResults.filter(marker => marker.setId === selectedSetId);
    }

    // 2. Filter by Color Category (new logic)
    if (selectedColorCategory) {
      tempResults = tempResults.filter(marker =>
        isColorInCategory(marker.hex, selectedColorCategory.hex)
      );
    }

    // 3. Filter by Search Term (only when palette is active)
    if (searchTerm.trim() !== '' && activePageContent === 'palette') {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempResults = tempResults.filter(
        (marker) =>
          marker.name.toLowerCase().includes(lowerSearchTerm) ||
          marker.id.toLowerCase().includes(lowerSearchTerm) ||
          marker.hex.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // 4. Sort
    tempResults.sort((a, b) => {
      const hueA = getHueFromHex(a.hex);
      const hueB = getHueFromHex(b.hex);
      if (hueA !== hueB) return hueA - hueB;

      const rgbA = hexToRgb(a.hex);
      const rgbB = hexToRgb(b.hex);
      if (rgbA && rgbB) {
        const hslA = rgbToHsl(rgbA.r, rgbA.g, rgbA.b);
        const hslB = rgbToHsl(rgbB.r, rgbB.g, rgbB.b);
        if (hslA.s < 0.1 && hslB.s < 0.1) return hslA.l - hslB.l;
        if (Math.abs(hslA.h - hslB.h) < 5) {
            if(Math.abs(hslA.s - hslB.s) > 0.05) return hslA.s - hslB.s;
            return hslA.l - hslB.l;
        }
      }
      return 0;
    });

    setDisplayedMarkers(tempResults);

  }, [searchTerm, selectedColorCategory, selectedSetId, allMarkers, isInitialized, activePageContent]);


  const handleSetFilterChange = (setId: string | null) => {
    setSelectedSetId(setId);
    // When set filter changes, clear color category filter as well
    setSelectedColorCategory(null);
  };

  const handleColorCategorySelect = (category: { name: string; hex: string } | null) => {
    if (selectedColorCategory?.name === category?.name) {
      setSelectedColorCategory(null); // Toggle off if same category is clicked
    } else {
      setSelectedColorCategory(category);
    }
  };

  const handleSelectMarkerForShades = (marker: Marker) => {
    setSelectedMarkerForShades(marker);
    setActivePageContent('shades');
    setActiveSidebarContent(null);
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

  const handleAddMarkerAndReturnToPalette = (markerData: AddMarkerFormValues) => {
    addMarker(markerData);
    setActivePageContent('palette');
    setActiveSidebarContent(null);
  };


  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Palette className="h-16 w-16 text-primary animate-pulse" />
        <p className="ml-4 text-xl text-foreground">Loading Ohuhu Harmony...</p>
      </div>
    );
  }

  const renderMainPageContent = () => {
    switch (activePageContent) {
      case 'palette':
        return <MarkerGrid
                  markers={displayedMarkers}
                  onSelectMarkerForShades={handleSelectMarkerForShades}
                  onEditMarker={handleOpenEditDialog}
                />;
      case 'add':
        return <div className="p-4 md:p-6 max-w-2xl mx-auto"><AddMarkerForm markerSets={markerSets} onAddMarker={handleAddMarkerAndReturnToPalette} /></div>;
      case 'similar':
        return <div className="p-4 md:p-6 max-w-2xl mx-auto"><SimilarColorFinder inventory={allMarkers} /></div>;
      case 'shades':
        return <div className="p-4 md:p-6 max-w-2xl mx-auto"><ShadeVariationGenerator inventory={allMarkers} selectedMarkerForShades={selectedMarkerForShades} onClearSelectedMarker={clearSelectedMarkerForShades} /></div>;
      default:
        return <MarkerGrid
                  markers={displayedMarkers}
                  onSelectMarkerForShades={handleSelectMarkerForShades}
                  onEditMarker={handleOpenEditDialog}
                />;
    }
  };

  const renderSidebarWidget = () => {
    // Sidebar widgets are no longer used for filters
    return <p className="p-4 text-center text-sm text-muted-foreground">Select a tool or navigate using the main panel.</p>;
  };

  interface SidebarButtonConfig {
    id: ActivePageContentType | 'view_palette'; // No sidebar-specific content types anymore
    name: string;
    Icon: LucideIcon;
    action: () => void;
    type: 'main' | 'navigation'; // Only main content or navigation
  }

  const sidebarButtons: SidebarButtonConfig[] = [
    { id: 'view_palette', name: "My Palette", Icon: LayoutGrid, type: 'navigation', action: () => { setActivePageContent('palette'); setActiveSidebarContent(null); setSelectedMarkerForShades(null); setSearchTerm(''); }},
    { id: 'add', name: "Add Marker", Icon: PlusSquare, type: 'main', action: () => { setActivePageContent('add'); setActiveSidebarContent(null); setSelectedMarkerForShades(null); setSearchTerm(''); }},
    { id: 'similar', name: "Similar Colors", Icon: SearchCode, type: 'main', action: () => { setActivePageContent('similar'); setActiveSidebarContent(null); setSelectedMarkerForShades(null); setSearchTerm(''); }},
    { id: 'shades', name: "Shade Variations", Icon: Layers, type: 'main', action: () => { setActivePageContent('shades'); setActiveSidebarContent(null); setSearchTerm(''); }},
    // "Filter by Set" and "Filter by Color" buttons removed from here
  ];

  const getHeaderTitle = () => {
    if (activePageContent === 'palette') return "My Marker Palette";
    const activeButton = sidebarButtons.find(btn => btn.id === activePageContent);
    return activeButton ? activeButton.name : "Ohuhu Harmony";
  };

  const isPaletteView = activePageContent === 'palette';


  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon" variant="sidebar" className="border-r shadow-md">
          <SidebarHeader className="p-4 border-b">
            <AppLogo id={SIDEBAR_TITLE_ID} />
          </SidebarHeader>
          <SidebarContent className="p-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {sidebarButtons.map(button => (
                  <Button
                    key={button.id}
                    variant={
                      (activePageContent === button.id && button.type === 'main') ||
                      (activePageContent === 'palette' && button.id === 'view_palette')
                      ? 'default'
                      : 'ghost'
                    }
                    className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                    onClick={button.action}
                    title={button.name}
                  >
                    <button.Icon className="mr-2 h-5 w-5 group-data-[collapsible=icon]:mr-0" />
                    <span className="group-data-[collapsible=icon]:hidden">{button.name}</span>
                  </Button>
                ))}
              </div>
              <Separator className="my-4 group-data-[collapsible=icon]:hidden" />
              <div className="p-4 group-data-[collapsible=icon]:hidden">
                {renderSidebarWidget()}
              </div>
            </ScrollArea>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t group-data-[collapsible=icon]:hidden">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Ohuhu Harmony</p>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 bg-background flex flex-col">
          <header className="sticky top-0 z-10 flex h-auto flex-col gap-2 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 py-3">
            {/* Row 1: Title and Search */}
            <div className="flex h-10 items-center">
              <SidebarTrigger className="md:hidden mr-2">
                  <PanelLeft />
                  <span className="sr-only">Toggle Sidebar</span>
              </SidebarTrigger>
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-foreground whitespace-nowrap">{getHeaderTitle()}</h2>
                {isPaletteView && (
                  <span className="ml-2 text-sm text-muted-foreground">({displayedMarkers.length} marker{displayedMarkers.length === 1 ? '' : 's'})</span>
                )}
              </div>
              <div className="ml-auto flex items-center">
                {isPaletteView && (
                  <div className="relative flex-1 md:grow-0 max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search markers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[320px]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: Filters (only if palette view) */}
            {isPaletteView && (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {selectedColorCategory ? `Color: ${selectedColorCategory.name}` : "Filter Color"}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by color category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {COMMON_COLORS_FILTER.map((color) => (
                      <DropdownMenuCheckboxItem
                        key={color.name}
                        checked={selectedColorCategory?.name === color.name}
                        onSelect={(event) => {
                           event.preventDefault();
                           handleColorCategorySelect(selectedColorCategory?.name === color.name ? null : color);
                        }}
                      >
                        <ColorSwatch hexColor={color.hexBase} size="sm" className="mr-2 border-none shadow-none"/>
                        {color.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                    {selectedColorCategory && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => handleColorCategorySelect(null)}>
                          Clear Color Filter
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Tags className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {selectedSetId ? `Set: ${markerSets.find(s => s.id === selectedSetId)?.name || 'Unknown'}` : "Filter Set"}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by marker set</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={!selectedSetId}
                      onSelect={(event) => {
                        event.preventDefault();
                        handleSetFilterChange(null);
                      }}
                    >
                      All Sets
                    </DropdownMenuCheckboxItem>
                    {markerSets.map((set) => (
                      <DropdownMenuCheckboxItem
                        key={set.id}
                        checked={selectedSetId === set.id}
                        onSelect={(event) => {
                          event.preventDefault();
                          // Toggle behavior: if current set is clicked, clear filter by selecting "All Sets" equivalent
                          handleSetFilterChange(selectedSetId === set.id ? null : set.id);
                        }}
                      >
                        {set.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </header>
          <main className="flex-1 overflow-auto">
             {renderMainPageContent()}
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
