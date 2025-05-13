
    import React from 'react';
    import { motion } from 'framer-motion';

    const DocumentContentDisplay = ({ content }) => {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-brand-deepPurple dark:text-brand-goldOchre border-b-2 border-brand-byzantineBlue/30 dark:border-brand-goldOchre/50 pb-2">Document Content</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="prose prose-sm sm:prose dark:prose-invert max-w-none bg-gray-50 dark:bg-brand-deepPurple/20 p-4 rounded-md shadow-inner min-h-[200px] whitespace-pre-wrap"
          >
            {content || <span className="italic text-gray-500 dark:text-gray-400">No content available.</span>}
          </motion.div>
        </div>
      );
    };

    export default DocumentContentDisplay;
  