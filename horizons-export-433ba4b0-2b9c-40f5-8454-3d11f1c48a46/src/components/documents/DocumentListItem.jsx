
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { FileText, ChevronRight, Trash2 } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { useToast } from "@/components/ui/use-toast";

    const DocumentListItem = ({ document }) => {
      const { toast } = useToast();

      const handleDeleteClick = (e) => {
        e.preventDefault(); 
        e.stopPropagation();
        // Placeholder: Actual delete logic would be passed via props or context
        // For now, just a console log and toast
        console.log(`Placeholder: Delete document ${document.id} - "${document.title}"`);
        toast({
          title: "Delete Action (Placeholder)",
          description: `This would trigger deletion for: "${document.title}". Implement actual logic in DocumentsPage or via context.`,
          variant: "info"
        });
      };

      return (
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="h-full"
        >
          <Link
            to={`/documents/${document.id}`}
            className="block p-5 sm:p-6 bg-brand-parchmentWhite dark:bg-brand-deepPurple/40 border border-brand-byzantineBlue/20 dark:border-brand-goldOchre/30 rounded-xl shadow-lg 
                       hover:shadow-xl hover:border-brand-goldOchre dark:hover:border-brand-goldOchre/70 transition-all duration-300 group h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-brand-goldOchre focus:ring-offset-2 focus:ring-offset-brand-parchmentWhite dark:focus:ring-offset-brand-deepPurple"
          >
            <div className="flex items-start space-x-4 mb-3">
              <div className="flex-shrink-0 bg-brand-emeraldGreen/10 dark:bg-brand-emeraldGreen/20 p-3 rounded-full mt-1">
                <FileText className="h-6 w-6 text-brand-emeraldGreen" />
              </div>
              <div className="flex-grow overflow-hidden">
                <h4 className="text-lg font-semibold text-brand-byzantineBlue dark:text-brand-parchmentWhite group-hover:text-brand-goldOchre transition-colors duration-300 truncate" title={document.title}>
                  {document.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Created: {new Date(document.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            {document.preview && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 mb-4 line-clamp-3 flex-grow">
                {document.preview}
              </p>
            )}
            {!document.preview && (
                 <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-2 mb-4 line-clamp-3 flex-grow">
                    No preview available for this document.
                 </p>
            )}
            <div className="mt-auto flex justify-between items-center pt-2">
              <span className="inline-flex items-center text-xs font-medium text-brand-byzantineBlue dark:text-brand-skyBlue group-hover:text-brand-goldOchre transition-colors duration-300">
                View Document
                <ChevronRight className="ml-1 h-4 w-4" />
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteClick}
                className="text-gray-500 dark:text-gray-400 hover:text-brand-vermilionRed dark:hover:text-brand-vermilionRed focus:text-brand-vermilionRed focus:bg-brand-vermilionRed/10 dark:focus:bg-brand-vermilionRed/20 p-1 rounded-full transition-colors duration-150"
                aria-label="Delete document"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Link>
        </motion.div>
      );
    };

    export default DocumentListItem;
  