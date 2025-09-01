import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const ForgotPassword: React.FC<{
  toggle: () => void;
}> = ({ toggle }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/forgetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset link sent to your email");
        setEmail("");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg !p-8 w-full flex flex-col gap-5 justify-center h-[60%] max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-neutral-800">Forgot Password</h1>
        <p className="text-neutral-500 !mt-2">We'll send a reset link to your email</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="!p-[0.6rem]">
          <label htmlFor="email" className="text-sm font-medium text-neutral-700 !p-[0.6rem]">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            className={`bg-neutral-50 border !p-[0.6rem] ${
              error ? "border-red-500" : "border-neutral-200"
            }`}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div className="w-full text-center !mt-2">
          <Button
            type="submit"
            className="w-[96%] bg-neutral-800 hover:bg-neutral-900 text-white rounded-md transition-colors duration-300 cursor-pointer"
          >
            Send Reset Link
          </Button>
        </div>

        <div className="text-center !mt-4">
          <p className="text-neutral-500 text-sm">
            Remember your password?{" "}
            <span
              className="text-neutral-800 font-medium hover:underline cursor-pointer"
              onClick={toggle}
            >
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
