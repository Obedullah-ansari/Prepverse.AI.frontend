import React, { useState } from "react";
import { Check } from "lucide-react";
import DifficultySelector from "./DifficultySelector";
import QuestionCountInput from "./QuestionCountInput";
import SubjectSelector from "./SubjectSelector";
import PurposeSelector from "./PurposeSelector";
import { useNavigate } from "react-router-dom";

interface FormData {
  difficulty: string;
  questionCount: number;
  subjects: string[];
  purpose: string;
}

const QuizForm: React.FC<{
  loaderTriggrer?: () => void;
}> = ({ loaderTriggrer }) => {
  const [formData, setFormData] = useState<FormData>({
    difficulty: "",
    questionCount: 10,
    subjects: [],
    purpose: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loaderTriggrer && loaderTriggrer();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}api/v1/quiz/quizform`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setTimeout(() => {
          navigate("/domainselected/quizzform/quizzpage");
          loaderTriggrer && loaderTriggrer();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isFormValid =
    formData.difficulty && formData.subjects.length > 0 && formData.purpose;

  return (
    <div className=" bg-yellow-50/10 rounded-2xl  shadow-xl !p-8 border border-amber-300">
      <form onSubmit={handleSubmit} className="!space-y-8">
        <DifficultySelector
          value={formData.difficulty}
          onChange={(difficulty) =>
            setFormData((prev) => ({ ...prev, difficulty }))
          }
        />

        <QuestionCountInput
          value={formData.questionCount}
          onChange={(questionCount) =>
            setFormData((prev) => ({ ...prev, questionCount }))
          }
        />

        <SubjectSelector
          value={formData.subjects}
          onChange={(subjects) =>
            setFormData((prev) => ({ ...prev, subjects }))
          }
        />

        <PurposeSelector
          value={formData.purpose}
          onChange={(purpose) => setFormData((prev) => ({ ...prev, purpose }))}
        />

        <div className="!pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full flex items-center justify-center gap-3 !py-4 !px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
              isFormValid
                ? "bg-[#F3C623] hover:bg-[#E6B91F] text-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Check className="w-5 h-5" />
            Generate Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
