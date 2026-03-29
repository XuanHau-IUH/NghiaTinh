/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, CheckCircle2, ChevronDown, AlertCircle, X, PartyPopper } from 'lucide-react';

export const RSVP = ({ onSendMessage }) => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('Chắc chắn sẽ đến chung vui');
  const [guestCount, setGuestCount] = useState('1 mình');
  const [content, setContent] = useState('');
  const [showGift, setShowGift] = useState(true);
  
  // Trạng thái hiện Popup thành công
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({ name: false, content: false });

  const nameRef = useRef(null);
  const contentRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let newErrors = { name: false, content: false };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = true;
      isValid = false;
      nameRef.current?.focus();
    } else if (!content.trim()) {
      newErrors.content = true;
      isValid = false;
      contentRef.current?.focus();
    }

    setErrors(newErrors);

    if (isValid) {
      const formData = {
        name: name.trim(),
        message: content.trim(),
        attendance: attendance,
        guests: guestCount
      };

      onSendMessage(formData);

      // Hiển thị Popup thành công thay vì Alert
      setShowSuccess(true);

      // Reset Form
      setName('');
      setContent('');
      setAttendance('Chắc chắn sẽ đến chung vui');
      setGuestCount('1 mình');
      setErrors({ name: false, content: false });
    }
  };

  const shakeAnimation = {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.4 }
  };

  return (
    <section id="rsvp" className="py-24 bg-[#FBF9F9] relative">
      
      {/* --- POPUP THÀNH CÔNG (CUTE MODAL) --- */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)}
              className="absolute inset-0 bg-rose-900/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              className="relative bg-white p-8 md:p-12 rounded-[40px] shadow-2xl max-w-sm w-full text-center border-4 border-rose-100"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-rose-400 p-4 rounded-full shadow-lg text-white">
                <Heart size={40} fill="currentColor" className="animate-pulse" />
              </div>
              
              <h3 className="text-2xl font-serif italic text-[#7B5455] mt-4 mb-2">Cảm ơn bạn rất nhiều!</h3>
              <p className="text-zinc-500 text-sm font-sans leading-relaxed mb-6">
                Lời chúc của bạn đã được gửi tới Sophie & Julian. Hẹn gặp bạn trong ngày chung vui nhé! ❤️
              </p>
              
              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full bg-rose-400 text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-rose-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-200"
              >
                Đóng lại <X size={14} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 rounded-[40px] shadow-[0_20px_50px_rgba(244,194,194,0.3)] border border-[#F4C2C2]/30 relative overflow-hidden"
        >
          <Heart className="absolute -top-4 -right-4 text-rose-100" size={100} fill="currentColor" />

          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-serif italic text-[#7B5455] mb-4">Sophie & Julian</h2>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#37656B] mb-6">Xác Nhận Tham Dự</p>
            <div className="h-px w-20 bg-rose-200 mx-auto mb-6"></div>
            <p className="text-zinc-500 font-serif italic text-lg leading-relaxed px-4">
              "Chúng mình rất hạnh phúc khi được mời bạn đến chung vui trong ngày trọng đại này."
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-left">
            {/* Input Họ Tên */}
            <motion.div animate={errors.name ? shakeAnimation : {}}>
              <label className="block text-[10px] uppercase tracking-widest text-[#7B5455] mb-2 ml-1 italic font-bold">Họ và tên của bạn</label>
              <input 
                ref={nameRef}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({...errors, name: false});
                }}
                type="text" 
                placeholder="Ví dụ: Anh Tú & Lan Anh..." 
                className={`w-full p-4 rounded-2xl border ${errors.name ? 'border-rose-400 bg-rose-50' : 'border-rose-100 bg-rose-50/30'} focus:outline-none focus:border-rose-400 transition-all font-serif`}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-rose-500 text-[11px] mt-2 ml-2 italic flex items-center gap-1">
                    <AlertCircle size={12} /> Đừng quên cho chúng mình biết tên bạn nhé!
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Selectors */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-[#7B5455] ml-1">Tham dự</label>
                <div className="relative">
                  <select 
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="w-full p-4 rounded-2xl border border-rose-100 bg-rose-50/30 font-serif appearance-none cursor-pointer text-sm pr-10 outline-none"
                  >
                    <option value="Chắc chắn sẽ đến chung vui">Chắc chắn sẽ đến chung vui</option>
                    <option value="Xin lỗi mình bận hôm đó nên không thể đến">Xin lỗi mình bận hôm đó nên không thể đến</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-300 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-[#7B5455] ml-1">Số lượng</label>
                <div className="relative">
                  <select 
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full p-4 rounded-2xl border border-rose-100 bg-rose-50/30 font-serif appearance-none cursor-pointer text-sm pr-10 outline-none"
                  >
                    <option value="1 mình">Đi 1 mình</option>
                    <option value="Cùng với nửa kia">Cùng với nửa kia</option>
                    <option value="Gia đình nhỏ">Gia đình nhỏ</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-300 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            {/* Textarea Lời chúc */}
            <motion.div animate={errors.content ? shakeAnimation : {}}>
              <label className="block text-[10px] uppercase tracking-widest text-[#7B5455] mb-2 ml-1 italic font-bold">Lời chúc</label>
              <textarea 
                ref={contentRef}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (errors.content) setErrors({...errors, content: false});
                }}
                placeholder="Gửi gắm yêu thương tại đây..." 
                className={`w-full p-4 rounded-2xl border ${errors.content ? 'border-rose-400 bg-rose-50' : 'border-rose-100 bg-rose-50/30'} focus:outline-none focus:border-rose-400 h-32 font-serif transition-all resize-none`}
              ></textarea>
              <AnimatePresence>
                {errors.content && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-rose-500 text-[11px] mt-2 ml-2 italic flex items-center gap-1">
                    <AlertCircle size={12} /> Một lời chúc nhỏ cũng làm chúng mình vui lắm!
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <button type="submit" className="w-full bg-[#7B5455] text-white py-4 rounded-2xl uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-[#5D3D3E] shadow-lg shadow-rose-200 transition-all active:scale-95 flex items-center justify-center gap-2 group">
              <PartyPopper size={16} className="group-hover:rotate-12 transition-transform" /> Gửi xác nhận & lời chúc
            </button>
          </form>

          {/* QR Gift Section (Mặc định hiển thị) */}
          <div className="mt-12 pt-8 border-t border-dashed border-rose-200">
            <button 
              type="button"
              onClick={() => setShowGift(!showGift)}
              className="mx-auto flex items-center gap-2 text-[#7B5455] opacity-70 hover:opacity-100 transition-opacity mb-4"
            >
              <Gift size={18} />
              <span className="font-serif italic text-sm">Gửi quà tặng chúc mừng</span>
              <motion.div animate={{ rotate: showGift ? 180 : 0 }}>
                <ChevronDown size={14} />
              </motion.div>
            </button>

            <AnimatePresence>
              {showGift && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center bg-rose-50/50 p-6 rounded-3xl border border-rose-100">
                    <div className="text-center md:text-left space-y-2">
                      <p className="font-serif italic text-[#7B5455] text-xs">"Sự hiện diện của bạn là món quà quý giá nhất..."</p>
                      <div className="pt-4 text-xs text-zinc-600 space-y-1 font-sans">
                        <p>STK: <span className="font-bold text-rose-500 tracking-wider">1234 5678 9999</span></p>
                        <p>Ngân hàng: <span className="font-bold">Vietcombank</span></p>
                        <p>Chủ TK: <span className="font-bold uppercase">Nguyễn Văn A</span></p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="bg-white p-2 rounded-2xl shadow-md border border-rose-100">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WEBSITE_WEDDING_QR" 
                          alt="QR Mừng Cưới" 
                          className="w-28 h-28 md:w-32 md:h-32 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};