import { Link, Check } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useState } from "react";

interface TaskCardProps {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  timeEstimate: string;
  link: string;
  isCompleted: boolean;
}

const difficultyStyles = {
  easy: {
    text: "text-slate-500",
    badge: "bg-green-100 text-green-800",
  },
  medium: {
    text: "text-slate-500",
    badge: "bg-yellow-200 text-yellow-700",
  },
  hard: {
    text: "text-slate-500",
    badge: "bg-red-100 text-red-800",
  },
};

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  difficulty,
  timeEstimate,
  link,
  isCompleted,
}) => {
  const styles = difficultyStyles[difficulty];
  const [checked, setChecked] = useState(() => {
    const stored = localStorage.getItem(`${title}`);
    return stored === "1";
  });

  const handleCheckClick = (title: string) => {
    if (isCompleted) return;

    const newChecked = !checked;
    setChecked(newChecked);
    localStorage.setItem(`${title}`, newChecked ? "1" : "0");
  };

  return (
    <div className={cn("!p-4 w-full max-w-[88%]")}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleCheckClick(title)}
            className={cn(
              "w-4 h-4 md:w-5 md:h-5  rounded-full border-2 flex items-center justify-center transition-colors",
              checked || isCompleted
                ? "bg-green-500 border-green-500 text-white"
                : "bg-white border-slate-300 text-transparent"
            )}
          >
            <Check className="w-5 h-5 " />
          </button>
          <h3
            className={cn(
              "font-semibold  max-sm:text-[0.8rem] sm:text-[0.9rem] md:text-lg",
              styles.text
            )}
          >
            {title}
          </h3>
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Link
            className={cn("md:w-5 md:h-5  w-4 h-4 cursor-pointer", styles.text)}
          />
        </a>
      </div>

      <div className="flex items-center justify-between !ml-7 !mt-2">
        <span
          className={cn(
            "!px-2 !py-1 rounded-full text-xs font-medium",
            styles.badge
          )}
        >
          {difficulty}
        </span>
        <span
          className={cn(
            "sm:text-[0.9rem] max-sm:text-[0.8rem] lg:text-sm font-medium",
            styles.text
          )}
        >
          Time: {timeEstimate}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
