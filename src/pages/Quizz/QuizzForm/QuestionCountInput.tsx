import React from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionCountProps {
  value: number;
  onChange: (count: number) => void;
}

const QuestionCountInput: React.FC<QuestionCountProps> = ({ value, onChange }) => {
  const MIN = 5;
  const MAX = 20;

  const decrease = () => {
    if (value > MIN) onChange(value - 1);
  };

  const increase = () => {
    if (value < MAX) onChange(value + 1);
  };

  return (
    <div className="!space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <List className="w-6 h-6 text-yellow-500" />
        <h3 className="text-2xl font-mono font-semibold text-yellow-600">Number of Questions</h3>
      </div>
      <p className="text-gray-500 font-mono text-sm">Choose how many questions you want in your quiz (5–20)</p>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={decrease}
          disabled={value <= MIN}
          className="w-10 h-10 rounded-full border border-gray-300 shadow-sm flex items-center justify-center text-gray-700 bg-white hover:bg-gray-100 transition disabled:opacity-40"
        >
          <ChevronDown className="w-5 h-5" />
        </button>

        <div className="min-w-[10rem] text-center text-xl font-medium border border-gray-300 bg-gray-50 text-gray-800 rounded-lg !px-4 !py-2 shadow-inner select-none">
          {value}
        </div>

        <button
          type="button"
          onClick={increase}
          disabled={value >= MAX}
          className="w-10 h-10 rounded-full border border-gray-300 shadow-sm flex items-center justify-center text-gray-700 bg-white hover:bg-gray-100 transition disabled:opacity-40"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      {/* Min/Max Labels */}
      <div className="flex justify-between text-sm text-gray-400">
        <span>Min: {MIN}</span>
        <span>Max: {MAX}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-yellow-400 h-full transition-all duration-300"
          style={{ width: `${((value - MIN) / (MAX - MIN)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default QuestionCountInput;
