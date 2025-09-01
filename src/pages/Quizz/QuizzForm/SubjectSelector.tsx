import React, { useState } from "react";
import { Check, PenBox } from "lucide-react";

interface SubjectProps {
  value: string[];
  onChange: (subjects: string[]) => void;
}

const subjects = [
  "OOPs",
  "Operating System",
  "Computer Network",
  "React",
  "JavaScript",
  "Java",
  "Python",
  "SQL",
  "MySQL",
  "DBMS",
  "System Design",
  "JavaSpringBoot",
  "Node/Express",
  "HTML/CSS",
  "APIs",
  "Git/GitHub",
];

const SubjectSelector: React.FC<SubjectProps> = ({ value, onChange }) => {
  const [customSubject, setCustomSubject] = useState("");
  const toggleSubject = (subject: string) => {
    if (value.includes(subject)) {
      onChange(value.filter((s) => s !== subject));
    } else {
      onChange([...value, subject]);
    }
  };

  const handleAddCustomSubject = () => {
    const trimmed = customSubject.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setCustomSubject(""); // clear input after adding
    }
  };

  return (
    <div className="!space-y-4">
      <div className="flex items-center gap-2">
        <Check className="w-5 h-5 text-[#F3C623]" />
        <h3 className="text-xl font-mono font-semibold text-yellow-600">
          Select Subjects
        </h3>
      </div>
      <p className="text-gray-600 font-mono">
        Choose one or more subjects for your quiz questions
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 font-mono lg:grid-cols-4 gap-3">
        {subjects.map((subject) => (
          <label
            key={subject}
            className={`relative cursor-pointer rounded-lg border-2 !p-3 text-center transition-all duration-200 hover:shadow-md ${
              value.includes(subject)
                ? "border-[#F3C623] bg-[#F3C623]/10 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={value.includes(subject)}
              onChange={() => toggleSubject(subject)}
              className="sr-only"
            />
            <div
              className={`text-sm font-medium ${
                value.includes(subject) ? "text-gray-800" : "text-gray-700"
              }`}
            >
              {subject}
            </div>
            {value.includes(subject) && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#F3C623] rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-gray-800" />
              </div>
            )}
          </label>
        ))}
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <PenBox className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-mono font-semibold text-yellow-600">
            Add Custom Subject
          </h3>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Enter subject name"
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            className="w-full max-w-md bg-white text-neutral-800 !px-4 !py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-amber-300 transition-all"
          />
          <span
            onClick={handleAddCustomSubject}
            className="!px-4 !py-2 bg-yellow-400 text-neutral-100 font-medium rounded-md hover:bg-amber-500 transition"
          >
            Add
          </span>
        </div>
      </div>

      {value.length > 0 && (
        <div className="!mt-4 !p-3 bg-[#F3C623]/10 rounded-lg border border-[#F3C623]/20">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">{value.length}</span> subject
            {value.length !== 1 ? "s" : ""} selected: {value.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default SubjectSelector;
