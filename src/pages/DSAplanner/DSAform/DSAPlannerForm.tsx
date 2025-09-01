import React, { useState } from "react";
import Loader from "../../tools/Loading.tsx";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Code,
  Brain,
  Zap,
  Trophy,
  BookOpen,
} from "lucide-react";
import FormField from "./FormField";
import GlowButton from "./GlowButton";
import ToggleSwitch from "./ToggleSwitch";
import { dsaTopics } from "./data";
import { targetPlatforms } from "./data";
import { programmingLanguages } from "./data";
import { currentLevels } from "./data";
import { intensityLevels } from "./data";
import { date } from "./data";

interface FormData {
  startDuration: string | number;
  targetDuration: string;
  targetPlatform: string;
  currentLevel: string;
  preferredLanguage: string;
  weakTopics: string[];
  hasRestDays: boolean;
  intensity: string;
}

const DSAPlannerForm = () => {

  const [loadingDsa, setLoadingDsa] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    startDuration: "",
    targetDuration: "",
    targetPlatform: "",
    currentLevel: "",
    preferredLanguage: "",
    weakTopics: [],
    hasRestDays: true,
    intensity: "",
  });

  const handleTopicToggle = (topic: string) => {
    setFormData((prev) => {
      const updatedTopics = prev.weakTopics.includes(topic)
        ? prev.weakTopics.filter((t) => t !== topic)
        : [...prev.weakTopics, topic];
      return {
        ...prev,
        weakTopics: updatedTopics,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingDsa((prev)=>!prev);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}api/v1/dsa/dsaform`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      if (data) {

        setFormData({
          startDuration: "",
          targetDuration: "",
          targetPlatform: "",
          currentLevel: "",
          preferredLanguage: "",
          weakTopics: [],
          hasRestDays: true,
          intensity: "",
        });
        setTimeout(() => {
          setLoadingDsa((prev)=>!prev);
          navigate("/domainselected/dashboard/dsa");
        },3000)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 relative overflow-hidden">
      {loadingDsa && <Loader/>}
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 ">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 10h5m5 0h5m5 0h5M10 0v5m0 5v5m0 5v5"
                stroke="#a97404"
                strokeWidth="0.5"
                fill="none"
              />
              <circle cx="10" cy="10" r="1" fill="#a97404" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/10"></div>

      <div className="h-auto  w-full flex items-center justify-center !p-4 font-mono relative z-10">
        <div className="w-full max-w-4xl  ">
          {/* Header */}
          <div className="text-center w-full flex flex-col justify-center items-center !mb-8">
            <div className="inline-flex items-center gap-3 !mb-4">
              <div className="!p-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30">
                <Brain className="w-8 h-8 text-yellow-600" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">
                DSA Study Planner
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Create your personalized Data Structures & Algorithms learning
              roadmap
            </p>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-yellow-50/60 border border-yellow-500/20 rounded-2xl !p-8 shadow-2xl relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent rounded-2xl"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="!space-y-6">
                  {/* Time Availability */}
                  <div>
                    <label className="flex items-center gap-2 text-yellow-700 font-semibold !mb-4">
                      <Clock className="w-5 h-5" />
                      When did you want to start?
                      <span className="text-red-500">*</span>
                    </label>
                    <p className="text-gray-600 text-sm !mb-4">
                      From when you like to start your preperation?
                    </p>

                    <input
                      className="w-full bg-white/70 border border-yellow-500/30 rounded-lg !px-4 !py-3 text-gray-800 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          startDuration: e.target.value,
                        }))
                      }
                      type="date"
                      value={formData.startDuration}
                      name=""
                      id=""
                    />
                  </div>

                  {/* Target Duration */}
                  <FormField
                    label="Target Duration"
                    icon={<Calendar className="w-5 h-5" />}
                    required
                  >
                    <p className="text-gray-600 text-sm !mb-3">
                      By when do you want to complete your preparation?
                    </p>
                    <select
                      value={formData.targetDuration}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          targetDuration: e.target.value,
                        }))
                      }
                      className="w-full bg-white/70 border border-yellow-500/30 rounded-lg !px-4 !py-3 text-gray-800 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                    >
                      {date.map((date) => (
                        <option key={date} value={date} className="bg-white">
                          {date}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  {/* Target Platform */}
                  <FormField
                    label="Target Platform / Goal"
                    icon={<Trophy className="w-5 h-5" />}
                    required
                  >
                    <p className="text-gray-600 text-sm !mb-3">
                      What is your goal or target platform?
                    </p>
                    <select
                      value={formData.targetPlatform}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          targetPlatform: e.target.value,
                        }))
                      }
                      className="w-full bg-white/70 border border-yellow-500/30 rounded-lg !px-4 !py-3 text-gray-800 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="">Select your goal</option>
                      {targetPlatforms.map((platform) => (
                        <option
                          key={platform}
                          value={platform}
                          className="bg-white"
                        >
                          {platform}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  {/* Current Level */}
                  <FormField
                    label="Current Level / Experience"
                    icon={<BookOpen className="w-5 h-5" />}
                    required
                  >
                    <p className="text-gray-600 text-sm !mb-3">
                      What's your current DSA experience level?
                    </p>
                    <select
                      value={formData.currentLevel}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          currentLevel: e.target.value,
                        }))
                      }
                      className="w-full bg-white/70 border border-yellow-500/30 rounded-lg !px-4 !py-3 text-gray-800 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="">Select your level</option>
                      {currentLevels.map((level) => (
                        <option key={level} value={level} className="bg-white">
                          {level}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>

                {/* Right Column */}
                <div className="!space-y-6">
                  {/* Preferred Language */}
                  <FormField
                    label="Preferred Programming Language"
                    icon={<Code className="w-5 h-5" />}
                    required
                  >
                    <p className="text-gray-600 text-sm !mb-3">
                      Which language are you using for DSA?
                    </p>
                    <select
                      value={formData.preferredLanguage}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          preferredLanguage: e.target.value,
                        }))
                      }
                      className="w-full bg-white/70 border border-yellow-500/30 rounded-lg !px-4 !py-3 text-gray-800 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="">Select a language</option>
                      {programmingLanguages.map((lang) => (
                        <option key={lang} value={lang} className="bg-white">
                          {lang}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  {/* Intensity Preference */}
                  <FormField
                    label="Intensity Preference"
                    icon={<Zap className="w-5 h-5" />}
                    required
                  >
                    <p className="text-gray-600 text-sm mb-4">
                      How intense do you want your plan to be?
                    </p>
                    <div className="!space-y-3">
                      {intensityLevels.map((level) => (
                        <label
                          key={level.value}
                          className="flex items-start gap-3 cursor-pointer group !p-3 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-50/50 transition-all duration-300"
                        >
                          <input
                            type="radio"
                            name="intensity"
                            value={level.value}
                            checked={formData.intensity === level.value}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                intensity: e.target.value,
                              }))
                            }
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 transition-all duration-300 !flex-shrink-0 !mt-0.5 ${
                              formData.intensity === level.value
                                ? "border-yellow-500 bg-yellow-500/20 shadow-lg shadow-yellow-400/25"
                                : "border-gray-400 group-hover:border-yellow-500/50"
                            }`}
                          >
                            {formData.intensity === level.value && (
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mx-auto !mt-1"></div>
                            )}
                          </div>
                          <div>
                            <span
                              className={`font-medium transition-colors duration-300 ${
                                formData.intensity === level.value
                                  ? "text-yellow-700"
                                  : "text-gray-700 group-hover:text-yellow-600"
                              }`}
                            >
                              {level.label}
                            </span>
                            <p className="text-gray-500 text-sm">
                              {level.desc}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </FormField>

                  {/* Rest Days Toggle */}
                  <div className="!pt-4">
                    <ToggleSwitch
                      label="Include rest days (flexible weekends)"
                      checked={formData.hasRestDays}
                      onChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          hasRestDays: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Topics Section */}
              <div className="!mt-8 !pt-8 border-t border-yellow-500/20">
                <label className="flex items-center gap-2 text-yellow-700 font-semibold !mb-6">
                  <Brain className="w-5 h-5" />
                  Select topics you struggle with or want to focus more on
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {dsaTopics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => {
                        handleTopicToggle(topic);
                      }}
                      className={`!px-4 !py-3  rounded-lg border z-[10000] transition-all duration-100 text-sm font-medium ${
                        formData.weakTopics.includes(topic)
                          ? "bg-yellow-500/20 border-yellow-500 text-yellow-700 shadow-md shadow-yellow-400/25"
                          : "bg-white/50 border-gray-300 text-gray-700 hover:border-yellow-500/50 hover:text-yellow-600 hover:bg-yellow-50/50"
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="!mt-8 flex justify-center">
                <GlowButton type="submit">Generate My Study Plan</GlowButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DSAPlannerForm;
