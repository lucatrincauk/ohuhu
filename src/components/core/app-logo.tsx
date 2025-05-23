
import { Palette } from 'lucide-react';
import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';
// Removed: import { SheetTitle } from '@/components/ui/sheet';

interface AppLogoProps extends SVGProps<SVGSVGElement> {
  showText?: boolean;
  id?: string; // The ID for the title element
}

export function AppLogo({ showText = true, className, id, ...props }: AppLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Palette className={cn('h-8 w-8 text-primary', className)} {...props} />
      {showText && (
          <h1 id={id} className="text-xl font-semibold text-foreground"> {/* Ensure id is passed to h1 */}
            Ohuhu Harmony
          </h1>
      )}
    </div>
  );
}
