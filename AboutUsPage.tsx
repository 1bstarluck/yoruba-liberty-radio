import React from 'react';
import { AboutUsPageContent } from '../types';

interface AboutUsPageProps {
  content: AboutUsPageContent;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ content }) => {
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
                alt="About Yoruba Liberty Radio"
            />
        )}
        <div className="p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-200" style={{ whiteSpace: 'pre-line' }}>
            {content.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
