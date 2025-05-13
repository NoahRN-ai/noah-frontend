
    import React from 'react';
    import { motion } from 'framer-motion';
    import { MessageSquare, FileText, BookOpen, Settings, HelpCircle, UserCircle2, BarChart3 } from 'lucide-react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { useAuth } from '@/contexts/AuthContext';
    import QuickLinkCard from '@/components/dashboard/QuickLinkCard.jsx';

    const DashboardPage = () => {
      const { user } = useAuth();

      const quickLinks = [
        { to: '/chat', title: 'Start Chat', description: 'Generate nursing notes, shift reports, or ask clinical questions.', icon: MessageSquare, color: 'brand-byzantineBlue' },
        { to: '/documents', title: 'My Documents', description: 'Access and manage your saved notes and reports.', icon: FileText, color: 'brand-emeraldGreen' },
        { to: '/learning', title: 'Learning Library', description: 'Browse core nursing concepts and medication information.', icon: BookOpen, color: 'brand-goldOchre' },
      ];
      
      const secondaryActions = [
        { to: '/profile', title: 'My Profile', description: 'Manage your account settings and preferences.', icon: Settings, color: 'gray-600' },
        // Example: Could add a link to a future analytics/stats page
        // { to: '/stats', title: 'My Progress', description: 'View your activity and learning statistics.', icon: BarChart3, color: 'gray-600' },
        { to: '/contact', title: 'Help & Support', description: 'Find answers or contact support.', icon: HelpCircle, color: 'gray-600' },
      ];

      const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      };

      const welcomeMessage = `Welcome, ${user?.user_metadata?.full_name || 'Nurse'}!`;
      const subMessage = "How can Noah.RN assist you today?";

      return (
        <motion.div 
          variants={pageVariants}
          initial="initial"
          animate="animate"
          className="space-y-8 p-4 md:p-6 lg:p-8"
        >
          <header className="mb-10">
            <div className="flex items-center space-x-4 mb-3">
                <UserCircle2 className="h-12 w-12 text-brand-byzantineBlue" />
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif text-brand-byzantineBlue">
                        {welcomeMessage}
                    </h1>
                    <p className="text-md text-gray-600">{subMessage}</p>
                </div>
            </div>
            
          </header>

          <section aria-labelledby="quick-access-heading">
            <h2 id="quick-access-heading" className="text-2xl font-semibold text-gray-800 mb-6">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <QuickLinkCard {...link} />
                </motion.div>
              ))}
            </div>
          </section>
          
          <section aria-labelledby="account-support-heading">
            <h2 id="account-support-heading" className="text-2xl font-semibold text-gray-800 mb-6 pt-6 border-t border-gray-200">Account & Support</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryActions.map((link, index) => (
                 <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (quickLinks.length + index) * 0.1 }}
                >
                  <QuickLinkCard {...link} />
                </motion.div>
              ))}
            </div>
          </section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (quickLinks.length + secondaryActions.length) * 0.1 }}
          >
            <Card className="bg-brand-parchmentWhite/70 border-brand-emeraldGreen/30 shadow-lg rounded-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-serif text-brand-emeraldGreen flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2" />
                  Platform Status
                </CardTitle>
                <CardDescription className="text-gray-600">All systems operational and ready for you.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="w-3.5 h-3.5 bg-brand-emeraldGreen rounded-full animate-pulse"></div>
                  <p className="text-sm text-brand-emeraldGreen font-semibold">Normal Performance</p>
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Last checked: {new Date().toLocaleTimeString()}</p>
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      );
    };

    export default DashboardPage;
  