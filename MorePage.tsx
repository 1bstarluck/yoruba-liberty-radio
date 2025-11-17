
import React from 'react';
import { Page } from '../types';
import { PodcastIcon } from '../components/icons/PodcastIcon';
import { BlogIcon } from '../components/icons/BlogIcon';

interface MorePageProps {
    onNavigate: (page: Page) => void;
}

const MorePage: React.FC<MorePageProps> = ({ onNavigate }) => {
    
    const menuItems = [
        { page: Page.About, label: 'About Us', icon: 'InformationCircleIcon'},
        { page: Page.Vision, label: 'Our Vision', icon: 'EyeIcon'},
        { page: Page.Mission, label: 'Our Mission', icon: 'RocketLaunchIcon'},
        { page: Page.Podcast, label: 'Podcast', icon: 'PodcastIcon'},
        { page: Page.Blog, label: 'Blog', icon: 'BlogIcon'},
        { page: Page.Donation, label: 'Donate', icon: 'HeartIcon'},
        { page: Page.Subscription, label: 'Subscribe', icon: 'StarIcon'},
        { page: Page.Youth, label: 'Youth Connect', icon: 'AcademicCapIcon' },
        { page: Page.Diaspora, label: 'Diaspora Network', icon: 'GlobeAltIcon' },
        { page: Page.Contact, label: 'Contact Us', icon: 'PhoneIcon' },
        { page: Page.Calendar, label: 'Calendar', icon: 'CalendarIcon' },
        { page: Page.Widgets, label: 'Widgets', icon: 'PuzzlePieceIcon' },
    ];
    
    const adminItems = [
        { page: Page.Analytics, label: 'Analytics', icon: 'ChartBarIcon' },
        { page: Page.Backend, label: 'Backend Management', icon: 'Cog6ToothIcon' },
    ];

    const icons: { [key: string]: React.ReactElement } = {
        InformationCircleIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.25 5.25m-1.5-5.25l-.25 5.25m3.75-5.25l.25 5.25m-1.5-5.25l-.25 5.25M3.75 6.75h16.5M4.125 6.75a2.25 2.25 0 012.25-2.25h11.25c1.24 0 2.25.986 2.25 2.25v11.25c0 .62-.504 1.125-1.125 1.125h-1.5c-1.24 0-2.25-.986-2.25-2.25v-2.25c0-1.24-.986-2.25-2.25-2.25h-1.5a2.25 2.25 0 01-2.25-2.25v-2.25c0-1.24.986-2.25 2.25-2.25h1.5" /></svg>,
        EyeIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        RocketLaunchIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.45m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.314.06a6 6 0 01-2.699-2.7m0 0l-1.84-1.84m1.84 1.84l4.895 4.895" /></svg>,
        PodcastIcon: <PodcastIcon />,
        BlogIcon: <BlogIcon />,
        HeartIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
        StarIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.31h5.408a.563.563 0 01.328.96l-4.376 3.184a.563.563 0 00-.182.523l1.638 5.342a.563.563 0 01-.84.622l-4.402-3.26a.563.563 0 00-.664 0l-4.402 3.26a.563.563 0 01-.84-.622l1.638-5.342a.563.563 0 00-.182-.523L2.48 9.88a.563.563 0 01.328-.96h5.408a.563.563 0 00.475-.31L11.48 3.5z" /></svg>,
        AcademicCapIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l.07.042m15.342 0l.07.042m-7.71 2.029a.5.5 0 01.499.042l3.458 2.107a.5.5 0 010 .868l-3.458 2.107a.5.5 0 01-.707 0l-3.458-2.107a.5.5 0 010-.868l3.458-2.107a.5.5 0 01.208-.042z" /></svg>,
        GlobeAltIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0012 13.5c2.998 0 5.74 1.1 7.843 2.918m-15.686 0A8.959 8.959 0 003 12c0-.778.099-1.533.284-2.253m15.432 0c.23.878.358 1.802.358 2.747C21 16.225 16.97 20 12 20s-9-3.775-9-8.25c0-.945.128-1.87.358-2.747m15.432 0a9.043 9.043 0 01-2.427-.636" /></svg>,
        PhoneIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.211-.992-.55-1.34L20.49 15.61c-.339-.348-.816-.54-1.32-.54s-.981.192-1.32.54l-1.68 1.68c-.144.144-.337.216-.532.216s-.388-.072-.532-.216c-1.385-1.385-2.922-3.1-4.606-5.132-2.115-2.6-3.33-4.512-3.33-4.512a.75.75 0 01.216-.532l1.68-1.68c.348-.339.54-.816.54-1.32s-.192-.981-.54-1.32L6.99 2.81c-.348-.339-.824-.54-1.34-.54H4.25A2.25 2.25 0 002 4.5v2.25z" /></svg>,
        ChartBarIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
        CalendarIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" /></svg>,
        PuzzlePieceIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.66.538-1.192 1.192-1.192h.016c.654 0 1.192.532 1.192 1.192v.016c0 .654-.538 1.192-1.192 1.192h-.016a1.192 1.192 0 01-1.192-1.192v-.016zM4.5 12.333V9.75a3 3 0 013-3h.75m-3.75 3.583v2.584c0 1.657 1.343 3 3 3h4.5a3 3 0 003-3v-2.584m-8.25-3.583h8.25a3 3 0 013 3v2.584m0 0a3.001 3.001 0 01-2.25 2.828m-11.25 0A3.001 3.001 0 014.5 12.333" /></svg>,
        Cog6ToothIcon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.48.398.583 1.12.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.075.124a6.57 6.57 0 01-.22.127c-.332.183-.582.495-.645.87l-.213 1.281c-.09.542-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.003-.827c.293-.24.438.613-.438.995s-.145-.755-.438-.995l-1.003-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.075.124a6.57 6.57 0 01.22-.127c.332-.183.582.495.645.87l.213 1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    };

    const ChevronRightIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;

    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 h-full">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">More Options</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {menuItems.map(item => (
                         <li key={item.page} onClick={() => onNavigate(item.page)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div className="flex items-center space-x-4">
                                <span className="text-blue-600 dark:text-yellow-400">{icons[item.icon]}</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">{item.label}</span>
                            </div>
                            {ChevronRightIcon}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-8">
                 <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Admin & Tools</h3>
                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                     <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {adminItems.map(item => (
                             <li key={item.page} onClick={() => onNavigate(item.page)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                <div className="flex items-center space-x-4">
                                    <span className="text-blue-600 dark:text-yellow-400">{icons[item.icon]}</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">{item.label}</span>
                                </div>
                                {ChevronRightIcon}
                            </li>
                        ))}
                    </ul>
                 </div>
            </div>
        </div>
    );
};

export default MorePage;