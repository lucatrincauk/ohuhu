import { cn } from '@/lib/utils';

interface ColorSwatchProps {
  hexColor: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function ColorSwatch({ hexColor, size = 'md', className, children, onClick }: ColorSwatchProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div
      className={cn(
        'rounded-md border border-border/50 shadow-sm transition-all hover:shadow-md',
        'flex items-center justify-center',
        sizeClasses[size],
        onClick ? 'cursor-pointer' : '',
        className
      )}
      style={{ backgroundColor: hexColor }}
      onClick={onClick}
      aria-label={`Color swatch for ${hexColor}`}
    >
      {children}
    </div>
  );
}
