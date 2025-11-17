
import React from 'react';
import { Page, CalendarEvent, Testimonial, HomePageContent, NowPlaying } from '../types.ts';
import { YoutubeIcon } from '../components/icons/YoutubeIcon.tsx';
import { AppStoreIcon } from '../components/icons/AppStoreIcon.tsx';
import { GooglePlayIcon } from '../components/icons/GooglePlayIcon.tsx';
import GeminiGreeting from '../components/GeminiGreeting.tsx';

const HeroSection: React.FC<{onNavigate: (page: Page) => void; content: HomePageContent}> = ({ onNavigate, content }) => {
    return (
        <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-extrabold tracking-tight">{content.heroTitle}</h2>
            <p className="mt-2 text-blue-200">{content.heroSubtitle}</p>
            <button 
                onClick={() => onNavigate(Page.News)}
                className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900 focus:ring-yellow-400"
            >
                {content.heroButtonText}
            </button>
        </div>
    );
};

const YouTubeLiveStreamSection: React.FC = () => {
    const youtubeLiveUrl = 'https://www.youtube.com/@YorubaLibertyRadio/live';
    
    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="font-bold text-lg">LIVE STREAM</h3>
                    <p className="text-yellow-400 text-sm">Now Broadcasting on YouTube</p>
                </div>
                <div className="flex items-center space-x-2 p-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-red-500 font-semibold">LIVE</span>
                </div>
            </div>

            <div 
                className="w-full h-48 flex items-center justify-center rounded-md relative group bg-cover bg-center"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1593339790595-369052df536a?q=80&w=800&auto=format&fit=crop')"}}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition-all duration-300 rounded-md"></div>
                <div className="relative text-center p-4">
                    <p className="text-white font-semibold mb-4">Click to watch the live broadcast</p>
                    <a
                        href={youtubeLiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500 inline-flex items-center space-x-2"
                        aria-label="Watch Live on YouTube"
                    >
                        <YoutubeIcon />
                        <span>Watch on YouTube</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

const NowPlayingDisplay: React.FC<{ nowPlaying: NowPlaying }> = ({ nowPlaying }) => {
    if (!nowPlaying || !nowPlaying.songTitle || !nowPlaying.artistName) {
        return null;
    }

    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            <p className="text-sm text-yellow-400 font-semibold tracking-wider">NOW PLAYING ON AIR</p>
            <h4 className="text-xl font-bold truncate">{nowPlaying.songTitle}</h4>
            <p className="text-md text-gray-300">{nowPlaying.artistName}</p>
            <p className="text-xs text-gray-500 mt-2">
                Artist and song information is displayed for attribution purposes. All rights belong to their respective owners.
            </p>
        </div>
    );
};

const RadioPromoCard: React.FC<{onClick: () => void}> = ({onClick}) => {
    const handleVideoClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the card's onClick from firing
        alert('Playing advertisement video for Emergency Shortwave Radio!');
    };

    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={onClick}>
            <div className="md:flex">
                <div className="md:flex-shrink-0 relative">
                    <img className="h-48 w-full object-cover md:w-48" src="https://images.unsplash.com/photo-1588056024183-53c101c27d42?q=80&w=600&auto-format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Emergency Shortwave Radio"/>
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center hover:bg-opacity-40 transition-opacity">
                        <button 
                            onClick={handleVideoClick} 
                            className="bg-white bg-opacity-80 rounded-full p-3 hover:bg-opacity-100 transition" 
                            aria-label="Play radio advertisement video">
                            <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm11.5 5.5l-5 3A.5.5 0 0110 12v-4a.5.5 0 01.5-.5.5.5 0 01.25.06l5 3a.5.5 0 010 .88z"></path></svg>
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-yellow-400 font-semibold">Limited Offer</div>
                    <h3 className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white">Emergency Multifunctional Radio</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-300">Stay connected with our branded shortwave radio. Perfect for emergencies and daily listening.</p>
                    <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition-colors">
                        Learn More & Buy
                    </button>
                </div>
            </div>
        </div>
    );
}

const DownloadAppSection: React.FC = () => (
    <div className="bg-gray-800 dark:bg-black rounded-lg shadow-lg p-6 text-white text-center">
        <h3 className="text-2xl font-bold text-yellow-400">Take Yoruba Liberty Radio Anywhere</h3>
        <p className="mt-2 text-gray-300">Listen live, read news, and connect with the community on the go. Download our mobile app today!</p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="bg-black text-white py-2 px-4 rounded-lg border border-gray-600 hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto" aria-label="Download on the App Store">
                <AppStoreIcon />
                <div>
                    <p className="text-xs">Download on the</p>
                    <p className="text-lg font-semibold -mt-1">App Store</p>
                </div>
            </a>
            <a href="#" className="bg-black text-white py-2 px-4 rounded-lg border border-gray-600 hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto" aria-label="Get it on Google Play">
                <GooglePlayIcon />
                <div>
                    <p className="text-xs">GET IT ON</p>
                    <p className="text-lg font-semibold -mt-1">Google Play</p>
                </div>
            </a>
        </div>
    </div>
);

const AdvancementCTASection: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <div className="bg-blue-50 dark:bg-blue-900/50 p-6 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold text-blue-900 dark:text-white">For the Advancement of the Yoruba People</h3>
        <p className="mt-2 text-blue-800 dark:text-blue-200 max-w-2xl mx-auto">
            Your support fuels our mission to preserve our culture, empower our youth, and amplify our voice on the global stage. Join us in this noble cause.
        </p>
        <button
            onClick={() => onNavigate(Page.Donation)}
            className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
            Support the Mission
        </button>
    </div>
);


const SupportSection: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
        <div 
            onClick={() => onNavigate(Page.Donation)}
            className="bg-green-50 dark:bg-green-900/50 p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer hover:bg-green-100 dark:hover:bg-green-900"
        >
            <div className="flex-shrink-0 w-12 h-12 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center text-green-700 dark:text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <div>
                <h4 className="text-lg font-bold text-green-800 dark:text-green-200">Make a Donation</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">Your support keeps our voice strong. Help us continue our mission.</p>
            </div>
        </div>
        <div 
            onClick={() => onNavigate(Page.Subscription)}
            className="bg-purple-50 dark:bg-purple-900/50 p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900"
        >
            <div className="flex-shrink-0 w-12 h-12 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center text-purple-700 dark:text-purple-300">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            </div>
            <div>
                <h4 className="text-lg font-bold text-purple-800 dark:text-purple-200">Become a Member</h4>
                <p className="text-purple-700 dark:text-purple-300 text-sm">Join our family with a subscription for exclusive content.</p>
            </div>
        </div>
    </div>
);

const TestimonialCard: React.FC<{quote: string; author: string}> = ({quote, author}) => (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-inner">
        <svg className="w-8 h-8 text-blue-200 dark:text-blue-800 mb-2" fill="currentColor" viewBox="0 0 20 20" transform="rotate(180)"><path d="M6 2a2 2 0 00-2 2v8a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2H6zM14 2a2 2 0 00-2 2v8a2 2 0 002 2h2a2 2 0 002-2V4a2 2 0 00-2-2h-2z"></path></svg>
        <p className="text-gray-600 dark:text-gray-300 italic">"{quote}"</p>
        <p className="text-right font-semibold mt-2 text-gray-800 dark:text-white">- {author}</p>
    </div>
);

const YorubaPeopleSection: React.FC<{ onNavigate: (page: Page) => void; content: HomePageContent }> = ({ onNavigate, content }) => (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{content.yorubaPeopleTitle}</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        {content.yorubaPeopleContent}
      </p>
      <button 
        onClick={() => onNavigate(Page.About)} 
        className="mt-4 text-blue-600 dark:text-yellow-400 font-semibold hover:underline"
      >
        {content.yorubaPeopleButtonText}
      </button>
    </div>
);

const UpcomingEventsSection: React.FC<{ events: CalendarEvent[], onNavigate: (page: Page) => void }> = ({ events, onNavigate }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = events
        .filter(event => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);
    
    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
            {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                    {upcomingEvents.map(event => (
                        <div key={event.id} className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg flex items-center space-x-4">
                            <div className="text-center w-16 flex-shrink-0">
                                <p className="font-bold text-xl text-blue-600 dark:text-yellow-400">{new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { day: 'numeric' })}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-300">{new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}</p>
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-semibold text-gray-800 dark:text-white">{event.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
                            </div>
                        </div>
                    ))}
                    <button 
                        onClick={() => onNavigate(Page.Calendar)} 
                        className="w-full mt-4 text-blue-600 dark:text-yellow-400 font-semibold hover:underline"
                    >
                        View Full Calendar &rarr;
                    </button>
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">No upcoming events scheduled. Please check back soon!</p>
            )}
        </div>
    );
};

interface HomePageProps {
    onProductClick: () => void;
    onNavigate: (page: Page) => void;
    events: CalendarEvent[];
    testimonials: Testimonial[];
    content: HomePageContent;
    nowPlaying: NowPlaying;
}

const HomePage: React.FC<HomePageProps> = ({onProductClick, onNavigate, events, testimonials, content, nowPlaying}) => {
  return (
    <div className="p-4 space-y-6">
      <HeroSection onNavigate={onNavigate} content={content} />
      <GeminiGreeting />
      <YouTubeLiveStreamSection />
      <NowPlayingDisplay nowPlaying={nowPlaying} />
      <RadioPromoCard onClick={onProductClick} />
      <DownloadAppSection />
      <YorubaPeopleSection onNavigate={onNavigate} content={content} />
      <UpcomingEventsSection events={events} onNavigate={onNavigate} />
      <AdvancementCTASection onNavigate={onNavigate} />
      <SupportSection onNavigate={onNavigate} />

      <div>
        <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{content.testimonialsTitle}</h3>
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {testimonials.map(testimonial => (
                 <TestimonialCard 
                    key={testimonial.id}
                    quote={testimonial.quote}
                    author={testimonial.author}
                />
            ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{content.exploreTitle}</h3>
        <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
                <img src="https://images.unsplash.com/photo-1559029923-e3a3e6a9d283?q=80&w=200&auto-format&fit=crop" className="w-24 h-24 rounded-lg object-cover flex-shrink-0" alt="Branded radio in a lifestyle setting"/>
                <div>
                    <h4 className="font-semibold dark:text-white">{content.exploreCard1Title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{content.exploreCard1Content}</p>
                     <button className="mt-2 text-sm text-blue-600 dark:text-yellow-400 font-semibold hover:underline">{content.exploreCard1ButtonText}</button>
                </div>
            </div>
             <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1563262982-63452b6715f21?q=80&w=200&auto-format&fit=crop" className="w-24 h-24 rounded-lg object-cover" alt="Branded radio on a table"/>
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm11.5 5.5l-5 3A.5.5 0 0110 12v-4a.5.5 0 01.5-.5.5.5 0 01.25.06l5 3a.5.5 0 010 .88z"></path></svg>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold dark:text-white">{content.exploreCard2Title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{content.exploreCard2Content}</p>
                     <button className="mt-2 text-sm text-blue-600 dark:text-yellow-400 font-semibold hover:underline">{content.exploreCard2ButtonText}</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;