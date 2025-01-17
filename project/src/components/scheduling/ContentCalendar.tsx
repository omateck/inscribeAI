import React from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';

interface ScheduledContent {
  id: string;
  title: string;
  scheduledFor: string;
  type: string;
  status: 'draft' | 'scheduled' | 'published';
}

interface ContentCalendarProps {
  scheduledContent: ScheduledContent[];
  onSchedule: (contentId: string, date: string) => void;
}

export default function ContentCalendar({ scheduledContent, onSchedule }: ContentCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const getStatusColor = (status: ScheduledContent['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'published': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Content Calendar</h2>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="space-y-4">
        {scheduledContent.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {new Date(item.scheduledFor).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                <Tag className="w-3 h-3 mr-1" />
                {item.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}