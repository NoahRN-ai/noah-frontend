
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Activity, CheckCircle, MessageSquare, Award } from 'lucide-react'; // Using existing icons, can be replaced with custom Orthodox-inspired SVGs

    const FeatureCard = ({ icon: Icon, title, description, delay }) => (
      <motion.div
        className="bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border flex flex-col items-center text-center group"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5, scale: 1.03, borderColor: 'var(--colors-brand-goldOchre)' }}
      >
        <div className="p-4 bg-brand-byzantineBlue/10 rounded-full mb-4 transition-colors duration-300 group-hover:bg-brand-goldOchre/10">
          <Icon className="h-10 w-10 text-brand-byzantineBlue transition-colors duration-300 group-hover:text-brand-goldOchre orthodox-icon-style" />
        </div>
        <h3 className="text-xl font-serif font-semibold mb-2 text-primary transition-colors duration-300 group-hover:text-brand-goldOchre">{title}</h3>
        <p className="text-sm text-foreground/70">{description}</p>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3">
          <span className="text-xs text-brand-goldOchre">Learn More &rarr;</span>
        </div>
      </motion.div>
    );

    const FeatureGrid = () => {
      const features = [
        { icon: Activity, title: "Smart Shift Reports", description: "Automate tedious shift handovers with AI-generated summaries.", delay: 0.1 },
        { icon: CheckCircle, title: "EHR Documentation", description: "Streamline charting and reduce administrative burden.", delay: 0.2 },
        { icon: MessageSquare, title: "Clinical Navigator", description: "Instant answers to clinical questions and protocol guidance.", delay: 0.3 },
        { icon: Award, title: "Nursing Study Aid", description: "Personalized learning and exam preparation tools for students.", delay: 0.4 },
      ];

      return (
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-3xl md:text-4xl font-serif font-bold text-center mb-4 text-primary"
              initial={{ opacity: 0, y:20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Why Nurses <span className="text-brand-goldOchre">Trust</span> NOAH.RN
            </motion.h2>
            <motion.p 
              className="text-center text-lg text-foreground/80 mb-12 max-w-xl mx-auto"
              initial={{ opacity: 0, y:20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover how our AI tools are designed to support you with precision, empathy, and unwavering reliability.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
            </div>
          </div>
        </section>
      );
    };

    export default FeatureGrid;
  