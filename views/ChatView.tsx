
import React, { useState, useRef, useEffect } from 'react';
import { Message, ChatHistoryItem } from '../types';
import { analyzeChatImage } from '../services/geminiService';

interface ChatViewProps {
  theme: 'dark' | 'light';
}

// Mock initial messages for the first history item
const INITIAL_MESSAGES_MAP: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      sender: 'user',
      text: 'Đã tải lên ảnh để phân tích.',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=300',
      timestamp: new Date()
    },
    {
      id: 'm2',
      sender: 'ai',
      text: 'Dựa trên phân tích, cuộc trò chuyện này có dấu hiệu gạ gẫm và yêu cầu thông tin cá nhân nhạy cảm.',
      status: 'danger',
      timestamp: new Date()
    }
  ]
};

const ChatView: React.FC<ChatViewProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [history, setHistory] = useState<ChatHistoryItem[]>([
    { id: '1', title: 'Phân tích SafeChat #1', date: '27/12/2025', lastMessage: '[File: chat_log_01.png]' }
  ]);
  const [activeHistoryId, setActiveHistoryId] = useState<string>('1');
  const [chatMessagesStore, setChatMessagesStore] = useState<Record<string, Message[]>>(INITIAL_MESSAGES_MAP);
  
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get messages for the currently active chat
  const currentMessages = chatMessagesStore[activeHistoryId] || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentMessages, isAnalyzing]);

  const updateStore = (id: string, newMsgs: Message[]) => {
    setChatMessagesStore(prev => ({ ...prev, [id]: newMsgs }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      
      const userMsg: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: 'Đã tải lên ảnh để phân tích.',
        image: base64,
        timestamp: new Date()
      };
      
      const updatedMsgs = [...currentMessages, userMsg];
      updateStore(activeHistoryId, updatedMsgs);
      setIsAnalyzing(true);

      const result = await analyzeChatImage(base64);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: result.reason,
        status: result.isDangerous ? 'danger' : 'safe',
        timestamp: new Date()
      };
      
      updateStore(activeHistoryId, [...updatedMsgs, aiMsg]);
      setIsAnalyzing(false);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };
    
    const updatedMsgs = [...currentMessages, userMsg];
    updateStore(activeHistoryId, updatedMsgs);
    setInputText('');
    
    setTimeout(() => {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Tôi có thể phân tích hình ảnh cuộc trò chuyện của bạn. Hãy tải lên một ảnh chụp màn hình để tôi kiểm tra mức độ an toàn.',
          timestamp: new Date()
        };
        updateStore(activeHistoryId, [...updatedMsgs, aiMsg]);
    }, 1000);
  };

  const createNewChat = () => {
    const newId = (history.length + 1).toString();
    const newItem: ChatHistoryItem = {
      id: newId,
      title: `Phân tích SafeChat #${newId}`,
      date: new Date().toLocaleDateString('vi-VN'),
      lastMessage: ''
    };
    setHistory([newItem, ...history]);
    setActiveHistoryId(newId);
    updateStore(newId, []);
  };

  const deleteHistory = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    if (activeHistoryId === id && newHistory.length > 0) {
      setActiveHistoryId(newHistory[0].id);
    } else if (newHistory.length === 0) {
      createNewChat();
    }
  };

  return (
    <div className={`flex h-full p-6 gap-6 transition-colors ${isDark ? 'bg-[#1a1c1e]' : 'bg-[#f8fafc]'}`}>
      {/* Sidebar history */}
      <div className="w-80 flex flex-col gap-4">
        <h2 className={`text-2xl font-bold mb-2 px-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Phân tích SafeChat</h2>
        <div className="flex gap-2 mb-4">
          <button 
            onClick={createNewChat}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-10 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition-colors shadow-sm"
          >
            <i className="fa-solid fa-plus"></i> New Chat
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 rounded-lg transition-colors shadow-sm">
            <i className="fa-solid fa-book-open"></i>
          </button>
        </div>

        <div className="flex-1 overflow-auto flex flex-col gap-2 pr-1">
          {history.map(item => (
            <div 
              key={item.id} 
              onClick={() => setActiveHistoryId(item.id)}
              className={`${
                activeHistoryId === item.id 
                  ? (isDark ? 'bg-blue-600/20 border-blue-500' : 'bg-blue-50 border-blue-300 shadow-md') 
                  : (isDark ? 'bg-[#2d3035] hover:bg-[#34383f] border-[#3f444e]' : 'bg-white hover:bg-gray-50 border-gray-200 shadow-sm')
              } p-4 rounded-xl border cursor-pointer group transition-all relative`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-sm font-semibold truncate pr-6 ${
                  activeHistoryId === item.id 
                    ? (isDark ? 'text-blue-400' : 'text-blue-700')
                    : (isDark ? 'text-gray-200' : 'text-gray-700')
                }`}>{item.title}</span>
                <button 
                  onClick={(e) => deleteHistory(e, item.id)}
                  className={`absolute top-4 right-4 ${isDark ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'} opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat workspace */}
      <div className={`flex-1 ${isDark ? 'bg-[#242629] border-[#33363a]' : 'bg-white border-gray-200 shadow-lg'} rounded-3xl border flex flex-col relative overflow-hidden transition-colors`}>
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-auto p-6 flex flex-col gap-6">
          {currentMessages.length === 0 && !isAnalyzing && (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 opacity-50">
               <i className="fa-solid fa-robot text-6xl mb-4"></i>
               <p className="text-center">Bắt đầu cuộc trò chuyện mới hoặc tải ảnh lên để phân tích rủi ro.</p>
            </div>
          )}
          {currentMessages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
               <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                 msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : msg.status === 'danger' 
                    ? 'bg-orange-600 text-white rounded-tl-none shadow-[0_0_20px_rgba(234,88,12,0.3)]'
                    : msg.status === 'safe'
                      ? 'bg-green-600 text-white rounded-tl-none'
                      : isDark ? 'bg-[#2d3035] text-gray-200 rounded-tl-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'
               }`}>
                  {msg.status === 'danger' && (
                    <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wider">
                      <i className="fa-solid fa-triangle-exclamation"></i> Mức độ nguy hiểm cao, cần lưu ý
                    </div>
                  )}
                  {msg.status === 'safe' && (
                    <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wider">
                      <i className="fa-solid fa-circle-check"></i> An toàn
                    </div>
                  )}
                  {msg.image && <img src={msg.image} className="max-w-xs rounded-lg mb-3 shadow-lg" alt="Upload" />}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
               </div>
            </div>
          ))}
          {isAnalyzing && (
            <div className="flex items-start gap-3">
               <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center animate-pulse text-white">
                  <i className="fa-solid fa-brain text-xs"></i>
               </div>
               <div className={`${isDark ? 'bg-[#2d3035]' : 'bg-gray-100'} p-4 rounded-2xl rounded-tl-none italic text-gray-500 shadow-sm`}>
                  Đang phân tích dữ liệu...
               </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className={`p-6 ${isDark ? 'bg-[#242629]' : 'bg-white'} border-t ${isDark ? 'border-[#33363a]' : 'border-gray-100'}`}>
          <div className={`relative flex items-center gap-3 ${isDark ? 'bg-[#1a1c1e] border-[#3f444e]' : 'bg-gray-50 border-gray-200'} p-2 rounded-2xl border focus-within:border-blue-500/50 transition-colors`}>
            <input 
              type="text" 
              placeholder="Nhập nội dung hoặc tải ảnh..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className={`flex-1 bg-transparent border-none outline-none py-2 px-4 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}
            />
            <input 
               type="file" 
               className="hidden" 
               ref={fileInputRef} 
               accept="image/*"
               onChange={handleFileUpload}
            />
            <button 
               onClick={() => fileInputRef.current?.click()}
               className={`w-10 h-10 rounded-xl hover:bg-[#2d3035] ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-blue-600'} transition-colors flex items-center justify-center`}
               title="Tải ảnh lên"
            >
              <i className="fa-solid fa-paperclip"></i>
            </button>
            <button 
               onClick={handleSendMessage}
               className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center shadow-lg"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
