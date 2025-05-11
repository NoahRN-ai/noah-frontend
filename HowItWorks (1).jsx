
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Shield, MessageSquare, Activity, CheckCircle } from 'lucide-react';

    const HowItWorks = () => {
      const steps = [
        { id: 1, title: "Secure Foundation", description: "Integrate seamlessly or use standalone. Your data's sanctity is paramount.", icon: Shield },
        { id: 2, title: "Intuitive Interaction", description: "Communicate naturally. NOAH.RN understands the nuances of your clinical language.", icon: MessageSquare },
        { id: 3, title: "Enlightened Support", description: "Receive AI-driven insights, summaries, and guidance with clarity.", icon: Activity },
        { id: 4, title: "Workflow Harmony", description: "Save precious time, minimize errors, and elevate your focus on patient care.", icon: CheckCircle },
      ];
      return (
        <section className="py-16 md:py-24 bg-background">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-primary">
              Path to <span className="text-brand-emeraldGreen">Nursing Excellence</span>
            </h2>
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-brand-goldOchre/30 transform -translate-y-1/2" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
                {steps.map((step, index) => (
                  <motion.div 
                    key={step.id} 
                    className="flex flex-col items-center text-center p-4 relative group"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="relative mb-4">
                      <div className="hidden md:block absolute left-1/2 top-[-2.1rem] transform -translate-x-1/2 w-4 h-4 bg-brand-goldOchre rounded-full border-4 border-background shadow-md transition-all duration-300 group-hover:scale-125" />
                      <div className="p-4 bg-brand-emeraldGreen/10 rounded-full mb-2 inline-block transition-all duration-300 group-hover:bg-brand-goldOchre/10 group-hover:shadow-lg">
                        <step.icon className="h-10 w-10 text-brand-emeraldGreen transition-colors duration-300 group-hover:text-brand-goldOchre orthodox-icon-style" />
                      </div>
                    </div>
                    <h3 className="text-xl font-serif font-semibold mb-1 text-primary transition-colors duration-300 group-hover:text-brand-goldOchre">{step.title}</h3>
                    <p className="text-sm text-foreground/70">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    };

    export default HowItWorks;
  