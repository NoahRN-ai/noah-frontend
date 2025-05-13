
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { LogOut, User, Settings, Menu, X } from 'lucide-react';
    import AuthButtons from './AuthButtons';

    const MobileNavLink = ({ to, icon: Icon, children, onClick }) => (
      <Link
        to={to}
        onClick={onClick}
        className="flex items-center px-4 py-3 text-base font-medium text-brand-parchmentWhite hover:bg-brand-byzantineBlue/80 rounded-md transition-colors duration-150"
      >
        {Icon && <Icon className="w-6 h-6 mr-4" />}
        {children}
      </Link>
    );

    const MobileMenu = ({
      isOpen,
      toggleMenu,
      isAuthenticated,
      navLinks,
      publicNavLinks,
      handleLogout,
    }) => (
      <>
        <div className="md:hidden">
          <Button onClick={toggleMenu} variant="ghost" size="icon" aria-label="Open menu" className="text-brand-parchmentWhite hover:bg-brand-byzantineBlue/80 hover:text-brand-goldOchre">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-brand-deepPurple/95 dark:bg-brand-deepPurple backdrop-blur-md absolute w-full left-0 top-16 shadow-2xl overflow-hidden z-[90]"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                {isAuthenticated ? (
                  <>
                    {navLinks.map((link) => (
                      <MobileNavLink key={link.to} to={link.to} icon={link.icon} onClick={toggleMenu}>
                        {link.text}
                      </MobileNavLink>
                    ))}
                    <hr className="border-brand-byzantineBlue/50 my-2" />
                    <MobileNavLink to="/profile" icon={User} onClick={toggleMenu}>Profile</MobileNavLink>
                    <MobileNavLink to="/settings" icon={Settings} onClick={toggleMenu}>Settings</MobileNavLink>
                    <div className="px-4 pt-3">
                      <Button
                        onClick={() => { handleLogout(); toggleMenu(); }}
                        variant="destructive"
                        className="w-full bg-brand-vermilionRed/90 hover:bg-brand-vermilionRed text-brand-parchmentWhite"
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        Log out
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {publicNavLinks.map((link) => (
                      <MobileNavLink key={link.to} to={link.to} onClick={toggleMenu}>
                        {link.text}
                      </MobileNavLink>
                    ))}
                    <hr className="border-brand-byzantineBlue/50 my-2" />
                    <AuthButtons isMobile={true} onLinkClick={toggleMenu} />
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
    export default MobileMenu;
  