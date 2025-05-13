
    import React from 'react';
    import HeroSection from '@/components/homepage/sections/HeroSection.jsx';
    import ChatbotModule from '@/components/homepage/sections/ChatbotModule.jsx';
    import FeatureGrid from '@/components/homepage/sections/FeatureGrid.jsx';
    import HowItWorks from '@/components/homepage/sections/HowItWorks.jsx';
    import Testimonials from '@/components/homepage/sections/Testimonials.jsx';
    import StickyFooterCTA from '@/components/homepage/sections/StickyFooterCTA.jsx';
    
    const HomePage = () => {
      return (
        <div className="overflow-x-hidden">
          <HeroSection />
          <ChatbotModule />
          <FeatureGrid />
          <HowItWorks />
          <Testimonials />
          <StickyFooterCTA />
        </div>
      );
    };
    
    export default HomePage;
  