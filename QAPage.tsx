
import React, { useState } from 'react';

const traditionalQuestions = [
    {
        question: "What is Yoruba Liberty Radio (YLR)?",
        answer: "Yoruba Liberty Radio is an international shortwave broadcasting service dedicated to being the voice of the Yoruba people, both at home and in the diaspora. We provide news, cultural programming, and a platform for community connection."
    },
    {
        question: "What is the mission of YLR?",
        answer: "Our core mission is to inform, educate, preserve, and empower the global Yoruba community. We aim to provide unbiased news, promote our rich culture and language, and foster a strong, united network of Yoruba people worldwide."
    },
    {
        question: "What does 'Iroyin Itaniji' mean?",
        answer: "'Iroyin Itaniji' translates to 'The Awakening News.' It is the flagship news program of Yoruba Liberty Radio, focused on delivering timely, relevant, and insightful news that matters to our listeners."
    },
    {
        question: "How can I listen to the live stream?",
        answer: "You can listen to our live broadcast directly through this app! Just go to the 'Home' page and press the play button on the Live Stream Player. We also broadcast on traditional shortwave frequencies."
    },
    {
        question: "How can I support the station?",
        answer: "You can support us by listening regularly, sharing our app with friends and family, and by purchasing merchandise from our 'Shop' section. Every purchase helps us continue our mission."
    }
];

const TraditionalQA: React.FC = () => {
    const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(0);

    const toggleQuestion = (index: number) => {
        setOpenQuestionIndex(openQuestionIndex === index ? null : index);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Frequently Asked Questions</h3>
            <div className="space-y-2">
                {traditionalQuestions.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <button
                            onClick={() => toggleQuestion(index)}
                            className="w-full flex justify-between items-center text-left py-3 focus:outline-none"
                        >
                            <span className="font-semibold text-gray-800 dark:text-gray-200">{item.question}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform transition-transform duration-200 text-gray-500 ${openQuestionIndex === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openQuestionIndex === index && (
                            <div className="pb-3 text-gray-600 dark:text-gray-300">
                                <p>{item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


const QAPage: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Q&A and Help Center</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Find answers to common questions about our station.</p>
            </div>
            <TraditionalQA />
        </div>
    );
};

export default QAPage;