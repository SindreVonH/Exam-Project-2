// src/components/home/HeroSection.tsx
import { motion } from "framer-motion";
import heroImage from "../../assets/hero.png";

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="rounded-xl overflow-hidden relative mb-6"
    >
      <img
        src={heroImage}
        alt="Hero"
        className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[480px] object-cover"
      />
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute inset-0 flex items-center justify-center text-xl sm:text-3xl md:text-4xl font-bold text-white px-6 text-center"
      >
        Find your perfect getaway
      </motion.h1>
    </motion.section>
  );
}
