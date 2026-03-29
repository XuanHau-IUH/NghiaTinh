/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeOverlay from './components/WelcomeOverlay';
import HeartRain from './components/HeartRain';
import { OurStory } from './components/OurStory';
import { TheWedding } from './components/TheWedding';
import { RSVP } from './components/RSVP';
import { LiveGuestbook } from './components/LiveGuestbook';
import { Gallery } from './components/Gallery'; 
import { Heart, Menu } from 'lucide-react';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const audioRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // --- 1. STATE QUẢN LÝ LỜI CHÚC ---
  const [guestMessages, setGuestMessages] = useState([]);
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwK7jGHbDkJoc1AIW3qAr-vzuBRLbQsk7Wr_PxJMi3c4DBjLYLvzyVAgv8m9Of6ku2-/exec";

  // --- 2. LOGIC TẢI DỮ LIỆU (REAL-TIME) ---
  const fetchMessages = async (isMounted = true) => {
    try {
      // Thêm timestamp để tránh trình duyệt cache kết quả cũ
      const response = await fetch(`${GOOGLE_SHEET_URL}?t=${Date.now()}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      if (isMounted) {
        setGuestMessages(data);
        console.log("Dữ liệu từ Sheet:", data);
      }
    } catch (error) {
      console.error("Lỗi khi tải lời chúc từ Google Sheet:", error);
    }
  };

  // --- 3. EFFECT TẢI DỮ LIỆU BAN ĐẦU & ĐỊNH KỲ ---
  useEffect(() => {
    let isMounted = true;

    // Tải ngay khi vào web (kể cả chưa nhấn nút Start)
    fetchMessages(isMounted);

    // Tự động làm mới sau mỗi 15 giây
    const interval = setInterval(() => {
      fetchMessages(isMounted);
    }, 15000); 

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []); // Chạy 1 lần duy nhất khi Mount trang

  // --- 4. LOGIC GỬI LỜI CHÚC (TỪ FORM RSVP) ---
  const addMessage = async (formData) => {
    // 1. Hiển thị ngay lời chúc vừa nhập (Optimistic UI)
    const tempMsg = { 
      id: Date.now(), 
      user: formData.name, 
      text: formData.message 
    };
    setGuestMessages((prev) => [tempMsg, ...prev]);

    // 2. Gửi dữ liệu đầy đủ lên Google Sheets
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      // 3. Đợi 3s để Google Sheet cập nhật rồi tải lại toàn bộ danh sách mới nhất
      setTimeout(() => {
        fetchMessages(true);
      }, 3000); 
      
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
      fetchMessages(true); // Tải lại để đảm bảo dữ liệu đồng nhất
    }
  };

  // --- 5. LOGIC THEO DÕI SCROLL (ACTIVE NAV) ---
  useEffect(() => {
    if (!isStarted) return;
    const observerOptions = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['story', 'wedding', 'gallery', 'rsvp'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isStarted]);

  // --- 6. LOGIC ĐẾM NGƯỢC ---
  useEffect(() => {
    const targetDate = new Date("2026-04-17T11:00:00").getTime(); 
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((error) => console.log("Lỗi nhạc:", error));
    }
  };

  const navLinks = [
    { id: 'story', label: 'Câu Chuyện Tình Yêu' },
    { id: 'wedding', label: 'Hôn lễ' },
    { id: 'gallery', label: 'Khoảnh Khắc Đẹp' },
    { id: 'rsvp', label: 'RSVP' }
  ];

  return (
    <main className="relative min-h-screen bg-[#FBF9F9] text-[#1B1C1C] font-serif overflow-x-hidden">
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence mode="wait">
        {!isStarted && <WelcomeOverlay onStart={handleStart} />}
      </AnimatePresence>

      {isStarted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          <HeartRain />
          <LiveGuestbook messages={guestMessages} />

          <header className="fixed top-0 w-full z-50 bg-white/20 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-8 h-20">
            <Menu className="text-rose-400/70 cursor-pointer md:hidden" />
            <div className="text-2xl md:text-3xl font-serif text-rose-400 tracking-[0.2em] italic">T & N</div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex gap-10 font-sans text-[10px] uppercase tracking-[0.3em]">
                {navLinks.map((link) => (
                  <a key={link.id} href={`#${link.id}`}
                    className={`transition-all relative py-2 ${activeSection === link.id ? 'text-rose-500 font-bold' : 'text-zinc-500/80 hover:text-rose-400'}`}>
                    {link.label}
                    {activeSection === link.id && (
                      <motion.div layoutId="underline" className="absolute left-0 right-0 h-[1px] bg-rose-400 bottom-0" />
                    )}
                  </a>
                ))}
              </nav>
              <Heart className="text-rose-300/60" size={18} fill="currentColor" />
            </div>
          </header>

          <div className="pt-20">
            <section id="hero" className="relative min-h-[80vh] flex flex-col items-center justify-center px-8 overflow-hidden">
               <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#ffdad9]/30 to-[#fbf9f9]"></div>
               <div className="relative z-10 text-center max-w-4xl">
                 <span className="font-sans text-[#37656B] uppercase tracking-[0.3em] text-xs mb-6 block">Thiệp cưới</span>
                 <h1 className="text-4xl md:text-7xl italic text-[#7B5455] mb-8 leading-tight">Ái Tình & Phong Nghĩa</h1>
                 <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-12">
                   <div className="relative w-72 h-96 rounded-full overflow-hidden shadow-2xl border-8 border-white">
                     <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069" alt="Couple"/>
                   </div>
                   <div className="max-w-xs text-left">
                      <p className="text-2xl text-[#7B5455]">Ngày 17 tháng 04 năm 2026</p>
                      <p className="text-1xl text-[#7B5455]">Nhằm ngày 01 tháng 03 năm Bính Ngọ</p>
                      <p className="text-[#5D5F5F] text-sm mt-4 leading-relaxed font-sans">Hãy cùng chúng mình viết tiếp chương mới của câu chuyện tình yêu đầy màu sắc này.</p>
                   </div>
                 </div>
               </div>
            </section>

            <section className="py-24 bg-white text-center">
                <h2 className="text-3xl italic text-[#7B5455] mb-12">Đếm ngày chung vui</h2>
                <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto px-4">
                    {Object.entries(timeLeft).map(([unit, val]) => (
                        <div key={unit}>
                          <span className="text-4xl md:text-5xl text-[#F4C2C2] font-sans font-light">{String(val).padStart(2, '0')}</span>
                          <p className="text-[10px] uppercase text-zinc-400 tracking-widest mt-2">{unit}</p>
                        </div>
                    ))}
                </div>
            </section>

            <OurStory />
            <TheWedding />
            <Gallery /> 
            <RSVP onSendMessage={addMessage} />
          </div>

          <footer className="py-20 bg-rose-50/30 text-center">
            <div className="italic text-rose-400 text-3xl mb-4">Ái Tình & Phong Nghĩa</div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em]">With Love, 2026 — From Vietnam with Heart</p>
          </footer>
        </motion.div>
      )}
    </main>
  );
}

export default App;