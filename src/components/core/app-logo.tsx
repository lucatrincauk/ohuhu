
import { Palette } from 'lucide-react';
import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

interface AppLogoProps extends SVGProps<SVGSVGElement> {
  showText?: boolean;
  // id prop removed as it's no longer used for aria-labelledby by SheetContent
}

export function AppLogo({ showText = true, className, ...props }: AppLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Palette className={cn('h-8 w-8 text-primary', className)} {...props} />
      {showText && (
          // The h1 is for semantic structure (e.g., on desktop).
          // Mobile sheet title will be handled by UiSheetTitle in sidebar.tsx.
          <h1 className="text-xl font-semibold text-foreground">
            Ohuhu Harmony
          </h1>
      )}
    </div>
  );
}

