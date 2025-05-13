
    import React from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';

    const SamplePromptsDisplay = ({ samplePrompts, onPromptClick, showPrompts }) => {
      return (
        <AnimatePresence>
          {showPrompts && (
            <motion.div
              className="mb-2 space-y-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {samplePrompts.map((prompt, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-left text-xs hover:bg-brand-emeraldGreen/10 hover:text-brand-emeraldGreen border-brand-emeraldGreen/30 text-foreground/70" 
                  onClick={() => onPromptClick(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      );
    };

    export default SamplePromptsDisplay;
  