
    import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { LogIn, Mail, Lock } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from "@/components/ui/use-toast";
    import { useAuth } from '@/contexts/AuthContext';
    import ErrorMessage from '@/components/common/ErrorMessage';
    import NoahLogo from '@/components/common/NoahLogo';

    const LoginPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [apiError, setApiError] = useState('');
      const [emailError, setEmailError] = useState('');
      const [passwordError, setPasswordError] = useState('');
      
      const { toast } = useToast();
      const navigate = useNavigate();
      const { login } = useAuth();

      const validateForm = () => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');
        setApiError('');

        if (!email.trim()) {
          setEmailError('Email is required.');
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          setEmailError('Email address is invalid.');
          isValid = false;
        }

        if (!password.trim()) {
          setPasswordError('Password is required.');
          isValid = false;
        }
        return isValid;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
          return;
        }

        setIsSubmitting(true);
        setApiError(''); 
        try {
          // Workspace API call placeholder for login:
          // const workspaceLoginResponse = await fetch('/api/auth/login', { 
          //   method: 'POST', 
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ email, password }) 
          // });
          // if (!workspaceLoginResponse.ok) {
          //  const errorData = await workspaceLoginResponse.json();
          //   throw new Error(errorData.message || 'Login via Workspace API failed');
          // }
          // const workspaceUserData = await workspaceLoginResponse.json();
          // login(workspaceUserData.token, workspaceUserData.user); // Assuming context's login can handle this

          const { error: supabaseError } = await login(email, password); // Actual Supabase call via context
          if (supabaseError) {
            throw supabaseError;
          }
          toast({
            title: "Login Successful",
            description: "Welcome back to NOAH.RN!",
            variant: "success",
          });
          navigate('/dashboard');
        } catch (error) {
          const errorMessage = error.message || "Invalid email or password. Please try again.";
          setApiError(errorMessage);
          toast({
            title: "Login Failed",
            description: errorMessage,
            variant: "error",
          });
        } finally {
          setIsSubmitting(false);
        }
      };

      const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) setEmailError('');
        if (apiError) setApiError('');
      };

      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError) setPasswordError('');
        if (apiError) setApiError('');
      };

      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-deepPurple via-brand-byzantineBlue to-brand-skyBlue p-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Link to="/" className="flex justify-center mb-8 items-center text-brand-goldOchre hover:opacity-80 transition-opacity">
              <NoahLogo className="h-12 w-12" />
              <span className="text-4xl font-serif ml-3 text-brand-parchmentWhite [text-shadow:1px_1px_1px_rgba(0,0,0,0.6)]">NOAH.RN</span>
            </Link>
            <div className="bg-brand-parchmentWhite dark:bg-brand-deepPurple/60 p-8 rounded-xl shadow-2xl border border-brand-goldOchre/30 dark:border-brand-goldOchre/50">
              <h1 className="text-3xl font-serif text-brand-byzantineBlue dark:text-brand-parchmentWhite text-center mb-6">
                Welcome Back
              </h1>
              {apiError && (
                <ErrorMessage title="Login Failed" message={apiError} className="mb-4" />
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={handleEmailChange}
                      className={`pl-10 mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 dark:bg-brand-deepPurple/30 dark:text-brand-parchmentWhite dark:placeholder-gray-500 dark:border-brand-byzantineBlue/50 focus:outline-none focus:ring-brand-byzantineBlue focus:border-brand-byzantineBlue sm:text-sm ${emailError ? 'border-brand-vermilionRed focus:ring-brand-vermilionRed focus:border-brand-vermilionRed' : 'border-gray-300 dark:border-brand-byzantineBlue/50'}`}
                      placeholder="you@example.com"
                      disabled={isSubmitting}
                      aria-invalid={!!emailError}
                      aria-describedby={emailError ? "email-error" : undefined}
                    />
                  </div>
                  {emailError && <p id="email-error" className="text-xs text-brand-vermilionRed mt-1">{emailError}</p>}
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={handlePasswordChange}
                      className={`pl-10 mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 dark:bg-brand-deepPurple/30 dark:text-brand-parchmentWhite dark:placeholder-gray-500 dark:border-brand-byzantineBlue/50 focus:outline-none focus:ring-brand-byzantineBlue focus:border-brand-byzantineBlue sm:text-sm ${passwordError ? 'border-brand-vermilionRed focus:ring-brand-vermilionRed focus:border-brand-vermilionRed' : 'border-gray-300 dark:border-brand-byzantineBlue/50'}`}
                      placeholder="••••••••"
                      disabled={isSubmitting}
                      aria-invalid={!!passwordError}
                      aria-describedby={passwordError ? "password-error" : undefined}
                    />
                  </div>
                  {passwordError && <p id="password-error" className="text-xs text-brand-vermilionRed mt-1">{passwordError}</p>}
                </div>
                
                <div className="flex items-center justify-end">
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-brand-byzantineBlue hover:text-brand-goldOchre dark:text-brand-skyBlue dark:hover:text-brand-goldOchre">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-brand-parchmentWhite bg-gradient-to-r from-brand-byzantineBlue to-brand-deepPurple hover:from-brand-byzantineBlue/90 hover:to-brand-deepPurple/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-goldOchre transition-all duration-150 ease-in-out"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2 h-5 w-5 border-2 border-brand-parchmentWhite border-t-transparent rounded-full"
                        />
                        Logging in...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-5 w-5" />
                        Login
                      </>
                    )}
                  </Button>
                </div>
              </form>
              <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-brand-emeraldGreen hover:text-brand-goldOchre dark:hover:text-brand-goldOchre/80"
                >
                  Register here
                </Link>
              </p>
            </div>
             <p className="mt-8 text-center text-xs text-brand-parchmentWhite/70">
              &copy; {new Date().getFullYear()} Noah.RN. All rights reserved.
            </p>
          </motion.div>
        </div>
      );
    };

    export default LoginPage;
  