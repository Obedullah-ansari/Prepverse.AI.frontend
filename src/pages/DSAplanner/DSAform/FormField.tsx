
import React from 'react';

interface FormFieldProps {
  label: string;
  icon?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, icon, required, children }) => {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-yellow-400 font-semibold">
        {icon}
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
};

export default FormField;