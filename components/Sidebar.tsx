
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  theme: 'dark' | 'light';
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, theme }) => {
  const isDark = theme === 'dark';
  const navItems = [
    { type: ViewType.HOME, icon: 'fa-house', label: 'Trang chủ' },
    { type: ViewType.DASHBOARD, icon: 'fa-chart-simple', label: 'Bảng điều khiển' },
    { type: ViewType.ANALYSIS, icon: 'fa-magnifying-glass', label: 'Phân tích' },
    { type: ViewType.CHAT, icon: 'fa-robot', label: 'Chat AI' },
    { type: ViewType.SETTINGS, icon: 'fa-gear', label: 'Cài đặt' },
  ];

  return (
    <aside className={`w-16 md:w-20 ${isDark ? 'bg-[#242629] border-[#33363a]' : 'bg-white border-gray-200'} border-r flex flex-col items-center py-6 gap-8 transition-colors`}>
      <div className="text-xl font-bold mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg text-white">
          S
        </div>
      </div>
      
      <nav className="flex flex-col gap-6 flex-1">
        {navItems.map((item) => (
          <button
            key={item.type}
            onClick={() => onViewChange(item.type)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group relative ${
              activeView === item.type 
                ? 'bg-blue-600/20 text-blue-500 border border-blue-500/30' 
                : isDark ? 'text-gray-400 hover:bg-[#2d3035] hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'
            }`}
            title={item.label}
          >
            <i className={`fa-solid ${item.icon} text-lg`}></i>
            <span className="absolute left-full ml-4 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
         <button className={`${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'} transition-colors`}>
            <i className="fa-solid fa-circle-question text-xl"></i>
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;
