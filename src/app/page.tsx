
"use client";

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/core/app-logo';
import { MarkerGrid } from '@/components/markers/marker-grid';
import { ColorExplorer } from '@/components/tools/color-explorer';
import { ManageSetsPage } from '@/components/profile/manage-sets';
import { ManagePalettesPage } from '@/components/palettes/manage-palettes';
import { useMarkerData } from '@/hooks/use-marker-data';
import type { Marker, MarkerSet, MarkerPalette } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, Search, Tags, LayoutGrid, ChevronDown, Library, Compass, ListFilter, SortAsc, Heart as HeartIcon, PlusCircle, SwatchBook, Users, FilterX } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import { sort } from 'color-sorter';
import { ThemeToggleInSidebar } from '@/components/core/theme-toggle';

const PALETTE_FILTER_SET_ID_KEY = 'ohuhuHarmony_paletteFilterSetId';
const PALETTE_FILTER_COLOR_CATEGORY_KEY = 'ohuhuHarmony_paletteFilterColorCategory';
const PALETTE_FILTER_PALETTE_ID_KEY = 'ohuhuHarmony_paletteFilterPaletteId';
const PALETTE_SORT_ORDER_KEY = 'ohuhuHarmony_paletteSortOrder';


type ActivePageContentType = 'palette' | 'explorer' | 'sets' | 'palettes'; // Changed from 'groups' to 'palettes'
type SortOrder = 'hue' | 'id' | 'name';
type SetFilterValue = string | null | '__owned__' | '__missing__' | '__favorites__';


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


function isColorInCategory(markerHex: string, categoryHex: string): boolean {
  const markerRgb = hexToRgb(markerHex);
  if (!markerRgb) return false;

  const { r: mr, g: mg, b: mb } = markerRgb;
  const markerHsl = rgbToHsl(mr, mg, mb);

  const sThresholdChromatic = 0.10;
  const sThresholdGrey = 0.20;

  if (categoryHex === "#000000") { // Black
    return markerHsl.l < 0.20 && markerHsl.s < sThresholdGrey;
  }
  if (categoryHex === "#FFFFFF") { // White
    return markerHsl.l > 0.90 && markerHsl.s < sThresholdGrey;
  }
  if (categoryHex === "#808080") { // Grey
    return markerHsl.s < sThresholdGrey && (markerHsl.l >= 0.20 && markerHsl.l <= 0.90);
  }

  // Chromatic colors
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

function AppContent() {
  const { markers: allMarkers, markerSets, isInitialized, ownedSetIds, getMarkerById, favoriteMarkerIds, toggleFavoriteMarker, markerPalettes } = useMarkerData();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isMobile, setOpenMobile } = useSidebar();

  const [displayedMarkers, setDisplayedMarkers] = useState<Marker[]>([]);

  const [selectedSetId, setSelectedSetId] = useState<SetFilterValue>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(PALETTE_FILTER_SET_ID_KEY);
      if (stored === null || stored === '__owned__' || stored === '__missing__' || stored === '__favorites__') {
        return stored as SetFilterValue;
      }
      if (typeof stored === 'string' && stored.length > 0) return stored;
    }
    return null;
  });

  const [selectedColorCategory, setSelectedColorCategory] = useState<{ name: string; hex: string } | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(PALETTE_FILTER_COLOR_CATEGORY_KEY);
      try {
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [selectedPaletteId, setSelectedPaletteId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(PALETTE_FILTER_PALETTE_ID_KEY) || null;
    }
    return null;
  });

  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(PALETTE_SORT_ORDER_KEY);
      return stored ? (stored as SortOrder) : 'hue';
    }
    return 'hue';
  });


  const [activePageContent, setActivePageContent] = useState<ActivePageContentType>('palette');
  const [selectedMarkerForExplorer, setSelectedMarkerForExplorer] = useState<Marker | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');


  useEffect(() => {
    const queryActivePage = searchParams.get('activePage') as ActivePageContentType | null;
    const queryExploreMarkerId = searchParams.get('exploreMarkerId');
    const queryFilterSetId = searchParams.get('filterSetId') as SetFilterValue | null;
    const queryFilterPaletteId = searchParams.get('filterPaletteId') as string | null;


    let newActivePage = activePageContent;
    let newSelectedSetId = selectedSetId;
    let newSelectedMarkerForExplorer = selectedMarkerForExplorer;
    let newSelectedPaletteId = selectedPaletteId;
    let newSelectedColorCategory = selectedColorCategory;
    let newSearchTerm = searchTerm;


    if (queryActivePage) {
      newActivePage = queryActivePage;
    }

    if (queryActivePage === 'explorer' && queryExploreMarkerId) {
      const markerToExplore = getMarkerById(queryExploreMarkerId);
      if (markerToExplore) {
        newSelectedMarkerForExplorer = markerToExplore;
        newActivePage = 'explorer';
      }
    } else if ((queryActivePage === 'palette' || !queryActivePage) && queryFilterSetId) {
        newSelectedSetId = queryFilterSetId;
        newActivePage = 'palette';
        newSelectedPaletteId = null; // Reset other filters
        newSelectedColorCategory = null;
        newSearchTerm = '';
    } else if ((queryActivePage === 'palette' || !queryActivePage) && queryFilterPaletteId) {
        newSelectedPaletteId = queryFilterPaletteId;
        newActivePage = 'palette';
        newSelectedSetId = null; // Reset other filters
        newSelectedColorCategory = null;
        newSearchTerm = '';
    }


    if (newActivePage !== activePageContent) setActivePageContent(newActivePage);
    if (newSelectedSetId !== selectedSetId) setSelectedSetId(newSelectedSetId);
    if (newSelectedPaletteId !== selectedPaletteId) setSelectedPaletteId(newSelectedPaletteId);
    if (newSelectedMarkerForExplorer !== selectedMarkerForExplorer) setSelectedMarkerForExplorer(newSelectedMarkerForExplorer);
    if (newSelectedColorCategory !== selectedColorCategory && (queryFilterSetId || queryFilterPaletteId)) setSelectedColorCategory(newSelectedColorCategory);
    if (newSearchTerm !== searchTerm && (queryFilterSetId || queryFilterPaletteId)) setSearchTerm(newSearchTerm);



    if (queryActivePage || queryExploreMarkerId || queryFilterSetId || queryFilterPaletteId) {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.delete('activePage');
        current.delete('exploreMarkerId');
        current.delete('filterSetId');
        current.delete('filterPaletteId');
        const searchString = current.toString();
        const query = searchString ? `?${searchString}` : "";
        router.replace(`${window.location.pathname}${query}`, { scroll: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, getMarkerById, router]);

  // Effect to reset selectedPaletteId if the palette gets deleted
  useEffect(() => {
    if (selectedPaletteId && markerPalettes && !markerPalettes.find(p => p.id === selectedPaletteId)) {
      setSelectedPaletteId(null);
    }
  }, [selectedPaletteId, markerPalettes]);


  const markersFilteredBySet = useMemo(() => {
    if (!isInitialized) return [];
    let results = [...allMarkers];
    if (selectedSetId === '__owned__') {
      if (ownedSetIds.length === 0) return [];
      results = results.filter(marker => marker.setIds.some(sid => ownedSetIds.includes(sid)));
    } else if (selectedSetId === '__missing__') {
      if (ownedSetIds.length === 0) { /* show all if no sets are owned */ }
      else {
        results = results.filter(marker => !marker.setIds.some(sid => ownedSetIds.includes(sid)));
      }
    } else if (selectedSetId === '__favorites__') {
      results = results.filter(marker => favoriteMarkerIds.includes(marker.id));
    } else if (selectedSetId) {
      results = results.filter(marker => marker.setIds.includes(selectedSetId));
    }
    return results;
  }, [isInitialized, allMarkers, selectedSetId, ownedSetIds, favoriteMarkerIds]);

  const markersFilteredBySetAndPalette = useMemo(() => {
    if (!selectedPaletteId) return markersFilteredBySet;
    const palette = markerPalettes.find(p => p.id === selectedPaletteId);
    if (palette) {
      return markersFilteredBySet.filter(marker => palette.markerIds.includes(marker.id));
    }
    // If selectedPaletteId is set but not found (e.g., palette deleted and useEffect hasn't cleared it yet), return empty
    return [];
  }, [markersFilteredBySet, selectedPaletteId, markerPalettes]);

  const markersFilteredBySetPaletteAndColor = useMemo(() => {
    if (!selectedColorCategory) return markersFilteredBySetAndPalette;
    return markersFilteredBySetAndPalette.filter(marker =>
      marker.hex && isColorInCategory(marker.hex, selectedColorCategory.hex)
    );
  }, [markersFilteredBySetAndPalette, selectedColorCategory]);

  const searchedMarkers = useMemo(() => {
    if (searchTerm.trim() === '' || activePageContent !== 'palette') return markersFilteredBySetPaletteAndColor;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return markersFilteredBySetPaletteAndColor.filter(
      (marker) =>
        marker.name.toLowerCase().includes(lowerSearchTerm) ||
        marker.id.toLowerCase().includes(lowerSearchTerm) ||
        (marker.hex && marker.hex.toLowerCase().includes(lowerSearchTerm))
    );
  }, [markersFilteredBySetPaletteAndColor, searchTerm, activePageContent]);

  const finalDisplayedMarkers = useMemo(() => {
    let results = [...searchedMarkers]; // Make a copy for sorting
    if (sortOrder === 'hue') {
      const hexCodesWithNulls = results.map(marker => marker.hex);
      const validHexCodes = hexCodesWithNulls.filter(hex => hex && hex.startsWith('#')) as string[];

      try {
          const sortedHexCodes = sort(validHexCodes);
          const markerMap = new Map<string, Marker[]>();
          results.forEach(marker => {
            if (marker.hex) {
              const existing = markerMap.get(marker.hex) || [];
              existing.push(marker);
              markerMap.set(marker.hex, existing);
            }
          });
          const sortedMarkersFromMap: Marker[] = [];
          const usedMarkers = new Set<string>();

          sortedHexCodes.forEach(hex => {
            const markersWithThisHex = markerMap.get(hex);
            if (markersWithThisHex) {
              markersWithThisHex.forEach(marker => {
                if (!usedMarkers.has(marker.id)) {
                  sortedMarkersFromMap.push(marker);
                  usedMarkers.add(marker.id);
                }
              });
            }
          });
          results.forEach(marker => {
            if (!usedMarkers.has(marker.id)) {
              sortedMarkersFromMap.push(marker);
            }
          });
          return sortedMarkersFromMap;
      } catch (error) {
        console.error("Error sorting colors with color-sorter:", error);
        return results; // fallback to unsorted on error
      }
    } else if (sortOrder === 'id') {
      results.sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortOrder === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }
    return results;
  }, [searchedMarkers, sortOrder]);

  useEffect(() => {
    if (isInitialized) {
        setDisplayedMarkers(finalDisplayedMarkers);
    } else {
        setDisplayedMarkers([]);
    }
  }, [finalDisplayedMarkers, isInitialized]);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedSetId === null) {
        localStorage.removeItem(PALETTE_FILTER_SET_ID_KEY);
      } else {
        localStorage.setItem(PALETTE_FILTER_SET_ID_KEY, selectedSetId);
      }
    }
  }, [selectedSetId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedColorCategory === null) {
        localStorage.removeItem(PALETTE_FILTER_COLOR_CATEGORY_KEY);
      } else {
        localStorage.setItem(PALETTE_FILTER_COLOR_CATEGORY_KEY, JSON.stringify(selectedColorCategory));
      }
    }
  }, [selectedColorCategory]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedPaletteId === null) {
        localStorage.removeItem(PALETTE_FILTER_PALETTE_ID_KEY);
      } else {
        localStorage.setItem(PALETTE_FILTER_PALETTE_ID_KEY, selectedPaletteId);
      }
    }
  }, [selectedPaletteId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PALETTE_SORT_ORDER_KEY, sortOrder);
    }
  }, [sortOrder]);

  const handleClearAllFilters = () => {
    setSelectedSetId(null);
    setSelectedColorCategory(null);
    setSelectedPaletteId(null);
    setSearchTerm('');
    toast({ title: "Filters Cleared", description: "All palette filters have been reset." });
  };


  const handleSetFilterChange = (setId: SetFilterValue) => {
    setSelectedSetId(setId);
  };

  const handlePaletteFilterChange = (paletteId: string | null) => {
    setSelectedPaletteId(paletteId);
  };

  const handleColorCategorySelect = (category: { name: string; hex: string } | null) => {
    if (selectedColorCategory?.name === category?.name) {
      setSelectedColorCategory(null);
    } else {
      setSelectedColorCategory(category);
    }
  };

  const clearSelectedMarkerForExplorer = () => {
    setSelectedMarkerForExplorer(null);
  }

  const handleNavigateToPaletteWithSetFilter = (setId: string) => {
    setActivePageContent('palette');
    setSelectedSetId(setId);
    setSelectedColorCategory(null);
    setSearchTerm('');
    setSelectedPaletteId(null);
    if (isMobile) setOpenMobile(false);
  };

  const handleOpenMarkerDetail = (marker: Marker) => {
    router.push(`/marker/${marker.id}`);
    if (isMobile) setOpenMobile(false);
  };

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Compass className="h-16 w-16 text-primary animate-pulse" />
        <p className="ml-4 text-xl text-foreground">Loading Ohuhu Harmony...</p>
      </div>
    );
  }
  const isPaletteView = activePageContent === 'palette';

  const getPaletteTitle = () => {
    let title = "All Markers";

    if (selectedSetId === '__favorites__') {
      title = "Favorite Markers";
    } else if (selectedSetId === '__owned__') {
      title = "Owned Markers";
    } else if (selectedSetId === '__missing__') {
      title = "Missing Markers";
    } else if (selectedSetId) {
      const set = markerSets.find(s => s.id === selectedSetId);
      title = set ? `${set.name} Markers` : "Selected Set Markers";
    }

    if (selectedPaletteId) {
      const palette = markerPalettes.find(p => p.id === selectedPaletteId);
      if (palette) {
        if (title === "All Markers") { // If no set filter applied
          title = `Markers in "${palette.name}" Palette`;
        } else { // If a set filter is already applied
           title += ` (in "${palette.name}" Palette)`;
        }
      }
    }

    if (selectedColorCategory) {
      if (title === "All Markers" && !selectedPaletteId) { // No set or palette filter
        title = `${selectedColorCategory.name} Markers`;
      } else {
        // Attempt to insert color name before "Markers" or "Palette"
        const markersIndex = title.lastIndexOf(" Markers");
        const paletteIndex = title.lastIndexOf(" Palette");

        if (markersIndex !== -1 && (paletteIndex === -1 || markersIndex > paletteIndex)) {
          title = title.substring(0, markersIndex) + ` ${selectedColorCategory.name} Markers` + title.substring(markersIndex + " Markers".length);
        } else if (paletteIndex !== -1) {
          title = title.substring(0, paletteIndex) + ` ${selectedColorCategory.name} Palette` + title.substring(paletteIndex + " Palette".length);
        } else { // Fallback if " Markers" or " Palette" not found, append
          title += ` (${selectedColorCategory.name})`;
        }
      }
    }
    

    if (searchTerm.trim() !== '') {
      if (title === "All Markers" && !selectedColorCategory && !selectedPaletteId && !(selectedSetId && selectedSetId !== '__favorites__' && selectedSetId !== '__owned__' && selectedSetId !== '__missing__')) {
        title = `Search results for "${searchTerm.trim()}"`;
      } else {
        title += ` (matching "${searchTerm.trim()}")`;
      }
    }
    return title;
  };


  const renderMainPageContent = () => {
    switch (activePageContent) {
      case 'palette':
        return (
          <>
            <div className="flex items-baseline gap-x-2 px-2 md:px-3 pt-3 mb-2">
              <h3 className="text-lg font-semibold text-foreground">
                {getPaletteTitle()}
              </h3>
              <span className="text-sm text-muted-foreground">
                ({displayedMarkers.length} marker{displayedMarkers.length === 1 ? '' : 's'})
              </span>
            </div>
            <MarkerGrid
              markers={displayedMarkers}
              markerSets={markerSets}
              onMarkerCardClick={handleOpenMarkerDetail}
              ownedSetIds={ownedSetIds}
              favoriteMarkerIds={favoriteMarkerIds}
              onToggleFavorite={toggleFavoriteMarker}
            />
          </>
        );
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
      case 'palettes':
        return <ManagePalettesPage />;
      default:
        return (
           <>
            <div className="flex items-baseline gap-x-2 px-2 md:px-3 pt-3 mb-2">
              <h3 className="text-lg font-semibold text-foreground">
                {getPaletteTitle()}
              </h3>
              <span className="text-sm text-muted-foreground">
                ({displayedMarkers.length} marker{displayedMarkers.length === 1 ? '' : 's'})
              </span>
            </div>
            <MarkerGrid
              markers={displayedMarkers}
              markerSets={markerSets}
              onMarkerCardClick={handleOpenMarkerDetail}
              ownedSetIds={ownedSetIds}
              favoriteMarkerIds={favoriteMarkerIds}
              onToggleFavorite={toggleFavoriteMarker}
            />
          </>
        );
    }
  };

  interface SidebarButtonConfig {
    id: ActivePageContentType | 'view_palette';
    name: string;
    Icon: LucideIcon;
    action: () => void;
    type: 'main' | 'navigation';
  }

  const createSidebarAction = (page: ActivePageContentType, clearExplorer: boolean = true) => {
    return () => {
      setActivePageContent(page);
      if (clearExplorer) setSelectedMarkerForExplorer(null);
      if (isMobile) setOpenMobile(false);
    };
  };

  const sidebarButtons: SidebarButtonConfig[] = [
    { id: 'view_palette', name: "My Markers", Icon: LayoutGrid, type: 'navigation', action: createSidebarAction('palette')},
    { id: 'explorer', name: "Color Explorer", Icon: Compass, type: 'main', action: createSidebarAction('explorer', false) },
    { id: 'sets', name: "My Sets", Icon: Library, type: 'main', action: createSidebarAction('sets')},
    { id: 'palettes', name: "My Palettes", Icon: SwatchBook, type: 'main', action: createSidebarAction('palettes')},
  ];

  const getHeaderTitle = () => {
    if (activePageContent === 'palette') return "My Markers";
    if (activePageContent === 'sets') return "My Sets";
    if (activePageContent === 'explorer') return "Color Explorer";
    if (activePageContent === 'palettes') return "My Palettes"; // Changed from 'groups'
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
    if (selectedSetId === '__missing__') {
      return "Set: Missing Only";
    }
    if (selectedSetId === '__favorites__') {
      return "Set: Favorites Only";
    }
    if (selectedSetId) {
      const set = markerSets.find(s => s.id === selectedSetId);
      return `Set: ${set ? set.name : 'Unknown'}`;
    }
    return "Filter Set";
  };

  const getPaletteFilterLabel = () => {
    if (selectedPaletteId) {
      const palette = markerPalettes.find(p => p.id === selectedPaletteId);
      return `Palette: ${palette ? palette.name : 'Unknown'}`;
    }
    return "Filter Palette";
  };


  return (
    <>
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
               <Separator className="my-4 group-data-[collapsible=icon]:hidden" />
               <div className="group-data-[collapsible=icon]:px-0">
                 <ThemeToggleInSidebar />
               </div>
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
            <SidebarTrigger className="md:hidden mr-2" />
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-foreground whitespace-nowrap">{getHeaderTitle()}</h2>
            </div>
          </div>

          {isPaletteView && (
            <>
              <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={selectedColorCategory ? "secondary" : "outline"} size="sm" className="h-8 gap-1">
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
                    <Button variant={selectedSetId ? "secondary" : "outline"} size="sm" className="h-8 gap-1">
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
                    <DropdownMenuCheckboxItem
                      checked={selectedSetId === '__missing__'}
                        onSelect={(event) => {
                        event.preventDefault();
                        handleSetFilterChange(selectedSetId === '__missing__' ? null : '__missing__');
                      }}
                    >
                      Only Show Missing Markers
                    </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                      checked={selectedSetId === '__favorites__'}
                      disabled={favoriteMarkerIds.length === 0}
                        onSelect={(event) => {
                        event.preventDefault();
                        handleSetFilterChange(selectedSetId === '__favorites__' ? null : '__favorites__');
                      }}
                    >
                      <HeartIcon className="mr-2 h-3.5 w-3.5 text-red-500 fill-red-500" />
                      Favorites Only
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Individual Sets</DropdownMenuLabel>
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
                    <Button variant={selectedPaletteId ? "secondary" : "outline"} size="sm" className="h-8 gap-1">
                      <SwatchBook className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {getPaletteFilterLabel()}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Filter by marker palette</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={selectedPaletteId === null}
                      onSelect={(event) => {
                        event.preventDefault();
                        handlePaletteFilterChange(null);
                      }}
                    >
                      All Markers (No Palette Filter)
                    </DropdownMenuCheckboxItem>
                     {markerPalettes.length > 0 && <DropdownMenuSeparator />}
                    {markerPalettes.map((palette) => (
                      <DropdownMenuCheckboxItem
                        key={palette.id}
                        checked={selectedPaletteId === palette.id}
                        onSelect={(event) => {
                          event.preventDefault();
                          handlePaletteFilterChange(selectedPaletteId === palette.id ? null : palette.id);
                        }}
                      >
                        {palette.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => {
                        setActivePageContent('palettes');
                        if (isMobile) setOpenMobile(false);
                      }}
                    >
                      <PlusCircle className="mr-2 h-3.5 w-3.5" />
                      Create New Palette...
                    </DropdownMenuItem>
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
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={handleClearAllFilters}
                  title="Clear all active filters"
                >
                  <FilterX className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Clear Filters</span>
                </Button>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search markers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg bg-card pl-8 md:w-full"
                />
              </div>
            </>
          )}
        </header>
        <main className="flex-1 overflow-auto">
            {renderMainPageContent()}
        </main>
      </SidebarInset>
    </>
  );
}

export default function OhuhuHarmonyPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Compass className="h-16 w-16 text-primary animate-pulse" />
        <p className="ml-4 text-xl text-foreground">Loading page data...</p>
      </div>
    }>
      <AppContent />
    </Suspense>
  );
}

    

    