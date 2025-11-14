
import React, { useState, useEffect } from 'react';

const ExchangeRateWidget = () => {
    const [amount, setAmount] = useState('100');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('NGN');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const currencies = ['USD', 'NGN', 'EUR', 'GBP'];

    const convertCurrency = () => {
        if (!amount) return;
        setIsLoading(true);
        // In a real app, this would be an API call.
        // We will simulate it with a timeout and fixed rates.
        setTimeout(() => {
            const rates: {[key: string]: number} = {
                'USD': 1,
                'NGN': 1/1500,
                'EUR': 1.07,
                'GBP': 1.25,
            };

            const amountInUSD = parseFloat(amount) * rates[fromCurrency];
            const result = amountInUSD / rates[toCurrency];
            
            setConvertedAmount(new Intl.NumberFormat('en-US', { style: 'currency', currency: toCurrency }).format(result));
            setIsLoading(false);
        }, 500);
    };

    useEffect(() => {
        convertCurrency();
    }, [amount, fromCurrency, toCurrency]);

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Currency Converter</h3>
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 items-end">
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="from" className="block text-sm font-medium text-gray-700 dark:text-gray-200">From</label>
                        <select id="from" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white">
                            {currencies.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="to" className="block text-sm font-medium text-gray-700 dark:text-gray-200">To</label>
                        <select id="to" value={toCurrency} onChange={e => setToCurrency(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white">
                             {currencies.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex justify-center">
                     <button onClick={swapCurrencies} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 12L3 8m4 4l4-4m6 0v12m0-12l4 4m-4-4l-4 4" /></svg>
                    </button>
                </div>
                <div className="text-center bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <p className="text-gray-600 dark:text-gray-300">Converted Amount:</p>
                    {isLoading ? (
                        <div className="h-8 mt-1 w-24 mx-auto bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                    ) : (
                        <p className="text-2xl font-bold text-blue-600 dark:text-yellow-400 mt-1">{convertedAmount}</p>
                    )}
                </div>
            </div>
             <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">Rates are for informational purposes only.</p>
        </div>
    );
};

const proverbs = [
    { yoruba: "A pẹkọ ni ajá fi njẹ ìgbẹ́.", english: "A dog that will eat feces must be trained for it." },
    { yoruba: "Ìkòkò ò ní ru ẹrù tí kò lè gbé.", english: "The pot will not carry a load it cannot bear." },
    { yoruba: "Adìẹ funfun kò mọ ara rẹ̀ ní àgbà.", english: "A white chicken does not realize its age." },
    { yoruba: "Bí a bá rí i, a rí i; bí a kò rí i, a rí i.", english: "If we see it, we see it; if we don't, we still see it (Some things are undeniable)." },
    { yoruba: "Ọwọ́ ọmọdé kò tó pẹpẹ, t'àgbàlagbà kò wọ kèrègbè.", english: "A child's hand cannot reach the high shelf, and an adult's hand cannot enter the gourd." },
];

const DailyProverbWidget = () => {
    const [currentProverb, setCurrentProverb] = useState(proverbs[0]);

    const getNewProverb = () => {
        const randomIndex = Math.floor(Math.random() * proverbs.length);
        setCurrentProverb(proverbs[randomIndex]);
    };

    return (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Daily Yoruba Proverb</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md space-y-2">
                <p className="font-semibold text-lg text-gray-900 dark:text-white">{currentProverb.yoruba}</p>
                <p className="italic text-gray-600 dark:text-gray-300">"{currentProverb.english}"</p>
            </div>
            <button
                onClick={getNewProverb}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                New Proverb
            </button>
        </div>
    );
};

const WidgetsPage: React.FC = () => {
  return (
    <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900">
       <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Helpful Widgets</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Tools to help you stay connected.</p>
      </div>
      <ExchangeRateWidget />
      <DailyProverbWidget />
    </div>
  );
};

export default WidgetsPage;