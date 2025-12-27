
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardViewProps {
  theme: 'dark' | 'light';
}

const data = [
  { name: 'T2', visitors: 400, usage: 240 },
  { name: 'T3', visitors: 300, usage: 139 },
  { name: 'T4', visitors: 200, usage: 980 },
  { name: 'T5', visitors: 278, usage: 390 },
  { name: 'T6', visitors: 189, usage: 480 },
  { name: 'T7', visitors: 239, usage: 380 },
  { name: 'CN', visitors: 349, usage: 430 },
];

const DashboardView: React.FC<DashboardViewProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <div className={`p-8 max-w-7xl mx-auto transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <h2 className="text-3xl font-bold mb-8">Bảng điều khiển Phân tích</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard isDark={isDark} icon="fa-users" colorClass="bg-blue-500/20 text-blue-500" value="1,234 Visitors" label="Tổng số khách truy cập duy nhất trong tháng" />
        <StatCard isDark={isDark} icon="fa-chart-line" colorClass="bg-orange-500/20 text-orange-500" value="5,678 Usage Counter" label="Tổng số tương tác trong tháng này" />
        <StatCard isDark={isDark} icon="fa-percent" colorClass="bg-green-500/20 text-green-500" value="89% Statistics" label="Tỷ lệ tương tác của người dùng" />
        <StatCard isDark={isDark} icon="fa-bolt-lightning" colorClass="bg-purple-500/20 text-purple-500" value="2.3s Performance" label="Thời gian phản hồi trung bình" />

        <div className={`${isDark ? 'bg-[#2d3035] border-[#3f444e]' : 'bg-white border-gray-200 shadow-sm'} p-6 rounded-2xl border lg:col-span-2 transition-colors`}>
           <div className="flex justify-between items-center mb-4">
             <h3 className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Xu hướng sử dụng</h3>
             <div className={`w-10 h-10 rounded-xl ${isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-500'} flex items-center justify-center`}>
                <i className="fa-solid fa-clipboard-list"></i>
             </div>
           </div>
           <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} flex gap-8`}>
              <span>Active Users: 456</span>
              <span>Sessions: 2,890</span>
              <span>Avg. Session: 4m 32s</span>
           </div>
        </div>
      </div>

      <div className={`${isDark ? 'bg-[#2d3035] border-[#3f444e]' : 'bg-white border-gray-200 shadow-sm'} p-6 rounded-2xl border h-[400px] transition-colors`}>
        <h3 className="font-semibold mb-6">Thống kê hoạt động hàng tuần</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#444" : "#e5e7eb"} vertical={false} />
            <XAxis dataKey="name" stroke={isDark ? "#888" : "#9ca3af"} />
            <YAxis stroke={isDark ? "#888" : "#9ca3af"} />
            <Tooltip 
              contentStyle={{ backgroundColor: isDark ? '#242629' : '#fff', border: isDark ? '1px solid #3f444e' : '1px solid #e5e7eb', borderRadius: '8px', color: isDark ? '#fff' : '#000' }}
              itemStyle={{ color: isDark ? '#fff' : '#000' }}
            />
            <Bar dataKey="visitors" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="usage" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ isDark: boolean; icon: string; colorClass: string; value: string; label: string }> = ({ isDark, icon, colorClass, value, label }) => (
  <div className={`${isDark ? 'bg-[#2d3035] border-[#3f444e]' : 'bg-white border-gray-200 shadow-sm'} p-6 rounded-2xl border transition-colors`}>
    <div className="flex items-center gap-4 mb-4">
       <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${colorClass}`}>
          <i className={`fa-solid ${icon}`}></i>
       </div>
       <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
       </div>
    </div>
  </div>
);

export default DashboardView;
