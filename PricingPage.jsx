
    import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { CheckCircle, Zap, Users, Briefcase, Star } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from "@/components/ui/use-toast";

    const PricingCard = ({ planName, price, features, popular, ctaText, delay, icon: Icon }) => {
      return (
        <motion.div 
          className={`relative bg-card p-8 rounded-xl shadow-xl border ${popular ? 'border-brand-goldOchre border-2 ring-2 ring-brand-goldOchre/50' : 'border-border'} flex flex-col h-full group`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay }}
          whileHover={{ y: -8, boxShadow: popular ? "0 20px 25px -5px rgba(212,160,23,0.3), 0 10px 10px -5px rgba(212,160,23,0.1)" : "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
        >
          {popular && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-semibold bg-brand-goldOchre text-accent-foreground shadow-md">
                <Star className="w-4 h-4 mr-1.5 orthodox-icon-style" /> Most Popular
              </span>
            </div>
          )}
          <div className="flex items-center mb-4">
            <Icon className={`w-10 h-10 mr-3 orthodox-icon-style ${popular ? 'text-brand-goldOchre' : 'text-brand-byzantineBlue'} transition-colors group-hover:text-brand-goldOchre`} />
            <h3 className="text-2xl font-serif font-bold text-primary transition-colors group-hover:text-brand-goldOchre">{planName}</h3>
          </div>
          
          <p className={`text-4xl font-bold mb-1 ${popular ? 'text-brand-goldOchre' : 'text-brand-emeraldGreen'}`}>{price}</p>
          <p className="text-sm text-foreground/60 mb-6">per month</p>
          
          <ul className="space-y-3 mb-8 flex-grow">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-brand-emeraldGreen mr-2 mt-0.5 flex-shrink-0 orthodox-icon-style" />
                <span className="text-foreground/80">{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            size="lg" 
            className={`w-full mt-auto ripple-effect ${popular ? 'bg-brand-goldOchre hover:bg-brand-goldOchre/90 text-accent-foreground' : 'bg-brand-vermilionRed hover:bg-brand-vermilionRed/90 text-brand-parchmentWhite'}`}
            onMouseDown={(e) => {
              const button = e.currentTarget;
              const ripple = document.createElement("span");
              const rect = button.getBoundingClientRect();
              const size = Math.max(rect.width, rect.height);
              ripple.style.width = ripple.style.height = `${size}px`;
              ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
              ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
              ripple.classList.add("ripple");
              if (popular) {
                ripple.style.backgroundColor = "rgba(245, 245, 245, 0.7)"; // Parchment white ripple on gold
              } else {
                ripple.classList.add("ripple-vermilion-to-gold"); // Vermilion to Gold ripple
              }
              button.appendChild(ripple);
              ripple.onanimationend = () => ripple.remove();
            }}
          >
            {ctaText}
          </Button>
        </motion.div>
      );
    };

    const EmailCaptureForm = () => {
      const [email, setEmail] = useState('');
      const { toast } = useToast();

      const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim() === '') {
          toast({
            title: "Error",
            description: "Please enter your email address.",
            variant: "destructive",
          });
          return;
        }
        console.log("Email submitted:", email);
        toast({
          title: "Subscribed!",
          description: "Thanks for your interest! We'll notify you when pricing is live.",
          className: "bg-brand-emeraldGreen text-brand-parchmentWhite border-brand-goldOchre"
        });
        setEmail('');
      };

      return (
        <motion.div 
          className="max-w-md mx-auto bg-card p-8 rounded-xl shadow-2xl border border-border"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-serif font-bold text-primary text-center mb-2">Stay Updated!</h3>
          <p className="text-foreground/70 text-center mb-6">
            Be the first to know when our full pricing plans are announced. Enter your email below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input 
                type="email" 
                id="email-capture" 
                placeholder=" " 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block px-3 py-3 w-full text-sm text-foreground bg-transparent rounded-md border-input appearance-none focus:outline-none focus:ring-2 focus:ring-brand-emeraldGreen focus:border-brand-emeraldGreen peer" 
              />
              <Label 
                htmlFor="email-capture" 
                className="absolute text-sm text-foreground/70 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-card px-2 peer-focus:px-2 peer-focus:text-brand-emeraldGreen peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Your Email Address
              </Label>
            </div>
            <Button type="submit" className="w-full bg-brand-emeraldGreen hover:bg-brand-emeraldGreen/90 text-white ripple-effect">
              Notify Me
            </Button>
          </form>
        </motion.div>
      );
    };

    const PricingPage = () => {
      const pricingPlans = [
        { 
          planName: "Individual Pro", 
          price: "$29", 
          features: ["All Core AI Features", "Unlimited Shift Reports", "EHR Integration (Basic)", "Clinical Navigator Access", "Email Support"],
          ctaText: "Get Started",
          icon: Zap,
          delay: 0.1
        },
        { 
          planName: "Team Suite", 
          price: "$79", 
          features: ["All Individual Pro Features", "Up to 5 Users", "Advanced EHR Integration", "Team Collaboration Tools", "Priority Support"],
          popular: true,
          ctaText: "Choose Team Suite",
          icon: Users,
          delay: 0.2
        },
        { 
          planName: "Enterprise", 
          price: "Custom", 
          features: ["All Team Suite Features", "Unlimited Users", "Custom Integrations (API)", "Dedicated Account Manager", "On-site Training Options", "HIPAA BAA Included"],
          ctaText: "Contact Sales",
          icon: Briefcase,
          delay: 0.3
        },
      ];

      return (
        <div className="bg-background text-foreground">
          <header className="py-16 bg-gradient-to-br from-brand-byzantineBlue via-brand-byzantineBlue/80 to-brand-emeraldGreen/70 text-center text-brand-parchmentWhite">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h1 
                className="text-4xl md:text-5xl font-serif font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Pricing Plans <span className="text-brand-goldOchre">(Coming Soon)</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl max-w-2xl mx-auto text-brand-parchmentWhite/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Transparent and flexible pricing to fit your needs. Get a sneak peek at our upcoming plans.
              </motion.p>
            </div>
          </header>

          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {pricingPlans.map((plan) => (
                  <PricingCard key={plan.planName} {...plan} />
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <EmailCaptureForm />
            </div>
          </section>
        </div>
      );
    };

    export default PricingPage;
  