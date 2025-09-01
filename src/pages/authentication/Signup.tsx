import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Eye, EyeOff } from "lucide-react";


const Signup: React.FC<{
  toggle: () => void;
  verify : ()=>void
}> = ({ toggle,verify }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmed: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.passwordConfirmed) {
      newErrors.passwordConfirmed = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      //   Form submission logic goes here

      // const url = process.env.URL;
      //  console.log(url)

      try {
        const respone = await fetch(
          "http://localhost:4000/api/v1/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await respone.json();
        if (respone.ok) {
          verify()
          localStorage.setItem("userEmail",data.email)
          toast(
            "We've sent a verification link to your email address"
          );
        
        } else {
           toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        passwordConfirmed: "",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg  !p-8 w-full flex flex-col gap-5 justify-center  h-[80%] max-w-md max-sm:w-[97%] ">
      <div className="text-center !mb-8">
        <h1 className="text-2xl font-semibold text-neutral-800">
          Create an Account
        </h1>
        <p className="text-neutral-500 mt-2">Sign up to get started</p>
      </div>
      <form onSubmit={handleSubmit} >
        <div className=" !p-[0.4rem]" >
          <label
            htmlFor="name"
            className="text-sm font-semibold text-neutral-700 !p-[0.4rem]"
          >
            Username
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className={`bg-neutral-50 border !p-[0.4rem]  ${
              errors.name ? "border-red-500" : "border-neutral-200"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className=" !p-[0.4rem]">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-neutral-700 !p-[0.4rem] "
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={`bg-neutral-50 border  !p-[0.4rem]  ${
              errors.email ? "border-red-500" : "border-neutral-200"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className=" !p-[0.4rem]" >
          <label
            htmlFor="password"
            className="text-sm font-semibold text-neutral-700 !p-[0.4rem]"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className={`bg-neutral-50 border  !p-[0.4rem] ${
                errors.password ? "border-red-500" : "border-neutral-200"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {showPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div className=" !p-[0.4rem]">
          <label
            htmlFor="passwordConfirmed"
            className="text-sm font-semibold text-neutral-700 !p-[0.4rem] "
          >
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="passwordConfirmed"
              name="passwordConfirmed"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.passwordConfirmed}
              onChange={handleChange}
              className={`bg-neutral-50  !p-[0.4rem] border  ${
                errors.passwordConfirmed
                  ? "border-red-500"
                  : "border-neutral-200"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {showConfirmPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.passwordConfirmed && (
            <p className="text-red-500 text-xs mt-1">
              {errors.passwordConfirmed}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-neutral-800 hover:bg-neutral-900 text-white !py-2 !mt-4 rounded-md transition-colors duration-300 cursor-pointer"
        >
          Create Account
        </Button>

        <div className="text-center !mt-4">
          <p className="text-neutral-500 text-sm">
            Already have an account?{" "}
            <span
              onClick={toggle}
              className="text-neutral-800 font-medium hover:underline cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
