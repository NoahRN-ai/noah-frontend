
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { AlertTriangle, Home } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';

    const NotFoundPage = () => {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-parchmentWhite text-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            className="max-w-md w-full"
          >
            <AlertTriangle className="mx-auto h-24 w-24 text-brand-vermilionRed mb-6" />
            <h1 className="text-5xl font-serif text-brand-byzantineBlue mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Oops! Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              The page you are looking for might have been removed, had its name changed,
              or is temporarily unavailable.
            </p>
            <Button asChild className="bg-brand-emeraldGreen hover:bg-brand-emeraldGreen/90 text-brand-parchmentWhite px-8 py-3 text-lg rounded-lg shadow-md transition-transform transform hover:scale-105">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Go to Homepage
              </Link>
            </Button>
          </motion.div>
        </div>
      );
    };

    export default NotFoundPage;
  