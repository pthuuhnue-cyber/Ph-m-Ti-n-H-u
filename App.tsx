
import React, { useState } from 'react';
import { ViewType } from './types';
import Sidebar from './components/Sidebar';
import HomeView from './views/HomeView';
import DashboardView from './views/DashboardView';
import AnalysisView from './views/AnalysisView';
import ChatView from './views/ChatView';
import SettingsView from './views/SettingsView';
import ChatAssistantPopup from './components/ChatAssistantPopup';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.HOME);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const isDark = theme === 'dark';

  const renderView = () => {
    switch (activeView) {
      case ViewType.HOME: return <HomeView theme={theme} onOpenAssistant={() => setIsAssistantOpen(true)} />;
      case ViewType.DASHBOARD: return <DashboardView theme={theme} />;
      case ViewType.ANALYSIS: return <AnalysisView theme={theme} />;
      case ViewType.CHAT: return <ChatView theme={theme} />;
      case ViewType.SETTINGS: return <SettingsView theme={theme} setTheme={setTheme} />;
      default: return <HomeView theme={theme} onOpenAssistant={() => setIsAssistantOpen(true)} />;
    }
  };

  return (
    <div className={`flex h-screen w-full transition-colors duration-300 ${isDark ? 'bg-[#1a1c1e] text-white' : 'bg-[#f8fafc] text-gray-900'}`}>
      <Sidebar activeView={activeView} onViewChange={setActiveView} theme={theme} />
      <main className="flex-1 overflow-auto relative">
        {renderView()}
      </main>
      
      {isAssistantOpen && (
        <ChatAssistantPopup onClose={() => setIsAssistantOpen(false)} />
      )}
    </div>
  );
};

export default App;
