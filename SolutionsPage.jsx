
    import React from 'react';
    import { motion } from 'framer-motion';
    import { User, Users, GraduationCap, ArrowRight, ArrowLeftRight } from 'lucide-react';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
    import { Button } from '@/components/ui/button';

    const BeforeAfterSlider = ({ beforeImage, afterImage, beforeAlt, afterAlt, beforeText, afterText }) => {
      const [sliderPosition, setSliderPosition] = React.useState(50);
      const imageContainer = React.useRef(null);

      const handleMove = (clientX) => {
        if (!imageContainer.current) return;
        const rect = imageContainer.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
      };
      
      const handleTouchMove = (event) => handleMove(event.touches[0].clientX);
      const handleMouseMove = (event) => handleMove(event.clientX);

      return (
        <div className="relative w-full max-w-2xl mx-auto aspect-[16/10] rounded-lg overflow-hidden shadow-xl border border-brand-goldOchre/30 group" ref={imageContainer}>
          <div className="relative w-full h-full select-none">
            <img-replace src={beforeImage} alt={beforeAlt} class="absolute inset-0 w-full h-full object-cover select-none" />
            <div
              className="absolute inset-0 w-full h-full object-cover select-none overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img-replace src={afterImage} alt={afterAlt} class="absolute inset-0 w-full h-full object-cover select-none" />
            </div>
            <div
              className="absolute top-0 bottom-0 w-1.5 bg-brand-goldOchre cursor-ew-resize flex items-center justify-center group-hover:bg-brand-vermilionRed transition-colors"
              style={{
                left: `calc(${sliderPosition}% - 3px)`,
                touchAction: 'none',
              }}
              onMouseDown={() => {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', () => document.removeEventListener('mousemove', handleMouseMove), { once: true });
              }}
              onTouchStart={() => {
                document.addEventListener('touchmove', handleTouchMove);
                document.addEventListener('touchend', () => document.removeEventListener('touchmove', handleTouchMove), { once: true });
              }}
            >
              <div className="w-10 h-10 rounded-full bg-brand-goldOchre border-2 border-brand-parchmentWhite shadow-md flex items-center justify-center text-brand-parchmentWhite group-hover:bg-brand-vermilionRed transition-colors">
                <ArrowLeftRight className="w-5 h-5 transform transition-transform group-hover:scale-110" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 p-2 bg-black/60 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {beforeText}
          </div>
          <div className="absolute bottom-2 right-2 p-2 bg-black/60 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {afterText}
          </div>
        </div>
      );
    };


    const SolutionTabContent = ({ title, description, caseStudies, icon: Icon }) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        <div className="text-center md:text-left">
          <Icon className="w-12 h-12 text-brand-emeraldGreen mb-3 mx-auto md:mx-0 orthodox-icon-style" />
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-primary mb-3">{title}</h3>
          <p className="text-foreground/80 text-lg max-w-3xl mx-auto md:mx-0">{description}</p>
        </div>
        {caseStudies.map((study, index) => (
          <Card key={index} className="overflow-hidden shadow-lg border-border hover:border-brand-goldOchre/50 transition-colors">
            <CardHeader className="bg-primary/5 border-b border-border">
              <CardTitle className="text-xl text-primary group-hover:text-brand-goldOchre transition-colors">{study.title}</CardTitle>
              <CardDescription className="text-brand-emeraldGreen">{study.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-foreground/70 mb-6">{study.challenge}</p>
              <BeforeAfterSlider 
                beforeImage={study.beforeImage} 
                afterImage={study.afterImage}
                beforeAlt={study.beforeAlt}
                afterAlt={study.afterAlt}
                beforeText={study.beforeText}
                afterText={study.afterText}
              />
              <div className="mt-6">
                <h4 className="font-semibold text-primary mb-2">Solution & Results:</h4>
                <p className="text-foreground/70 mb-4">{study.solution}</p>
                <Button variant="link" className="text-brand-vermilionRed p-0 h-auto hover:text-brand-goldOchre group">
                  Read Full Case Study <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform orthodox-icon-style" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    );

    const SolutionsPage = () => {
      const solutionsData = {
        individuals: {
          icon: User,
          title: "For Individual Nurses",
          description: "Empowering individual nurses with tools to reduce administrative tasks, enhance clinical decision-making, and reclaim time for patient care, fostering a sense of calm and control.",
          caseStudies: [
            {
              title: "Reclaiming Time: Sarah's Story",
              subtitle: "Med-Surg RN, Urban Hospital",
              challenge: "Sarah spent over an hour daily on shift reports and charting, leading to burnout and less time for patient interaction.",
              beforeImage: "Nurse looking stressed with piles of paperwork and a cluttered desk",
              beforeAlt: "Overwhelmed nurse with paperwork",
              beforeText: "Before: Manual charting, lengthy reports.",
              afterImage: "Nurse smiling calmly, interacting with a patient, holding a sleek tablet",
              afterAlt: "Happy nurse with tablet and patient",
              afterText: "After: Automated reports, streamlined charting.",
              solution: "Using NOAH.RN's Smart Shift Reports and EHR Documentation tools, Sarah reduced her administrative time by 45 minutes per shift, improved report accuracy, and reported higher job satisfaction and a renewed sense of purpose."
            }
          ]
        },
        teams: {
          icon: Users,
          title: "For Nursing Teams & Units",
          description: "Improving collaboration, standardizing practices, and boosting overall efficiency for nursing teams and entire hospital units, creating a harmonious work environment.",
          caseStudies: [
            {
              title: "Unit Efficiency Transformation",
              subtitle: "ICU Team, Community Hospital",
              challenge: "The ICU team faced inconsistencies in handovers and high cognitive load during critical situations, impacting team coordination and patient safety.",
              beforeImage: "Slightly chaotic hospital unit scene with nurses looking rushed and stressed",
              beforeAlt: "Busy hospital unit",
              beforeText: "Before: Inconsistent handovers, information overload.",
              afterImage: "Calm and organized hospital unit with nurses collaborating effectively around a central monitor displaying NOAH.RN",
              afterAlt: "Organized hospital unit",
              afterText: "After: Standardized reports, quick clinical insights.",
              solution: "Implementing NOAH.RN across the ICU standardized shift reports and provided quick access to clinical protocols via the Clinical Navigator. This led to a 20% reduction in handover time, improved team communication scores, and a more serene unit atmosphere."
            }
          ]
        },
        students: {
          icon: GraduationCap,
          title: "For Nursing Students & Educators",
          description: "Providing cutting-edge learning tools for nursing students and educators to bridge the gap between theory and practice, instilling confidence and competence.",
          caseStudies: [
            {
              title: "Accelerated Learning: David's Journey",
              subtitle: "Nursing Student, University Program",
              challenge: "David struggled to connect classroom knowledge with practical application and prepare for his NCLEX exam effectively, feeling overwhelmed by the volume of information.",
              beforeImage: "Student looking confused and stressed, surrounded by stacks of textbooks",
              beforeAlt: "Stressed nursing student with books",
              beforeText: "Before: Traditional study methods, exam anxiety.",
              afterImage: "Confident student using a laptop with NOAH.RN study aid interface, looking engaged and focused",
              afterAlt: "Confident student with NOAH.RN",
              afterText: "After: Personalized study plans, interactive learning.",
              solution: "NOAH.RN's Study Aid offered David personalized quizzes and case simulations. He improved his test scores by 15%, passed his NCLEX on the first attempt, and felt more prepared and self-assured for clinical practice."
            }
          ]
        }
      };

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
                NOAH.RN <span className="text-brand-goldOchre">Solutions</span> For You
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl max-w-2xl mx-auto text-brand-parchmentWhite/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Tailored AI-powered assistance designed to meet the unique needs of individual nurses, teams, and students, fostering excellence and well-being.
              </motion.p>
            </div>
          </header>

          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Tabs defaultValue="individuals" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 bg-primary/10 p-1.5 rounded-lg shadow-inner">
                  <TabsTrigger value="individuals" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-brand-byzantineBlue data-[state=active]:text-brand-parchmentWhite data-[state=active]:shadow-md rounded-md transition-all hover:bg-primary/20 data-[state=active]:hover:bg-brand-byzantineBlue/90">
                    <User className="h-5 w-5 orthodox-icon-style" /> Individuals
                  </TabsTrigger>
                  <TabsTrigger value="teams" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-brand-byzantineBlue data-[state=active]:text-brand-parchmentWhite data-[state=active]:shadow-md rounded-md transition-all hover:bg-primary/20 data-[state=active]:hover:bg-brand-byzantineBlue/90">
                    <Users className="h-5 w-5 orthodox-icon-style" /> Teams & Units
                  </TabsTrigger>
                  <TabsTrigger value="students" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-brand-byzantineBlue data-[state=active]:text-brand-parchmentWhite data-[state=active]:shadow-md rounded-md transition-all hover:bg-primary/20 data-[state=active]:hover:bg-brand-byzantineBlue/90">
                    <GraduationCap className="h-5 w-5 orthodox-icon-style" /> Students & Educators
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="individuals">
                  <SolutionTabContent {...solutionsData.individuals} />
                </TabsContent>
                <TabsContent value="teams">
                  <SolutionTabContent {...solutionsData.teams} />
                </TabsContent>
                <TabsContent value="students">
                  <SolutionTabContent {...solutionsData.students} />
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </div>
      );
    };

    export default SolutionsPage;
  