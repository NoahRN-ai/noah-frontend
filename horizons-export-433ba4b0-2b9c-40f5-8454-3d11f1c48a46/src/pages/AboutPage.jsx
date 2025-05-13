
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Users, Target, Brain, ShieldCheck, Linkedin, Twitter, Sparkles } from 'lucide-react';
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

    const TeamMemberCard = ({ name, role, imageUrl, bio, socialLinks }) => (
      <motion.div 
        className="bg-card p-6 rounded-lg shadow-lg text-center border border-border group"
        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", borderColor: "var(--colors-brand-goldOchre)"}}
      >
        <img  class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-brand-byzantineBlue/20 group-hover:border-brand-goldOchre/50 transition-colors" alt={imageUrl} src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
        <h3 className="text-xl font-serif font-semibold text-primary mb-1 group-hover:text-brand-goldOchre transition-colors">{name}</h3>
        <p className="text-brand-emeraldGreen text-sm mb-2">{role}</p>
        <p className="text-foreground/70 text-xs mb-3">{bio}</p>
        <div className="flex justify-center space-x-3 mt-4">
          {socialLinks?.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-byzantineBlue transition-colors">
              <Linkedin size={20} className="orthodox-icon-style" />
            </a>
          )}
          {socialLinks?.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-byzantineBlue transition-colors">
              <Twitter size={20} className="orthodox-icon-style" />
            </a>
          )}
        </div>
      </motion.div>
    );

    const AboutPage = () => {
      const teamMembers = [
        { name: "Dr. Evelyn Reed", role: "Founder & CEO", imageUrl: "Portrait of Dr. Evelyn Reed, warm and professional", bio: "Visionary leader with 20+ years in nursing informatics and AI, inspired by compassionate care.", socialLinks: { linkedin: "#", twitter: "#"} },
        { name: "Mark Chen", role: "Chief Technology Officer", imageUrl: "Portrait of Mark Chen, focused and innovative", bio: "Expert in AI model development and secure, ethical healthcare systems.", socialLinks: { linkedin: "#"} },
        { name: "Aisha Khan", role: "Head of Nursing Solutions", imageUrl: "Portrait of Aisha Khan, empathetic and experienced RN", bio: "Experienced RN ensuring NOAH.RN meets real-world clinical needs with a human touch.", socialLinks: { linkedin: "#", twitter: "#"} },
        { name: "Robert Davis", role: "Lead UX/UI Designer", imageUrl: "Portrait of Robert Davis, creative and thoughtful", bio: "Passionate about creating intuitive, accessible, and spiritually resonant healthcare tools.", socialLinks: { linkedin: "#"} },
      ];

      return (
        <div className="bg-background text-foreground">
          <section className="py-16 md:py-24 bg-gradient-to-br from-brand-byzantineBlue/90 via-primary to-brand-emeraldGreen/80 text-brand-parchmentWhite">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-6">
                  Our <span className="text-brand-goldOchre">Mission</span> & <span className="text-brand-goldOchre">Vision</span>
                </h1>
                <p className="text-lg md:text-xl text-brand-parchmentWhite/90 text-center max-w-3xl mx-auto mb-12">
                  NOAH.RN is dedicated to empowering nurses with intelligent tools that enhance efficiency, reduce burnout, and ultimately improve patient outcomes. We envision a future where technology seamlessly supports the art and science of nursing, grounded in empathy and trust.
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  className="bg-card/90 backdrop-blur-sm text-card-foreground p-8 rounded-lg shadow-xl border border-brand-goldOchre/30"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <Target className="h-12 w-12 text-brand-vermilionRed mb-4 orthodox-icon-style" />
                  <h2 className="text-2xl font-serif font-semibold text-brand-vermilionRed mb-3">Our Mission</h2>
                  <p className="text-foreground/80">
                    To develop and deploy cutting-edge AI solutions that streamline nursing workflows, provide critical decision support, and foster a more sustainable healthcare environment for nursing professionals, imbued with a spirit of service.
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-card/90 backdrop-blur-sm text-card-foreground p-8 rounded-lg shadow-xl border border-brand-goldOchre/30"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <Brain className="h-12 w-12 text-brand-emeraldGreen mb-4 orthodox-icon-style" />
                  <h2 className="text-2xl font-serif font-semibold text-brand-emeraldGreen mb-3">Our Vision</h2>
                  <p className="text-foreground/80">
                    To be the leading AI partner for nurses worldwide, recognized for innovation, reliability, and a profound commitment to advancing the nursing profession through technology that respects and enhances human connection.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary text-center mb-12">
                Meet the <span className="text-brand-goldOchre">Team</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <TeamMemberCard {...member} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary text-center mb-12">
                Our <span className="text-brand-goldOchre">Technology</span>
              </h2>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-brand-goldOchre/30">
                    <AccordionTrigger className="text-lg font-serif hover:text-brand-goldOchre text-primary data-[state=open]:text-brand-goldOchre">
                      <Sparkles className="w-5 h-5 mr-2 text-brand-goldOchre orthodox-icon-style" /> Model Architecture & MCP Servers
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70">
                      NOAH.RN leverages state-of-the-art Large Language Models (LLMs) fine-tuned on extensive, anonymized nursing data. Our proprietary Model Context Protocol (MCP) servers, developed by experienced nursing professionals, ensure that our AI understands the nuances of clinical practice, providing contextually relevant and accurate support. This specialized architecture allows for rapid processing and tailored responses for various nursing tasks.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-brand-goldOchre/30">
                    <AccordionTrigger className="text-lg font-serif hover:text-brand-goldOchre text-primary data-[state=open]:text-brand-goldOchre">
                      <ShieldCheck className="w-5 h-5 mr-2 text-brand-emeraldGreen orthodox-icon-style" /> Data Security & HIPAA Compliance
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70">
                      We prioritize data security and privacy above all. NOAH.RN is designed with HIPAA compliance at its core. All data is encrypted both in transit and at rest using industry-standard protocols. We employ robust access controls, audit trails, and de-identification techniques to protect sensitive patient information while delivering powerful AI insights. Our infrastructure undergoes regular security assessments to maintain the highest standards.
                       <div className="mt-3 flex items-center hipaa-badge">
                         <ShieldCheck className="h-5 w-5 text-brand-emeraldGreen mr-2" />
                         <span className="text-sm text-brand-emeraldGreen font-medium">Our commitment: Your data is secure and private.</span>
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-brand-goldOchre/30">
                    <AccordionTrigger className="text-lg font-serif hover:text-brand-goldOchre text-primary data-[state=open]:text-brand-goldOchre">
                      <Users className="w-5 h-5 mr-2 text-brand-byzantineBlue orthodox-icon-style" /> Integration Capabilities
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70">
                      NOAH.RN is built for seamless integration with existing Electronic Health Record (EHR) systems and other hospital informatics platforms. We utilize secure APIs (HL7 FHIR, etc.) and customizable data mapping to ensure smooth data exchange, minimizing disruption to current workflows and maximizing the utility of our AI tools within your established environment.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>
        </div>
      );
    };

    export default AboutPage;
  