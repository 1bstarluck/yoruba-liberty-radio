
import React, { useState, useCallback, useEffect } from 'react';
import { Page, CartItem, Product, NewsArticle, PodcastEpisode, BlogPost, CalendarEvent, ContactInfo, DonationOption, SubscriptionTier, DonationPageContent, ThankYouContent, DiasporaPageContent, YouthConnectPageContent, AboutUsPageContent, VisionPageContent, NowPlaying, YorubaHero, AnalyticsData } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ShoppingCart from './components/ShoppingCart';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CommunityNewsPage from './pages/CommunityNewsPage';
import MorePage from './pages/MorePage';
import ContactPage from './pages/ContactPage';
import YouthConnectPage from './pages/YouthConnectPage';
import DiasporaNetworkPage from './pages/DiasporaNetworkPage';
import AboutUsPage from './pages/AboutUsPage';
import VisionPage from './pages/VisionPage';
import MissionPage from './pages/MissionPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CalendarPage from './pages/CalendarPage';
import WidgetsPage from './pages/WidgetsPage';
import QAPage from './pages/QAPage';
import PodcastPage from './pages/PodcastPage';
import BlogPage from './pages/BlogPage';
import Footer from './components/Footer';
import BackendPage from './pages/BackendPage';
import DonationPage from './pages/DonationPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ThankYouPage from './pages/ThankYouPage';
import ArticleDetailPage from './pages/ArticleDetailPage';

// Initial Data moved here to simulate a database/CMS
const initialProducts: Product[] = [
  { id: 1, name: 'Emergency Multifunctional Shortwave Radio', description: 'YORUBA LIBERTY RADIO branded emergency radio. Features AM/FM, Shortwave, weather alerts, solar charging, hand crank, and a power bank. Your reliable companion.', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1588056024183-53c101c27d42?q=80&w=600&auto-format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, name: 'YLR Branded T-Shirt', description: 'High-quality cotton T-Shirt with the Yoruba Liberty Radio logo. Show your support!', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto-format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, name: 'Iroyin Itaniji Coffee Mug', description: 'Start your day with the "Awakening News". A perfect ceramic mug for your morning coffee or tea.', price: 15.99, imageUrl: 'https://images.unsplash.com/photo-1616394478834-3a7852b6d513?q=80&w=600&auto-format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, name: 'YLR Branded Cap', description: 'Stylish and comfortable cap with the YLR logo.', price: 19.99, imageUrl: '' }, // No image URL to show placeholder
];

const initialNews: NewsArticle[] = [
    { id: 1, title: "Annual Yoruba Cultural Festival Draws Thousands", excerpt: "The annual festival celebrating Yoruba heritage was a massive success this year, featuring traditional music, dance, and art from across the globe.", author: "Adebayo Alonge", date: "3 days ago", imageUrl: "https://images.unsplash.com/photo-1597157636186-c37b35543552?q=80&w=600&auto-format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Youth Connect Initiative Launches Mentorship Program", excerpt: "A new program aims to connect young Yoruba professionals with experienced mentors in their fields to foster growth and leadership.", author: "Folake Ojo", date: "1 week ago", imageUrl: "https://images.unsplash.com/photo-1541507099233-818f4a258a18?q=80&w=600&auto-format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, title: "Diaspora Network Announces Global Business Summit", excerpt: "Yoruba entrepreneurs from around the world will gather in Lagos for a summit focused on investment and collaboration.", author: "Chinedu Okoro", date: "2 weeks ago", imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600&auto-format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

const initialPodcasts: PodcastEpisode[] = [
    { id: 1, title: 'Episode 1: The History of the Oyo Empire', duration: '45 min', imageUrl: 'https://images.unsplash.com/photo-1590602847991-9d6f358a964a?q=80&w=600' },
    { id: 2, title: 'Episode 2: Yoruba Proverbs and Their Meanings', duration: '30 min', imageUrl: 'https://images.unsplash.com/photo-1554189097-94a3e214f213?q=80&w=600' },
    { id: 3, title: 'Episode 3: A Conversation with a Yoruba Elder', duration: '60 min', imageUrl: 'https://images.unsplash.com/photo-1604313576131-12513a21233c?q=80&w=600' },
];

const initialBlogs: BlogPost[] = [
    { id: 1, title: 'The Significance of Adire in Yoruba Culture', author: 'Folake Ojo', date: 'Oct 20, 2024', imageUrl: 'https://images.unsplash.com/photo-1621295228543-a6123b0c9a29?q=80&w=600' },
    { id: 2, title: 'A Guide to the Annual Osun-Osogbo Festival', author: 'Adebayo Alonge', date: 'Oct 15, 2024', imageUrl: 'https://images.unsplash.com/photo-1597157636186-c37b35543552?q=80&w=600' },
    { id: 3, title: 'Modern Yoruba Cuisine: A Fusion of Flavors', author: 'Chinedu Okoro', date: 'Oct 10, 2024', imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695d0464?q=80&w=600' },
];

const initialEvents: CalendarEvent[] = [
    { id: 1, date: '2024-10-26', time: '10:00 AM - 6:00 PM', title: 'Yoruba Cultural Festival', description: 'Join us for the annual celebration of Yoruba heritage with music, dance, and food in Lagos.', category: 'Community' },
    { id: 2, date: '2024-10-28', time: '8:00 PM', title: 'Live Q&A with Prof. Wole Soyinka', description: 'An exclusive live-streamed session discussing modern Yoruba literature.', category: 'Special Broadcast' },
    { id: 3, date: '2024-11-01', time: '7:00 AM', title: 'Iroyin Itaniji - Weekly Review', description: 'A deep dive into the biggest news stories of the week affecting the Yoruba community.', category: 'Radio Show' },
    { id: 4, date: '2024-11-05', time: '2:00 PM', title: 'Youth Connect: Career Workshop', description: 'A virtual workshop for young professionals on navigating the modern workplace.', category: 'Youth Connect' },
];

const initialContactInfo: ContactInfo = {
    address: '123 Liberty Avenue, Ibadan, Nigeria',
    email: 'contact@yorubalibertyradio.com',
    phone: '+234 123 456 7890'
};

const initialDonationOptions: DonationOption[] = [
    { id: 1, amount: 10 },
    { id: 2, amount: 25 },
    { id: 3, amount: 50 },
    { id: 4, amount: 100 },
];

const initialSubscriptionTiers: SubscriptionTier[] = [
    { id: 1, title: "Monthly Supporter", price: 5, period: "month", features: "Monthly exclusive newsletter,Access to supporter-only blog posts,Your name on our 'Thank You' page,Helps cover our streaming costs", isPopular: false },
    { id: 2, title: "Annual Patron", price: 50, period: "year", features: "All Monthly Supporter benefits,12 months for the price of 10 (2 months free!),Early access to new podcast episodes,A special digital thank-you card", isPopular: true },
];

const initialDiasporaContent: DiasporaPageContent = {
    title: "Diaspora Network",
    subtitle: "Connecting Yoruba people across the globe.",
    description: `The Yoruba Liberty Radio Diaspora Network is a global community for Yoruba people living outside of Nigeria. Our mission is to preserve our culture, promote our language, and build strong professional and social connections.

Find community events in your city, join professional groups, and stay connected to your roots, no matter where you are in the world.`,
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop"
};

const initialYouthConnectContent: YouthConnectPageContent = {
    title: "Youth Connect",
    subtitle: "Empowering the next generation.",
    description: `Our Youth Connect program is dedicated to fostering talent, leadership, and cultural pride among young Yoruba individuals worldwide. We provide resources, mentorship, and networking opportunities to help them achieve their full potential.

Join our workshops, seminars, and community projects to connect with peers, learn from leaders, and make a positive impact.`,
    imageUrl: "https://images.unsplash.com/photo-1573496773905-f5b17e76b254?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

const initialAboutUsContent: AboutUsPageContent = {
    title: "About Yoruba Liberty Radio",
    subtitle: "The Voice of the Yoruba People",
    description: `Founded with a passion for preserving our rich heritage, Yoruba Liberty Radio (YLR) is an international shortwave broadcasting service dedicated to the Yoruba people at home and in the diaspora. We are the home of "Iroyin Itaniji" – The Awakening News, providing timely, unbiased, and relevant information that matters to our community.

Our journey began with a simple mission: to create a platform that connects, informs, and celebrates the Yoruba culture. From broadcasting insightful news and current affairs to featuring traditional music, language lessons, and cultural documentaries, we strive to be a constant companion that feels like home.

YLR is more than just a radio station; it is a community hub. Through initiatives like the Youth Connect and Diaspora Network, we foster connections, empower the next generation, and build bridges across continents. We believe in the power of unity and the importance of a shared identity.

Thank you for being a part of our story. Together, we will continue to amplify the voice of the Yoruba people for generations to come.`,
    imageUrl: "https://images.unsplash.com/photo-1519702111-344315514643?q=80&w=600&auto=format&fit=crop"
};

const initialVisionContent: VisionPageContent = {
    title: "Our Vision",
    subtitle: "Uniting and Empowering the Global Yoruba Community",
    quote: "To be the leading global platform for Yoruba culture, heritage, and discourse, fostering a united, informed, and prosperous global community for generations to come.",
    description: `We envision a future where every Yoruba person, regardless of their location, feels a strong connection to their roots. A future where our language thrives, our traditions are celebrated, and our stories are told with pride on a global stage.

Through innovative broadcasting and digital engagement, we aim to be the catalyst for cultural renaissance, economic empowerment, and social cohesion within the worldwide Yoruba community.`,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
};

const initialYorubaHero: YorubaHero = {
    name: "Chief Obafemi Awolowo",
    bio: "Chief Obafemi Awolowo (1909-1987) was a Nigerian nationalist and statesman who played a key role in Nigeria's independence movement. As the first premier of the Western Region, he implemented progressive social policies, including free primary education and healthcare. A revered Yoruba leader, his legacy of visionary leadership, fiscal discipline, and unwavering commitment to federalism continues to inspire generations.",
    imageUrl: "https://images.unsplash.com/photo-1604313576131-12513a21233c?q=80&w=600"
};

const initialAnalyticsData: AnalyticsData = {
    totalListeners24h: "14,302",
    listenersChange: "+3.2%",
    storeSalesMonth: "$4,821",
    salesChange: "+12.5%",
    listenerTrends: "12500,13100,13800,13400,14302",
    topLocations: "Lagos:45;London:25;New York:15;Ibadan:10;Other:5",
    topProducts: "Emergency Radio:1950;T-Shirt:1230;Coffee Mug:980;Cap:661"
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Home);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLivePlaying, setIsLivePlaying] = useState(false);
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);
  
  // Centralized state for all dynamic content
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [news, setNews] = useState<NewsArticle[]>(initialNews);
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>(initialPodcasts);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo);
  const [donationOptions, setDonationOptions] = useState<DonationOption[]>(initialDonationOptions);
  const [subscriptionTiers, setSubscriptionTiers] = useState<SubscriptionTier[]>(initialSubscriptionTiers);
  const [donationPageContent, setDonationPageContent] = useState<DonationPageContent>({
    title: 'Support Yoruba Liberty Radio',
    description: 'Your generous contribution helps us continue our mission to inform, educate, and empower the global Yoruba community. Every donation, big or small, makes a difference.',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
  });
  const [thankYouContent, setThankYouContent] = useState<ThankYouContent>({
    title: 'Thank You!',
    message: 'Your support means the world to us. Together, we are keeping the voice of the Yoruba people strong and vibrant.',
  });
  const [diasporaPageContent, setDiasporaPageContent] = useState<DiasporaPageContent>(initialDiasporaContent);
  const [youthConnectPageContent, setYouthConnectPageContent] = useState<YouthConnectPageContent>(initialYouthConnectContent);
  const [aboutUsPageContent, setAboutUsPageContent] = useState<AboutUsPageContent>(initialAboutUsContent);
  const [visionPageContent, setVisionPageContent] = useState<VisionPageContent>(initialVisionContent);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>({ artist: "King Sunny Adé", song: "Ja Funmi" });
  const [yorubaHero, setYorubaHero] = useState<YorubaHero>(initialYorubaHero);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(initialAnalyticsData);


  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === productId);
        if (existingItem && existingItem.quantity > 1) {
            return prevCart.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
        }
        return prevCart.filter(item => item.id !== productId);
    });
  }, []);

  const handleSelectArticle = useCallback((article: NewsArticle) => {
    setSelectedArticle(article);
    setActivePage(Page.ArticleDetail);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case Page.Home:
        return <HomePage onProductClick={() => setActivePage(Page.Shop)} onNavigate={setActivePage} isLivePlaying={isLivePlaying} setIsLivePlaying={setIsLivePlaying} events={events} nowPlaying={nowPlaying} />;
      case Page.QA:
        return <QAPage />;
      case Page.Shop:
        return <ShopPage products={products} onAddToCart={addToCart} />;
      case Page.News:
        return <CommunityNewsPage news={news} yorubaHero={yorubaHero} onSelectArticle={handleSelectArticle} />;
      case Page.ArticleDetail:
        return <ArticleDetailPage article={selectedArticle} onBack={() => setActivePage(Page.News)} />;
      case Page.More:
        return <MorePage onNavigate={setActivePage} />;
      case Page.Podcast:
        return <PodcastPage episodes={podcasts} />;
      case Page.Blog:
        return <BlogPage posts={blogs} />;
      case Page.Contact:
        return <ContactPage contactInfo={contactInfo} />;
      case Page.Youth:
        return <YouthConnectPage content={youthConnectPageContent} />;
      case Page.Diaspora:
        return <DiasporaNetworkPage content={diasporaPageContent} />;
      case Page.About:
        return <AboutUsPage content={aboutUsPageContent} />;
      case Page.Vision:
        return <VisionPage content={visionPageContent} />;
      case Page.Mission:
        return <MissionPage />;
      case Page.Analytics:
        return <AnalyticsPage analyticsData={analyticsData} />;
      case Page.Calendar:
        return <CalendarPage events={events} />;
      case Page.Widgets:
        return <WidgetsPage />;
      case Page.Donation:
        return <DonationPage donationOptions={donationOptions} onNavigate={setActivePage} content={donationPageContent} />;
      case Page.Subscription:
        return <SubscriptionPage subscriptionTiers={subscriptionTiers} onNavigate={setActivePage} />;
      case Page.ThankYou:
        return <ThankYouPage content={thankYouContent} onNavigate={setActivePage} />;
      case Page.Backend:
        return <BackendPage 
                  logoUrl={logoUrl}
                  setLogoUrl={setLogoUrl}
                  products={products}
                  setProducts={setProducts}
                  news={news}
                  setNews={setNews}
                  podcasts={podcasts}
                  setPodcasts={setPodcasts}
                  blogs={blogs}
                  setBlogs={setBlogs}
                  events={events}
                  setEvents={setEvents}
                  contactInfo={contactInfo}
                  setContactInfo={setContactInfo}
                  donationOptions={donationOptions}
                  setDonationOptions={setDonationOptions}
                  subscriptionTiers={subscriptionTiers}
                  setSubscriptionTiers={setSubscriptionTiers}
                  donationPageContent={donationPageContent}
                  setDonationPageContent={setDonationPageContent}
                  thankYouContent={thankYouContent}
                  setThankYouContent={setThankYouContent}
                  aboutUsPageContent={aboutUsPageContent}
                  setAboutUsPageContent={setAboutUsPageContent}
                  visionPageContent={visionPageContent}
                  setVisionPageContent={setVisionPageContent}
                  youthConnectPageContent={youthConnectPageContent}
                  setYouthConnectPageContent={setYouthConnectPageContent}
                  diasporaPageContent={diasporaPageContent}
                  setDiasporaPageContent={setDiasporaPageContent}
                  nowPlaying={nowPlaying}
                  setNowPlaying={setNowPlaying}
                  yorubaHero={yorubaHero}
                  setYorubaHero={setYorubaHero}
                  analyticsData={analyticsData}
                  setAnalyticsData={setAnalyticsData}
                />;
      default:
        return <HomePage onProductClick={() => setActivePage(Page.Shop)} onNavigate={setActivePage} isLivePlaying={isLivePlaying} setIsLivePlaying={setIsLivePlaying} events={events} nowPlaying={nowPlaying} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md md:max-w-3xl lg:max-w-5xl mx-auto bg-white dark:bg-gray-800 flex flex-col shadow-2xl">
      <Header 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        logoUrl={logoUrl}
        isLivePlaying={isLivePlaying}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="flex-grow overflow-y-auto">
        <div className="pb-20">
          {renderPage()}
          <Footer />
        </div>
      </main>
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
      <ShoppingCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        onRemoveFromCart={removeFromCart}
        onAddToCart={(product) => addToCart(product as Product)}
      />
    </div>
  );
};

export default App;