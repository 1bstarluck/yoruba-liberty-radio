
import React from 'react';
import { ContactInfo } from '../types';
import { FacebookIcon } from './icons/FacebookIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface FooterProps {
    contactInfo: ContactInfo;
}

const Footer: React.FC<FooterProps> = ({ contactInfo }) => {
    const formatWhatsAppNumber = (phone: string) => {
        // Removes all non-digit characters
        return phone.replace(/[^\d]/g, '');
    };

    return (
        <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pt-8 px-4">
            <div className="max-w-md mx-auto">
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-500 hover:text-blue-600 dark:hover:text-white transition-colors">
                        <FacebookIcon />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-pink-500 dark:hover:text-white transition-colors">
                        <InstagramIcon />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-500 hover:text-blue-400 dark:hover:text-white transition-colors">
                        <TwitterIcon />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-500 hover:text-red-600 dark:hover:text-white transition-colors">
                        <YoutubeIcon />
                    </a>
                    {contactInfo && contactInfo.phone && (
                        <a 
                            href={`https://wa.me/${formatWhatsAppNumber(contactInfo.phone)}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label="WhatsApp" 
                            className="text-gray-500 hover:text-green-500 dark:hover:text-white transition-colors"
                        >
                            <WhatsAppIcon />
                        </a>
                    )}
                </div>
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Yoruba Liberty Radio. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
