
    import React from 'react';
    import { motion } from 'framer-motion';
    import { ArrowRight } from 'lucide-react';
    import { Button } from '@/components/ui/button';

    const StickyFooterCTA = () => {
      return (
        <motion.div 
          className="sticky-footer-bar"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
        >
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
            <p className="text-md font-semibold text-primary text-center sm:text-left">
              Ready to embrace the future of nursing with NOAH.RN?
            </p>
            <Button className="bg-brand-goldOchre hover:bg-brand-goldOchre/90 text-accent-foreground group ripple-effect px-6 py-3">
              Join Beta Program <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 orthodox-icon-style" />
            </Button>
          </div>
        </motion.div>
      );
    };

    export default StickyFooterCTA;
  