
'use client';

import { Moon, Sun, Laptop } from 'lucide-react';
import { useTheme } from '@/contexts/theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Theme } from '@/contexts/theme-provider'; // Assuming Theme type is exported

export function ThemeToggleInSidebar() {
  const { theme, setTheme } = useTheme();

  const themeLabels: Record<Theme, string> = {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          title={`Theme: ${themeLabels[theme]}`}
        >
          {theme === 'light' && <Sun className="mr-2 h-5 w-5 group-data-[collapsible=icon]:mr-0" />}
          {theme === 'dark' && <Moon className="mr-2 h-5 w-5 group-data-[collapsible=icon]:mr-0" />}
          {theme === 'system' && <Laptop className="mr-2 h-5 w-5 group-data-[collapsible=icon]:mr-0" />}
          <span className="group-data-[collapsible=icon]:hidden">{themeLabels[theme]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={4}>
        <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as Theme)}>
          <DropdownMenuRadioItem value="light">
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <Laptop className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
