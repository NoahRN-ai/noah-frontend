
    import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Edit3, Trash2, Copy, FileUp } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
    } from "@/components/ui/alert-dialog.jsx";

    const DocumentActionButtons = ({ 
      documentId, 
      documentTitle, 
      onCopyContent, 
      onDeleteDocument,
      onEditDocument, // Added prop
      onExportDocument 
    }) => {
      const navigate = useNavigate();

      const handleEdit = () => {
        if (onEditDocument) {
          onEditDocument(); // Call passed handler if exists (for placeholder/toast)
        } else {
          // Default navigation behavior if no specific handler is passed
          navigate(`/documents/edit/${documentId}`); 
        }
      };

      return (
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            className="border-brand-emeraldGreen text-brand-emeraldGreen hover:bg-brand-emeraldGreen hover:text-brand-parchmentWhite dark:text-brand-emeraldGreen/90 dark:hover:bg-brand-emeraldGreen dark:hover:text-brand-deepPurple focus:ring-2 focus:ring-brand-emeraldGreen" 
            onClick={onCopyContent}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Text
          </Button>
          <Button 
            variant="outline" 
            className="border-brand-goldOchre text-brand-goldOchre hover:bg-brand-goldOchre hover:text-brand-parchmentWhite dark:text-brand-goldOchre/90 dark:hover:bg-brand-goldOchre dark:hover:text-brand-deepPurple focus:ring-2 focus:ring-brand-goldOchre"
            onClick={handleEdit} // Use the new handler
          >
            <Edit3 className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button 
            variant="outline" 
            className="border-brand-skyBlue text-brand-skyBlue hover:bg-brand-skyBlue hover:text-brand-parchmentWhite dark:text-brand-skyBlue/90 dark:hover:bg-brand-skyBlue dark:hover:text-brand-deepPurple focus:ring-2 focus:ring-brand-skyBlue" 
            onClick={onExportDocument}
          >
            <FileUp className="mr-2 h-4 w-4" /> Export
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="bg-brand-vermilionRed text-brand-parchmentWhite hover:bg-brand-vermilionRed/90 focus:ring-2 focus:ring-brand-vermilionRed">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the document titled "{documentTitle}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-gray-400 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 focus:ring-2 focus:ring-gray-500">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDeleteDocument} className="bg-brand-vermilionRed text-brand-parchmentWhite hover:bg-brand-vermilionRed/90 focus:ring-2 focus:ring-brand-vermilionRed">
                  Yes, delete document
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    };

    export default DocumentActionButtons;
  