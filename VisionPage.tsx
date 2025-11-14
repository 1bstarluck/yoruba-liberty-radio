
import React from 'react';
import { VisionPageContent } from '../types';

interface VisionPageProps {
  content: VisionPageContent;
}

const VisionPage: React.FC<VisionPageProps> = ({ content }) => {
  return (
    <div className="p-4 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{content.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{content.subtitle}</p>
      </div>
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
        {content.imageUrl && (
            <img 
                className="h-56 w-full object-cover" 
                src={content.imageUrl}
                alt="A view of the earth from space, representing a global vision"
            />
        )}
        <div className="p-8">
            <blockquote className="text-center text-xl italic font-semibold text-gray-900 dark:text-white border-l-4 border-blue-600 dark:border-yellow-400 pl-4">
               "{content.quote}"
            </blockquote>
        </div>
        <div className="p-6 space-y-4 text-gray-700 dark:text-gray-200">
             <p style={{ whiteSpace: 'pre-line' }}>
                {content.description}
             </p>
        </div>
      </div>
    </div>
  );
};

export default VisionPage;