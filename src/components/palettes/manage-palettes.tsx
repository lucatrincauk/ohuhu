
"use client";

import { useState } from 'react';
import { useMarkerData } from '@/hooks/use-marker-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SwatchBook, PlusCircle, Trash2 } from 'lucide-react'; // Changed Icon
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ManagePalettesPage() { // Renamed from ManageGroupsPage
  const { markerPalettes, createMarkerPalette, isInitialized } = useMarkerData(); // Renamed markerGroups to markerPalettes, createMarkerGroup to createMarkerPalette
  const [newPaletteName, setNewPaletteName] = useState(''); // Renamed newGroupName
  const { toast } = useToast();

  const handleCreatePalette = () => { // Renamed handleCreateGroup
    if (newPaletteName.trim() === '') {
      toast({ title: 'Palette Name Required', description: 'Please enter a name for the new palette.', variant: 'destructive' }); // Renamed Group to Palette
      return;
    }
    createMarkerPalette(newPaletteName.trim()); // Renamed
    toast({ title: 'Palette Created', description: `Palette "${newPaletteName.trim()}" has been created.` }); // Renamed
    setNewPaletteName(''); // Renamed
  };

  // const handleDeletePalette = (paletteId: string, paletteName: string) => { // Renamed
  //   // Future: Implement removeMarkerFromPalette if needed in context
  //   // For now, this might be a placeholder or need confirmation logic
  //   // removeMarkerPalette(paletteId); // Assuming a function like this would exist
  //   toast({ title: 'Palette Deleted', description: `Palette "${paletteName}" has been deleted.`, variant: 'destructive' }); // Renamed
  // };


  if (!isInitialized) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-muted-foreground">
        <SwatchBook className="h-12 w-12 text-primary animate-pulse mb-4" /> 
        <p>Loading your palettes...</p> 
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <SwatchBook className="h-7 w-7 text-primary" /> 
            <CardTitle className="text-2xl">My Marker Palettes</CardTitle> 
          </div>
          <CardDescription>
            Create and manage custom palettes for your markers. Add markers to palettes from their detail page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Create New Palette</h3> 
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Enter palette name..." 
                value={newPaletteName}
                onChange={(e) => setNewPaletteName(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleCreatePalette} disabled={newPaletteName.trim() === ''}> 
                <PlusCircle className="mr-2 h-4 w-4" /> Create Palette 
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Existing Palettes</h3> 
            {markerPalettes.length === 0 ? ( 
              <p className="text-muted-foreground text-center py-4">You haven't created any palettes yet.</p> 
            ) : (
              <ScrollArea className="h-[calc(100vh-420px)] md:h-[calc(100vh-450px)]">
                 <ul className="space-y-2 pr-2">
                {markerPalettes.map(palette => ( 
                  <li key={palette.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/10">
                    <span className="font-medium">{palette.name}</span>
                    <span className="text-sm text-muted-foreground">({palette.markerIds.length} marker{palette.markerIds.length === 1 ? '' : 's'})</span>
                    {/* Future: Add Edit/Delete buttons here
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to delete "{palette.name}"?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the palette. Markers will not be deleted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeletePalette(palette.id, palette.name)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete Palette
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    */}
                  </li>
                ))}
              </ul>
              </ScrollArea>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
