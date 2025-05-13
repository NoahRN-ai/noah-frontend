
    import React from 'react';
    import { Button } from '@/components/ui/button';
    import { CheckCircle, PlayCircle } from 'lucide-react';

    const ModuleCompletionControls = ({ completed, onToggleComplete, moduleTitle }) => {
      return (
        <div className="mt-10 pt-6 border-t-2 border-brand-emeraldGreen/20 dark:border-brand-emeraldGreen/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Status: <span className={`font-semibold ${completed ? 'text-brand-emeraldGreen' : 'text-brand-goldOchre'}`}>{completed ? 'Completed' : 'In Progress'}</span>
          </p>
          <Button 
            onClick={onToggleComplete} 
            variant={completed ? "outline" : "default"}
            className={`
              ${completed 
                ? 'text-brand-goldOchre border-brand-goldOchre hover:bg-brand-goldOchre/10 hover:text-brand-goldOchre dark:hover:bg-brand-goldOchre/20' 
                : 'bg-brand-emeraldGreen hover:bg-brand-emeraldGreen/90 text-brand-parchmentWhite'}
               min-w-[180px] transition-all duration-300 transform hover:scale-105
            `}
            aria-label={completed ? `Mark module ${moduleTitle} as incomplete` : `Mark module ${moduleTitle} as complete`}
          >
            {completed ? <CheckCircle className="mr-2 h-5 w-5 text-brand-emeraldGreen" /> : <PlayCircle className="mr-2 h-5 w-5" />}
            {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
          </Button>
        </div>
      );
    };

    export default ModuleCompletionControls;
  