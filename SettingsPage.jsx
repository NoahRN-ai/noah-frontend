
    import React from 'react';
    import { Settings as SettingsIcon, UserCircle, Bell, SunMoon } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

    const SettingsPage = () => {
      const pageVariants = {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 },
      };

      const sectionVariants = {
        initial: { opacity: 0, x: -20 },
        in: { opacity: 1, x: 0 },
      };

      return (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-8 px-4 md:px-6 lg:px-8"
        >
          <div className="flex items-center mb-8">
            <SettingsIcon className="mr-3 h-8 w-8 text-brand-byzantineBlue" />
            <h1 className="text-3xl font-bold font-serif text-brand-byzantineBlue">
              Settings
            </h1>
          </div>

          <div className="space-y-10">
            <motion.section
              variants={sectionVariants}
              initial="initial"
              animate="in"
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="overflow-hidden shadow-lg border-brand-byzantineBlue/20 hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-brand-byzantineBlue to-brand-deepPurple text-brand-parchmentWhite">
                  <div className="flex items-center">
                    <UserCircle className="mr-3 h-6 w-6" />
                    <CardTitle className="text-xl font-semibold">Account Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                  <p className="text-sm text-gray-600">
                    (Placeholder: Display user details, link to profile edit, password change option, etc.)
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Manage your personal information and account security.
                  </p>
                </CardContent>
              </Card>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="initial"
              animate="in"
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="overflow-hidden shadow-lg border-brand-goldOchre/20 hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-brand-goldOchre to-yellow-600 text-brand-parchmentWhite">
                  <div className="flex items-center">
                    <Bell className="mr-3 h-6 w-6" />
                    <CardTitle className="text-xl font-semibold">Notification Preferences</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                  <p className="text-sm text-gray-600">
                    (Placeholder: Add toggles or settings for email/in-app notifications.)
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Control how and when you receive updates from NOAH.
                  </p>
                </CardContent>
              </Card>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="initial"
              animate="in"
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="overflow-hidden shadow-lg border-brand-emeraldGreen/20 hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-brand-emeraldGreen to-green-600 text-brand-parchmentWhite">
                  <div className="flex items-center">
                    <SunMoon className="mr-3 h-6 w-6" />
                    <CardTitle className="text-xl font-semibold">Appearance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                  <p className="text-sm text-gray-600">
                    (Placeholder: Theme options like light/dark mode, font size adjustments, etc. could go here in the future.)
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Customize the look and feel of your NOAH experience.
                  </p>
                </CardContent>
              </Card>
            </motion.section>
          </div>
        </motion.div>
      );
    };

    export default SettingsPage;
  