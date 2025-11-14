
import React from 'react';
import { CalendarEvent } from '../types';

interface CalendarPageProps {
    events: CalendarEvent[];
}

const categoryColors: {[key: string]: string} = {
    'Community': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Special Broadcast': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Radio Show': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Youth Connect': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};

const EventItem: React.FC<{event: CalendarEvent}> = ({ event }) => {
    // Helper to format date string 'YYYY-MM-DD' into a more readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString + 'T00:00:00'); // Assume local timezone
        return {
            monthDay: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
            day: date.getDate().toString()
        };
    };

    const { monthDay, day } = formatDate(event.date);

    return (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md flex space-x-4">
            <div className="flex-shrink-0 text-center border-r border-gray-200 dark:border-gray-600 pr-4 w-20">
                <p className="text-sm text-gray-500 dark:text-gray-400">{monthDay.split(' ')[0]}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-yellow-400">{day}</p>
            </div>
            <div>
                <div className="flex items-center space-x-2 flex-wrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[event.category] || 'bg-gray-100 text-gray-800'}`}>
                        {event.category}
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
                </div>
                <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">{event.title}</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">{event.description}</p>
            </div>
        </div>
    )
};

const CalendarPage: React.FC<CalendarPageProps> = ({ events }) => {
  return (
    <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Events Calendar</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Upcoming shows, festivals, and community gatherings.</p>
        </div>
        <div className="space-y-4">
            {events.length > 0 ? (
                [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => (
                    <EventItem key={event.id} event={event} />
                ))
            ) : (
                 <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                    <p>No upcoming events. Please check back later!</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default CalendarPage;