/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

export const OurStory = () => {
  const stories = [
    { title: "Lần đầu gặp gỡ", date: "Tháng 6, 2018", desc: "Một buổi chiều mưa tại quán cà phê nhỏ, nơi mọi chuyện bắt đầu...", img: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2083" },
    { title: "Lời cầu hôn", date: "Tháng 8, 2023", desc: "Dưới ánh hoàng hôn rực rỡ, câu trả lời 'Em đồng ý' đã thay đổi tất cả.", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070" }
  ];

  return (
    <section id="story" className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-8">
        <div className="text-center mb-24">
          <span className="font-sans text-[#37656B] uppercase tracking-[0.3em] text-xs mb-4 block">Hành Trình Yêu Thương</span>
          <h2 className="text-4xl font-serif italic text-[#7B5455]">Câu Chuyện Tình Yêu</h2>
        </div>
        <div className="space-y-32">
          {stories.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
            >
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                  <img className="w-full h-full object-cover" src={item.img} alt={item.title} />
                </div>
                <div className={`absolute -bottom-6 ${index % 2 === 0 ? '-right-6' : '-left-6'} bg-white p-6 rounded-lg shadow-xl hidden md:block`}>
                  <p className="font-serif italic text-[#7B5455] text-xl">{item.title}</p>
                  <p className="font-sans text-[10px] uppercase text-[#37656B] tracking-widest mt-1">{item.date}</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h3 className="font-serif text-3xl text-[#1B1C1C]">{item.title}</h3>
                <p className="text-[#5D5F5F] leading-relaxed text-lg">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
