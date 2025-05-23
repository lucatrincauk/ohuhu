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
import { useMarkerData } from '@/hooks/use-marker-data';
import type { Marker } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Palette, PlusSquare, SearchCode, Layers, ListFilter, PanelLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';


type ActiveTool = 'add' | 'similar' | 'shades' | 'filter' | null;

export default function OhuhuHarmonyPage() {
  const { markers: allMarkers, markerSets, addMarker, isInitialized, getMarkerById, setMarkers: setDisplayedMarkersHook } = useMarkerData();
  const [displayedMarkers, setDisplayedMarkers] = useState<Marker[]>([]);
  const [activeTool, setActiveTool] = useState<ActiveTool>('add');
  const [selectedMarkerForShades, setSelectedMarkerForShades] = useState<Marker | null>(null);

  useEffect(() => {
    if (isInitialized) {
      setDisplayedMarkers(allMarkers);
    }
  }, [allMarkers, isInitialized]);

  const handleFilterChange = (filteredMarkers: Marker[]) => {
    setDisplayedMarkers(filteredMarkers);
  };

  const handleSelectMarkerForShades = (marker: Marker) => {
    setSelectedMarkerForShades(marker);
    setActiveTool('shades'); // Switch to shades tool when a marker is selected from grid
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
        return <ColorFilter allMarkers={allMarkers} onFilterChange={handleFilterChange} />;
      default:
        return <p className="p-4 text-center text-muted-foreground">Select a tool from the menu.</p>;
    }
  };

  const toolIcons = {
    add: PlusSquare,
    similar: SearchCode,
    shades: Layers,
    filter: ListFilter,
  };

  const toolNames = {
    add: "Add Marker",
    similar: "Similar Colors",
    shades: "Shade Variations",
    filter: "Filter Colors",
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
                {(['add', 'similar', 'shades', 'filter'] as ActiveTool[]).map(toolKey => {
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
                        if (toolKey !== 'shades') setSelectedMarkerForShades(null); // Clear selection if not shades tool
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
            <h2 className="text-lg font-semibold text-foreground">My Marker Palette</h2>
          </header>
          <main className="flex-1 overflow-auto">
             <MarkerGrid markers={displayedMarkers} onSelectMarkerForShades={handleSelectMarkerForShades} />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
