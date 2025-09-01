import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck } from "lucide-react";

const QuizzLoader: React.FC<{}> = () => {
  const text = [
    "Analyzing user input...",
    "Understanding user intent and preferences...",
    "Mapping knowledge areas and learning goals...",
    "Crafting personalized content...",
    "Optimizing for your learning path...",
    "Finalizing intelligent recommendations...",
  ];
  
      

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % text.length);
    }, 2000); // every 2 seconds
    return () => clearInterval(interval);
  }, [text.length]);

  return (
    <div className="fixed flex justify-center items-center left-0 overflow-hidden w-full h-full top-0 bg-neutral-800/10 backdrop-blur-lg z-[100]">
      <div className="w-[40rem] h-[10rem] flex items-center justify-center ">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-3"
          >
            <CircleCheck className="w-6 h-6 text-green-600 bg-green-200 rounded-full" />
            <p className="text-lg font-medium text-gray-800">{text[index]}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizzLoader;
