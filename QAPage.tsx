
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiAnswer } from '../services/geminiService.ts';
import { MicrophoneIcon } from '../components/icons/MicrophoneIcon.tsx';
import { TraditionalQAItem } from '../types.ts';
import { SendIcon } from '../components/icons/SendIcon.tsx';
import LiveChat from '../components/LiveChat.tsx';

const TraditionalQA: React.FC<{items: TraditionalQAItem[]}> = ({ items }) => {
    const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(0);

    const toggleQuestion = (index: number) => {
        setOpenQuestionIndex(openQuestionIndex === index ? null : index);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Frequently Asked Questions</h3>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={item.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
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

interface Message {
    text: string;
    isUser: boolean;
}

const GeminiQA: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;

            recognition.onresult = (event: any) => {
                const transcript = event.results[event.results.length - 1][0].transcript;
                setInput(transcript);
            };

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                let errorMessage = "An error occurred with the microphone.";
                if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                    errorMessage = "Microphone access denied. Please enable it in your browser settings.";
                } else if (event.error === 'no-speech') {
                    errorMessage = "No speech was detected. Please try again.";
                }
                setError(errorMessage);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };
            
            recognitionRef.current = recognition;
        } else {
            console.warn("Speech Recognition not supported in this browser.");
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    const handleSend = async (question?: string) => {
        const userMessage = question || input;
        if (!userMessage.trim() || isLoading) return;

        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setInput('');
        setIsLoading(true);
        setError(null);
        
        try {
            const answer = await getGeminiAnswer(userMessage);
            setMessages(prev => [...prev, { text: answer, isUser: false }]);
        } catch (err) {
            setError("Sorry, something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleListening = () => {
        if (!recognitionRef.current) {
            setError("Sorry, voice input is not supported on your browser.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(() => {
                    setError(null);
                    recognitionRef.current.start();
                    setIsListening(true);
                })
                .catch(err => {
                    console.error("Mic permission error", err);
                    setError("Microphone permission is required for voice input. Please allow access.");
                    setIsListening(false);
                });
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSend();
    };

    const suggestionPrompts = [
        "What is the history of the Yoruba people?",
        "Tell me a famous Yoruba proverb.",
        "Who was Queen Moremi?",
    ];
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Ask Our AI Assistant</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Powered by Gemini</p>
            </div>
            <div className="p-4 h-96 overflow-y-auto flex flex-col space-y-4">
                {messages.length === 0 && !isLoading && (
                    <div className="text-center my-auto text-gray-500 dark:text-gray-400">
                        <p>Ask anything about Yoruba culture, history, or general topics.</p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {suggestionPrompts.map(prompt => (
                                <button
                                    key={prompt}
                                    onClick={() => handleSend(prompt)}
                                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${msg.isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100'}`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex justify-start">
                        <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100">
                            <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"></span>
                            </div>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="flex justify-start">
                        <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300">
                           <p>{error}</p>
                        </div>
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isListening ? "Listening..." : "Type your question..."}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        disabled={isLoading || isListening}
                        aria-label="Ask a question"
                    />
                    <button
                        type="button"
                        onClick={handleToggleListening}
                        disabled={isLoading}
                        className={`p-3 rounded-full transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed flex-shrink-0 ${
                            isListening 
                            ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse' 
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                        }`}
                        aria-label={isListening ? "Stop listening" : "Start listening"}
                    >
                        <MicrophoneIcon className="w-5 h-5"/>
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                        aria-label="Send message"
                    >
                        <SendIcon className="w-5 h-5"/>
                    </button>
                </form>
            </div>
        </div>
    );
};

interface QAPageProps {
    traditionalQA: TraditionalQAItem[];
}

const QAPage: React.FC<QAPageProps> = ({ traditionalQA }) => {
    return (
        <div className="p-4 space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Q&A and Help Center</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Find answers to common questions about our station.</p>
            </div>
            <TraditionalQA items={traditionalQA} />
            <GeminiQA />
            <LiveChat />
        </div>
    );
};

export default QAPage;