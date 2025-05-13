
    import React, { useState, useEffect, useCallback } from 'react';
    import { useParams } from 'react-router-dom';
    import { Loader2, AlertTriangle, BookOpenText } from 'lucide-react';
    import { Card, CardContent } from '@/components/ui/card';
    import { motion } from 'framer-motion';
    import { useToast } from "@/components/ui/use-toast";
    import { supabase } from '@/lib/supabaseClient';
    import { useAuth } from '@/contexts/AuthContext';

    import ModuleHeader from '@/components/learning/ModuleHeader';
    import ModuleContentRenderer from '@/components/learning/ModuleContentRenderer';
    import ModuleCompletionControls from '@/components/learning/ModuleCompletionControls';
    import LoadingSpinner from '@/components/shared/LoadingSpinner'; 
    import ErrorMessage from '@/components/common/ErrorMessage';

    const LearningModulePage = () => {
      const { moduleId } = useParams();
      const { user } = useAuth();
      const { toast } = useToast();

      const [module, setModule] = useState(null);
      const [contentSections, setContentSections] = useState([]);
      const [isCompleted, setIsCompleted] = useState(false);
      const [isLoading, setIsLoading] = useState(true);
      const [apiError, setApiError] = useState(null);
      const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);


      const fetchModuleData = useCallback(async () => {
        if (!moduleId) {
          setApiError("Module ID is missing.");
          setIsLoading(false);
          return;
        }
        if (!user) {
          setApiError("User not authenticated. Please log in to view modules.");
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        setApiError(null);

        try {
          // Placeholder for API Call (Module Details):
          // const moduleDetailsResponse = await fetch(`/api/learning/modules/${moduleId}?userId=${user.id}`);
          // if (!moduleDetailsResponse.ok) throw new Error('Failed to fetch module details');
          // const moduleDetailsFromApi = await moduleDetailsResponse.json();
          // setModule(moduleDetailsFromApi.module);
          // setContentSections(moduleDetailsFromApi.sections);
          // setIsCompleted(moduleDetailsFromApi.progress.completed);

          // Fetch module details
          const { data: moduleData, error: moduleError } = await supabase
            .from('learning_modules')
            .select('*')
            .eq('id', moduleId)
            .single();

          if (moduleError) throw moduleError;
          if (!moduleData) throw new Error("Module not found.");
          setModule(moduleData);

          // Fetch content sections
          const { data: sectionsData, error: sectionsError } = await supabase
            .from('learning_module_content_sections')
            .select('*')
            .eq('module_id', moduleId)
            .order('order_index', { ascending: true });

          if (sectionsError) throw sectionsError;
          setContentSections(sectionsData || []);
          
          // Fetch user progress
          const { data: progressData, error: progressError } = await supabase
            .from('user_module_progress')
            .select('completed')
            .eq('user_id', user.id)
            .eq('module_id', moduleId)
            .single();
          
          if (progressError && progressError.code !== 'PGRST116') { 
             throw progressError;
          }
          setIsCompleted(progressData?.completed || false);

        } catch (err) {
          console.error("Error fetching module:", err);
          const errorMessage = err.message || 'Failed to load module details.';
          setApiError(errorMessage);
          toast({
            title: "Loading Error",
            description: errorMessage,
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }, [moduleId, toast, user]);

      useEffect(() => {
        fetchModuleData();
      }, [fetchModuleData]);

      const handleToggleComplete = async () => {
        if (!module || !user) return;

        const newCompletedStatus = !isCompleted;
        setIsUpdatingProgress(true); 

        try {
          // Placeholder for API Call (Update Progress):
          // await fetch(`/api/learning/modules/${module.id}/progress?userId=${user.id}`, { 
          //   method: 'POST', 
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ completed: newCompletedStatus })
          // });

          const { error: upsertError } = await supabase
            .from('user_module_progress')
            .upsert(
              { 
                user_id: user.id, 
                module_id: module.id, 
                completed: newCompletedStatus,
                completed_at: newCompletedStatus ? new Date().toISOString() : null,
                last_accessed_at: new Date().toISOString()
              },
              { onConflict: 'user_id, module_id' }
            );

          if (upsertError) throw upsertError;
          
          setIsCompleted(newCompletedStatus);
          toast({
            title: newCompletedStatus ? "Module Complete!" : "Module In Progress",
            description: `"${module.title}" status updated.`,
            variant: newCompletedStatus ? "success" : "info",
          });
        } catch (err) {
          console.error("Error updating progress:", err);
          toast({
            title: "Update Error",
            description: "Could not update module completion status.",
            variant: "destructive",
          });
        } finally {
          setIsUpdatingProgress(false);
        }
      };

      if (isLoading && !module) { 
        return <LoadingSpinner message="Loading Learning Module..." className="min-h-[calc(100vh-200px)]" />;
      }

      if (apiError && !isLoading) { // Show error message if initial load fails
        return <ErrorMessage title="Error Loading Module" message={apiError} className="container mx-auto p-4 md:p-6 lg:p-8" />;
      }


      if (!module && !isLoading) { // If not loading and module is still null (e.g. not found)
         return (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 py-20 min-h-[calc(100vh-200px)] container mx-auto">
            <BookOpenText className="h-16 w-16 mb-6 text-brand-byzantineBlue/50 dark:text-brand-goldOchre/50" />
            <p className="text-xl font-semibold">Module Not Found</p>
            <p className="text-md mb-6">The learning module could not be loaded or does not exist.</p>
            <ModuleHeader module={null} /> 
          </div>
        );
      }
      
      // If module is loaded but there was an error for example updating progress, we show module and error inside.
      // This avoids blanking the page for non-critical errors.

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="container mx-auto p-4 md:p-6 lg:p-8"
        >
          <Card className="bg-brand-parchmentWhite dark:bg-brand-deepPurple/30 shadow-2xl border-2 border-brand-emeraldGreen/30 dark:border-brand-emeraldGreen/50 rounded-xl overflow-hidden">
            {module && <ModuleHeader module={module} />}
            <CardContent className="p-6 md:p-8">
              
              {module && <ModuleContentRenderer contentSections={contentSections} />}
              {module && <ModuleCompletionControls 
                completed={isCompleted} 
                onToggleComplete={handleToggleComplete}
                moduleTitle={module.title}
                isUpdating={isUpdatingProgress}
              />}
              {isUpdatingProgress && <div className="flex justify-center mt-4"><Loader2 className="h-6 w-6 text-brand-emeraldGreen animate-spin" /></div>}
              {apiError && module && <ErrorMessage title="Module Interaction Error" message={apiError} className="mt-4"/>}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default LearningModulePage;
  