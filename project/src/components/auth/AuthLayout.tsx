import React from 'react';
import { Outlet } from 'react-router-dom';
import { PenLine } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center pt-12">
        <div className="flex items-center mb-8">
          <PenLine className="h-10 w-10 text-indigo-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">Inscribe AI</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}