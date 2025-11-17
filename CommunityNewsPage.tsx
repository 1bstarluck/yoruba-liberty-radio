import React from 'react';
import { NewsArticle, YorubaHero } from '../types';
import { ShareIcon } from '../components/icons/ShareIcon';

const YorubaHeroSection: React.FC<{ hero: YorubaHero }> = ({ hero }) => {
    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden mb-8">
            <h3 className="text-center text-sm uppercase tracking-widest font-semibold text-blue-900 dark:text-blue-900 bg-yellow-400 dark:bg-yellow-500 py-2">Yoruba Hero or Heroine of the Month</h3>
            <div className="md:flex">
                <div className="md:w-1/3">
                    <img className="h-full w-full object-cover" src={hero.imageUrl || `https://via.placeholder.com/400x500.png?text=Yoruba+Hero`} alt={hero.name} />
                </div>
                <div className="p-6 md:w-2/3">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{hero.name}</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-300" style={{ whiteSpace: 'pre-line' }}>{hero.bio}</p>
                </div>
            </div>
        </div>
    );
};


interface CommunityNewsPageProps {
    news: NewsArticle[];
    yorubaHero: YorubaHero;
    onSelectArticle: (article: NewsArticle) => void;
}

const NewsCard: React.FC<{article: NewsArticle; onSelectArticle: (article: NewsArticle) => void;}> = ({ article, onSelectArticle }) => {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.excerpt,
                    url: window.location.href, // In a real app, this would be the article's specific URL
                });
            } catch (error) {
                console.error('Error sharing article:', error);
            }
        } else {
            alert('Share feature not available on this browser.');
        }
    };

    const handleShareClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleShare();
    };

    return (
        <div 
            className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => onSelectArticle(article)}
        >
            <img className="h-48 w-full object-cover" src={article.imageUrl} alt={article.title} />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{article.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 flex-grow">{article.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>By {article.author}</span>
                    <span>{article.date}</span>
                </div>
                 <div className="mt-4 flex items-center space-x-4">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onSelectArticle(article); }}
                        className="text-blue-600 dark:text-yellow-400 font-semibold hover:underline"
                    >
                        Read More
                    </button>
                    <button 
                        onClick={handleShareClick}
                        className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors"
                        aria-label="Share article"
                    >
                        <ShareIcon />
                        <span>Share</span>
                    </button>
                 </div>
            </div>
        </div>
    );
};

const CommunityNewsPage: React.FC<CommunityNewsPageProps> = ({ news, yorubaHero, onSelectArticle }) => {
    return (
        <div className="p-4">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Community News</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Stay updated with the latest from our community.</p>
            </div>
            
            <YorubaHeroSection hero={yorubaHero} />
            
            <div className="mt-6">
                {news.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {news.map(article => (
                            <NewsCard key={article.id} article={article} onSelectArticle={onSelectArticle} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        <p>No news articles at the moment. Please check back later!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommunityNewsPage;