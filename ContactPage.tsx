
import React from 'react';
import { ContactInfo } from '../types.ts';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon.tsx';

interface ContactPageProps {
    contactInfo: ContactInfo;
}

const ContactPage: React.FC<ContactPageProps> = ({ contactInfo }) => {
    const formatWhatsAppNumber = (phone: string) => {
        // Removes all non-digit characters from the phone number
        return phone.replace(/[^\d]/g, '');
    };

    return (
        <div className="p-4 space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Contact Us</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">We'd love to hear from you!</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 space-y-4">
                <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Our Address</h3>
                    <p className="text-gray-600 dark:text-gray-300">{contactInfo.address}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Email Us</h3>
                    <p className="text-blue-600 dark:text-yellow-400">{contactInfo.email}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Call or Message Us</h3>
                    <a 
                        href={`https://wa.me/${formatWhatsAppNumber(contactInfo.phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors group"
                    >
                        <WhatsAppIcon className="w-5 h-5 text-green-500" />
                        <span>{contactInfo.phone}</span>
                    </a>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <form className="space-y-4">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                        <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"/>
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                        <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"/>
                    </div>
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
                        <textarea id="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;