"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { MarkerSet } from '@/lib/types';
import { PlusSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

const addMarkerFormSchema = z.object({
  id: z.string().min(1, { message: 'Marker ID is required.' }),
  name: z.string().min(1, { message: 'Marker name is required.' }),
  hex: z.string().regex(hexColorRegex, { message: 'Invalid hex color format (e.g., #RRGGBB or #RGB).' }),
  setId: z.string().min(1, { message: 'Please select a marker set.' }),
});

type AddMarkerFormValues = z.infer<typeof addMarkerFormSchema>;

interface AddMarkerFormProps {
  markerSets: MarkerSet[];
  onAddMarker: (markerData: AddMarkerFormValues) => void;
}

export function AddMarkerForm({ markerSets, onAddMarker }: AddMarkerFormProps) {
  const { toast } = useToast();
  const [previewColor, setPreviewColor] = useState<string>('#transparent');

  const form = useForm<AddMarkerFormValues>({
    resolver: zodResolver(addMarkerFormSchema),
    defaultValues: {
      id: '',
      name: '',
      hex: '',
      setId: '',
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

  function onSubmit(data: AddMarkerFormValues) {
    onAddMarker(data);
    toast({
      title: 'Marker Added',
      description: `${data.name} (${data.id}) has been added to your inventory.`,
    });
    form.reset();
    setPreviewColor('transparent');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 border rounded-lg shadow-sm bg-card">
        <div className="flex items-center gap-2 mb-4">
          <PlusSquare className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Add New Marker</h3>
        </div>
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marker ID (e.g., R020)</FormLabel>
              <FormControl>
                <Input placeholder="R020" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="setId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marker Set</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a set" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {markerSets.map((set) => (
                    <SelectItem key={set.id} value={set.id}>
                      {set.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <PlusSquare className="mr-2 h-4 w-4" /> Add Marker
        </Button>
      </form>
    </Form>
  );
}
