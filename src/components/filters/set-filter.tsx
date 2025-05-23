
"use client";

import type { MarkerSet } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tags } from 'lucide-react';

interface SetFilterProps {
  markerSets: MarkerSet[];
  onSetSelect: (setId: string | null) => void;
  currentSetId: string | null;
}

export function SetFilter({ markerSets, onSetSelect, currentSetId }: SetFilterProps) {
  return (
    <Card className="shadow-sm bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Tags className="h-6 w-6 text-primary" />
          <CardTitle>Filter by Set</CardTitle>
        </div>
        <CardDescription>Select a marker set to view its markers.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          onValueChange={(value) => onSetSelect(value === "all" ? null : value)}
          value={currentSetId || "all"}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a marker set" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sets</SelectItem>
            {markerSets.map((set) => (
              <SelectItem key={set.id} value={set.id}>
                {set.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {currentSetId && (
          <Button 
            onClick={() => onSetSelect(null)} 
            variant="ghost" 
            className="w-full mt-2" // Added mt-2 for spacing
          >
            Clear Set Filter
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
