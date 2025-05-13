
    import React from 'react';
    import { cn } from '@/lib/utils';

    const LoadingSpinner = ({ size = 'md', color = 'text-brand-byzantineBlue', className }) => {
      const sizeClasses = {
        sm: 'h-6 w-6 border-2',
        md: 'h-10 w-10 border-4',
        lg: 'h-16 w-16 border-4',
      };

      return (
        <div className={cn("flex justify-center items-center p-4", className)}>
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
        </div>
      );
    };

    export default LoadingSpinner;
  