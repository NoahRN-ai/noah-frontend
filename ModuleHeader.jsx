
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { ArrowLeft } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { CardDescription, CardTitle } from '@/components/ui/card';

    const ModuleHeader = ({ module }) => {
      if (!module) return null;

      return (
        <>
          <div className="mb-6">
            <Button variant="outline" asChild className="text-brand-emeraldGreen border-brand-emeraldGreen/50 hover:bg-brand-emeraldGreen/10 hover:text-brand-emeraldGreen dark:text-brand-emeraldGreen/90 dark:border-brand-emeraldGreen/70 dark:hover:bg-brand-emeraldGreen/20 dark:hover:text-brand-emeraldGreen">
              <Link to="/learning">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Learning Library
              </Link>
            </Button>
          </div>
          <div className="bg-gradient-to-br from-brand-emeraldGreen/80 via-brand-emeraldGreen/70 to-brand-byzantineBlue/60 text-brand-parchmentWhite p-6 md:p-8 border-b-2 border-brand-goldOchre/50 rounded-t-xl">
            <CardDescription className="text-sm font-medium text-brand-goldOchre uppercase tracking-wider mb-1">{module.category}</CardDescription>
            <CardTitle className="text-3xl md:text-4xl font-serif drop-shadow-md">{module.title}</CardTitle>
            <CardDescription className="text-xs text-brand-parchmentWhite/90 mt-1.5">
              Duration: {module.duration} | {module.reviews || 0} Reviews | Rating: {module.rating || 0}/5 Stars
            </CardDescription>
          </div>
        </>
      );
    };

    export default ModuleHeader;
  