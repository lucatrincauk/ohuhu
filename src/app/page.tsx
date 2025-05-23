
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
import { ColorFilter } from '@/components/filters/color-filter';
import { SetFilter } from '@/components/filters/set-filter';
import { EditMarkerDialog } from '@/components/markers/edit-marker-dialog';
import { useMarkerData } from '@/hooks/use-marker-data';
import type { Marker } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Palette, PlusSquare, SearchCode, Layers, ListFilter, PanelLeft, Search, Tags, Edit, LayoutGrid } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import type { LucideIcon } from 'lucide-react';


type ActivePageContentType = 'palette' | 'add' | 'similar' | 'shades';
type ActiveSidebarContentType = 'filter' | 'setFilter' | null;

// Helper functions for color conversion and hue extraction (remains unchanged)
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
    return hsl.h + 360 + (1-hsl.l) * 100; // Group greys, sort by inverted lightness
  }
  return hsl.h;
}


export default function OhuhuHarmonyPage() {
  const { markers: allMarkers, markerSets, addMarker, updateMarker, isInitialized } = useMarkerData();
  const [displayedMarkers, setDisplayedMarkers] = useState<Marker[]>([]);
  const [markersFilteredByColor, setMarkersFilteredByColor] = useState<Marker[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  
  const [activePageContent, setActivePageContent] = useState<ActivePageContentType>('palette');
  const [activeSidebarContent, setActiveSidebarContent] = useState<ActiveSidebarContentType>(null);
  
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

    if (selectedSetId) {
      tempResults = tempResults.filter(marker => marker.setId === selectedSetId);
    }
    
    const baseForColorFilter = selectedSetId ? allMarkers.filter(m => m.setId === selectedSetId) : allMarkers;
    const isColorFilterActiveViaSidebarTool = activeSidebarContent === 'filter';

    // Only apply markersFilteredByColor if it's actually narrower than the current base (set-filtered or all)
    // OR if the 'filter' tool is the active sidebar content, implying user is interacting with it.
    if (markersFilteredByColor.length < baseForColorFilter.length || isColorFilterActiveViaSidebarTool) {
        const colorFilteredIds = new Set(markersFilteredByColor.map(m => m.id));
        tempResults = tempResults.filter(marker => colorFilteredIds.has(marker.id));
    }
    
    if (searchTerm.trim() !== '' && activePageContent === 'palette') { // Only search when palette is active
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempResults = tempResults.filter(
        (marker) =>
          marker.name.toLowerCase().includes(lowerSearchTerm) ||
          marker.id.toLowerCase().includes(lowerSearchTerm) ||
          marker.hex.toLowerCase().includes(lowerSearchTerm)
      );
    }

    tempResults.sort((a, b) => {
      const hueA = getHueFromHex(a.hex);
      const hueB = getHueFromHex(b.hex);
      if (hueA !== hueB) return hueA - hueB;
      
      // If hues are the same (especially for greys or very similar colors), sort by lightness
      const rgbA = hexToRgb(a.hex);
      const rgbB = hexToRgb(b.hex);
      if (rgbA && rgbB) {
        const hslA = rgbToHsl(rgbA.r, rgbA.g, rgbA.b);
        const hslB = rgbToHsl(rgbB.r, rgbB.g, rgbB.b);
         // For greys/low saturation, sort by lightness
        if (hslA.s < 0.1 && hslB.s < 0.1) return hslA.l - hslB.l;
        // For colors with similar hue, sort by saturation then lightness
        if (Math.abs(hslA.h - hslB.h) < 5) { // within 5 degrees of hue
            if(Math.abs(hslA.s - hslB.s) > 0.05) return hslA.s - hslB.s;
            return hslA.l - hslB.l;
        }
      }
      return 0;
    });
    
    setDisplayedMarkers(tempResults);

  }, [searchTerm, markersFilteredByColor, selectedSetId, allMarkers, isInitialized, activePageContent, activeSidebarContent]);


  const handleColorFilterChange = (filteredMarkersFromColorTool: Marker[]) => {
    let baseMarkersForColorFilter = allMarkers;
    if (selectedSetId) {
        baseMarkersForColorFilter = allMarkers.filter(marker => marker.setId === selectedSetId);
    }
    
    if (filteredMarkersFromColorTool.length <= baseMarkersForColorFilter.length) { 
         setMarkersFilteredByColor(filteredMarkersFromColorTool);
    } else {
        setMarkersFilteredByColor(baseMarkersForColorFilter);
    }
  };

  const handleSetFilterChange = (setId: string | null) => {
    setSelectedSetId(setId);
    const newBaseForColorFilter = setId ? allMarkers.filter(marker => marker.setId === setId) : allMarkers;
    // Reset color filter when set changes to avoid showing empty if color filter doesn't match new set
    setMarkersFilteredByColor(newBaseForColorFilter); 
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
    const markersForColorFilterTool = selectedSetId 
      ? allMarkers.filter(marker => marker.setId === selectedSetId) 
      : allMarkers;

    switch (activeSidebarContent) {
      case 'filter':
        return <ColorFilter allMarkers={markersForColorFilterTool} onFilterChange={handleColorFilterChange} />;
      case 'setFilter':
        return <SetFilter markerSets={markerSets} onSetSelect={handleSetFilterChange} currentSetId={selectedSetId} />;
      default:
        return <p className="p-4 text-center text-sm text-muted-foreground">Select a filter tool above, or navigate using the main panel tools.</p>;
    }
  };

  interface SidebarButtonConfig {
    id: ActivePageContentType | ActiveSidebarContentType | 'view_palette';
    name: string;
    Icon: LucideIcon;
    action: () => void;
    type: 'main' | 'sidebarWidget' | 'navigation';
  }
  
  const sidebarButtons: SidebarButtonConfig[] = [
    { id: 'view_palette', name: "My Palette", Icon: LayoutGrid, type: 'navigation', action: () => { setActivePageContent('palette'); setActiveSidebarContent(null); setSelectedMarkerForShades(null); setSearchTerm(''); }},
    { id: 'add', name: "Add Marker", Icon: PlusSquare, type: 'main', action: () => { setActivePageContent('add'); setActiveSidebarContent(null); setSelectedMarkerForShades(null); setSearchTerm(''); }},
    { id: 'similar', name: "Similar Colors", Icon: SearchCode, type: 'main', action: () => { setActivePageContent('similar'); setActiveSidebarContent(null); setSelectedMarkerForShades(null); setSearchTerm(''); }},
    { id: 'shades', name: "Shade Variations", Icon: Layers, type: 'main', action: () => { setActivePageContent('shades'); setActiveSidebarContent(null); /* setSelectedMarkerForShades is preserved if already set, or user clicks card */ setSearchTerm(''); }},
    { id: 'filter', name: "Filter by Color", Icon: ListFilter, type: 'sidebarWidget', action: () => { 
        setActivePageContent('palette'); 
        setActiveSidebarContent('filter'); 
        setSelectedMarkerForShades(null);
        const currentBaseForColorFilter = selectedSetId ? allMarkers.filter(m => m.setId === selectedSetId) : allMarkers;
        setMarkersFilteredByColor(currentBaseForColorFilter); // Reset color filter to base on activating tool
        setSearchTerm('');
      }},
    { id: 'setFilter', name: "Filter by Set", Icon: Tags, type: 'sidebarWidget', action: () => { 
        setActivePageContent('palette'); 
        setActiveSidebarContent('setFilter'); 
        setSelectedMarkerForShades(null); 
        setSearchTerm('');
      }},
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
                      (activeSidebarContent === button.id && button.type === 'sidebarWidget') ||
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
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <SidebarTrigger className="md:hidden">
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
