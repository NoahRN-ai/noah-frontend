
    import React from 'react';
    import { motion } from 'framer-motion';
    import { ArrowRight } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

    const HeroSection = () => {
      return (
        <section className="relative py-24 md:py-40 bg-brand-byzantineBlue text-brand-parchmentWhite overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(212,160,23,0.3) 0%, transparent 60%), linear-gradient(45deg, rgba(245,245,245,0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(245,245,245,0.05) 25%, transparent 25%)',
              backgroundSize: '100px 100px, 20px 20px, 20px 20px',
            }}
            animate={{ backgroundPosition: ['0 0', '100px 100px']}}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Meet NOAH.RN: Your <span className="text-brand-goldOchre">AI Partner</span> in Nursing Excellence
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-brand-parchmentWhite/90 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              Automate shift reports, streamline documentation, and optimize nursing workflows with intelligent, empathic support.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="lg" 
                      className="bg-brand-vermilionRed hover:bg-brand-goldOchre text-brand-parchmentWhite px-10 py-4 text-lg group ripple-effect"
                      onMouseDown={(e) => {
                        const button = e.currentTarget;
                        const ripple = document.createElement("span");
                        const rect = button.getBoundingClientRect();
                        const size = Math.max(rect.width, rect.height);
                        ripple.style.width = ripple.style.height = `${size}px`;
                        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                        ripple.classList.add("ripple");
                        ripple.classList.add("ripple-vermilion-to-gold");
                        button.appendChild(ripple);
                        ripple.onanimationend = () => ripple.remove();
                      }}
                    >
                      Try Live Demo
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-brand-goldOchre text-accent-foreground">
                    <p>No credit card required. Experience NOAH.RN now!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </div>
        </section>
      );
    };

    export default HeroSection;
  