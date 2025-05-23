import { Palette } from 'lucide-react';
import type { SVGProps } from 'react';

interface AppLogoProps extends SVGProps<SVGSVGElement> {
  showText?: boolean;
}

export function AppLogo({ showText = true, className, ...props }: AppLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Palette className={cn('h-8 w-8 text-primary', className)} {...props} />
      {showText && <h1 className="text-xl font-semibold text-foreground">Ohuhu Harmony</h1>}
    </div>
  );
}

// Helper for cn if not globally available in this file scope, typically imported from @/lib/utils
const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');
