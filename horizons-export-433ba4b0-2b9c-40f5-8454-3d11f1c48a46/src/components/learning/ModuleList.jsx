
    import React from 'react';
    import { motion } from 'framer-motion';
    import { BookOpenText } from 'lucide-react';
    import ModuleListItem from './ModuleListItem';

    const ModuleList = ({ modules, onStartModule }) => {
      if (!modules || modules.length === 0) {
        return (
          <div className="text-center py-12 text-gray-500 bg-brand-parchmentWhite/50 rounded-lg shadow-inner border border-gray-200">
            <BookOpenText className="w-16 h-16 mx-auto mb-4 text-brand-emeraldGreen/30" />
            <p className="text-xl font-semibold text-brand-byzantineBlue">No Learning Modules Found</p>
            <p className="text-sm">Try adjusting your search term or category filter, or check back later for new content!</p>
          </div>
        );
      }

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.07,
            delayChildren: 0.1
          }
        }
      };

      return (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {modules.map((mod) => (
            <ModuleListItem key={mod.id} module={mod} onStartModule={onStartModule} />
          ))}
        </motion.div>
      );
    };

    export default ModuleList;
  