
    import React from 'react';
    import { UserCog, ShieldAlert, Edit3 } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { useAuth } from '@/contexts/AuthContext';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';

    const ProfilePage = () => {
      const { user } = useAuth();

      const userName = user?.user_metadata?.full_name || "Noah RN User";
      const userEmail = user?.email || "user@example.com";

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto py-8 px-4 md:px-0 max-w-3xl"
        >
          <div className="flex items-center mb-8">
            <UserCog className="mr-3 h-8 w-8 text-brand-byzantineBlue" />
            <h1 className="text-3xl font-serif text-brand-byzantineBlue">
              My Profile
            </h1>
          </div>

          <Card className="mb-8 bg-brand-parchmentWhite border-brand-byzantineBlue/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-brand-byzantineBlue">Account Information</CardTitle>
              <CardDescription className="text-gray-600">View and manage your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                <Input type="text" id="fullName" value={userName} readOnly className="mt-1 bg-gray-100 border-gray-300" />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <Input type="email" id="email" value={userEmail} readOnly className="mt-1 bg-gray-100 border-gray-300" />
              </div>
              <Button variant="outline" className="border-brand-goldOchre text-brand-goldOchre hover:bg-brand-goldOchre hover:text-brand-parchmentWhite">
                <Edit3 className="mr-2 h-4 w-4" /> Edit Information (Coming Soon)
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-brand-parchmentWhite border-brand-byzantineBlue/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-brand-byzantineBlue">Account Settings</CardTitle>
              <CardDescription className="text-gray-600">Manage your account security and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">Change Password</h3>
                <p className="text-sm text-gray-600 mt-1 mb-2">
                  Ensure your account is secure by regularly updating your password.
                </p>
                <Button className="bg-brand-goldOchre text-gray-900 hover:bg-brand-goldOchre/90">
                  Change Password (Coming Soon)
                </Button>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800">Two-Factor Authentication (2FA)</h3>
                 <p className="text-sm text-gray-600 mt-1 mb-2">
                  Add an extra layer of security to your account.
                </p>
                <Button variant="outline" className="border-brand-emeraldGreen text-brand-emeraldGreen hover:bg-brand-emeraldGreen hover:text-brand-parchmentWhite">
                  Setup 2FA (Coming Soon)
                </Button>
              </div>
               <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-brand-vermilionRed">Delete Account</h3>
                 <p className="text-sm text-gray-600 mt-1 mb-2">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button variant="destructive" className="bg-brand-vermilionRed hover:bg-brand-vermilionRed/90">
                  <ShieldAlert className="mr-2 h-4 w-4" /> Delete Account (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>

        </motion.div>
      );
    };

    export default ProfilePage;
  