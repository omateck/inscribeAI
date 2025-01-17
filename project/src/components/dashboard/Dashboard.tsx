import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useProfile } from '../../hooks/useProfile';
import Analytics from './Analytics';
import ContentList from './ContentList';
import MediaGenerator from '../ai/MediaGenerator';
import { Layout, Pen, Image, Zap, Settings } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { getUserProfile } = useProfile();
  const [profile, setProfile] = React.useState<any>(null);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'content' | 'media' | 'ai'>('overview');

  React.useEffect(() => {
    if (user) {
      getUserProfile(user.id).then(setProfile);
    }
  }, [user]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-2">Welcome back</h2>
                <p className="text-2xl font-bold">{profile.full_name}</p>
                <p className="mt-4 text-indigo-100">
                  {profile.words_limit - profile.words_used} words remaining
                </p>
              </div>
              <Analytics userId={user!.id} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Pen className="w-5 h-5 mr-2 text-indigo-500" />
                  Recent Content
                </h2>
                <ContentList userId={user!.id} onEdit={() => {}} limit={5} />
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-indigo-500" />
                  Quick Create
                </h2>
                <MediaGenerator />
              </div>
            </div>
          </>
        );
      case 'content':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Content Management</h2>
            <ContentList userId={user!.id} onEdit={() => {}} />
          </div>
        );
      case 'media':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Media Generation</h2>
            <MediaGenerator />
          </div>
        );
      case 'ai':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">AI Tools</h2>
            {/* AI tools will be implemented here */}
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm p-4">
        <div className="space-y-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overview' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Layout className="w-5 h-5" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'content' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Pen className="w-5 h-5" />
            <span>Content</span>
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'media' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Image className="w-5 h-5" />
            <span>Media</span>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'ai' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Zap className="w-5 h-5" />
            <span>AI Tools</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
}