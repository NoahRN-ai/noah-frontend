
    import React, { useState, useEffect } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { LayoutDashboard, MessageSquare, FileText, BookOpen } from 'lucide-react';
    import { useAuth } from '@/contexts/AuthContext';
    import { useToast } from "@/components/ui/use-toast";
    import NoahLogo from '@/components/common/NoahLogo';
    import ThemeToggle from './header/ThemeToggle';
    import AuthButtons from './header/AuthButtons';
    import UserMenu from './header/UserMenu';
    import DesktopNav from './header/DesktopNav';
    import MobileMenu from './header/MobileMenu';

    const Header = () => {
      const { user, logout, isAuthenticated } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const [isDarkMode, setIsDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) return storedTheme === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      });

      useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      }, [isDarkMode]);

      const toggleTheme = () => setIsDarkMode(!isDarkMode);
      const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

      const handleLogout = async () => {
        try {
          await logout();
          navigate('/login');
          toast({ title: "Logged Out", description: "You have been successfully logged out." });
        } catch (error) {
          toast({
            title: "Logout Failed",
            description: error.message || "An unexpected error occurred.",
            variant: "destructive",
          });
        }
      };

      const getAvatarFallback = (name) => {
        if (!name) return "U";
        const nameParts = name.split(" ");
        if (nameParts.length > 1) return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
        return name[0].toUpperCase();
      };
      
      const userName = user?.user_metadata?.full_name || user?.email || "User";

      const authenticatedNavLinks = [
        { to: "/dashboard", icon: LayoutDashboard, text: "Dashboard" },
        { to: "/chat", icon: MessageSquare, text: "Chat" },
        { to: "/documents", icon: FileText, text: "Documents" },
        { to: "/learning", icon: BookOpen, text: "Learning" },
      ];
      
      const publicNavLinks = [
        { to: "/features", text: "Features" },
        { to: "/solutions", text: "Solutions" },
        { to: "/pricing", text: "Pricing" },
        { to: "/blog", text: "Blog" },
        { to: "/contact", text: "Contact" },
      ];

      return (
        <header className="sticky top-0 z-50 bg-brand-byzantineBlue/90 backdrop-blur-md shadow-lg text-brand-parchmentWhite">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2.5 hover:opacity-90 transition-opacity">
                <NoahLogo className="h-9 w-auto" />
                <span className="text-2xl font-serif text-brand-parchmentWhite [text-shadow:1px_1px_1px_rgba(0,0,0,0.6)]">
                  Noah.RN
                </span>
              </Link>

              <DesktopNav 
                isAuthenticated={isAuthenticated} 
                navLinks={authenticatedNavLinks} 
                publicNavLinks={publicNavLinks} 
              />

              <div className="flex items-center space-x-2">
                <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                {isAuthenticated ? (
                  <UserMenu 
                    user={user} 
                    userName={userName} 
                    handleLogout={handleLogout} 
                    getAvatarFallback={getAvatarFallback} 
                  />
                ) : (
                  <AuthButtons />
                )}
                <MobileMenu 
                  isOpen={isMobileMenuOpen}
                  toggleMenu={toggleMobileMenu}
                  isAuthenticated={isAuthenticated}
                  navLinks={authenticatedNavLinks}
                  publicNavLinks={publicNavLinks}
                  handleLogout={handleLogout}
                />
              </div>
            </div>
          </div>
        </header>
      );
    };

    export default Header;
  