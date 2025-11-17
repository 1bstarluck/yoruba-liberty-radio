
import React, { useState } from 'react';
import { CalendarEvent } from '../types';

const categoryColors: {[key: string]: string} = {
    'Community': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-700',
    'Special Broadcast': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-700',
    'Radio Show': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-700',
    'Youth Connect': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700',
};

const EventListItem: React.FC<{event: CalendarEvent}> = ({ event }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString + 'T00:00:00');
        return {
            day: date.toLocaleDateString('en-US', { day: 'numeric' }),
            weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
        };
    };

    const { day, weekday } = formatDate(event.date);

    return (
        <div className="bg-white dark:bg-gray-700/50 p-3 rounded-lg flex items-start space-x-4 hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 text-center bg-gray-50 dark:bg-gray-600 rounded-md p-2 w-16">
                <p className="font-bold text-xl text-blue-600 dark:text-yellow-400">{day}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{weekday}</p>
            </div>
            <div className="flex-grow">
                <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{event.title}</h3>
                <div className="flex items-center space-x-2 flex-wrap mt-1">
                     <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
                     <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[event.category] || 'bg-gray-100 text-gray-800'}`}>
                        {event.category}
                    </span>
                </div>
            </div>
        </div>
    );
};


const CalendarPage: React.FC<{ events: CalendarEvent[] }> = ({ events }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const changeMonth = (offset: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(1); // Set to first day to avoid month skipping issues
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    const eventsByDate: { [key: number]: CalendarEvent[] } = events.reduce((acc, event) => {
        const eventDate = new Date(event.date + 'T00:00:00');
        if (eventDate.getFullYear() === year && eventDate.getMonth() === month) {
            const day = eventDate.getDate();
            if (!acc[day]) acc[day] = [];
            acc[day].push(event);
        }
        return acc;
    }, {} as { [key: number]: CalendarEvent[] });

    const blanks = Array(firstDayOfMonth).fill(null);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const eventsForCurrentMonth = events
        .filter(event => {
            const eventDate = new Date(event.date + 'T00:00:00');
            return eventDate.getFullYear() === year && eventDate.getMonth() === month;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Events Calendar</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Upcoming shows and community gatherings.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                    <button 
                        onClick={() => changeMonth(-1)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                        aria-label="Previous month"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button 
                        onClick={() => changeMonth(1)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                        aria-label="Next month"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {weekDays.map(day => <div key={day} className="font-semibold">{day}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {blanks.map((_, i) => <div key={`blank-${i}`} className="h-10"></div>)}
                    {daysArray.map(day => {
                        const isToday = isCurrentMonth && day === today.getDate();
                        const hasEvents = !!eventsByDate[day];
                        return (
                            <div key={day} className={`h-10 flex justify-center items-center relative rounded-full ${isToday ? 'bg-blue-600 text-white font-bold' : 'dark:text-gray-200'}`}>
                                <span>{day}</span>
                                {hasEvents && <div className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${isToday ? 'bg-white' : 'bg-blue-500 dark:bg-yellow-400'}`}></div>}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Events in {currentDate.toLocaleString('default', { month: 'long' })}</h3>
                {eventsForCurrentMonth.length > 0 ? (
                    <div className="space-y-3">
                        {eventsForCurrentMonth.map(event => (
                            <EventListItem key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-500 dark:text-gray-400">
                        <p>No events scheduled for this month.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default CalendarPage;
