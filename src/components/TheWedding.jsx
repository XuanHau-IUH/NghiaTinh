/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Heart, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export const TheWedding = () => {
  // Thay URL nhúng Google Map của bạn vào đây
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.347593674423!2d106.69911967590521!3d10.784666559043217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f496353d2bb%3A0xd6030990710609a!2sGEM%20CENTER!5e0!3m2!1svi!2s!4v1715600000000!5m2!1svi!2s";

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2026-04-17T11:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="wedding" className="py-24 bg-[#FBF9F9] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* --- PHẦN 1: THÔNG TIN GIA ĐÌNH --- */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-24 items-stretch font-serif">
          {/* KHỐI NHÀ TRAI */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-[2rem] border border-rose-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-500"
          >
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-rose-200"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-rose-200"></div>

            <div className="text-center space-y-6">
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-[0.3em] text-rose-400 font-bold mb-4 font-sans">Nhà Trai</h3>
                <div className="text-lg text-zinc-700 leading-relaxed">
                  <p className="font-bold text-xl mb-1">Ông: Trần Phong Cả</p>
                  <p className="font-bold text-xl">Bà: Nguyễn Thị Bình</p>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-sans">Đội 3 - Thôn 3 - Quảng Điền - Xã Krông Ana - Tỉnh Đắk Lắk</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="h-px w-12 bg-rose-200"></div>
                <div className="py-2">
                  <p className="italic text-zinc-500 text-sm mb-1">Thân phụ mẫu của</p>
                  <p className="text-2xl md:text-3xl italic text-[#7B5455] font-bold">Chú rể: Trần Phong Nghĩa</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-rose-400 font-medium mt-1 font-sans">(Quý Nam)</p>
                </div>
                <div className="h-px w-12 bg-rose-200"></div>
              </div>
            </div>
          </motion.div>

          {/* KHỐI NHÀ GÁI */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-[2rem] border border-rose-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-500"
          >
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-rose-200"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-rose-200"></div>

            <div className="text-center space-y-6">
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-[0.3em] text-rose-400 font-bold mb-4 font-sans">Nhà Gái</h3>
                <div className="text-lg text-zinc-700 leading-relaxed">
                  <p className="font-bold text-xl mb-1">Ông: Trịnh Tấn Thời</p>
                  <p className="font-bold text-xl">Bà: Ngô Thị Hồng</p>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-sans">Đội 6 - Thôn 3 - Quảng Điền - Xã Krông Ana - Tỉnh Đắk Lắk </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="h-px w-12 bg-rose-200"></div>
                <div className="py-2">
                  <p className="italic text-zinc-500 text-sm mb-1">Thân phụ mẫu của</p>
                  <p className="text-2xl md:text-3xl italic text-[#7B5455] font-bold">Cô dâu: Trịnh Thị Ái Tình</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-rose-400 font-medium mt-1 font-sans">(Quý Nữ)</p>
                </div>
                <div className="h-px w-12 bg-rose-200"></div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif italic text-[#7B5455]">Hôn lễ</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* --- CỘT 1: LỄ VU QUY & CALENDAR --- */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-rose-100 text-center relative font-serif">
               <h3 className="text-xl text-[#7B5455] mb-4">Lễ Vu Quy</h3>
               <div className="flex flex-col items-center gap-2 text-zinc-600 mb-6 font-sans">
                  <Clock size={18} className="text-rose-300" />
                  <p className="text-sm">11:00 | Thứ 7 | 17.04.2026</p>
                  <p className="text-xs italic">Buổi tiệc chung vui cùng chúng con tại Sân Bóng Chuyền Thôn 3 (Đối diện Cây Xăng Hoàng My Quảng Điền)</p>
               </div>

               {/* Countdown Timer */}
               <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100/50 relative overflow-hidden group">
                 <Heart className="absolute -bottom-4 -right-4 text-rose-100 opacity-50 group-hover:scale-110 transition-transform duration-500" size={80} fill="currentColor" />
                 <p className="text-[10px] uppercase tracking-widest font-bold text-rose-400 mb-6 relative z-10 font-sans">
                   Thời gian còn lại
                 </p>

                 <div className="grid grid-cols-4 gap-3 relative z-10">
                   {/* Days */}
                   <div className="flex flex-col items-center">
                     <motion.div
                       key={countdown.days}
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       className="text-2xl md:text-3xl font-bold text-[#7B5455] mb-1"
                     >
                       {String(countdown.days).padStart(2, '0')}
                     </motion.div>
                     <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold font-sans">Ngày</p>
                   </div>

                   {/* Hours */}
                   <div className="flex flex-col items-center">
                     <motion.div
                       key={countdown.hours}
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       className="text-2xl md:text-3xl font-bold text-[#7B5455] mb-1"
                     >
                       {String(countdown.hours).padStart(2, '0')}
                     </motion.div>
                     <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold font-sans">Giờ</p>
                   </div>

                   {/* Minutes */}
                   <div className="flex flex-col items-center">
                     <motion.div
                       key={countdown.minutes}
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       className="text-2xl md:text-3xl font-bold text-[#7B5455] mb-1"
                     >
                       {String(countdown.minutes).padStart(2, '0')}
                     </motion.div>
                     <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold font-sans">Phút</p>
                   </div>

                   {/* Seconds */}
                   <div className="flex flex-col items-center">
                     <motion.div
                       key={countdown.seconds}
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       className="text-2xl md:text-3xl font-bold text-[#7B5455] mb-1"
                     >
                       {String(countdown.seconds).padStart(2, '0')}
                     </motion.div>
                     <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold font-sans">Giây</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* --- CỘT 2: TIỆC CƯỚI & MAP --- */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-rose-100">
               <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 text-center md:text-left font-serif">
                  <div>
                    <h3 className="text-2xl text-[#7B5455] mb-2">Tiệc Cưới Chiêu Đãi</h3>
                    <div className="flex items-center gap-2 text-zinc-500 justify-center md:justify-start font-sans">
                      <MapPin size={16} className="text-rose-400" />
                      <p className="text-sm">Tại Sân Bóng Chuyền Thôn 3 (Đối diện Cây Xăng Hoàng My Quảng Điền)</p>
                    </div>
                  </div>
                  <div className="bg-[#7B5455] text-white px-6 py-2 rounded-full text-sm italic font-serif">
                    11 giờ | 17.04.2026
                  </div>
               </div>

               <div className="h-[300px] w-full rounded-2xl overflow-hidden border-4 border-[#FBF9F9] shadow-inner relative">
                  <iframe 
                    title="google-map"
                    src={mapUrl}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen
                    allow="geolocation"
                    loading="lazy"
                  ></iframe>
                  <a 
                    href="https://maps.app.goo.gl/imfVYKBvtccc1yVV6" 
                    target="_blank" 
                    rel="noreferrer"
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-sans"
                  >
                    <Navigation size={40} /> Chỉ đường
                  </a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};