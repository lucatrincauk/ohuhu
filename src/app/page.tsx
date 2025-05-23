
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
import { SetFilter } from '@/components/filters/set-filter'; // New Import
import { useMarkerData } from '@/hooks/use-marker-data';
import type { Marker } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Palette, PlusSquare, SearchCode, Layers, ListFilter, PanelLeft, Search, Tags } from 'lucide-react'; // Added Tags
import { ScrollArea } from '@/components/ui/scroll-area';


type ActiveTool = 'add' | 'similar' | 'shades' | 'filter' | 'setFilter' | null; // Added setFilter

export default function OhuhuHarmonyPage() {
  const { markers: allMarkers, markerSets, addMarker, isInitialized } = useMarkerData();
  const [displayedMarkers, setDisplayedMarkers] = useState<Marker[]>([]);
  const [markersFilteredByColor, setMarkersFilteredByColor] = useState<Marker[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null); // New state for set filter
  const [activeTool, setActiveTool] = useState<ActiveTool>('add');
  const [selectedMarkerForShades, setSelectedMarkerForShades] = useState<Marker | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (isInitialized) {
      setMarkersFilteredByColor(allMarkers); // Initialize with all markers
    }
  }, [allMarkers, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    let tempResults = [...allMarkers];

    // 1. Apply Set Filter
    if (selectedSetId) {
      tempResults = tempResults.filter(marker => marker.setId === selectedSetId);
    }

    // 2. Apply Color Category Filter (using the list from ColorFilter tool)
    // markersFilteredByColor holds the markers filtered by the ColorFilter component.
    // If ColorFilter hasn't effectively filtered (i.e., it's showing all markers it received, or all markers if it's reset),
    // its output list (markersFilteredByColor) will be equivalent to what it was given.
    // A simple check is if its length is less than allMarkers.length, indicating it has filtered.
    const isColorFilterToolActive = markersFilteredByColor.length < allMarkers.length;
    if (isColorFilterToolActive) {
      // We need markers that are in tempResults AND in markersFilteredByColor
      const colorFilteredIds = new Set(markersFilteredByColor.map(m => m.id));
      tempResults = tempResults.filter(marker => colorFilteredIds.has(marker.id));
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
    setDisplayedMarkers(tempResults);

  }, [searchTerm, markersFilteredByColor, selectedSetId, allMarkers, isInitialized]);


  const handleColorFilterChange = (filteredMarkersFromColorTool: Marker[]) => {
    setMarkersFilteredByColor(filteredMarkersFromColorTool);
  };

  const handleSetFilterChange = (setId: string | null) => {
    setSelectedSetId(setId);
  };

  const handleSelectMarkerForShades = (marker: Marker) => {
    setSelectedMarkerForShades(marker);
    setActiveTool('shades');
  };
  
  const clearSelectedMarkerForShades = () => {
    setSelectedMarkerForShades(null);
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Palette className="h-16 w-16 text-primary animate-pulse" />
        <p className="ml-4 text-xl text-foreground">Loading Ohuhu Harmony...</p>
      </div>
    );
  }
  
  const renderTool = () => {
    switch (activeTool) {
      case 'add':
        return <AddMarkerForm markerSets={markerSets} onAddMarker={addMarker} />;
      case 'similar':
        return <SimilarColorFinder inventory={allMarkers} />;
      case 'shades':
        return <ShadeVariationGenerator inventory={allMarkers} selectedMarkerForShades={selectedMarkerForShades} onClearSelectedMarker={clearSelectedMarkerForShades} />;
      case 'filter':
        return <ColorFilter allMarkers={allMarkers} onFilterChange={handleColorFilterChange} />;
      case 'setFilter': // New case
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
    setFilter: Tags, // New icon
  };

  const toolNames = {
    add: "Add Marker",
    similar: "Similar Colors",
    shades: "Shade Variations",
    filter: "Filter by Color", // Renamed for clarity
    setFilter: "Filter by Set", // New name
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
                {(['add', 'similar', 'shades', 'filter', 'setFilter'] as ActiveTool[]).map(toolKey => { // Added setFilter
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
            <h2 className="text-lg font-semibold text-foreground whitespace-nowrap">My Marker Palette</h2>
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
             <MarkerGrid markers={displayedMarkers} onSelectMarkerForShades={handleSelectMarkerForShades} />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
