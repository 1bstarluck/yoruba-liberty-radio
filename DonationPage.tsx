import React, { useState } from 'react';
import { DonationOption, DonationPageContent, Page } from '../types';
import { PayPalIcon } from '../components/icons/PayPalIcon';
import { StripeIcon } from '../components/icons/StripeIcon';

interface DonationPageProps {
    donationOptions: DonationOption[];
    content: DonationPageContent;
    onNavigate: (page: Page) => void;
}

const DonationPage: React.FC<DonationPageProps> = ({ donationOptions, content, onNavigate }) => {
    const [selectedAmount, setSelectedAmount] = useState<number>(donationOptions.find(o => o.amount === 25)?.amount || (donationOptions[0]?.amount || 0));
    const [customAmount, setCustomAmount] = useState<string>('');

    const handleAmountClick = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCustomAmount(value);
        if (value && !isNaN(parseFloat(value))) {
            setSelectedAmount(parseFloat(value));
        } else if (!value) {
            setSelectedAmount(0); // or some default/neutral state
        }
    };

    return (
        <div className="p-4 space-y-6">
            {content.imageUrl && (
                <img src={content.imageUrl} alt="Donation appeal" className="w-full h-48 object-cover rounded-lg shadow-md" />
            )}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{content.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl mx-auto">
                    {content.description}
                </p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Choose a Donation Amount</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    {donationOptions.sort((a,b) => a.amount - b.amount).map(option => (
                        <button
                            key={option.id}
                            onClick={() => handleAmountClick(option.amount)}
                            className={`p-4 rounded-lg text-center font-bold text-lg transition-colors ${selectedAmount === option.amount && !customAmount ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-600 dark:text-white'}`}
                        >
                            ${option.amount}
                        </button>
                    ))}
                </div>
                <div>
                    <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Or enter a custom amount</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                            type="number"
                            name="custom-amount"
                            id="custom-amount"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            placeholder="0.00"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            aria-label="Custom donation amount"
                        />
                         <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">USD</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => onNavigate(Page.ThankYou)}
                    className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedAmount <= 0}
                >
                    Donate ${selectedAmount > 0 ? selectedAmount : '...'}
                </button>
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Secure payments powered by</p>
                    <div className="flex justify-center items-center space-x-4">
                        <PayPalIcon className="h-6 text-gray-700 dark:text-gray-300" />
                        <StripeIcon className="h-6 text-gray-700 dark:text-gray-300" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationPage;