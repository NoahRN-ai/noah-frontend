
    import React from 'react';
    import { motion } from 'framer-motion';
    import { BookOpen, MessageCircle } from 'lucide-react';

    const BlogPage = () => {
      // Placeholder blog posts
      const blogPosts = [
        {
          id: 1,
          title: "The Future of AI in Nursing: Trends to Watch",
          date: "May 1, 2025",
          excerpt: "Artificial intelligence is rapidly transforming healthcare. Discover the key AI trends that will shape the future of nursing practice, from predictive analytics to personalized patient care...",
          category: "AI in Healthcare",
          imageUrl: "Abstract image representing AI and healthcare network connections",
          author: "Dr. Evelyn Reed"
        },
        {
          id: 2,
          title: "Combating Nurse Burnout with Intelligent Tools",
          date: "April 22, 2025",
          excerpt: "Nurse burnout is a critical issue. Learn how intelligent tools like NOAH.RN can help alleviate administrative burdens, improve workflows, and support nurses' well-being...",
          category: "Nursing Well-being",
          imageUrl: "Image of a serene nurse meditating or relaxing during a break",
          author: "Aisha Khan, RN"
        },
        {
          id: 3,
          title: "Ethical Considerations in AI-Powered Nursing Support",
          date: "April 15, 2025",
          excerpt: "As AI becomes more integrated into nursing, it's crucial to address the ethical implications. We explore data privacy, algorithmic bias, and maintaining the human touch in an AI-assisted world...",
          category: "Ethics & Technology",
          imageUrl: "Symbolic image representing ethics, like balanced scales or a guiding light",
          author: "Mark Chen"
        },
      ];

      const TipOfTheDayWidget = () => (
        <motion.div 
          className="bg-brand-emeraldGreen/10 p-6 rounded-lg shadow-lg border border-brand-emeraldGreen/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center mb-3">
            <MessageCircle className="w-8 h-8 text-brand-emeraldGreen mr-3 orthodox-icon-style" />
            <h3 className="text-xl font-serif font-semibold text-brand-emeraldGreen">NOAH.RN Tip of the Day</h3>
          </div>
          <p className="text-foreground/80 text-sm mb-2">
            <strong>Quick Charting:</strong> Use voice commands for faster note-taking. Say "NOAH, add vital signs" to begin.
          </p>
          <p className="text-xs text-foreground/60">
            Explore more tips in our <a href="#" className="text-brand-emeraldGreen hover:underline">Help Center</a>.
          </p>
        </motion.div>
      );


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
                NOAH.RN <span className="text-brand-goldOchre">Insights &amp; Resources</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl max-w-2xl mx-auto text-brand-parchmentWhite/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Stay informed with the latest articles, tips, and discussions on AI in nursing, healthcare innovation, and professional development.
              </motion.p>
            </div>
          </header>

          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-2/3">
                  <h2 className="text-3xl font-serif font-bold text-primary mb-8">Latest Articles</h2>
                  {blogPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {blogPosts.map((post, index) => (
                        <motion.div 
                          key={post.id}
                          className="bg-card rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-2xl hover:border-brand-goldOchre/50 transition-all duration-300 group flex flex-col"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="aspect-[16/9] overflow-hidden">
                            <img 
                              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              alt={post.imageUrl}
                             src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                            <p className="text-xs text-brand-emeraldGreen font-semibold mb-1 uppercase">{post.category}</p>
                            <h3 className="text-xl font-serif font-semibold text-primary mb-2 group-hover:text-brand-goldOchre transition-colors">{post.title}</h3>
                            <p className="text-sm text-foreground/60 mb-1">By {post.author} - {post.date}</p>
                            <p className="text-sm text-foreground/70 mb-4 flex-grow">{post.excerpt}</p>
                            <a href="#" className="text-sm font-semibold text-brand-vermilionRed hover:text-brand-goldOchre transition-colors self-start group">
                              Read More <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">&rarr;</span>
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                     <div className="text-center py-12">
                        <BookOpen className="h-24 w-24 mx-auto text-brand-byzantineBlue/20 mb-4" />
                        <h3 className="text-2xl font-serif text-primary mb-2">Our Blog is Coming Soon!</h3>
                        <p className="text-foreground/70 max-w-md mx-auto">
                            We're preparing insightful articles and resources. Check back soon for updates on AI in nursing, healthcare innovation, and more.
                        </p>
                    </div>
                  )}
                </div>
                <aside className="lg:w-1/3 space-y-8 lg:mt-16">
                  <TipOfTheDayWidget />
                  
                  <motion.div 
                    className="bg-card p-6 rounded-lg shadow-lg border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <h3 className="text-xl font-serif font-semibold text-primary mb-4">Categories</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-foreground/70 hover:text-brand-goldOchre transition-colors">AI in Healthcare (3)</a></li>
                      <li><a href="#" className="text-foreground/70 hover:text-brand-goldOchre transition-colors">Nursing Well-being (5)</a></li>
                      <li><a href="#" className="text-foreground/70 hover:text-brand-goldOchre transition-colors">Ethics & Technology (2)</a></li>
                      <li><a href="#" className="text-foreground/70 hover:text-brand-goldOchre transition-colors">Product Updates (1)</a></li>
                    </ul>
                  </motion.div>

                   <motion.div 
                    className="bg-card p-6 rounded-lg shadow-lg border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <h3 className="text-xl font-serif font-semibold text-primary mb-4">Subscribe for Updates</h3>
                    <p className="text-sm text-foreground/70 mb-3">Get the latest NOAH.RN news and articles delivered to your inbox.</p>
                    <form className="space-y-3">
                      <input type="email" placeholder="Your email address" className="w-full px-3 py-2 border border-input rounded-md focus:ring-brand-emeraldGreen focus:border-brand-emeraldGreen text-sm" />
                      <button type="submit" className="w-full bg-brand-emeraldGreen hover:bg-brand-emeraldGreen/90 text-white py-2 rounded-md text-sm ripple-effect">Subscribe</button>
                    </form>
                  </motion.div>
                </aside>
              </div>
            </div>
          </section>
        </div>
      );
    };

    export default BlogPage;
  