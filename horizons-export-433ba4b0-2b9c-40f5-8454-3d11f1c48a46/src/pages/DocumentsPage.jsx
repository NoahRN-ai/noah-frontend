
    import React, { useState, useEffect, useCallback } from 'react';
    import { FilePlus, Loader2, AlertTriangle, Search } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { motion } from 'framer-motion';
    import DocumentList from '@/components/documents/DocumentList';
    import { supabase } from '@/lib/supabaseClient';
    import { useAuth } from '@/contexts/AuthContext';
    import { useToast } from "@/components/ui/use-toast";
    import LoadingSpinner from '@/components/shared/LoadingSpinner';
    import ErrorMessage from '@/components/common/ErrorMessage';

    const DocumentsPage = () => {
      const [documents, setDocuments] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [apiError, setApiError] = useState(null);
      const [searchTerm, setSearchTerm] = useState('');
      const { user } = useAuth();
      const { toast } = useToast();

      const fetchDocuments = useCallback(async () => {
        if (!user) {
          setIsLoading(false);
          setApiError("User not authenticated. Please log in.");
          return;
        }

        setIsLoading(true);
        setApiError(null);
        try {
          // Placeholder for API Call:
          // const response = await fetch(`/api/documents?userId=${user.id}&search=${searchTerm}`);
          // if (!response.ok) throw new Error('Failed to fetch documents from API');
          // const dataFromApi = await response.json();
          
          let query = supabase
            .from('documents')
            .select('id, title, created_at, content, category, tags')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (searchTerm) {
            query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`);
          }
          
          const { data, error: dbError } = await query;

          if (dbError) throw dbError;
          
          const formattedDocuments = data.map(doc => ({
            ...doc,
            preview: doc.content ? doc.content.substring(0, 150) + (doc.content.length > 150 ? '...' : '') : 'No preview available.'
          }));
          setDocuments(formattedDocuments);

        } catch (err) {
          console.error("Error fetching documents:", err);
          const errorMessage = err.message || 'An unexpected error occurred while fetching documents.';
          setApiError(errorMessage);
          toast({
            title: "Error Fetching Documents",
            description: errorMessage,
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }, [user, toast, searchTerm]);


      useEffect(() => {
        fetchDocuments();
      }, [fetchDocuments]);

      const handleCreateNewDocument = () => {
        console.log("Create new document action triggered");
        toast({
            title: "Feature Coming Soon!",
            description: "The ability to create new documents is under development.",
            variant: "info",
        });
      };
      
      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-4 md:p-6 lg:p-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-brand-byzantineBlue/20 dark:border-brand-goldOchre/30">
            <h1 className="text-3xl font-serif text-brand-byzantineBlue dark:text-brand-parchmentWhite mb-4 sm:mb-0">
              My Documents
            </h1>
            <Button
              onClick={handleCreateNewDocument}
              className="flex items-center bg-brand-emeraldGreen text-brand-parchmentWhite px-6 py-3 rounded-lg shadow-md hover:bg-brand-emeraldGreen/90 focus:ring-2 focus:ring-brand-goldOchre focus:ring-offset-2 focus:ring-offset-brand-parchmentWhite dark:focus:ring-offset-brand-deepPurple transition-all duration-300 transform hover:scale-105"
            >
              <FilePlus className="mr-2 h-5 w-5" />
              Create New Document
            </Button>
          </div>

          <div className="mb-6 relative">
            <Input 
              type="text"
              placeholder="Search documents by title, content, category, or tags..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2.5 border-brand-byzantineBlue/30 dark:border-brand-goldOchre/40 focus:border-brand-goldOchre focus:ring-1 focus:ring-brand-goldOchre dark:bg-brand-deepPurple/30 dark:text-brand-parchmentWhite dark:placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>


          {isLoading && (
             <div className="flex flex-col items-center justify-center text-center py-10">
              <LoadingSpinner size="lg" color="text-brand-byzantineBlue dark:text-brand-goldOchre" />
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mt-4">Loading documents...</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Please wait a moment.</p>
            </div>
          )}

          {apiError && !isLoading && (
            <ErrorMessage title="Error Fetching Documents" message={apiError} />
          )}

          {!isLoading && !apiError && (
            <DocumentList documents={documents} />
          )}
        </motion.div>
      );
    };

    export default DocumentsPage;
  