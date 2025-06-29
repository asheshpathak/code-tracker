import React from 'react';
import { LayoutDashboard, List, BarChart3, Settings, Zap } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'problems', label: 'Problems', icon: List },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="bg-white border border-gray-200 rounded-md shadow-sm p-4 mb-5 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Zap size={20} className="text-blue-600" />
        <h1 className="text-lg font-semibold text-gray-900">CodeTracker</h1>
      </div>
      <nav className="flex gap-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              <IconComponent size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;