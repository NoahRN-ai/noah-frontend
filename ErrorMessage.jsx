
    import React from 'react';
    import { AlertTriangle } from 'lucide-react';
    import { cn } from '@/lib/utils';

    const ErrorMessage = ({ message, title = 'Error', className }) => {
      if (!message) {
        return null;
      }

      return (
        <div 
          className={cn(
            "bg-brand-vermilionRed/10 border-l-4 border-brand-vermilionRed text-brand-vermilionRed p-4 rounded-md shadow-sm my-4",
            className
          )} 
          role="alert"
        >
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
            <div className="flex-grow">
              <p className="font-bold text-sm">{title}</p>
              <p className="text-sm">{message}</p>
            </div>
          </div>
        </div>
      );
    };

    export default ErrorMessage;
  