
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
import { MarkerGrid } from '@/components/markers/marker-grid';
import { ColorExplorer } from '@/components/tools/color-explorer'; // New import
import { ManageSetsPage } from '@/components/profile/manage-sets';
import { useMarkerData } from '@/hooks/use-marker-data';
import type { Marker } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Palette, SearchCode, Layers, ListFilter, Menu, Search, Tags, LayoutGrid, ChevronDown, Library, SortAsc, Compass } from 'lucide-react'; // Added Compass
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { ColorSwatch } from '@/components/core/color-swatch';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';


type ActivePageContentType = 'palette' | 'explorer' | 'sets'; // Updated
type ActiveSidebarContentType = null;
type SortOrder = 'hue' | 'id' | 'name';
type SetFilterValue = string | null | '__owned__';


// Helper functions for color conversion and hue extraction
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  if (!hex) {
    return null;
  }
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
  if (!rgb) return 361; // Return a high value for sorting if hex is invalid
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  if (hsl.s < 0.1) { // Low saturation (greyscale)
    // Sort greys by lightness (dark to light), mapped to a high hue range
    return 360 + (1 - hsl.l) * 100; // e.g., black (l=0) -> 460, white (l=1) -> 360
  }
  return hsl.h;
}

function isColorInCategory(markerHex: string, categoryHex: string): boolean {
  const markerRgb = hexToRgb(markerHex);
  if (!markerRgb) return false;

  const { r: mr, g: mg, b: mb } = markerRgb;
  const markerHsl = rgbToHsl(mr, mg, mb);
  
  const sThresholdChromatic = 0.10; 
  const sThresholdGrey = 0.20;    

  // Greyscale checks first
  if (categoryHex === "#000000") { // Black
    return markerHsl.l < 0.20 && markerHsl.s < sThresholdGrey;
  }
  if (categoryHex === "#FFFFFF") { // White
    return markerHsl.l > 0.90 && markerHsl.s < sThresholdGrey;
  }
  if (categoryHex === "#808080") { // Grey
    return markerHsl.s < sThresholdGrey && (markerHsl.l >= 0.20 && markerHsl.l <= 0.90);
  }

  // Chromatic color checks
  if (categoryHex === "#FF0000") { // Red
    return (markerHsl.h >= 330 || markerHsl.h <= 25) && markerHsl.s >= sThresholdChromatic; 
  }
  if (categoryHex === "#FFA500") { // Orange
    return (markerHsl.h > 20 && markerHsl.h <= 50) && markerHsl.s >= sThresholdChromatic; 
  }
  if (categoryHex === "#FFFF00") { // Yellow
    return (markerHsl.h > 48 && markerHsl.h <= 72) && markerHsl.s >= sThresholdChromatic;  
  }
  if (categoryHex === "#008000") { // Green
    return (markerHsl.h > 70 && markerHsl.h <= 165) && markerHsl.s >= sThresholdChromatic; 
  }
  if (categoryHex === "#0000FF") { // Blue
    return (markerHsl.h > 160 && markerHsl.h <= 265) && markerHsl.s >= sThresholdChromatic; 
  }
  if (categoryHex === "#800080") { // Purple
    return (markerHsl.h > 260 && markerHsl.h < 340) && markerHsl.s >= sThresholdChromatic; 
  }
  if (categoryHex === "#FFC0CB") { // Pink
    return (
        ( (markerHsl.h >= 320 || markerHsl.h <= 20) && markerHsl.l >= 0.55 ) || 
        ( markerHsl.h >= 295 && markerHsl.h < 335 && markerHsl.l >= 0.50 )  
    ) && markerHsl.s >= sThresholdChromatic;
  }
  if (categoryHex === "#A52A2A") { // Brown
    return (
      (markerHsl.h >= 8 && markerHsl.h <= 55) && 
      markerHsl.s >= 0.05 && markerHsl.s <= 0.75 && 
      markerHsl.l >= 0.08 && markerHsl.l <= 0.65   
    );
  }

  return false;
}


export default function OhuhuHarmonyPage() {
  const { markers: allMarkers, markerSets, addMarker, isInitialized, ownedSetIds, updateMarker } = useMarkerData();
  const [displayedMarkers, setDisplayedMarkers] = useState<Marker[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<SetFilterValue>(null);
  const [selectedColorCategory, setSelectedColorCategory] = useState<{ name: string; hex: string } | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('hue');

  const [activePageContent, setActivePageContent] = useState<ActivePageContentType>('palette');
  const [activeSidebarContent, setActiveSidebarContent] = useState<ActiveSidebarContentType>(null);

  const [selectedMarkerForExplorer, setSelectedMarkerForExplorer] = useState<Marker | null>(null); // Renamed
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!isInitialized) return;

    let tempResults = [...allMarkers];

    // Apply set filter
    if (selectedSetId === '__owned__') {
      if (ownedSetIds.length === 0) {
        tempResults = []; 
      } else {
        tempResults = tempResults.filter(marker => marker.setIds.some(sid => ownedSetIds.includes(sid)));
      }
    } else if (selectedSetId) { 
      tempResults = tempResults.filter(marker => marker.setIds.includes(selectedSetId));
    }
    

    // Apply color category filter
    if (selectedColorCategory) {
      tempResults = tempResults.filter(marker =>
        isColorInCategory(marker.hex, selectedColorCategory.hex)
      );
    }

    // Apply search term filter for palette view
    if (searchTerm.trim() !== '' && activePageContent === 'palette') {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempResults = tempResults.filter(
        (marker) =>
          marker.name.toLowerCase().includes(lowerSearchTerm) ||
          marker.id.toLowerCase().includes(lowerSearchTerm) ||
          (marker.hex && marker.hex.toLowerCase().includes(lowerSearchTerm))
      );
    }

    // Apply sort order
    if (sortOrder === 'hue') {
      tempResults.sort((a, b) => {
        const hueA = getHueFromHex(a.hex);
        const hueB = getHueFromHex(b.hex);

        if (hueA === hueB) {
          const rgbA = hexToRgb(a.hex);
          const rgbB = hexToRgb(b.hex);

          if (rgbA && rgbB) {
            const hslA = rgbToHsl(rgbA.r, rgbA.g, rgbA.b);
            const hslB = rgbToHsl(rgbB.r, rgbB.g, rgbB.b);
            
            if (hslA.s >= 0.1 && hslB.s >= 0.1) { 
              return hslA.l - hslB.l; 
            }
            return 0;
          }
          return 0;
        }
        return hueA - hueB; 
      });
    } else if (sortOrder === 'id') {
      tempResults.sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortOrder === 'name') {
      tempResults.sort((a, b) => a.name.localeCompare(b.name));
    }

    setDisplayedMarkers(tempResults);

  }, [searchTerm, selectedColorCategory, selectedSetId, allMarkers, isInitialized, activePageContent, sortOrder, ownedSetIds]);


  const handleSetFilterChange = (setId: SetFilterValue) => {
    setSelectedSetId(setId);
  };

  const handleColorCategorySelect = (category: { name: string; hex: string } | null) => {
    if (selectedColorCategory?.name === category?.name) {
      setSelectedColorCategory(null); 
    } else {
      setSelectedColorCategory(category);
    }
  };

  const handleSelectMarkerForExplorer = (marker: Marker) => { // Renamed
    setSelectedMarkerForExplorer(marker);
    setActivePageContent('explorer');
    setActiveSidebarContent(null);
  };

  const clearSelectedMarkerForExplorer = () => { // Renamed
    setSelectedMarkerForExplorer(null);
  }


  const handleNavigateToPaletteWithSetFilter = (setId: string) => {
    setActivePageContent('palette');
    setSelectedSetId(setId);
    setSelectedColorCategory(null); 
    setSearchTerm(''); 
  };


  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Palette className="h-16 w-16 text-primary animate-pulse" />
        <p className="ml-4 text-xl text-foreground">Loading Ohuhu Harmony...</p>
      </div>
    );
  }
  const isPaletteView = activePageContent === 'palette';

  const renderMainPageContent = () => {
    switch (activePageContent) {
      case 'palette':
        return <MarkerGrid
                  markers={displayedMarkers}
                  markerSets={markerSets}
                  onSelectMarkerForShades={handleSelectMarkerForExplorer} // Updated prop name
                  ownedSetIds={ownedSetIds}
                />;
      case 'explorer':
        return <div className="p-4 md:p-6 max-w-2xl mx-auto">
                 <ColorExplorer 
                    inventory={allMarkers} 
                    initialSelectedMarker={selectedMarkerForExplorer}
                    onClearSelectedMarker={clearSelectedMarkerForExplorer}
                  />
               </div>;
      case 'sets':
        return <ManageSetsPage onViewSetActive={handleNavigateToPaletteWithSetFilter} />;
      default:
        return <MarkerGrid
                  markers={displayedMarkers}
                  markerSets={markerSets}
                  onSelectMarkerForShades={handleSelectMarkerForExplorer} // Updated prop name
                  ownedSetIds={ownedSetIds}
                />;
    }
  };

  const renderSidebarWidget = () => {
    return <p className="p-4 text-center text-sm text-muted-foreground">Select a tool or navigate using the main panel.</p>;
  };

  interface SidebarButtonConfig {
    id: ActivePageContentType | 'view_palette';
    name: string;
    Icon: LucideIcon;
    action: () => void;
    type: 'main' | 'navigation';
  }

  const sidebarButtons: SidebarButtonConfig[] = [
    { id: 'view_palette', name: "My Palette", Icon: LayoutGrid, type: 'navigation', action: () => { setActivePageContent('palette'); setActiveSidebarContent(null); setSelectedMarkerForExplorer(null); setSearchTerm(''); }},
    { id: 'explorer', name: "Color Explorer", Icon: Compass, type: 'main', action: () => { setActivePageContent('explorer'); setActiveSidebarContent(null); setSearchTerm(''); }}, // Updated
    { id: 'sets', name: "My Sets", Icon: Library, type: 'main', action: () => { setActivePageContent('sets'); setActiveSidebarContent(null); setSelectedMarkerForExplorer(null); setSearchTerm(''); }},
  ];

  const getHeaderTitle = () => {
    if (activePageContent === 'palette') return "My Marker Palette";
    if (activePageContent === 'sets') return "My Sets";
    if (activePageContent === 'explorer') return "Color Explorer"; // New
    const activeButton = sidebarButtons.find(btn => btn.id === activePageContent);
    return activeButton ? activeButton.name : "Ohuhu Harmony";
  };


  const sortOrderLabels: Record<SortOrder, string> = {
    hue: 'By Color',
    id: 'By ID',
    name: 'By Name',
  };

  const getSetFilterLabel = () => {
    if (selectedSetId === '__owned__') {
      return "Set: Only Owned";
    }
    if (selectedSetId) {
      const set = markerSets.find(s => s.id === selectedSetId);
      return `Set: ${set ? set.name : 'Unknown'}`;
    }
    return "Filter Set";
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
                {activeSidebarContent ? renderSidebarWidget() : <p className="p-4 text-center text-sm text-muted-foreground">Tools open in the main view.</p>}
              </div>
            </ScrollArea>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t group-data-[collapsible=icon]:hidden">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Ohuhu Harmony</p>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 bg-background flex flex-col">
          <header className="sticky top-0 z-10 flex h-auto flex-col gap-2 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 py-3">
            <div className="flex h-10 items-center">
              <SidebarTrigger className="md:hidden mr-2">
                  <Menu />
                  <span className="sr-only">Toggle Sidebar</span>
              </SidebarTrigger>
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-foreground whitespace-nowrap">{getHeaderTitle()}</h2>
                {isPaletteView && (
                  <span className="ml-2 text-sm text-muted-foreground">({displayedMarkers.length} marker{displayedMarkers.length === 1 ? '' : 's'})</span>
                )}
              </div>
            </div>

            {isPaletteView && (
              <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
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
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Filter by color category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {COMMON_COLORS_FILTER.map((color) => (
                      <DropdownMenuCheckboxItem
                        key={color.name}
                        checked={selectedColorCategory?.name === color.name}
                        onSelect={(event) => {
                           event.preventDefault();
                           handleColorCategorySelect(selectedColorCategory?.name === color.name ? null : { name: color.name, hex: color.hexBase });
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
                        {getSetFilterLabel()}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Filter by marker set</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={selectedSetId === null}
                      onSelect={(event) => {
                        event.preventDefault();
                        handleSetFilterChange(null);
                      }}
                    >
                      All Sets
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedSetId === '__owned__'}
                      disabled={ownedSetIds.length === 0}
                      onSelect={(event) => {
                        event.preventDefault();
                        handleSetFilterChange(selectedSetId === '__owned__' ? null : '__owned__');
                      }}
                    >
                      Only My Owned Sets
                    </DropdownMenuCheckboxItem>
                    {markerSets.map((set) => (
                      <DropdownMenuCheckboxItem
                        key={set.id}
                        checked={selectedSetId === set.id}
                        onSelect={(event) => {
                          event.preventDefault();
                          handleSetFilterChange(selectedSetId === set.id ? null : set.id);
                        }}
                      >
                        {set.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <SortAsc className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Sort: {sortOrderLabels[sortOrder]}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Sort markers by</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
                      <DropdownMenuRadioItem value="hue">By Color</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="id">By ID</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="name">By Name</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="relative flex-1 md:grow-0 max-w-xs ml-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search markers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[320px]"
                  />
                </div>
              </div>
            )}
          </header>
          <main className="flex-1 overflow-auto">
             {renderMainPageContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
