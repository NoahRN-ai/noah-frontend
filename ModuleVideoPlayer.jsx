
    import React from 'react';
    import { PlayCircle } from 'lucide-react';

    const ModuleVideoPlayer = ({ videoUrl, title }) => {
      // In a real app, videoUrl would be used with a proper video player component (e.g., ReactPlayer)
      // For now, it's a placeholder.
      const displayUrl = videoUrl || "https://images.unsplash.com/photo-1645001399108-e5c236218018"; // Default placeholder image

      return (
        <div className="aspect-video bg-gray-800 dark:bg-gray-900 rounded-lg mb-8 flex items-center justify-center text-brand-parchmentWhite relative overflow-hidden shadow-xl group">
          {videoUrl && videoUrl.includes("youtube.com/embed") ? (
             <iframe 
                className="w-full h-full"
                src={videoUrl}
                title={`Video player for ${title}`}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
          ) : (
            <>
              <img 
                alt={`Promotional image or video placeholder for ${title}`}
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
               src="https://images.unsplash.com/photo-1637592156141-d41fb6234e71" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="w-20 h-20 text-brand-parchmentWhite/80 drop-shadow-lg" />
              </div>
            </>
          )}
        </div>
      );
    };

    export default ModuleVideoPlayer;
  