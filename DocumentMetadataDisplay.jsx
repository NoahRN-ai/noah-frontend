
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { UserCircle, Calendar, Tag, Layers, FileText as FileTextIcon, ExternalLink } from 'lucide-react';

    const MetadataItem = ({ icon: Icon, label, value, isLink = false, to = '#' }) => {
      if (!value && value !== 0 && (!Array.isArray(value) || value.length === 0) ) return null;
      
      let displayValue = value;
      if (Array.isArray(value)) {
        displayValue = value.map(tag => (
          <span key={tag} className="inline-block bg-brand-skyBlue/20 text-brand-byzantineBlue dark:bg-brand-skyBlue/10 dark:text-brand-skyBlue/80 px-2 py-0.5 rounded-full text-xs mr-1 mb-1">
            {tag}
          </span>
        ));
      } else if (label === "Created") {
        displayValue = new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }


      return (
        <div className="flex items-start text-sm text-gray-600 dark:text-gray-400 py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
          <Icon className="h-5 w-5 mr-3 text-brand-byzantineBlue dark:text-brand-goldOchre flex-shrink-0 mt-0.5" />
          <span className="font-medium text-gray-700 dark:text-gray-300 w-28">{label}:</span>
          {isLink ? (
            <Link to={to} className="ml-2 text-brand-emeraldGreen hover:underline hover:text-brand-teal">
              {value} <ExternalLink className="inline h-3 w-3 ml-1" />
            </Link>
          ) : (
            <span className="ml-2 flex-grow">{displayValue}</span>
          )}
        </div>
      );
    };

    const DocumentMetadataDisplay = ({ document }) => {
      if (!document) return null;

      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-brand-deepPurple dark:text-brand-goldOchre border-b-2 border-brand-byzantineBlue/30 dark:border-brand-goldOchre/50 pb-2 mb-3">Details</h3>
          <MetadataItem icon={UserCircle} label="Author" value={document.author?.full_name || 'N/A'} />
          <MetadataItem icon={Calendar} label="Created" value={document.created_at} />
          <MetadataItem icon={Tag} label="Tags" value={document.tags && document.tags.length > 0 ? document.tags : 'None'} />
          <MetadataItem icon={Layers} label="Version" value={document.version || '1.0'} />
          <MetadataItem icon={FileTextIcon} label="Status" value={document.status || 'Draft'} />
          
          {document.related_documents && document.related_documents.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-brand-deepPurple dark:text-brand-goldOchre border-b-2 border-brand-byzantineBlue/30 dark:border-brand-goldOchre/50 pb-2 pt-4">Related Documents</h3>
              <ul className="space-y-1">
                {document.related_documents.map(relDoc => (
                  <li key={relDoc.id}>
                     <MetadataItem icon={FileTextIcon} label={relDoc.title} value="View Document" isLink={true} to={`/documents/${relDoc.id}`} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      );
    };

    export default DocumentMetadataDisplay;
  