
    import React from 'react';
    import { motion } from 'framer-motion';

    const TypingIndicator = () => {
      return (
        <motion.div
          className="flex justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-3 rounded-lg bg-gray-200 text-gray-800 flex items-center space-x-1.5 shadow">
            <motion.div className="w-2.5 h-2.5 bg-brand-emeraldGreen rounded-full animate-focus-glow-dots" style={{ animationDelay: '0s' }} />
            <motion.div className="w-2.5 h-2.5 bg-brand-emeraldGreen rounded-full animate-focus-glow-dots" style={{ animationDelay: '0.2s' }} />
            <motion.div className="w-2.5 h-2.5 bg-brand-emeraldGreen rounded-full animate-focus-glow-dots" style={{ animationDelay: '0.4s' }} />
          </div>
        </motion.div>
      );
    };

    export default TypingIndicator;
  