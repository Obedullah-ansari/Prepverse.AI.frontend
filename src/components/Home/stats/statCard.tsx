import React from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
  duration?: number;
  className?: string;
  decimal?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  suffix = "",
  prefix = "",
  description,
  className,
  duration = 2,
  decimal = false,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      animate(count, value, {
        duration,
        onUpdate(latest) {
          setDisplayValue(decimal ? latest.toFixed(1) : Math.floor(latest).toString());
        },
      });
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        " rounded-xl bg-white shadow-md border !p-10 border-purple-100 flex flex-col items-center justify-center transition-all hover:shadow-lg",
        className
      )}
    >
      <div className="!p-3 bg-amber-100 rounded-full  text-[#F3C623]">
        <Icon strokeWidth={2} className="h-8 w-8" />
      </div>
      <div className="flex items-end justify-center !mb-2">
        <span className="text-neutral-800 text-xl   !mr-1">{prefix}</span>
        <span className="text-4xl font-bold text-[#F3C623]">{displayValue}</span>
        <span className="text-neutral-700 font-mono text-xl font-semibold !ml-1">{suffix}</span>
      </div>
      <p className="text-neutral-700 text-center font-medium ">{description}</p>
    </motion.div>
  );
};

export default StatCard;
