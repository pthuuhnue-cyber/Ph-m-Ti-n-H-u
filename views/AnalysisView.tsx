
import React from 'react';

interface AnalysisViewProps {
  theme: 'dark' | 'light';
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <div className={`p-12 max-w-6xl mx-auto transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-2">Phân tích SafeChat</h2>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg`}>
          Trang web này phân tích cuộc trò chuyện để phụ huynh có thể ngăn chặn trẻ em khỏi những rủi ro không mong muốn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard isDark={isDark} icon="fa-magnifying-glass" title="Tải lên nhật ký trò chuyện" desc="Nhập các cuộc trò chuyện từ nhiều nền tảng khác nhau để phân tích rủi ro." color="blue" />
        <FeatureCard isDark={isDark} icon="fa-shield-virus" title="Phát hiện rủi ro" desc="Phân tích được hỗ trợ bởi AI xác định các mối đe dọa tiềm ẩn và nội dung không phù hợp." color="red" />
        <FeatureCard isDark={isDark} icon="fa-file-contract" title="Tạo báo cáo" desc="Nhận các báo cáo chi tiết with những hiểu biết và khuyến nghị để hướng dẫn phụ huynh." color="green" />
      </div>
      
      <div className={`mt-16 ${isDark ? 'bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-blue-500/20' : 'bg-blue-50 border-blue-100'} p-12 rounded-[40px] border transition-colors`}>
         <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
               <h3 className="text-2xl font-bold mb-4">Công nghệ AI tiên tiến</h3>
               <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
                  Chúng tôi sử dụng mô hình Gemini 3 mới nhất để phân tích ngữ nghĩa, giọng điệu và các yếu tố hình ảnh trong ảnh chụp màn hình trò chuyện của con bạn.
               </p>
               <ul className="space-y-3">
                  <CheckItem isDark={isDark} text="Nhận diện gạ gẫm và bắt nạt" />
                  <CheckItem isDark={isDark} text="Cảnh báo lừa đảo tài chính" />
               </ul>
            </div>
            <div className={`w-full md:w-1/3 aspect-square ${isDark ? 'bg-[#1a1c1e] border-[#333]' : 'bg-white border-gray-200'} rounded-3xl border flex items-center justify-center shadow-2xl transition-colors`}>
               <i className={`fa-solid fa-brain text-8xl ${isDark ? 'text-blue-500/30' : 'text-blue-500/20'}`}></i>
            </div>
         </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ isDark: boolean; icon: string; title: string; desc: string; color: 'blue' | 'red' | 'green' }> = ({ isDark, icon, title, desc, color }) => {
  const colors = {
    blue: 'text-blue-500 bg-blue-500/10 hover:bg-blue-500/20',
    red: 'text-red-500 bg-red-500/10 hover:bg-red-500/20',
    green: 'text-green-500 bg-green-500/10 hover:bg-green-500/20'
  };
  return (
    <div className={`${isDark ? 'bg-[#2d3035] border-[#3f444e]' : 'bg-white border-gray-200 shadow-sm'} p-8 rounded-3xl border text-center group hover:scale-[1.02] transition-all`}>
      <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-colors ${colors[color]}`}>
        <i className={`fa-solid ${icon} text-4xl`}></i>
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>{desc}</p>
    </div>
  );
};

const CheckItem: React.FC<{ isDark: boolean; text: string }> = ({ isDark, text }) => (
  <li className={`flex items-center gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
     <i className="fa-solid fa-check text-green-500"></i> {text}
  </li>
);

export default AnalysisView;
