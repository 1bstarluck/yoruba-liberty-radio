
import React, { useState, useRef } from 'react';
import { Page, CalendarEvent, NowPlaying } from '../types';
import { PlayIcon } from '../components/icons/PlayIcon';
import { PauseIcon } from '../components/icons/PauseIcon';
import { VolumeIcon } from '../components/icons/VolumeIcon';

const HeroSection: React.FC<{onNavigate: (page: Page) => void}> = ({ onNavigate }) => {
    return (
        <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-extrabold tracking-tight">The Voice of the Yoruba People</h2>
            <p className="mt-2 text-blue-200">Connecting our community at home and abroad through news, culture, and stories.</p>
            <button 
                onClick={() => onNavigate(Page.News)}
                className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900 focus:ring-yellow-400"
            >
                Explore Latest News
            </button>
        </div>
    );
};

interface LiveStreamPlayerProps {
    isLivePlaying: boolean;
    setIsLivePlaying: (isPlaying: boolean) => void;
    nowPlaying: NowPlaying;
}

const LiveStreamPlayer: React.FC<LiveStreamPlayerProps> = ({ isLivePlaying, setIsLivePlaying, nowPlaying }) => {
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const streamUrl = 'https://streaming.live365.com/a99577';

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    setError(null); // Clear previous errors

    if (isLivePlaying) {
      audioRef.current.pause();
      audioRef.current.src = '';
    } else {
      audioRef.current.src = streamUrl;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error("Error playing audio:", err);
          setError("Stream unavailable. It may be offline.");
          setIsLivePlaying(false);
        });
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleError = () => {
    if(isLivePlaying) { // Only show error if it was already playing
        setError("Stream interrupted. Please try again.");
        setIsLivePlaying(false);
    }
  };
  
  const LiveProgressBar = () => {
    if (!isLivePlaying) return null;
    return (
        <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div className="bg-yellow-400 h-1.5 rounded-full animate-indeterminate-progress"></div>
            <style>
                {`
                    @keyframes indeterminate-progress {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(250%); }
                    }
                    .animate-indeterminate-progress {
                        animation: indeterminate-progress 2s linear infinite;
                    }
                `}
            </style>
        </div>
    );
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <audio
        ref={audioRef}
        onPlay={() => { setIsLivePlaying(true); setError(null); }}
        onPause={() => setIsLivePlaying(false)}
        onError={handleError}
        preload="none"
        crossOrigin="anonymous"
        aria-hidden="true"
      />
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg">LIVE STREAM</h3>
          <p className="text-yellow-400 text-sm">Iroyin Itaniji Broadcast</p>
        </div>
        <button 
          onClick={togglePlayPause} 
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400"
          aria-label={isLivePlaying ? "Pause Live Stream" : "Play Live Stream"}
        >
          <span className="relative flex h-3 w-3">
            <span className={`absolute inline-flex h-full w-full rounded-full ${isLivePlaying ? 'animate-ping bg-red-400' : 'bg-gray-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isLivePlaying ? 'bg-red-500' : 'bg-gray-500'}`}></span>
          </span>
          <span className={`${isLivePlaying ? 'text-red-500' : 'text-gray-400'} font-semibold`}>LIVE</span>
        </button>
      </div>

      <div className="w-full bg-black h-48 flex items-center justify-center rounded-md relative group">
        {error ? (
            <div className="text-center text-red-400 px-4">
                <p className="font-semibold">Playback Error</p>
                <p className="text-sm mt-1">{error}</p>
            </div>
        ) : (
            <div className={`text-center text-gray-400 transition-opacity duration-300 ${isLivePlaying ? 'opacity-50' : 'opacity-100'}`}>
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 5.636a9 9 0 0112.728 0M8.464 15.536a5 5 0 010-7.072"></path></svg>
              <p className="mt-2">{isLivePlaying ? 'Playing Live...' : 'Stream Paused'}</p>
            </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300">
          <button
            onClick={togglePlayPause}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold p-4 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-yellow-400 transform group-hover:scale-110"
            aria-label={isLivePlaying ? 'Pause Stream' : 'Play Stream'}
          >
            {isLivePlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
      
       {/* Now Playing Section */}
       {isLivePlaying && nowPlaying.artist && nowPlaying.song && (
        <div className="mt-4 p-3 bg-black/30 rounded-lg">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Now Playing</p>
            <p className="font-bold text-white truncate">{nowPlaying.song}</p>
            <p className="text-sm text-gray-300 truncate">{nowPlaying.artist}</p>
            <p className="text-xs text-gray-500 mt-2">Music provided for broadcast. All rights belong to original artists.</p>
        </div>
      )}

      {/* Controls Section */}
      <div className="mt-4 space-y-3">
        <LiveProgressBar />
        <div className="flex items-center space-x-3">
            <VolumeIcon />
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                aria-label="Volume control"
            />
        </div>
      </div>
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
                    <img className="h-48 w-full object-cover md:w-48" src="https://images.unsplash.com/photo-1588056024183-53c101c27d42?q=80&w=600&auto-format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Emergency Shortwave Radio"/>
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

const YorubaPeopleSection: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Who are the Yoruba People?</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        The Yoruba people are one of Africa's largest ethnic groups, predominantly found in Southwestern Nigeria and neighboring countries. Renowned for a rich history centered around powerful city-states like Ife and Oyo, their culture is globally celebrated for its vibrant arts, complex mythology, and profound philosophical concepts. From the intricate bronze sculptures of Ife to the rhythmic beats of talking drums, the Yoruba heritage has made a significant and lasting impact on the world.
      </p>
      <button 
        onClick={() => onNavigate(Page.About)} 
        className="mt-4 text-blue-600 dark:text-yellow-400 font-semibold hover:underline"
      >
        Learn More About Us &rarr;
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
    isLivePlaying: boolean;
    setIsLivePlaying: (isPlaying: boolean) => void;
    events: CalendarEvent[];
    nowPlaying: NowPlaying;
}

const HomePage: React.FC<HomePageProps> = ({onProductClick, onNavigate, isLivePlaying, setIsLivePlaying, events, nowPlaying}) => {
  return (
    <div className="p-4 space-y-6">
      <HeroSection onNavigate={onNavigate} />
      <LiveStreamPlayer isLivePlaying={isLivePlaying} setIsLivePlaying={setIsLivePlaying} nowPlaying={nowPlaying} />

      <RadioPromoCard onClick={onProductClick} />

      <YorubaPeopleSection onNavigate={onNavigate} />
      <UpcomingEventsSection events={events} onNavigate={onNavigate} />

      <SupportSection onNavigate={onNavigate} />

      <div>
        <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">What Our Listeners Say</h3>
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            <TestimonialCard 
                quote="Yoruba Liberty Radio keeps me connected to my roots, even miles away from home. The news is always timely and relevant."
                author="Bisi Adebayo, London"
            />
            <TestimonialCard 
                quote="The Q&A with Gemini is fantastic! I've learned so much about our culture. Thank you for this wonderful platform."
                author="Tunde Okoro, Toronto"
            />
            <TestimonialCard 
                quote="Listening to Iroyin Itaniji every morning from Lagos is the best way to start my day. It's authentic and informative."
                author="Femi Adekunle, Lagos"
            />
            <TestimonialCard 
                quote="As a Yoruba man in New York, this station is my lifeline to our culture. The diaspora network features are a great addition."
                author="Ayo Williams, New York"
            />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">Explore Our Radio</h3>
        <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
                <img src="https://images.unsplash.com/photo-1559029923-e3a3e6a9d283?q=80&w=200&auto=format&fit=crop" className="w-24 h-24 rounded-lg object-cover flex-shrink-0" alt="Branded radio in a lifestyle setting"/>
                <div>
                    <h4 className="font-semibold dark:text-white">Crystal Clear Reception</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Built for reliability, ensuring you never miss a broadcast.</p>
                     <button className="mt-2 text-sm text-blue-600 dark:text-yellow-400 font-semibold hover:underline">View Photos</button>
                </div>
            </div>
             <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1563262982-63452b6715f21?q=80&w=200&auto=format&fit=crop" className="w-24 h-24 rounded-lg object-cover" alt="Branded radio on a table"/>
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm11.5 5.5l-5 3A.5.5 0 0110 12v-4a.5.5 0 01.5-.5.5.5 0 01.25.06l5 3a.5.5 0 010 .88z"></path></svg>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold dark:text-white">Video: Unboxing & Demo</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">See all the features of our emergency radio in detail.</p>
                     <button className="mt-2 text-sm text-blue-600 dark:text-yellow-400 font-semibold hover:underline">Watch Now</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;