
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { ArrowRight } from 'lucide-react';
    import { motion } from 'framer-motion';

    const QuickLinkCard = ({ title, description, to, icon: Icon, color }) => {
      const iconColorClass = color ? `text-${color}` : 'text-brand-goldOchre';
      const hoverBorderColorClass = color ? `hover:border-${color}/70` : 'hover:border-brand-goldOchre';
      const goTextColorClass = color ? `text-${color}` : 'text-brand-emeraldGreen';
      const goHoverTextColorClass = color ? `group-hover:text-${color}/80` : 'group-hover:text-brand-goldOchre';

      return (
        <motion.div
          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          className="h-full"
        >
          <Link
            to={to}
            className={`block p-6 bg-brand-parchmentWhite border border-brand-byzantineBlue rounded-lg shadow-md 
                       ${hoverBorderColorClass} transition-all duration-300 group h-full flex flex-col`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-serif text-brand-byzantineBlue group-hover:text-brand-goldOchre transition-colors duration-300">
                {title}
              </h3>
              {Icon && <Icon className={`${iconColorClass} h-6 w-6 orthodox-icon-style`} />}
            </div>
            <p className="text-gray-700 text-sm mb-4 flex-grow">{description}</p>
            <div className="text-right mt-auto">
              <span className={`inline-flex items-center ${goTextColorClass} ${goHoverTextColorClass} text-sm transition-colors duration-300`}>
                Go
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </div>
          </Link>
        </motion.div>
      );
    };

    export default QuickLinkCard;
  