
    import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from "@/components/ui/use-toast";
    import { useAuth } from '@/contexts/AuthContext';
    import ErrorMessage from '@/components/common/ErrorMessage';
    import NoahLogo from '@/components/common/NoahLogo';

    const FormField = ({ id, label, type, value, onChange, error, icon: Icon, placeholder, autoComplete, disabled, describedBy }) => (
      <div>
        <Label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </Label>
        <div className="relative">
          {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />}
          <Input
            id={id}
            name={id}
            type={type}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            className={`pl-10 mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 dark:bg-brand-deepPurple/30 dark:text-brand-parchmentWhite dark:placeholder-gray-500 dark:border-brand-byzantineBlue/50 focus:outline-none focus:ring-brand-byzantineBlue focus:border-brand-byzantineBlue sm:text-sm ${error ? 'border-brand-vermilionRed focus:ring-brand-vermilionRed focus:border-brand-vermilionRed' : 'border-gray-300 dark:border-brand-byzantineBlue/50'}`}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
          />
        </div>
        {error && <p id={describedBy} className="text-xs text-brand-vermilionRed mt-1">{error}</p>}
      </div>
    );


    const RegisterPage = () => {
      const [fullName, setFullName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [apiError, setApiError] = useState('');

      const [fullNameError, setFullNameError] = useState('');
      const [emailError, setEmailError] = useState('');
      const [passwordError, setPasswordError] = useState('');
      const [confirmPasswordError, setConfirmPasswordError] = useState('');

      const { toast } = useToast();
      const navigate = useNavigate();
      const { register } = useAuth();

      const validateForm = () => {
        let isValid = true;
        setFullNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setApiError('');

        if (!fullName.trim()) {
          setFullNameError('Full name is required.');
          isValid = false;
        }
        if (!email.trim()) {
          setEmailError('Email is required.');
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          setEmailError('Email address is invalid.');
          isValid = false;
        }
        if (!password) {
          setPasswordError('Password is required.');
          isValid = false;
        } else if (password.length < 6) {
          setPasswordError('Password must be at least 6 characters long.');
          isValid = false;
        }
        if (!confirmPassword) {
          setConfirmPasswordError('Confirm password is required.');
          isValid = false;
        } else if (password && password !== confirmPassword) {
          setConfirmPasswordError('Passwords do not match.');
          isValid = false;
        }
        return isValid;
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!validateForm()) {
          return;
        }
        
        setIsSubmitting(true);
        setApiError('');
        try {
          // Workspace API call placeholder for registration:
          // const workspaceRegisterResponse = await fetch('/api/auth/register', { 
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ email, password, fullName }) 
          // });
          // if (!workspaceRegisterResponse.ok) {
          //   const errorData = await workspaceRegisterResponse.json();
          //   throw new Error(errorData.message || 'Registration via Workspace API failed');
          // }
          // const workspaceUserData = await workspaceRegisterResponse.json();
          // login(workspaceUserData.token, workspaceUserData.user); // Assuming context's login can handle this after register

          const { error: supabaseError } = await register(email, password, fullName); // Actual Supabase call
          if (supabaseError) {
            throw supabaseError;
          }
          toast({
            title: "Registration Successful",
            description: "Welcome to NOAH.RN! Please check your email to confirm your account.",
            variant: "success"
          });
          navigate('/login'); 
        } catch (error) {
          const errorMessage = error.message || "Could not create account. Please try again.";
          setApiError(errorMessage);
          toast({
            title: "Registration Failed",
            description: errorMessage,
            variant: "error",
          });
        } finally {
          setIsSubmitting(false);
        }
      };
      
      const handleInputChange = (setter, errorSetter) => (e) => {
        setter(e.target.value);
        if (errorSetter) errorSetter('');
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
                Create Your Account
              </h1>
              {apiError && (
                <ErrorMessage title="Registration Failed" message={apiError} className="mb-4" />
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <FormField
                  id="fullName"
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={handleInputChange(setFullName, setFullNameError)}
                  error={fullNameError}
                  icon={UserIcon}
                  placeholder="e.g. Florence Nightingale"
                  autoComplete="name"
                  disabled={isSubmitting}
                  describedBy="fullName-error"
                />
                <FormField
                  id="email"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={handleInputChange(setEmail, setEmailError)}
                  error={emailError}
                  icon={Mail}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  describedBy="email-error"
                />
                <FormField
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={handleInputChange(setPassword, setPasswordError)}
                  error={passwordError}
                  icon={Lock}
                  placeholder="•••••••• (min. 6 characters)"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  describedBy="password-error"
                />
                <FormField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={handleInputChange(setConfirmPassword, setConfirmPasswordError)}
                  error={confirmPasswordError}
                  icon={Lock}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  describedBy="confirmPassword-error"
                />

                <div>
                  <Button
                    type="submit"
                    className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-brand-parchmentWhite bg-gradient-to-r from-brand-emeraldGreen to-brand-teal hover:from-brand-emeraldGreen/90 hover:to-brand-teal/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-goldOchre transition-all duration-150 ease-in-out"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2 h-5 w-5 border-2 border-brand-parchmentWhite border-t-transparent rounded-full"
                        />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-5 w-5" />
                        Register
                      </>
                    )}
                  </Button>
                </div>
              </form>
              <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-brand-byzantineBlue hover:text-brand-goldOchre dark:text-brand-skyBlue dark:hover:text-brand-goldOchre"
                >
                  Login here
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

    export default RegisterPage;
  