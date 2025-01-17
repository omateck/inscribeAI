import React from 'react';
import { useProfile } from '../../hooks/useProfile';
import { BarChart2, TrendingUp, FileText, Target, Users, Clock } from 'lucide-react';

interface AnalyticsProps {
  userId: string;
}

export default function Analytics({ userId }: AnalyticsProps) {
  const { getUserProfile } = useProfile();
  const [profile, setProfile] = React.useState<any>(null);
  const [analytics, setAnalytics] = React.useState({
    contentViews: Math.floor(Math.random() * 1000),
    avgEngagement: Math.floor(Math.random() * 100),
    totalTime: Math.floor(Math.random() * 50),
  });

  React.useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserProfile(userId);
        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, [userId, getUserProfile]);

  const stats = [
    {
      name: 'Words Generated',
      value: profile?.words_used.toLocaleString() || '0',
      icon: FileText,
      change: '+4.75%',
      changeType: 'positive',
      color: 'bg-blue-500',
    },
    {
      name: 'Words Remaining',
      value: profile ? (profile.words_limit - profile.words_used).toLocaleString() : '0',
      icon: Target,
      change: profile ? `${Math.floor((profile.words_used / profile.words_limit) * 100)}%` : '0%',
      changeType: 'neutral',
      color: 'bg-purple-500',
    },
    {
      name: 'Content Views',
      value: analytics.contentViews.toLocaleString(),
      icon: Users,
      change: '+12.3%',
      changeType: 'positive',
      color: 'bg-green-500',
    },
    {
      name: 'Avg. Engagement',
      value: `${analytics.avgEngagement}%`,
      icon: TrendingUp,
      change: '+2.5%',
      changeType: 'positive',
      color: 'bg-yellow-500',
    },
    {
      name: 'Time Saved',
      value: `${analytics.totalTime}h`,
      icon: Clock,
      change: '+8.1%',
      changeType: 'positive',
      color: 'bg-pink-500',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((item) => (
        <div
          key={item.name}
          className="bg-white rounded-xl shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${item.color} bg-opacity-10 mb-3`}>
                  <item.icon className={`w-5 h-5 ${item.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">{item.name}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{item.value}</p>
            </div>
            <div className={`text-sm ${
              item.changeType === 'positive' ? 'text-green-600' : 
              item.changeType === 'negative' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {item.change}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
            <div
              className={`h-full ${item.color} transition-all duration-500 ease-in-out group-hover:opacity-80`}
              style={{ width: item.change.replace('%', '') + '%' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}