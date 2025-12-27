
import React from 'react';

interface SettingsViewProps {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ theme, setTheme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="p-12 max-w-4xl mx-auto flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-12">Cài đặt</h2>
      
      <div className="w-full space-y-8">
        {/* Theme */}
        <div className={`${isDark ? 'bg-[#2d3035] border-[#3f444e]' : 'bg-white border-gray-200 shadow-sm'} p-6 rounded-2xl border flex items-center justify-between transition-colors`}>
          <div>
            <h3 className="text-xl font-bold">Chủ đề</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
              {isDark ? 'Chế độ tối đang bật' : 'Chế độ sáng đang bật'}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={isDark} 
              onChange={() => setTheme(isDark ? 'light' : 'dark')}
              className="sr-only peer" 
            />
            <div className="w-14 h-7 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Font Selection */}
        <div className={`${isDark ? 'bg-[#2d3035] border-[#3f444e]' : 'bg-white border-gray-200 shadow-sm'} p-6 rounded-2xl border transition-colors`}>
           <h3 className="text-xl font-bold mb-4">Kiểu chữ</h3>
           <select className={`w-full ${isDark ? 'bg-[#1a1c1e] border-[#3f444e] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors`}>
              <option>Phông chữ hệ thống</option>
              <option>Inter</option>
              <option>Roboto</option>
              <option>Open Sans</option>
           </select>
        </div>

        {/* Language Selection */}
        <div className={`${isDark ? 'bg-[#2d3035] border-[#3f444e]' : 'bg-white border-gray-200 shadow-sm'} p-6 rounded-2xl border transition-colors`}>
           <h3 className="text-xl font-bold mb-4">Ngôn ngữ</h3>
           <select className={`w-full ${isDark ? 'bg-[#1a1c1e] border-[#3f444e] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors`}>
              <option>Tiếng Việt</option>
              <option>English</option>
              <option>日本語</option>
              <option>Français</option>
           </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
