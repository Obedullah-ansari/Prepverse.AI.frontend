import React from 'react';
import { Circle } from 'lucide-react';

interface PurposeProps {
  value: string;
  onChange: (purpose: string) => void;
}

const purposes = [
  { 
    id: 'interview', 
    label: 'Practice for Interviews',
    description: 'Prepare for technical interviews and coding challenges'
  },
  { 
    id: 'knowledge', 
    label: 'Improve Knowledge',
    description: 'Learn new concepts and strengthen existing skills'
  },
  { 
    id: 'test-prep', 
    label: 'Test Preparation',
    description: 'Study for exams, certifications, or assessments'
  },
  { 
    id: 'mock', 
    label: 'Mock Assessment',
    description: 'Simulate real testing conditions and evaluate performance'
  }
];

const PurposeSelector: React.FC<PurposeProps> = ({ value, onChange }) => {
  return (
    <div className="!space-y-4">
      <div className="flex items-center gap-2">
        <Circle className="w-5 h-5 text-[#F3C623]" />
        <h3 className="text-xl font-mono font-semibold text-yellow-600">Quiz Purpose</h3>
      </div>
      <p className="text-gray-600 font-mono ">What do you want to achieve with this quiz?</p>
      
      <div className="grid md:grid-cols-2 gap-4">
        {purposes.map((purpose) => (
          <label
            key={purpose.id}
            className={`relative cursor-pointer rounded-lg border-2 !p-4 transition-all duration-200 hover:shadow-md ${
              value === purpose.id
                ? 'border-[#F3C623] bg-[#F3C623]/10 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="purpose"
              value={purpose.id}
              checked={value === purpose.id}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <div>
              <div className={`text-lg font-semibold !mb-2 ${
                value === purpose.id ? 'text-yellow-600' : 'text-yellow-500'
              }`}>
                {purpose.label}
              </div>
              <div className="text-sm font-mono text-gray-600">
                {purpose.description}
              </div>
            </div>
            {value === purpose.id && (
              <div className="absolute top-3 right-3 w-3 h-3 bg-[#F3C623] rounded-full"></div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PurposeSelector;