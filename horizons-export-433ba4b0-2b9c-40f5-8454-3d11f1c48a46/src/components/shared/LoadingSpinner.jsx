
    import React from 'react';
    import { cn } from '@/lib/utils';

    const LoadingSpinner = ({ size = 'lg', color = 'text-brand-byzantineBlue', className, fullScreen = true }) => {
      const sizeClasses = {
        sm: 'h-6 w-6 border-2',
        md: 'h-10 w-10 border-4',
        lg: 'h-16 w-16 border-4',
      };

      const spinner = (
        <div
          className={cn(
            'animate-spin rounded-full border-solid border-t-transparent',
            sizeClasses[size],
            color
          )}
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      );

      if (fullScreen) {
        return (
          <div className={cn("flex items-center justify-center min-h-[calc(100vh-200px)]", className)}>
            {spinner}
          </div>
        );
      }

      return (
        <div className={cn("flex justify-center items-center p-4", className)}>
          {spinner}
        </div>
      );
    };

    export default LoadingSpinner;
  