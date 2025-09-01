import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
const Login: React.FC<{
  toggle: () => void;
  forgot: () => void;
}> = ({ toggle, forgot }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userid", data.userId);
          toast.success("You have successfully logged in");
          setFormData({ email: "", password: "" });
          setErrors({});
          login();
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        } else {
          toast.error(data.message);
          setFormData({ email: "", password: "" });
        }
      } catch (error) {
        console.log("something went wrong", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-sm:w-[97%] h-auto  !p-8 w-full  flex flex-col gap-5 justify-center  max-w-md ">
      <div className="text-center !mb-8">
        <h1 className="text-2xl font-semibold text-neutral-800">
          Welcome Back
        </h1>
        <p className="text-neutral-500 mt-2">Log in to your account</p>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            if (!credentialResponse.credential) {
              toast.error("Google Sign In Failed: Missing credential");
              return;
            }

            try {
              const decoded: any = jwtDecode(credentialResponse.credential);
              const res = await fetch(
                "http://localhost:4000/api/v1/auth/googleauth",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: decoded.name,
                    email: decoded.email,
                  }),
                }
              );

              const data = await res.json();

              if (res.ok) {
                toast.success("Logged in with Google!");
                localStorage.setItem("token", data.token);
              } else {
                toast.error(data.message || "Google Sign In Failed");
              }
            } catch (err) {
              console.error(err);
              toast.error("Google Sign In Failed");
            }
          }}
          onError={() => toast.error("Google Signin failed")}
        />

        <span className="w-full h-[1rem]  flex justify-center items-center text-neutral-900">
          <span className="h-full w-[40%] !mr-3 border-b border-neutral-600"></span>
          or
          <span className="h-full w-[40%] !ml-3 border-b border-neutral-600"></span>
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="!p-[0.4rem]">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-neutral-700  !p-[0.4rem]"
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
            className={`bg-neutral-50 border !p-[0.4rem] ${
              errors.email ? "border-red-500" : "border-neutral-200"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="!p-[0.4rem]">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-neutral-700 !p-[0.4rem] "
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`bg-neutral-50 border !p-[0.4rem] ${
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

        <div className="flex items-center justify-between !p-[0.6rem]">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-neutral-600  focus:ring-neutral-500 border-neutral-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="!ml-2 block text-sm text-neutral-600"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <span
              onClick={forgot}
              className="font-medium text-neutral-700 hover:text-neutral-900 cursor-pointer"
            >
              Forgot password?
            </span>
          </div>
        </div>

        <div className="w-full text-center !mt-2">
          <Button
            type="submit"
            className="w-full bg-neutral-800 hover:bg-neutral-900 text-white  rounded-md transition-colors duration-300 cursor-pointer"
          >
            Log In
          </Button>
        </div>

        <div className="text-center !mt-4">
          <p className="text-neutral-500 text-sm">
            Don't have an account?{" "}
            <span
              className="text-neutral-800 font-medium hover:underline cursor-pointer"
              onClick={toggle}
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
