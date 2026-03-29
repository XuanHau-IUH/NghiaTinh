/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const WelcomeOverlay = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-[#F9F7F2] flex items-center justify-center"
    >
      <div className="text-center">
         <motion.h1 
           initial={{ y: 20 }} 
           animate={{ y: 0 }}
           className="text-4xl font-bold"
         >
           Phong Nghĩa & Ái Tình
         </motion.h1>
         <button onClick={onStart} className="mt-10 border p-4 text-xl font-semibold">
           Mở thiệp ngay nào!
         </button>
      </div>
    </motion.div>
  );
};

export default WelcomeOverlay;