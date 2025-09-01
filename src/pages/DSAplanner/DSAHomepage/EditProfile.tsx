import React, { useState } from "react";
import { User, Mail, Building, Briefcase } from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  institution: string;
  currentOccupation: string;
}

const occupationOptions = [
  "Student",
  "Junior Developer",
  "Senior Developer",
  "Software Engineer",
  "Engineering Manager",
  "Other",
];

const EditProfile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    institution: "",
    currentOccupation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
    // Add your submission logic here
  };

  return (
    <div className=" h-full    !p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center !mb-3">
          <h1 className="text-2xl font-semibold text-neutral-800 !mb-2">
            Edit Profile
          </h1>
          <p className="text-neutral-600 text-[0.9rem] font-mono">
            Update your personal and professional information
          </p>
        </div>

        {/* Profile Form */}
        <div className="bg-white  lg:h-[70vh]  shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-neutral-200 !px-6 !py-4 border-b border-neutral-300">
            <h2 className="text-[1.2rem] font-medium text-neutral-800">
              Personal Information
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="!p-6 sm:!p-8">
            <div className="!space-y-6">
              {/* Name Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 !pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#F3C623]" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="block w-full !pl-10 !pr-3 !py-3 border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-1 focus:ring-[#F3C623] focus:border-[#F3C623] focus:outline-none placeholder-neutral-500 transition-all"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 !pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#F3C623]" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="block w-full !pl-10 !pr-3 !py-3 border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-1 focus:ring-[#F3C623] focus:border-[#F3C623] text-neutral-800 focus:outline-none placeholder-neutral-500 transition-all"
                  required
                />
              </div>

              {/* Institution/Company Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 !pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-[#F3C623]" />
                </div>
                <input
                  type="text"
                  name="institution"
                  value={profile.institution}
                  onChange={handleChange}
                  placeholder="University/Company Name"
                  className="block w-full !pl-10 !pr-3 !py-3 border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-1 focus:ring-[#F3C623] focus:border-[#F3C623] text-neutral-800 focus:outline-none placeholder-neutral-500 transition-all"
                />
              </div>

              {/* Current Occupation */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 !pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-[#F3C623]" />
                </div>
                <select
                  name="currentOccupation"
                  value={profile.currentOccupation}
                  onChange={handleChange}
                  className="block w-full !pl-10 !pr-3 !py-3 border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-1 focus:ring-[#F3C623] focus:border-[#F3C623] text-neutral-800 focus:outline-none appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select Current Occupation</option>
                  {occupationOptions.map((occupation) => (
                    <option key={occupation} value={occupation}>
                      {occupation}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="!mt-10 flex flex-col text-nowrap sm:flex-row justify-end gap-3">
              <button
                type="button"
                className="!px-6 !py-3 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="!px-6 !py-3 bg-[#F3C623] rounded-lg text-neutral-800 font-medium hover:bg-[#e6b922] transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
