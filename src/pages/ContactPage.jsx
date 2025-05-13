
    import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { MapPin, Mail, Phone, Send, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Label } from '@/components/ui/label';
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
    import { useToast } from "@/components/ui/use-toast";

    const FAQItem = ({ question, answer, value }) => (
      <AccordionItem value={value} className="border-b border-brand-goldOchre/20">
        <AccordionTrigger className="text-left hover:no-underline group">
          <span className="flex items-center text-primary group-hover:text-brand-goldOchre transition-colors">
            <HelpCircle className="w-5 h-5 mr-3 text-brand-emeraldGreen group-hover:text-brand-goldOchre transition-colors orthodox-icon-style" />
            {question}
          </span>
        </AccordionTrigger>
        <AccordionContent className="text-foreground/80 pt-2 pb-4 px-2">
          {answer}
        </AccordionContent>
      </AccordionItem>
    );

    const ContactPage = () => {
      const { toast } = useToast();
      const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
      const [isSubmitting, setIsSubmitting] = useState(false);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form submitted:", formData);
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you shortly.",
          className: "bg-brand-emeraldGreen text-brand-parchmentWhite border-brand-goldOchre"
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
      };

      const faqData = [
        {
          value: "item-1",
          question: "What is NOAH.RN?",
          answer: "NOAH.RN is an AI-powered platform designed to support nurses by automating administrative tasks, providing clinical decision support, and offering learning resources. Our goal is to enhance efficiency, reduce burnout, and improve patient care."
        },
        {
          value: "item-2",
          question: "Is NOAH.RN HIPAA compliant?",
          answer: "Yes, NOAH.RN is built with HIPAA compliance at its core. We employ robust security measures, including data encryption and access controls, to protect sensitive patient information. We can provide a Business Associate Agreement (BAA) for enterprise clients."
        },
        {
          value: "item-3",
          question: "How does NOAH.RN integrate with existing EHR systems?",
          answer: "NOAH.RN is designed for seamless integration with major Electronic Health Record (EHR) systems using secure APIs like HL7 FHIR. We work with your IT department to ensure smooth data exchange and minimal disruption to your current workflows."
        },
        {
          value: "item-4",
          question: "What kind of support do you offer?",
          answer: "We offer comprehensive support including an online help center, email support, and priority support for Team and Enterprise plans. Dedicated account managers and on-site training are available for enterprise clients."
        },
        {
          value: "item-5",
          question: "Can I try NOAH.RN before committing?",
          answer: "Absolutely! We offer a live demo so you can experience the capabilities of NOAH.RN firsthand. For enterprise solutions, we can also arrange pilot programs. Contact us to learn more."
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
                Get In <span className="text-brand-goldOchre">Touch</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl max-w-2xl mx-auto text-brand-parchmentWhite/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We're here to answer your questions, discuss your needs, or help you get started with NOAH.RN. Reach out to us today!
              </motion.p>
            </div>
          </header>

          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <motion.div
                  className="bg-card p-8 rounded-xl shadow-2xl border border-border"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7 }}
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-primary font-semibold">Full Name</Label>
                      <Input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 focus:ring-brand-emeraldGreen focus:border-brand-emeraldGreen" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-primary font-semibold">Email Address</Label>
                      <Input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="mt-1 focus:ring-brand-emeraldGreen focus:border-brand-emeraldGreen" />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-primary font-semibold">Subject</Label>
                      <Input type="text" name="subject" id="subject" value={formData.subject} onChange={handleInputChange} required className="mt-1 focus:ring-brand-emeraldGreen focus:border-brand-emeraldGreen" />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-primary font-semibold">Message</Label>
                      <Textarea name="message" id="message" rows={5} value={formData.message} onChange={handleInputChange} required className="mt-1 focus:ring-brand-emeraldGreen focus:border-brand-emeraldGreen" />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-brand-vermilionRed hover:bg-brand-goldOchre text-brand-parchmentWhite ripple-effect" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </motion.div>

                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="bg-card p-8 rounded-xl shadow-xl border border-border">
                    <h3 className="text-xl font-serif font-bold text-primary mb-4">Contact Information</h3>
                    <div className="space-y-3 text-foreground/80">
                      <p className="flex items-start">
                        <MapPin className="w-5 h-5 mr-3 mt-1 text-brand-byzantineBlue flex-shrink-0 orthodox-icon-style" />
                        <span>123 HealthTech Avenue, Innovation City, CA 90210, USA</span>
                      </p>
                      <p className="flex items-center">
                        <Mail className="w-5 h-5 mr-3 text-brand-byzantineBlue orthodox-icon-style" />
                        <a href="mailto:info@noah.rn" className="hover:text-brand-goldOchre">info@noah.rn</a>
                      </p>
                      <p className="flex items-center">
                        <Phone className="w-5 h-5 mr-3 text-brand-byzantineBlue orthodox-icon-style" />
                        <a href="tel:+15551234567" className="hover:text-brand-goldOchre">+1 (555) 123-4567</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-card p-8 rounded-xl shadow-xl border border-border">
                     <h3 className="text-xl font-serif font-bold text-primary mb-4">Office Hours</h3>
                     <p className="text-foreground/80">Monday - Friday: 9:00 AM - 5:00 PM (PST)</p>
                     <p className="text-sm text-foreground/60">Support available 24/7 for critical issues for enterprise clients.</p>
                  </div>

                  <div className="bg-card p-2 rounded-xl shadow-xl border border-border aspect-video overflow-hidden">
                    <iframe 
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-118.4000%2C34.0500%2C-118.3800%2C34.0700&layer=mapnik&marker=34.0600%2C-118.3900" 
                      className="w-full h-full border-0 rounded-lg"
                      loading="lazy"
                      title="NOAH.RN Office Location"
                      referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-20 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary text-center mb-10">
                Frequently Asked <span className="text-brand-goldOchre">Questions</span>
              </h2>
              <motion.div 
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7 }}
              >
                <Accordion type="single" collapsible className="w-full bg-card p-4 sm:p-6 rounded-xl shadow-xl border border-border">
                  {faqData.map((item) => (
                    <FAQItem key={item.value} {...item} />
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </section>
        </div>
      );
    };

    export default ContactPage;
  