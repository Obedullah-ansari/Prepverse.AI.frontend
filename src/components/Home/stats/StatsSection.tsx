import React from "react";
import { Users, Headset, ChartSpline, Star } from "lucide-react";
import StatCard from "./statCard";
import { motion } from "framer-motion";

const StatsSection: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full md:!p-16 sm:!p-10 max-sm:!p-8 lg:!p-20 flex justify-center items-center bg-neutral-200 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center !mb-12 text-black">
          Our Numbers Speak for Themselves
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-sm:gap-4 sm:gap-10 lg:gap-6 md:gap-4"
        >
          <motion.div variants={cardVariants}>
            <StatCard icon={Users} value={97} suffix="%" description="Trusted by Users" />
          </motion.div>

          <motion.div variants={cardVariants}>
            <StatCard icon={Headset} value={24} suffix="*7" description="Customer Support" />
          </motion.div>

          <motion.div variants={cardVariants}>
            <StatCard icon={ChartSpline} value={500} suffix="K+" description="Active User" />
          </motion.div>

          <motion.div variants={cardVariants}>
            <StatCard icon={Star} value={4.7} suffix="/5" description="Rated by Users" decimal />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
