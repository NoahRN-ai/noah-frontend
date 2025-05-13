
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { BookMarked, PlayCircle, CheckCircle, Star, Clock } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

    const ModuleListItem = ({ module, onStartModule }) => {
      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
      };

      const defaultThumbnail = "https://images.unsplash.com/photo-1592382258436-7751788238e8"; // A generic learning/medical image

      return (
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0,128,0,0.2), 0 4px 8px -4px rgba(0,128,0,0.1)" }}
          className="h-full"
          layout
        >
          <Card className="h-full flex flex-col bg-brand-parchmentWhite dark:bg-brand-deepPurple/40 hover:border-brand-emeraldGreen/70 dark:hover:border-brand-emeraldGreen/50 transition-all duration-300 overflow-hidden shadow-lg border border-brand-byzantineBlue/10 dark:border-brand-byzantineBlue/30 rounded-xl group">
            <div className="relative">
              <Link to={`/learning/${module.id}`} className="block" onClick={(e) => { e.preventDefault(); onStartModule(module.id); }}>
                <img 
                  class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={module.thumbnail_desc || module.title}
                 src="https://images.unsplash.com/photo-1565021324587-5fd009870e68" />
              </Link>
              {module.is_new && (
                <span className="absolute top-3 right-3 bg-brand-vermilionRed text-brand-parchmentWhite px-2.5 py-1 rounded-full text-xs font-bold shadow-md z-10">
                  NEW
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-0">
                <div className="flex items-center text-xs text-brand-parchmentWhite">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-brand-goldOchre" /> 
                  <span>{module.duration}</span>
                </div>
              </div>
            </div>
            <CardHeader className="pt-4 pb-2">
              <Link to={`/learning/${module.id}`} className="block" onClick={(e) => { e.preventDefault(); onStartModule(module.id); }}>
                <CardTitle className="text-xl font-serif text-brand-byzantineBlue dark:text-brand-parchmentWhite group-hover:text-brand-emeraldGreen transition-colors duration-300 line-clamp-2" title={module.title}>
                  {module.title}
                </CardTitle>
              </Link>
              <CardDescription className="text-xs text-brand-byzantineBlue/70 dark:text-brand-skyBlue/70 pt-1 flex items-center">
                <BookMarked className="w-3.5 h-3.5 mr-1.5 text-brand-emeraldGreen/80 dark:text-brand-emeraldGreen/70" />
                {module.category}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow py-2">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">{module.description}</p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < (module.rating || 0) ? 'text-brand-goldOchre fill-brand-goldOchre' : 'text-gray-300 dark:text-gray-600'}`} />
                ))}
                <span className="text-xs text-gray-500 dark:text-gray-400">({module.reviews || 0} reviews)</span>
              </div>
            </CardContent>
            <CardFooter className="pt-3 pb-4">
              <Button 
                onClick={() => onStartModule(module.id)} 
                className="w-full bg-brand-emeraldGreen hover:bg-brand-emeraldGreen/90 text-brand-parchmentWhite transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg group-hover:shadow-brand-emeraldGreen/30"
                aria-label={module.completed ? `Review module: ${module.title}` : `Start module: ${module.title}`}
              >
                {module.completed ? <CheckCircle className="w-5 h-5 mr-2" /> : <PlayCircle className="w-5 h-5 mr-2" />}
                {module.completed ? 'Review Module' : 'Start Module'}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default ModuleListItem;
  