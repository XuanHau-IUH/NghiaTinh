/* eslint-disable no-unused-vars */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

export const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974",
    "https://images.unsplash.com/photo-1465495910483-0d674b077a0a?q=80&w=2070",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
    "https://images.unsplash.com/photo-1520856729845-df32f04eaba3?q=80&w=2070",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
    "https://images.unsplash.com/photo-1475711403204-6295589886a8?q=80&w=2070",
    "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=2070",
    "https://images.unsplash.com/photo-1439539698758-ba2680ecbdb9?q=80&w=2070",
  ];

  return (
    <section id="gallery" className="py-20 bg-[#F5F3F3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- PHẦN 1: BENTO GRID SO LE (Nghệ thuật) --- */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif italic text-[#7B5455]">Khoảnh Khắc Đẹp</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 h-auto md:h-[600px] mb-28">
          <div className="col-span-2 rounded-2xl overflow-hidden shadow-lg border-4 border-white h-[280px] md:h-full transform -rotate-1">
            <img className="w-full h-full object-cover" src={images[0]} alt="G1" />
          </div>
          <div className="col-span-1 rounded-2xl overflow-hidden shadow-lg border-4 border-white h-[180px] md:h-full mt-8 md:mt-0 rotate-2">
            <img className="w-full h-full object-cover" src={images[1]} alt="G2" />
          </div>
          <div className="col-span-1 rounded-2xl overflow-hidden shadow-lg border-4 border-white h-[240px] md:h-full -mt-10 md:mt-0 -rotate-2">
            <img className="w-full h-full object-cover" src={images[2]} alt="G3" />
          </div>
        </div>

        {/* --- PHẦN 2: SLIDE 3 ẢNH POLAROID --- */}
        <div className="text-center mb-10">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#37656B]">Album</span>
          <h2 className="text-3xl md:text-4xl font-serif italic text-[#7B5455] mt-2 text-center">Trình Chiếu Kỷ Niệm</h2>
        </div>

        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Nút điều hướng Hồng Pastel Mini */}
          <div className="swiper-button-prev-custom absolute left-2 md:left-10 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-[#FFD1DC] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#ffb7c5] active:scale-90 transition-all">
            <ChevronLeft size={24} />
          </div>
          <div className="swiper-button-next-custom absolute right-2 md:right-10 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-[#FFD1DC] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#ffb7c5] active:scale-90 transition-all">
            <ChevronRight size={24} />
          </div>

          <Swiper
            modules={[Autoplay, EffectCoverflow, Navigation]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.5} // Hiện 1 cái giữa và 2 nửa bên cạnh (tăng lên 3 trên Desktop)
            breakpoints={{
              768: { slidesPerView: 3 } // Hiện đúng 3 tấm trên máy tính
            }}
            loop={true}
            speed={1200}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 0,       // Không xoay để ảnh phẳng như Polaroid thật
              stretch: -20,    // Kéo các ảnh lại gần nhau hơn
              depth: 200,      // Đẩy ảnh ở giữa lên trước
              modifier: 1,
              slideShadows: false,
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            className="w-full py-20"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center px-4">
                {/* Khung Polaroid */}
                <div className="polaroid-card bg-white p-3 pb-12 md:p-5 md:pb-20 shadow-2xl border border-white rounded-[2px] transition-all duration-700">
                  <div className="aspect-square overflow-hidden bg-zinc-100">
                    <img src={img} className="w-full h-full object-cover" alt="Memory" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="font-serif italic text-rose-400 text-lg md:text-2xl">Always & Forever</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 mt-2">G & M — 2024</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style>{`
        .swiper-button-next, .swiper-button-prev { display: none !important; }
        
        /* Hiệu ứng Scale cho ảnh ở giữa */
        .swiper-slide {
          transition: transform 0.7s ease, opacity 0.7s ease, filter 0.7s ease;
          opacity: 0.5;
          filter: blur(2px) grayscale(30%);
          transform: scale(0.8);
        }

        .swiper-slide-active {
          opacity: 1;
          filter: blur(0) grayscale(0);
          transform: scale(1.1) !important; /* Đẩy ảnh giữa to lên hẳn */
          z-index: 10;
        }

        .polaroid-card {
           transform: rotate(-2deg); /* Mặc định hơi nghiêng nhẹ */
        }
        
        .swiper-slide-active .polaroid-card {
           transform: rotate(0deg); /* Ảnh giữa thì đứng thẳng */
        }
      `}</style>
    </section>
  );
};