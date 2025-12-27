
import React from 'react';

interface HomeViewProps {
  theme: 'dark' | 'light';
  onOpenAssistant: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ theme, onOpenAssistant }) => {
  const isDark = theme === 'dark';
  return (
    <div className={`flex flex-col items-center justify-center h-full text-center px-4 transition-colors ${isDark ? 'bg-[#1a1c1e]' : 'bg-[#f8fafc]'}`}>
      <div className="relative">
         <div className={`absolute -inset-20 ${isDark ? 'bg-blue-500/10' : 'bg-blue-500/5'} rounded-full blur-3xl`}></div>
         <h1 className={`text-4xl md:text-6xl font-bold tracking-tight mb-6 relative ${isDark ? 'text-white' : 'text-gray-900'}`}>
           Chào mừng đến với <span className="text-orange-500">SafeChat</span>
         </h1>
      </div>
      <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-lg`}>
        Trải nghiệm trò chuyện AI an toàn của bạn. Bảo vệ dữ liệu và phát hiện rủi ro tức thì.
      </p>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
         <div className={`${isDark ? 'bg-[#2d3035] border-[#3f444e]' : 'bg-white border-gray-200 shadow-sm'} p-8 rounded-2xl border hover:border-blue-500/50 transition-all cursor-default`}>
            <i className="fa-solid fa-shield-halved text-3xl text-blue-500 mb-4"></i>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Bảo mật tối đa</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Dữ liệu của bạn luôn được mã hóa và bảo vệ tuyệt đối.</p>
         </div>
         <div className={`${isDark ? 'bg-[#2d3035] border-[#3f444e]' : 'bg-white border-gray-200 shadow-sm'} p-8 rounded-2xl border hover:border-orange-500/50 transition-all cursor-default`}>
            <i className="fa-solid fa-bolt text-3xl text-orange-400 mb-4"></i>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Phân tích siêu tốc</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sử dụng AI tiên tiến để trả về kết quả chỉ trong vài giây.</p>
         </div>
         <div className={`${isDark ? 'bg-[#2d3035] border-[#3f444e]' : 'bg-white border-gray-200 shadow-sm'} p-8 rounded-2xl border hover:border-green-500/50 transition-all cursor-default`}>
            <i className="fa-solid fa-user-check text-3xl text-green-500 mb-4"></i>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Dễ dàng sử dụng</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Giao diện thân thiện, phù hợp cho mọi đối tượng người dùng.</p>
         </div>
      </div>

      <div className="fixed bottom-8 right-8">
        <button 
          onClick={onOpenAssistant}
          className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-xl transition-transform hover:scale-110"
        >
          <i className="fa-solid fa-comment-dots"></i>
        </button>
      </div>
    </div>
  );
};

export default HomeView;
