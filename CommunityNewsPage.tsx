
import React, { useState, useEffect } from 'react';
import { NewsArticle, YorubaHero } from '../types.ts';
import { ShareIcon } from '../components/icons/ShareIcon.tsx';
import { TwitterIcon } from '../components/icons/TwitterIcon.tsx';
import NewsCardSkeleton from '../components/NewsCardSkeleton.tsx';
import YorubaHeroSkeleton from '../components/YorubaHeroSkeleton.tsx';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon.tsx';
import YouTubeVideoPlaceholder from '../components/YouTubeVideoPlaceholder.tsx';

const YorubaHeroSection: React.FC<{ hero: YorubaHero }> = ({ hero }) => {
    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden mb-8 p-6">
            {/* Header with Avatar and Title */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <img
                        className="h-28 w-28 object-cover rounded-full shadow-md border-4 border-yellow-400"
                        src={hero.imageUrl || `https://via.placeholder.com/150.png?text=Ojulowo`}
                        alt={hero.name}
                    />
                </div>
                {/* Title and Name */}
                <div className="text-center sm:text-left">
                    <h3 className="text-sm uppercase tracking-widest font-semibold text-blue-900 dark:text-yellow-400">
                       Ojulowo Omo Yoruba Pataki
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Distinguished Person of the Month</p>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{hero.name}</h2>
                </div>
            </div>

            {/* Biography */}
            <div className="mt-6 border-t border-gray-200 dark:border-gray-600 pt-6">
                <p className="text-gray-600 dark:text-gray-300" style={{ whiteSpace: 'pre-line' }}>{hero.bio}</p>
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

    const handleTwitterShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        const tweetText = encodeURIComponent(article.title);
        // Using current href as a placeholder for the article URL, and adding a mention.
        const articleUrl = encodeURIComponent(window.location.href);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${articleUrl}&via=YorubaLiberty`;
        window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    };

    const handleWhatsAppShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        const message = encodeURIComponent(`${article.title} - ${window.location.href}`);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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
                 <div className="mt-4 flex items-center flex-wrap gap-4">
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
                    <button 
                        onClick={handleTwitterShare}
                        className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-400 dark:hover:text-sky-400 transition-colors"
                        aria-label="Share article on Twitter"
                    >
                        <TwitterIcon className="w-5 h-5" />
                        <span>Tweet</span>
                    </button>
                    <button 
                        onClick={handleWhatsAppShare}
                        className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                        aria-label="Share article on WhatsApp"
                    >
                        <WhatsAppIcon className="w-5 h-5" />
                        <span>WhatsApp</span>
                    </button>
                 </div>
            </div>
        </div>
    );
};

const CommunityNewsPage: React.FC<CommunityNewsPageProps> = ({ news, yorubaHero, onSelectArticle }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a network request to fetch data
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // 1.5 seconds delay

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-4">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Community News</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Stay updated with the latest from our community.</p>
            </div>
            
            {isLoading ? <YorubaHeroSkeleton /> : <YorubaHeroSection hero={yorubaHero} />}

            <YouTubeVideoPlaceholder />
            
            <div className="mt-6">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <NewsCardSkeleton key={index} />
                        ))}
                    </div>
                ) : news.length > 0 ? (
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