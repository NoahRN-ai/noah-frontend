
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Inbox } from 'lucide-react';
    import DocumentListItem from './DocumentListItem';

    const DocumentList = ({ documents }) => {
      if (!documents || documents.length === 0) {
        return (
          <div className="text-center text-gray-500 mt-12 py-10 bg-brand-parchmentWhite/50 rounded-lg shadow-inner border border-gray-200">
            <Inbox className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-semibold text-brand-byzantineBlue">No Documents Found</p>
            <p className="text-sm">It looks like you haven't created any documents yet.</p>
          </div>
        );
      }

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      };

      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 100
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
          {documents.map((doc) => (
            <motion.div key={doc.id} variants={itemVariants}>
              <DocumentListItem document={doc} />
            </motion.div>
          ))}
        </motion.div>
      );
    };

    export default DocumentList;
  