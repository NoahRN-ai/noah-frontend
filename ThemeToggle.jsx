
    import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Sun, Moon } from 'lucide-react';

    const ThemeToggle = ({ isDarkMode, toggleTheme }) => (
      <Button 
        onClick={toggleTheme} 
        variant="ghost" 
        size="icon" 
        aria-label="Toggle theme" 
        className="text-brand-parchmentWhite hover:bg-brand-byzantineBlue/80 hover:text-brand-goldOchre focus-visible:ring-brand-goldOchre focus-visible:ring-offset-brand-deepPurple dark:focus-visible:ring-offset-brand-parchmentWhite"
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    );
    export default ThemeToggle;
  