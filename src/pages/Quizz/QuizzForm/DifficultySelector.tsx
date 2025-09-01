import React from 'react';
import { Circle } from 'lucide-react';

interface DifficultyProps {
  value: string;
  onChange: (difficulty: string) => void;
}

const difficulties = [
  { id: 'beginner', label: 'Beginner', description: 'Basic concepts and fundamentals' },
  { id: 'intermediate', label: 'Intermediate', description: 'Applied knowledge and practical problems' },
  { id: 'advanced', label: 'Advanced', description: 'Complex scenarios and expert-level topics' }
];

const DifficultySelector: React.FC<DifficultyProps> = ({ value, onChange }) => {
  return (
    <div className="!space-y-4">
      <div className="flex items-center gap-2">
        <Circle className="w-5 h-5 text-[#F3C623]" />
        <h3 className="text-xl font-mono font-semibold text-yellow-600">Difficulty Level</h3>
      </div>
      <p className="text-gray-600 font-mono">Select the complexity level for your quiz questions</p>
      
      <div className="grid md:grid-cols-3 gap-4">
        {difficulties.map((difficulty) => (
          <label
            key={difficulty.id}
            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
              value === difficulty.id
                ? 'border-[#F3C623] bg-[#F3C623]/10 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="difficulty"
              value={difficulty.id}
              checked={value === difficulty.id}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <div className="text-center">
              <div className={`text-lg font-mono font-semibold mb-1 ${
                value === difficulty.id ? 'text-yellow-600' : 'text-yellow-500'
              }`}>
                {difficulty.label}
              </div>
              <div className="text-[0.8rem] text-gray-600 font-mono">
                {difficulty.description}
              </div>
            </div>
            {value === difficulty.id && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-[#F3C623] rounded-full"></div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;