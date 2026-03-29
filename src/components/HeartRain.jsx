/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useState } from 'react';

const HeartRain = () => {
  // Khởi tạo state bằng một hàm (Lazy initializer)
  // React sẽ chỉ gọi hàm này đúng 1 lần duy nhất khi component mount
  const [heartsData] = useState(() => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        id: i,
        x: Math.random() * 100,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 5 + 10,
        delay: Math.random() * 5,
      });
    }
    return data;
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
      {heartsData.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ 
            y: -50, 
            x: `${heart.x}vw`, 
            opacity: 0,
            scale: heart.scale 
          }}
          animate={{ 
            y: "110vh", 
            opacity: [0, 1, 1, 0],
            rotate: 360 
          }}
          transition={{ 
            duration: heart.duration, 
            repeat: Infinity, 
            delay: heart.delay,
            ease: "linear"
          }}
          className="absolute text-pink-300/40 text-2xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default HeartRain;