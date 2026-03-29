/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageCircle, Heart, X, MessageSquareHeart } from 'lucide-react';

export const LiveGuestbook = ({ messages = [] }) => {
  const [displayMsgs, setDisplayMsgs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true); // Trạng thái đóng/mở

  // Trong file LiveGuestbook.jsx
useEffect(() => {
  // Nếu chưa có tin nhắn nào từ Google Sheet thì thoát
  if (!messages || messages.length === 0 || !isOpen) return;

  const interval = setInterval(() => {
    // Lấy tin nhắn theo index xoay vòng qua toàn bộ mảng messages
    const nextMsg = messages[currentIndex % messages.length];
    
    setDisplayMsgs((prev) => {
      const updated = [...prev, { ...nextMsg, instanceId: Math.random() }];
      return updated.slice(-2); // Chỉ hiện 2 cái trên màn hình cho gọn, nhưng sẽ xoay vòng hết sạch data
    });

    setCurrentIndex((prev) => prev + 1);
  }, 4000);

  return () => clearInterval(interval);
}, [currentIndex, messages, isOpen]);

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-start gap-3 pointer-events-none">
      
      {/* Nút Đóng/Mở nhỏ gọn */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto p-2 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm text-rose-400 hover:bg-white/50 transition-all duration-300"
      >
        {isOpen ? <X size={16} /> : <MessageSquareHeart size={20} className="animate-bounce" />}
      </button>

      {/* Vùng chứa tin nhắn */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-60 flex flex-col gap-2"
          >
            {/* Nhãn nhỏ phía trên */}
            <div className="flex items-center gap-2 mb-1 ml-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-rose-600/60">Live Wishes</span>
            </div>

            <AnimatePresence mode="popLayout">
              {displayMsgs.map((msg) => (
                <motion.div
                  key={msg.instanceId}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="bg-white/15 backdrop-blur-[4px] border border-white/20 p-2.5 rounded-xl shadow-sm flex items-start gap-2.5 origin-left"
                >
                  <div className="bg-rose-100/30 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                    <Heart size={10} className="text-rose-400/80" fill="currentColor" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[9px] font-bold text-rose-500/70 uppercase tracking-wider truncate">
                      {msg.user}
                    </p>
                    <p className="text-[11px] text-zinc-600/90 font-serif italic leading-tight line-clamp-2">
                      "{msg.text}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};