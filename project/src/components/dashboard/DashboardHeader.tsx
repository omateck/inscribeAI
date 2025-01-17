import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Bell, Settings, LogOut } from 'lucide-react';

export default function DashboardHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => signOut()}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}