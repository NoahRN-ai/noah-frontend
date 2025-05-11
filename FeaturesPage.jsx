
    import React from 'react';
    import { motion } from 'framer-motion';
    import { FileText, BookOpen, Users, CalendarDays, BarChart3, Maximize } from 'lucide-react'; // Maximize for mockup frame

    const FeatureDetailSection = ({ title, description, benefits, metrics, imageUrl, imageAlt, reverseLayout = false, icon: Icon }) => {
      return (
        <section className={`py-12 md:py-20 ${reverseLayout ? 'bg-primary/5' : 'bg-background'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${reverseLayout ? 'md:flex-row-reverse' : ''}`}>
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: reverseLayout ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <div className="bg-card p-2 rounded-lg shadow-xl border border-brand-goldOchre/30 aspect-[4/3] md:aspect-video overflow-hidden group relative">
                  <img  class="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-105" alt={imageAlt} src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                  <div className="absolute inset-0 bg-brand-byzantineBlue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize className="w-12 h-12 text-brand-parchmentWhite opacity-70" />
                  </div>
                </div>
              </motion.div>
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <Icon className="w-10 h-10 text-brand-vermilionRed mr-3 orthodox-icon-style" />
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">{title}</h2>
                </div>
                <p className="text-lg text-foreground/80 mb-6">{description}</p>
                <div className="mb-6">
                  <h4 className="text-xl font-serif font-semibold text-brand-emeraldGreen mb-2">Key Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1 text-foreground/70">
                    {benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
                  </ul>
                </div>
                {metrics && (
                  <div>
                    <h4 className="text-xl font-serif font-semibold text-brand-emeraldGreen mb-2">Impactful Metrics:</h4>
                    <ul className="list-disc list-inside space-y-1 text-foreground/70">
                      {metrics.map((metric, index) => <li key={index}>{metric}</li>)}
                    </ul>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      );
    };

    const FeaturesPage = () => {
      const featuresData = [
        {
          title: "Intelligent Shift Reports",
          icon: FileText,
          description: "Automate the creation of comprehensive and accurate shift reports. NOAH.RN analyzes patient data, activities, and changes to generate concise summaries, freeing up valuable nursing time.",
          benefits: [
            "Reduces report generation time significantly.",
            "Ensures consistent and thorough handovers.",
            "Minimizes risk of information omission.",
            "Allows more time for direct patient care."
          ],
          metrics: [
            "Average 20-30 minutes saved per shift per nurse.",
            "Reported 15% reduction in handover-related incidents."
          ],
          imageUrl: "Nurse reviewing digital shift report on a tablet in a modern hospital hallway",
          imageAlt: "Digital shift report on a tablet"
        },
        {
          title: "Streamlined EHR Documentation",
          icon: BookOpen,
          description: "Simplify and accelerate EHR charting with AI-powered assistance. NOAH.RN helps draft notes, suggest relevant entries, and ensure compliance, reducing the administrative burden.",
          benefits: [
            "Faster and more accurate charting.",
            "Reduced clicks and manual data entry.",
            "Improved compliance with documentation standards.",
            "Less time spent on computers, more with patients."
          ],
          metrics: [
            "Up to 50% reduction in documentation time for common tasks.",
            "Improved CMI (Case Mix Index) accuracy."
          ],
          imageUrl: "Close-up of hands typing on a laptop with an EHR interface showing patient charts",
          imageAlt: "EHR Documentation on a laptop"
        },
        {
          title: "Clinical Navigator & Decision Support",
          icon: Users, // Consider a more 'guidance' or 'wisdom' icon
          description: "Access evidence-based clinical information and decision support tools instantly. NOAH.RN provides quick answers to clinical questions, medication information, and protocol guidance.",
          benefits: [
            "Rapid access to critical clinical knowledge.",
            "Supports evidence-based practice.",
            "Enhances clinical confidence and decision-making.",
            "Aids in managing complex patient cases."
          ],
          imageUrl: "Nurse using a smartphone app displaying clinical information in a brightly lit patient room",
          imageAlt: "Clinical Navigator on a smartphone"
        },
        {
          title: "Personalized Nursing Study Aid",
          icon: BarChart3, // Consider a 'book' or 'graduation cap' icon
          description: "An adaptive learning tool for nursing students and professionals seeking to expand their knowledge. NOAH.RN offers personalized quizzes, case studies, and learning paths.",
          benefits: [
            "Tailored learning experiences based on individual needs.",
            "Efficient preparation for exams like NCLEX.",
            "Reinforces clinical knowledge and critical thinking.",
            "Accessible anytime, anywhere for continuous learning."
          ],
          imageUrl: "Nursing student using a laptop for studying, with medical diagrams and notes visible on screen",
          imageAlt: "Nursing Study Aid on a laptop"
        },
        {
          title: "Smart Nurse Scheduler (Coming Soon)",
          icon: CalendarDays,
          description: "Optimize staff scheduling with an AI-powered tool that considers staff preferences, skills, patient acuity, and compliance rules. (Feature currently in development)",
          benefits: [
            "Fair and balanced schedules.",
            "Reduced scheduling conflicts and overtime costs.",
            "Improved staff satisfaction and retention.",
            "Ensures adequate staffing levels for patient safety."
          ],
          imageUrl: "Digital calendar interface showing color-coded nurse schedules on a large, modern screen",
          imageAlt: "Nurse Scheduler interface"
        }
      ];

      return (
        <div className="bg-background text-foreground">
          <header className="py-16 bg-gradient-to-br from-brand-byzantineBlue via-primary to-brand-emeraldGreen text-center text-brand-parchmentWhite">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h1 
                className="text-4xl md:text-5xl font-serif font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Explore NOAH.RN <span className="text-brand-goldOchre">Features</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl max-w-2xl mx-auto text-brand-parchmentWhite/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Discover how our suite of AI-powered tools can revolutionize your daily nursing practice, saving time and enhancing care with clinical empathy.
              </motion.p>
            </div>
          </header>

          {featuresData.map((feature, index) => (
            <FeatureDetailSection 
              key={feature.title}
              {...feature}
              reverseLayout={index % 2 !== 0}
            />
          ))}
        </div>
      );
    };

    export default FeaturesPage;
  