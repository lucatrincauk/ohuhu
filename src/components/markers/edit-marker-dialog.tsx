
"use client";

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { Marker } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Edit } from 'lucide-react';

const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

const editMarkerFormSchema = z.object({
  name: z.string().min(1, { message: 'Marker name is required.' }),
  hex: z.string().regex(hexColorRegex, { message: 'Invalid hex color format (e.g., #RRGGBB or #RGB).' }),
});

type EditMarkerFormValues = z.infer<typeof editMarkerFormSchema>;

interface EditMarkerDialogProps {
  marker: Marker;
  isOpen: boolean;
  onClose: () => void;
  onSave: (markerId: string, updates: EditMarkerFormValues) => void;
}

export function EditMarkerDialog({ marker, isOpen, onClose, onSave }: EditMarkerDialogProps) {
  const [previewColor, setPreviewColor] = useState<string>(marker.hex);

  const form = useForm<EditMarkerFormValues>({
    resolver: zodResolver(editMarkerFormSchema),
    defaultValues: {
      name: marker.name,
      hex: marker.hex,
    },
  });

  const watchedHex = form.watch('hex');

  useEffect(() => {
    if (hexColorRegex.test(watchedHex)) {
      setPreviewColor(watchedHex);
    } else {
      setPreviewColor('transparent');
    }
  }, [watchedHex]);

  useEffect(() => {
    // Reset form when a new marker is passed or dialog opens/closes
    form.reset({
      name: marker.name,
      hex: marker.hex,
    });
    setPreviewColor(marker.hex);
  }, [marker, isOpen, form]);

  function onSubmit(data: EditMarkerFormValues) {
    onSave(marker.id, data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Edit className="mr-2 h-5 w-5" /> Edit Marker: {marker.id}
          </DialogTitle>
          <DialogDescription>
            Make changes to your marker. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marker Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Vermillion" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hex Color Code</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input placeholder="#FF4500" {...field} className="flex-grow"/>
                    </FormControl>
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: previewColor }}
                      title={hexColorRegex.test(watchedHex) ? `Preview: ${watchedHex}` : 'Invalid color'}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
