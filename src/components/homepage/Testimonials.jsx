
    import React, { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';

    const TestimonialCard = ({ avatar, name, role, rating, quote, active }) => (
      <motion.div
        className={`p-8 rounded-xl shadow-xl bg-card border ${active ? 'border-brand-goldOchre' : 'border-border'} ${active ? 'opacity-100 scale-100' : 'opacity-60 scale-95'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0.6, scale: active ? 1 : 0.95 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <img  class="w-14 h-14 rounded-full mr-4 object-cover border-2 border-brand-goldOchre/50" alt={avatar} src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
          <div>
            <h4 className="font-serif font-semibold text-primary">{name}</h4>
            <p className="text-sm text-brand-emeraldGreen">{role}</p>
          </div>
        </div>
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-5 h-5 orthodox-icon-style ${i < rating ? 'text-brand-goldOchre' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-foreground/80 italic text-sm">"{quote}"</p>
      </motion.div>
    );

    const Testimonials = () => {
      const testimonialsData = [
        { avatar: "Portrait of Sarah L., RN, smiling warmly", name: "Sarah L., RN", role: "Med-Surg Nurse", rating: 5, quote: "NOAH.RN has brought a sense of calm and order to my shifts. The time saved on reports is a true blessing." },
        { avatar: "Professional headshot of John B., NP", name: "John B., NP", role: "Nurse Practitioner", rating: 5, quote: "The Clinical Navigator is like having a wise mentor available 24/7. It's enhanced my confidence and precision." },
        { avatar: "Emily K., SN, studying with a focused expression", name: "Emily K., SN", role: "Nursing Student", rating: 4, quote: "The Study Aid helped me connect theory to practice in a way textbooks couldn't. I feel much more prepared." },
      ];
      const [currentIndex, setCurrentIndex] = useState(0);

      useEffect(() => {
        const timer = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
        }, 5000);
        return () => clearInterval(timer);
      }, [testimonialsData.length]);

      return (
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-primary">
              Voices of <span className="text-brand-emeraldGreen">Trust &amp; Transformation</span>
            </h2>
            <div className="relative h-[400px] sm:h-[340px] max-w-2xl mx-auto">
              <AnimatePresence initial={false}>
                {testimonialsData.map((testimonial, index) => (
                  index === currentIndex && (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                     <TestimonialCard {...testimonial} active={true} />
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
            <div className="flex justify-center mt-8 space-x-2.5">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-brand-goldOchre scale-125' : 'bg-brand-byzantineBlue/30 hover:bg-brand-byzantineBlue/50'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default Testimonials;
  