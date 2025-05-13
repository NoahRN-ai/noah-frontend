
    import React from 'react';
    import ModuleVideoPlayer from './ModuleVideoPlayer'; // Assuming this is for embedded videos

    const ModuleContentRenderer = ({ contentSections }) => {
      if (!contentSections || contentSections.length === 0) {
        return <p className="text-gray-600 dark:text-gray-400 italic">No content sections available for this module.</p>;
      }

      return (
        <div className="prose prose-indigo dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed selection:bg-brand-goldOchre/30 selection:text-brand-byzantineBlue">
          {contentSections.sort((a, b) => a.order_index - b.order_index).map(section => (
            <div key={section.id} className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              {section.title && <h3 className="text-xl font-semibold text-brand-byzantineBlue dark:text-brand-goldOchre mb-2">{section.title}</h3>}
              
              {section.section_type === 'text' && (
                <div className="whitespace-pre-wrap font-sans text-base p-3 bg-gray-100/50 dark:bg-brand-deepPurple/20 border border-gray-200/80 dark:border-gray-700/50 rounded-md shadow-inner">
                  {section.content}
                </div>
              )}

              {section.section_type === 'video' && section.media_url && (
                <ModuleVideoPlayer videoUrl={section.media_url} title={section.title || 'Module Video'} />
              )}
              
              {section.section_type === 'image' && section.media_url && (
                <div className="my-4">
                  <img 
                    class="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                    alt={section.title || 'Module Image'}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  {section.content && <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">{section.content}</p>}
                </div>
              )}

              {section.section_type === 'quiz_link' && section.media_url && (
                <a 
                  href={section.media_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-brand-emeraldGreen text-brand-parchmentWhite px-4 py-2 rounded-md hover:bg-brand-emeraldGreen/90 transition-colors"
                >
                  {section.title || 'Take Quiz'}
                </a>
              )}
              {section.section_type === 'quiz_link' && !section.media_url && section.content && (
                 <p className="text-gray-600 dark:text-gray-400 italic">Quiz: {section.content}</p>
              )}

            </div>
          ))}
        </div>
      );
    };

    export default ModuleContentRenderer;
  