
    import React, { useState, useEffect, useCallback } from 'react';
    import { useParams, Link, useNavigate } from 'react-router-dom';
    import { supabase } from '@/lib/supabaseClient';
    import { motion } from 'framer-motion';
    import { ArrowLeft, FileText as FileTextIcon, Info } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useToast } from "@/components/ui/use-toast";
    import LoadingSpinner from '@/components/shared/LoadingSpinner';
    import ErrorMessage from '@/components/common/ErrorMessage';
    import DocumentActionButtons from '@/components/documents/DocumentActionButtons';
    import DocumentMetadataDisplay from '@/components/documents/DocumentMetadataDisplay';
    import DocumentContentDisplay from '@/components/documents/DocumentContentDisplay';
    import { useAuth } from '@/contexts/AuthContext';

    const DocumentViewPage = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const { toast } = useToast();
      const { user } = useAuth();
      const [documentData, setDocumentData] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [apiError, setApiError] = useState(null);

      const fetchDocument = useCallback(async () => {
        if (!id || !user) {
          setIsLoading(false);
          if (!user) setApiError("User not authenticated. Please log in.");
          else setApiError("Document ID is missing.");
          return;
        }
        setIsLoading(true);
        setApiError(null);
        try {
          // Placeholder for API Call:
          // const response = await fetch(`/api/documents/${id}?userId=${user.id}`);
          // if (!response.ok) {
          //   if (response.status === 404) throw new Error("Document not found or you don't have access.");
          //   throw new Error('Failed to fetch document details from API');
          // }
          // const dataFromApi = await response.json();
          // setDocumentData(dataFromApi);

          const { data, error: fetchError } = await supabase
            .from('documents')
            .select(`
              id, 
              title, 
              content, 
              created_at, 
              category, 
              tags, 
              status, 
              version,
              user_id,
              author:profiles (full_name, avatar_url),
              related_documents:documents (id, title)
            `)
            .eq('id', id)
            .eq('user_id', user.id) 
            .single();

          if (fetchError) {
            if (fetchError.code === 'PGRST116') { 
              throw new Error("Document not found or you don't have access.");
            }
            throw fetchError;
          }
          if (!data) throw new Error("Document not found or you don't have access.");
          
          setDocumentData(data);
        } catch (e) {
          console.error("Error fetching document:", e);
          const errorMessage = e.message || "Failed to fetch document details.";
          setApiError(errorMessage);
          toast({
            title: "Error Fetching Document",
            description: errorMessage,
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }, [id, toast, user]);

      useEffect(() => {
        fetchDocument();
      }, [fetchDocument]);

      const handleDeleteDocument = async () => {
        if (!documentData || !user) return;
        // Placeholder for API Call:
        // await fetch(`/api/documents/${documentData.id}?userId=${user.id}`, { method: 'DELETE' });
        try {
          const { error: deleteError } = await supabase
            .from('documents')
            .delete()
            .eq('id', documentData.id)
            .eq('user_id', user.id);

          if (deleteError) throw deleteError;

          toast({
            title: "Document Deleted",
            description: `"${documentData?.title}" has been successfully deleted.`,
            variant: "success",
          });
          navigate('/documents');
        } catch (e) {
          console.error("Error deleting document:", e);
          toast({
            title: "Error Deleting Document",
            description: e.message || "Could not delete the document.",
            variant: "destructive",
          });
        }
      };
      
      const handleCopyContent = () => {
        if (documentData?.content) {
          navigator.clipboard.writeText(documentData.content)
            .then(() => {
              toast({ 
                title: 'Success!', 
                description: 'Document content copied to clipboard.', 
                variant: 'success' 
              });
            })
            .catch(err => {
              console.error('Failed to copy text: ', err);
              toast({ 
                title: 'Copy Error', 
                description: 'Failed to copy content. Please try again.', 
                variant: 'error' 
              });
            });
        } else {
            toast({ 
                title: 'No Content', 
                description: 'There is no content in this document to copy.', 
                variant: 'info' 
            });
        }
      };

      const handleExportDocument = () => {
        // Placeholder function, actual export logic would be more complex
        console.log("Placeholder: Export document", documentData?.title);
        toast({
          title: "Export (Placeholder)",
          description: `This feature will export the document: "${documentData?.title}". Functionality coming soon!`,
          variant: "info",
        });
      };

      const handleEditDocument = () => {
        // Placeholder: navigate to an edit page or open an edit modal
        console.log("Placeholder: Edit document", documentData?.id);
        toast({
          title: "Edit (Placeholder)",
          description: `Navigating to edit page for "${documentData?.title}". Functionality coming soon!`,
          variant: "info",
        });
        // Example navigation: navigate(`/documents/edit/${documentData.id}`);
      };


      if (isLoading) {
        return <LoadingSpinner message="Loading document details..." className="min-h-[calc(100vh-200px)]" />;
      }

      if (apiError) {
        return <ErrorMessage title="Document Access Error" message={apiError} className="container mx-auto p-4 md:p-6 lg:p-8" />;
      }

      if (!documentData) {
        return (
          <div className="container mx-auto px-4 py-8 text-center min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
            <Info className="h-16 w-16 text-brand-goldOchre mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-brand-deepPurple dark:text-brand-parchmentWhite mb-2">Document Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The document you are looking for does not exist or you may not have permission to view it.</p>
            <Button asChild variant="outline" className="border-brand-byzantineBlue text-brand-byzantineBlue hover:bg-brand-byzantineBlue hover:text-brand-parchmentWhite dark:text-brand-skyBlue dark:border-brand-skyBlue dark:hover:bg-brand-skyBlue dark:hover:text-brand-deepPurple focus:ring-2 focus:ring-brand-goldOchre">
              <Link to="/documents">
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Documents
              </Link>
            </Button>
          </div>
        );
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-6 sm:py-8"
        >
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Button variant="outline" onClick={() => navigate(-1)} className="border-brand-byzantineBlue text-brand-byzantineBlue hover:bg-brand-byzantineBlue/10 focus:ring-brand-byzantineBlue dark:text-brand-skyBlue dark:border-brand-skyBlue dark:hover:bg-brand-skyBlue/20 dark:focus:ring-brand-skyBlue self-start sm:self-center focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-parchmentWhite dark:focus:ring-offset-brand-deepPurple">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <DocumentActionButtons
              documentId={documentData.id}
              documentTitle={documentData.title}
              onCopyContent={handleCopyContent}
              onDeleteDocument={handleDeleteDocument}
              onEditDocument={handleEditDocument} // Pass the new handler
              onExportDocument={handleExportDocument}
            />
          </div>

          <div className="bg-white dark:bg-brand-deepPurple/40 shadow-xl rounded-lg overflow-hidden border border-brand-byzantineBlue/20 dark:border-brand-byzantineBlue/50">
            <header className="p-6 sm:p-8 bg-gradient-to-br from-brand-byzantineBlue via-brand-deepPurple to-brand-byzantineBlue/80 text-brand-parchmentWhite">
              <h1 className="text-3xl sm:text-4xl font-serif mb-2 flex items-start">
                <FileTextIcon className="h-10 w-10 mr-4 text-brand-goldOchre flex-shrink-0 mt-1" />
                <span className="flex-grow">{documentData.title}</span>
              </h1>
              <p className="text-sm text-brand-parchmentWhite/80 ml-[56px]">
                Category: <span className="font-semibold">{documentData.category || 'Uncategorized'}</span>
              </p>
            </header>

            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <section className="lg:col-span-2">
                <DocumentContentDisplay content={documentData.content} />
              </section>
              <aside className="lg:col-span-1">
                <DocumentMetadataDisplay document={documentData} />
              </aside>
            </div>
          </div>
        </motion.div>
      );
    };

    export default DocumentViewPage;
  