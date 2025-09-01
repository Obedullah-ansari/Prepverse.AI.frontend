
import React from 'react';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-gray-700 group-hover:text-yellow-600 transition-colors duration-300">
        {label}
      </span>
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
          checked 
            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/30' 
            : 'bg-gray-300 border border-gray-400'
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-300 ${
            checked 
              ? 'left-6' 
              : 'left-0.5'
          }`}
        >
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
            checked ? 'bg-yellow-400/20' : 'bg-gray-400/20'
          }`}></div>
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;