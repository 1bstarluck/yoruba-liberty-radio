
import React from 'react';
import { YouthConnectPageContent } from '../types.ts';

interface YouthConnectPageProps {
  content: YouthConnectPageContent;
}

const YouthConnectPage: React.FC<YouthConnectPageProps> = ({ content }) => {
  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{content.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{content.subtitle}</p>
      </div>
      <div className="bg-