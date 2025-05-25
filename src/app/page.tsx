
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
import type { AddMarkerFormValues } from '@/components/markers/add-marker-form';
import { MarkerGrid } from '@/components/markers/marker-grid';
import { SimilarColorFinder } from '@/components/tools/similar-color-finder';
import { ShadeVariationGenerator } from '@/components/tools/shade-variation-generator';
import { ManageSetsPage } from '@/components/profile/manage-sets';
import { useMarkerData } from '@/hooks/use-marker-data';
import type { Marker } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Palette, PlusSquare, SearchCode, Layers, ListFilter, PanelLeft, Search, Tags, LayoutGrid, ChevronDown, Library, SortAsc } from 'lucide-react';
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


type ActivePageContentType = 'palette' | 'add' | 'similar' | 'shades' | 'sets';
type ActiveSidebarContentType = null;
type SortOrder = 'hue' | 'id' | 'name';


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
  const categoryRgb = hexToRgb(categoryHex);

  if (!markerRgb || !categoryRgb) return false;

  const {r: mr, g: mg, b: mb} = markerRgb;

  // Greyscale categories
  if (categoryHex === "#808080" || categoryHex === "#000000" || categoryHex === "#FFFFFF") {
     const luminance = 0.2126 * mr + 0.7152 * mg + 0.0722 * mb;
     const hslMarker = rgbToHsl(mr, mg, mb);
     const saturation = hslMarker.s;

     if (categoryHex === "#000000") return luminance < 50 && saturation < 0.15;
     if (categoryHex === "#FFFFFF") return luminance > 220 && saturation < 0.15;
     if (categoryHex === "#808080") return saturation < 0.15 && luminance >=50 && luminance <=220;
  }

  // Color categories
  const {r: cr, g: cg, b: cb} = categoryRgb;

  const markerHsl = rgbToHsl(mr, mg, mb);
  const categoryHsl = rgbToHsl(cr, cg, cb);

  const saturationThreshold = 0.15; // Only consider colors with some saturation

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
  if (categoryHex === "#FFC0CB") { // Pink
    return ((markerHsl.h >= 315 && markerHsl.h < 345) || (markerHsl.h < 15 && markerHsl.l > 0.6)) && markerHsl.s > saturationThreshold;
  }
   if (categoryHex === "#A52A2A") { // Brown
    // Brown is tricky: low-ish saturation, mid-to-low lightness, in orange/red hue range
    return ((markerHsl.h >= 0 && markerHsl.h < 45) || (markerHsl.h >=340 && markerHsl.h <=360))  && markerHsl.s > 0.1 && markerHsl.s < 0.6 && markerHsl.l < 0.6 && markerHsl.l > 0.1;
  }

  // Fallback for other potential categories, though the common ones are handled above
  let hueDiff = Math.abs(markerHsl.h - categoryHsl.h);
  if (hueDiff > 180) hueDiff = 360 - hueDiff; // Handle hue wrapping around 360
  const hueThreshold = 30; // Degrees
  return hueDiff <= hueThreshold && markerHsl.s > saturationThreshold;
}


export default function OhuhuHarmonyPage() {
  const { markers: allMarkers, markerSets, addMarker, isInitialized, ownedSetIds } = useMarkerData();
  const [displayedMarkers, setDisplayedMarkers] = useState<Marker[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [selectedColorCategory, setSelectedColorCategory] = useState<{ name: string; hex: string } | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('hue');
  const [showOnlyOwned, setShowOnlyOwned] = useState<boolean>(false);

  const [activePageContent, setActivePageContent] = useState<ActivePageContentType>('palette');
  const [activeSidebarContent, setActiveSidebarContent] = useState<ActiveSidebarContentType>(null);

  const [selectedMarkerForShades, setSelectedMarkerForShades] = useState<Marker | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!isInitialized) return;

    let tempResults = [...allMarkers];

    if (selectedSetId) {
      tempResults = tempResults.filter(marker => marker.setId === selectedSetId);
    }

    if (selectedColorCategory) {
      tempResults = tempResults.filter(marker =>
        isColorInCategory(marker.hex, selectedColorCategory.hex)
      );
    }

    if (showOnlyOwned) {
      if (ownedSetIds.length === 0) {
        tempResults = []; // Show no markers if "show only owned" is on but no sets are owned
      } else {
        tempResults = tempResults.filter(marker => ownedSetIds.includes(marker.setId));
      }
    }

    if (searchTerm.trim() !== '' && activePageContent === 'palette') {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempResults = tempResults.filter(
        (marker) =>
          marker.name.toLowerCase().includes(lowerSearchTerm) ||
          marker.id.toLowerCase().includes(lowerSearchTerm) ||
          (marker.hex && marker.hex.toLowerCase().includes(lowerSearchTerm))
      );
    }

    if (sortOrder === 'hue') {
      tempResults.sort((a, b) => {
        const hueA = getHueFromHex(a.hex);
        const hueB = getHueFromHex(b.hex);
        return hueA - hueB;
      });
    } else if (sortOrder === 'id') {
      tempResults.sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortOrder === 'name') {
      tempResults.sort((a, b) => a.name.localeCompare(b.name));
    }

    setDisplayedMarkers(tempResults);

  }, [searchTerm, selectedColorCategory, selectedSetId, allMarkers, isInitialized, activePageContent, sortOrder, showOnlyOwned, ownedSetIds]);


  const handleSetFilterChange = (setId: string | null) => {
    setSelectedSetId(setId);
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
    setActiveSidebarContent(null); // Ensure sidebar content clears
  };

  const clearSelectedMarkerForShades = () => {
    setSelectedMarkerForShades(null);
  }

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
                  markerSets={markerSets}
                  onSelectMarkerForShades={handleSelectMarkerForShades}
                  ownedSetIds={ownedSetIds}
                />;
      case 'add':
        return <div className="p-4 md:p-6 max-w-2xl mx-auto"><AddMarkerForm markerSets={markerSets} onAddMarker={handleAddMarkerAndReturnToPalette} /></div>;
      case 'similar':
        return <div className="p-4 md:p-6 max-w-2xl mx-auto"><SimilarColorFinder inventory={allMarkers} /></div>;
      case 'shades':
        return <div className="p-4 md:p-6 max-w-2xl mx-auto"><ShadeVariationGenerator inventory={allMarkers} selectedMarkerForShades={selectedMarkerForShades} onClearSelectedMarker={clearSelectedMarkerForShades} /></div>;
      case 'sets':
        return <ManageSetsPage />;
      default:
        return <MarkerGrid
                  markers={displayedMarkers}
                  markerSets={markerSets}
                  onSelectMarkerForShades={handleSelectMarkerForShades}
                  ownedSetIds={ownedSetIds}
                />;
    }
  };

  const renderSidebarWidget = () => {
    // Sidebar no longer renders active tools, just a generic message or specific filter UIs.
    // For now, a simple message. This area can be enhanced later if needed.
    return <p className="p-4 text-center text-sm text-muted-foreground">Select a tool or navigate using the main panel.</p>;
  };

  interface SidebarButtonConfig {
    id: ActivePageContentType | 'view_palette'; // 'view_palette' is a special id for navigation
    name: string;
    Icon: LucideIcon;
    action: () => void;
    type: 'main' | 'navigation'; // 'navigation' type for buttons that just change the page content
  }

  const sidebarButtons: SidebarButtonConfig[] = [
    { id: 'view_palette', name: "My Palette", Icon: LayoutGrid, type: 'navigation', action: () => { setActivePageContent('palette'); setActiveSidebarContent(null); setSelectedMarkerForShades(null); setSearchTerm(''); }},
    { id: 'add', name: "Add Marker", Icon: PlusSquare, type: 'main', action: () => { setActivePageContent('add'); setActiveSidebarContent(null); setSelectedMarkerForShades(null); setSearchTerm(''); }},
    { id: 'similar', name: "Similar Colors", Icon: SearchCode, type: 'main', action: () => { setActivePageContent('similar'); setActiveSidebarContent(null); setSelectedMarkerForShades(null); setSearchTerm(''); }},
    { id: 'shades', name: "Shade Variations", Icon: Layers, type: 'main', action: () => { setActivePageContent('shades'); setActiveSidebarContent(null); setSearchTerm(''); }}, // selectedMarkerForShades will be set via MarkerCard
    { id: 'sets', name: "My Sets", Icon: Library, type: 'main', action: () => { setActivePageContent('sets'); setActiveSidebarContent(null); setSelectedMarkerForShades(null); setSearchTerm(''); }},
  ];

  const getHeaderTitle = () => {
    if (activePageContent === 'palette') return "My Marker Palette";
    if (activePageContent === 'sets') return "My Sets";
    const activeButton = sidebarButtons.find(btn => btn.id === activePageContent);
    return activeButton ? activeButton.name : "Ohuhu Harmony"; // Fallback title
  };

  const isPaletteView = activePageContent === 'palette';

  const sortOrderLabels: Record<SortOrder, string> = {
    hue: 'By Color',
    id: 'By ID',
    name: 'By Name',
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
                      (activePageContent === 'palette' && button.id === 'view_palette') // Highlight "My Palette" if active
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
                {/* Conditionally render sidebar content or a default message */}
                {activeSidebarContent ? renderSidebarWidget() : <p className="p-4 text-center text-sm text-muted-foreground">Tools open in the main view.</p>}
              </div>
            </ScrollArea>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t group-data-[collapsible=icon]:hidden">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Ohuhu Harmony</p>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 bg-background flex flex-col">
          {/* Main Header: Title, Search (conditionally), Filters (conditionally) */}
          <header className="sticky top-0 z-10 flex h-auto flex-col gap-2 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 py-3">
            {/* First Row: Toggle, Title, Marker Count, Show Owned Toggle */}
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
              {isPaletteView && (
                <div className="flex items-center space-x-2 ml-auto">
                  <Switch
                    id="show-only-owned"
                    checked={showOnlyOwned}
                    onCheckedChange={setShowOnlyOwned}
                    disabled={ownedSetIds.length === 0}
                    aria-label="Show only owned markers"
                  />
                  <Label
                    htmlFor="show-only-owned"
                    className={cn(
                      "text-sm",
                      ownedSetIds.length === 0 ? "text-muted-foreground cursor-not-allowed" : "cursor-pointer"
                    )}
                  >
                    Show only owned
                  </Label>
                </div>
              )}
            </div>

            {/* Second Row: Filters and Search Bar (only for palette view) */}
            {isPaletteView && (
              <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
                {/* Color Filter Dropdown */}
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
                           event.preventDefault(); // Prevent closing menu
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

                {/* Set Filter Dropdown */}
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
                  <DropdownMenuContent align="start">
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
                          handleSetFilterChange(selectedSetId === set.id ? null : set.id);
                        }}
                      >
                        {set.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Sort Order Dropdown */}
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

                {/* Search Input - Pushed to the right */}
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

    