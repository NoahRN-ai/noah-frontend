
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';

    const AuthButtons = ({ isMobile = false, onLinkClick = () => {} }) => {
      if (isMobile) {
        return (
          <div className="px-3 py-2 space-y-2">
            <Button asChild variant="outline" className="w-full border-brand-goldOchre text-brand-goldOchre hover:bg-brand-goldOchre hover:text-brand-deepPurple dark:text-brand-goldOchre dark:hover:text-brand-deepPurple dark:hover:bg-brand-goldOchre" onClick={onLinkClick}>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="w-full bg-brand-goldOchre text-brand-deepPurple hover:bg-brand-goldOchre/90" onClick={onLinkClick}>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        );
      }
      return (
        <div className="hidden md:flex items-center space-x-2">
          <Button asChild variant="outline" className="border-brand-goldOchre text-brand-goldOchre hover:bg-brand-goldOchre hover:text-brand-deepPurple dark:text-brand-goldOchre dark:hover:text-brand-deepPurple dark:hover:bg-brand-goldOchre">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="bg-brand-goldOchre text-brand-deepPurple hover:bg-brand-goldOchre/90">
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>
      );
    };
    export default AuthButtons;
  