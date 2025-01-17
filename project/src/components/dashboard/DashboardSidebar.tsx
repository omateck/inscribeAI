import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Layout, 
  FileText, 
  BarChart2, 
  Settings,
  Users,
  CreditCard
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Layout },
  { name: 'Content', href: '/dashboard/content', icon: FileText },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-sm min-h-screen">
      <nav className="mt-5 px-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                group flex items-center px-2 py-2 text-sm font-medium rounded-md
                ${isActive 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <item.icon 
                className={`
                  mr-3 h-5 w-5
                  ${isActive ? 'text-indigo-700' : 'text-gray-400 group-hover:text-gray-500'}
                `}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}