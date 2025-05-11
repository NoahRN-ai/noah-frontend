
    import React, { useState, useEffect, useCallback } from 'react';
    import { motion } from 'framer-motion';
    import { BookOpen, Search, Filter } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { useToast } from "@/components/ui/use-toast";
    import ModuleList from '@/components/learning/ModuleList';
    import { supabase } from '@/lib/supabaseClient';
    import { useAuth } from '@/contexts/AuthContext';
    import { useNavigate } from 'react-router-dom';
    import LoadingSpinner from '@/components/shared/LoadingSpinner';
    import ErrorMessage from '@/components/common/ErrorMessage';

    const LearningPage = () => {
      const { toast } = useToast();
      const { user } = useAuth();
      const navigate = useNavigate();

      const [modules, setModules] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [apiError, setApiError] = useState(null);
      const [searchTerm, setSearchTerm] = useState('');
      const [filterCategory, setFilterCategory] = useState('all');
      const [categories, setCategories] = useState(['all']);

      const fetchLearningData = useCallback(async () => {
        setIsLoading(true);
        setApiError(null);
        try {
          // Placeholder for API Call (Categories):
          // const categoriesResponse = await fetch('/api/learning/categories');
          // if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
          // const categoriesFromApi = await categoriesResponse.json();
          // setCategories(['all', ...categoriesFromApi]);
          
          const { data: categoriesData, error: categoriesError } = await supabase
            .from('learning_modules')
            .select('category')
            .then(response => {
              if (response.error) return response;
              const uniqueCategories = ['all', ...new Set(response.data.map(m => m.category).filter(Boolean))];
              return { data: uniqueCategories, error: null };
            });

          if (categoriesError) throw categoriesError;
          setCategories(categoriesData || ['all']);

          // Placeholder for API Call (Modules):
          // const modulesResponse = await fetch(`/api/learning/modules?userId=${user?.id}&search=${searchTerm}&category=${filterCategory}`);
          // if (!modulesResponse.ok) throw new Error('Failed to fetch modules');
          // const modulesFromApi = await modulesResponse.json();
          // setModules(modulesFromApi);

          let query = supabase
            .from('learning_modules')
            .select(`
              *,
              user_module_progress (
                completed
              )
            `)
            .order('created_at', { ascending: false });
          
          if (user) {
             // Correct way to filter by user_id on the join table for user-specific progress
             // This requires RLS to be set up correctly on user_module_progress or a function call.
             // A simpler approach might be to fetch all modules and then separately fetch progress for the user.
             // For now, this shows intent; actual Supabase query might need adjustment based on RLS or view.
             // query = query.eq('user_module_progress.user_id', user.id); // This might not work as expected without proper setup
          }

          if (searchTerm) {
            query = query.or(`title.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
          }
          if (filterCategory !== 'all') {
            query = query.eq('category', filterCategory);
          }
          
          const { data: modulesData, error: modulesError } = await query;

          if (modulesError) throw modulesError;
          
          // If user is available, fetch their progress separately for simplicity and RLS-friendliness
          let userProgress = {};
          if (user && modulesData && modulesData.length > 0) {
            const moduleIds = modulesData.map(m => m.id);
            const { data: progressData, error: progressError } = await supabase
              .from('user_module_progress')
              .select('module_id, completed')
              .eq('user_id', user.id)
              .in('module_id', moduleIds);
            
            if (progressError) console.warn("Could not fetch user progress for all modules:", progressError.message);
            else {
              progressData.forEach(p => {
                userProgress[p.module_id] = p.completed;
              });
            }
          }

          const formattedModules = modulesData.map(mod => ({
            ...mod,
            completed: userProgress[mod.id] || false,
          }));
          setModules(formattedModules);

        } catch (err) {
          console.error("Error fetching learning content:", err);
          const errorMessage = err.message || 'An unexpected error occurred.';
          setApiError(errorMessage);
          toast({
            title: "Error Loading Content",
            description: "Could not load learning modules. Please try again later.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }, [toast, searchTerm, filterCategory, user]);

      useEffect(() => {
        fetchLearningData();
      }, [fetchLearningData]);
      
      const handleStartModule = (moduleId) => {
        navigate(`/learning/${moduleId}`);
      };

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="container mx-auto p-4 md:p-6 lg:p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-brand-byzantineBlue/20 dark:border-brand-goldOchre/30 gap-4">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-3xl lg:text-4xl font-serif text-brand-byzantineBlue flex items-center dark:text-brand-parchmentWhite"
            >
               <BookOpen className="mr-3 h-8 w-8 lg:h-9 lg:w-9 text-brand-emeraldGreen"/> Learning Library
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative w-full md:w-auto md:min-w-[320px]"
            >
               <Input
                 type="search"
                 aria-label="Search learning modules"
                 placeholder="Search modules..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full px-4 py-2.5 pl-10 border-gray-300 dark:border-brand-goldOchre/40 rounded-lg shadow-sm focus:ring-1 focus:ring-brand-emeraldGreen focus:border-brand-emeraldGreen transition-all dark:bg-brand-deepPurple/30 dark:text-brand-parchmentWhite dark:placeholder-gray-400"
               />
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none dark:text-gray-500" />
             </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mb-8"
          >
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Filter by Category:</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none dark:text-gray-500" />
              <select 
                id="category-filter"
                aria-label="Filter modules by category"
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full sm:w-auto pl-10 pr-8 py-2.5 border border-gray-300 dark:border-brand-goldOchre/40 bg-brand-parchmentWhite dark:bg-brand-deepPurple/50 rounded-lg text-sm focus:ring-1 focus:ring-brand-emeraldGreen focus:border-brand-emeraldGreen appearance-none shadow-sm transition-all cursor-pointer dark:text-brand-parchmentWhite"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
              </select>
            </div>
          </motion.div>

          {isLoading && (
             <div className="flex flex-col items-center justify-center text-center py-16">
                <LoadingSpinner size="lg" color="text-brand-byzantineBlue dark:text-brand-goldOchre" />
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mt-4">Loading Learning Modules...</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Please wait a moment while we fetch the content.</p>
            </div>
          )}

          {apiError && !isLoading && (
             <ErrorMessage title="Error Fetching Modules" message={apiError} />
          )}

          {!isLoading && !apiError && (
             <ModuleList modules={modules} onStartModule={handleStartModule} />
          )}
        </motion.div>
      );
    };

    export default LearningPage;
  