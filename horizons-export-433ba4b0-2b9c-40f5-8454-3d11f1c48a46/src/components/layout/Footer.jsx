
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Users, Briefcase, DollarSign, BookOpen, Mail, ShieldCheck, Sparkles, FileText, Linkedin, Twitter as TwitterIcon, Facebook } from 'lucide-react';
    import NoahLogo from '@/components/common/NoahLogo';

    const Footer = () => {
      const mainNavLinks = [
        { to: '/about', label: 'About Us', icon: Users },
        { to: '/features', label: 'Features', icon: Briefcase },
        { to: '/solutions', label: 'Solutions', icon: Sparkles },
        { to: '/pricing', label: 'Pricing', icon: DollarSign },
        { to: '/blog', label: 'Blog', icon: BookOpen },
        { to: '/contact', label: 'Contact Us', icon: Mail },
      ];

      const legalLinks = [
        { to: '/privacy-policy', label: 'Privacy Policy', icon: ShieldCheck },
        { to: '/terms-of-service', label: 'Terms of Service', icon: FileText },
      ];

      const socialLinks = [
        { name: 'LinkedIn', url: 'https://linkedin.com/company/noahrn', Icon: Linkedin },
        { name: 'Twitter', url: 'https://twitter.com/noahrn_app', Icon: TwitterIcon }, 
        { name: 'Facebook', url: 'https://facebook.com/noahrnapp', Icon: Facebook },
      ];

      return (
        <footer className="bg-brand-deepPurple text-brand-parchmentWhite/80 border-t-2 border-brand-goldOchre/50 pt-12 pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
              
              <div className="md:col-span-2 lg:col-span-1">
                <Link to="/" className="flex items-center space-x-2.5 mb-4 group">
                   <NoahLogo className="h-10 w-10" />
                  <span className="font-serif text-2xl font-bold text-brand-parchmentWhite group-hover:text-brand-goldOchre transition-colors">NOAH.RN</span>
                </Link>
                <p className="text-sm leading-relaxed text-brand-parchmentWhite/70">AI-Fueled Nursing Support. Automate shift reports, streamline documentation, and enhance clinical workflows with cutting-edge AI technology.</p>
                <div className="mt-4 flex items-center">
                  <ShieldCheck className="h-5 w-5 text-brand-emeraldGreen mr-1.5 flex-shrink-0" />
                  <span className="text-xs text-brand-emeraldGreen font-medium">HIPAA Compliant Platform</span>
                </div>
              </div>

              <div>
                <h5 className="font-serif text-lg font-semibold text-brand-parchmentWhite mb-4">Quick Links</h5>
                <ul className="space-y-2.5">
                  {mainNavLinks.map(link => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-brand-parchmentWhite/70 hover:text-brand-goldOchre transition-colors flex items-center group">
                        <link.icon className="w-4 h-4 mr-2 text-brand-parchmentWhite/60 group-hover:text-brand-goldOchre transition-colors" /> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-serif text-lg font-semibold text-brand-parchmentWhite mb-4">Legal & Support</h5>
                 <ul className="space-y-2.5">
                  {legalLinks.map(link => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-brand-parchmentWhite/70 hover:text-brand-goldOchre transition-colors flex items-center group">
                         <link.icon className="w-4 h-4 mr-2 text-brand-parchmentWhite/60 group-hover:text-brand-goldOchre transition-colors" /> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <h5 className="font-serif text-lg font-semibold text-brand-parchmentWhite mt-6 mb-4">Connect With Us</h5>
                <div className="flex space-x-3">
                  {socialLinks.map(social => (
                    <a 
                      key={social.name} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-brand-parchmentWhite/70 hover:text-brand-goldOchre transition-colors group" 
                      title={social.name}
                      aria-label={social.name}
                    >
                      <social.Icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-serif text-lg font-semibold text-brand-parchmentWhite mb-4">Stay Updated</h5>
                <p className="text-sm text-brand-parchmentWhite/70 mb-3">Subscribe to our newsletter for the latest updates and features.</p>
                <form onSubmit={(e) => e.preventDefault()} className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-3 py-2.5 text-sm border border-brand-byzantineBlue/50 rounded-l-md focus:ring-2 focus:ring-brand-goldOchre focus:border-brand-goldOchre outline-none bg-brand-deepPurple/50 text-brand-parchmentWhite placeholder-brand-parchmentWhite/50" 
                  />
                  <button 
                    type="submit" 
                    className="px-4 py-2.5 bg-brand-goldOchre text-brand-deepPurple hover:bg-brand-goldOchre/90 rounded-r-md text-sm font-semibold transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
                 <p className="text-xs text-brand-parchmentWhite/50 mt-2">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>

            <div className="mt-10 border-t border-brand-parchmentWhite/20 pt-8 text-center text-sm text-brand-parchmentWhite/70">
              <p>&copy; {new Date().getFullYear()} Noah.RN - All Rights Reserved.</p>
              <p className="mt-1">
                <Link to="/privacy-policy" className="hover:text-brand-goldOchre transition-colors">Privacy Policy</Link> | <Link to="/terms-of-service" className="hover:text-brand-goldOchre transition-colors">Terms of Service</Link> | <Link to="/contact" className="hover:text-brand-goldOchre transition-colors">Contact Us</Link>
              </p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;
  