
"use client";

import { useState } from 'react';
import { useMarkerData } from '@/hooks/use-marker-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SwatchBook, PlusCircle, Trash2, Pencil, Edit3 } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import type { MarkerPalette } from '@/lib/types';

export function ManagePalettesPage() {
  const { markerPalettes, createMarkerPalette, updateMarkerPaletteName, removeMarkerPalette, isInitialized } = useMarkerData();
  const [newPaletteName, setNewPaletteName] = useState('');
  const { toast } = useToast();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPalette, setEditingPalette] = useState<MarkerPalette | null>(null);
  const [currentEditName, setCurrentEditName] = useState('');

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingPalette, setDeletingPalette] = useState<MarkerPalette | null>(null);

  const handleCreatePalette = () => {
    if (newPaletteName.trim() === '') {
      toast({ title: 'Palette Name Required', description: 'Please enter a name for the new palette.', variant: 'destructive' });
      return;
    }
    createMarkerPalette(newPaletteName.trim());
    toast({ title: 'Palette Created', description: `Palette "${newPaletteName.trim()}" has been created.` });
    setNewPaletteName('');
  };

  const handleOpenEditDialog = (palette: MarkerPalette) => {
    setEditingPalette(palette);
    setCurrentEditName(palette.name);
    setIsEditDialogOpen(true);
  };

  const handleSavePaletteName = () => {
    if (editingPalette && currentEditName.trim() !== '') {
      updateMarkerPaletteName(editingPalette.id, currentEditName.trim());
      toast({ title: 'Palette Updated', description: `Palette "${currentEditName.trim()}" has been updated.` });
      setIsEditDialogOpen(false);
      setEditingPalette(null);
    } else {
      toast({ title: 'Invalid Name', description: 'Palette name cannot be empty.', variant: 'destructive' });
    }
  };

  const handleOpenDeleteDialog = (palette: MarkerPalette) => {
    setDeletingPalette(palette);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDeletePalette = () => {
    if (deletingPalette) {
      removeMarkerPalette(deletingPalette.id);
      toast({ title: 'Palette Deleted', description: `Palette "${deletingPalette.name}" has been deleted.`, variant: 'destructive' });
      setIsDeleteDialogOpen(false);
      setDeletingPalette(null);
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-muted-foreground">
        <SwatchBook className="h-12 w-12 text-primary animate-pulse mb-4" />
        <p>Loading your palettes...</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <SwatchBook className="h-7 w-7 text-primary" />
              <CardTitle className="text-2xl">My Marker Palettes</CardTitle>
            </div>
            <CardDescription>
              Create, edit, and manage custom palettes for your markers. Add markers to palettes from their detail page.
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
                      <li key={palette.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/10 transition-colors">
                        <div className="flex-grow">
                          <span className="font-medium">{palette.name}</span>
                          <p className="text-xs text-muted-foreground">({palette.markerIds.length} marker{palette.markerIds.length === 1 ? '' : 's'})</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEditDialog(palette)} title="Edit palette name">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive/90" onClick={() => handleOpenDeleteDialog(palette)} title="Delete palette">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Palette Dialog */}
      {editingPalette && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Palette: {editingPalette.name}</DialogTitle>
              <DialogDescription>
                Change the name of your palette. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-palette-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-palette-name"
                  value={currentEditName}
                  onChange={(e) => setCurrentEditName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleSavePaletteName}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Palette Confirmation Dialog */}
      {deletingPalette && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete "{deletingPalette.name}"?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the palette and remove all markers from it (markers themselves will not be deleted from your inventory).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDeletePalette}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Palette
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

    