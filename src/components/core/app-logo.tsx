
import { Palette } from 'lucide-react';
import type { SVGProps } from 'react';
import { cn } from '@/lib/utils'; // Make sure cn is imported if not already

interface AppLogoProps extends SVGProps<SVGSVGElement> {
  showText?: boolean;
  id?: string; // Allow passing an ID for the h1
}

export function AppLogo({ showText = true, className, id, ...props }: AppLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Palette className={cn('h-8 w-8 text-primary', className)} {...props} />
      {showText && <h1 id={id || "ohuhu-harmony-app-title"} className="text-xl font-semibold text-foreground">Ohuhu Harmony</h1>}
    </div>
  );
}

// Helper for cn if not globally available in this file scope, typically imported from @/lib/utils
// const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' '); // Already in utils
