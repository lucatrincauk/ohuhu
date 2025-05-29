
"use client";

import { useState } from 'react';
import { useMarkerData } from '@/hooks/use-marker-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, PlusCircle, Trash2 } from 'lucide-react';
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

export function ManageGroupsPage() {
  const { markerGroups, createMarkerGroup, removeMarkerFromGroup, isInitialized } = useMarkerData(); // Added removeMarkerFromGroup
  const [newGroupName, setNewGroupName] = useState('');
  const { toast } = useToast();

  const handleCreateGroup = () => {
    if (newGroupName.trim() === '') {
      toast({ title: 'Group Name Required', description: 'Please enter a name for the new group.', variant: 'destructive' });
      return;
    }
    createMarkerGroup(newGroupName.trim());
    toast({ title: 'Group Created', description: `Group "${newGroupName.trim()}" has been created.` });
    setNewGroupName('');
  };

  // const handleDeleteGroup = (groupId: string, groupName: string) => {
  //   // Future: Implement removeMarkerFromGroup if needed in context
  //   // For now, this might be a placeholder or need confirmation logic
  //   // removeMarkerGroup(groupId); // Assuming a function like this would exist
  //   toast({ title: 'Group Deleted', description: `Group "${groupName}" has been deleted.`, variant: 'destructive' });
  // };


  if (!isInitialized) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-muted-foreground">
        <Users className="h-12 w-12 text-primary animate-pulse mb-4" />
        <p>Loading your groups...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl">My Marker Groups</CardTitle>
          </div>
          <CardDescription>
            Create and manage custom groups for your markers. Add markers to groups from their detail page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Create New Group</h3>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Enter group name..."
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleCreateGroup} disabled={newGroupName.trim() === ''}>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Group
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Existing Groups</h3>
            {markerGroups.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">You haven't created any groups yet.</p>
            ) : (
              <ScrollArea className="h-[calc(100vh-420px)] md:h-[calc(100vh-450px)]">
                 <ul className="space-y-2 pr-2">
                {markerGroups.map(group => (
                  <li key={group.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/10">
                    <span className="font-medium">{group.name}</span>
                    <span className="text-sm text-muted-foreground">({group.markerIds.length} marker{group.markerIds.length === 1 ? '' : 's'})</span>
                    {/* Future: Add Edit/Delete buttons here
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to delete "{group.name}"?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the group. Markers will not be deleted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteGroup(group.id, group.name)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete Group
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
