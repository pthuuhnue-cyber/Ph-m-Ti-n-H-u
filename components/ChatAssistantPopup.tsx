
import React, { useState, useRef, useEffect } from 'react';

interface ChatAssistantPopupProps {
  onClose: () => void;
}

interface PopupMessage {
  id: string;
  sender: 'ai' | 'user' | 'instruction';
  text: string;
}

const ChatAssistantPopup: React.FC<ChatAssistantPopupProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<PopupMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Bạn cần hỗ trợ gì về việc phân tích tin nhắn, bảo vệ an toàn trực tuyến, hay các tính năng khác của ứng dụng không?'
    },
    {
      id: '2',
      sender: 'user',
      text: 'Cách sử dụng'
    },
    {
      id: '3',
      sender: 'ai',
      text: 'Để sử dụng SafeStudent, bạn chỉ cần tải ứng dụng về máy, tạo tài khoản và thêm thông tin học sinh của bạn vào. Sau đó, ứng dụng sẽ tự động giám sát rủi ro.'
    },
    {
      id: '4',
      sender: 'instruction',
      text: 'Để phân tích hình ảnh, vui lòng chọn tab chat AI'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: PopupMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Mock AI reply
    setTimeout(() => {
      const aiMsg: PopupMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Tôi đã ghi nhận câu hỏi của bạn. Tôi có thể hỗ trợ bạn về các cài đặt bảo mật và hướng dẫn sử dụng SafeChat.'
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <div className="fixed bottom-24 right-8 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 z-[100] border border-gray-200">
      {/* Header */}
      <div className="bg-[#1e2330] p-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#3d424d] flex items-center justify-center border border-gray-600 relative">
            <i className="fa-solid fa-shield text-white text-lg"></i>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1e2330] rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-sm flex items-center gap-1">
              SafeStudent Assistant <i className="fa-solid fa-wand-magic-sparkles text-[10px] text-blue-400"></i>
            </h3>
            <p className="text-[11px] text-gray-400 flex items-center gap-1">
               Bạn của em 24/7
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      {/* Body / Chat History */}
      <div ref={bodyRef} className="flex-1 bg-white p-4 overflow-auto flex flex-col gap-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.sender === 'instruction' ? (
              <div className="bg-blue-50 text-blue-700 p-4 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm border border-blue-100 font-medium">
                {msg.text}
              </div>
            ) : (
              <div className={`p-4 rounded-2xl text-sm max-w-[85%] shadow-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-[#1e2330] text-white rounded-tr-none' 
                  : 'bg-[#f3f4f6] text-gray-800 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer / Input */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <div className="relative flex items-center bg-[#f9fafb] rounded-xl border border-gray-200 px-4 py-2">
          <input 
            type="text" 
            placeholder="Nhập câu hỏi của bạn..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
          />
          <button 
            onClick={handleSend}
            className="text-blue-500 hover:text-blue-700 transition-colors ml-2"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistantPopup;
