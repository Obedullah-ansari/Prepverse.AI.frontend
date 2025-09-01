import { Input } from "../../components/ui/input";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";

interface FormData {
  email: string;
  otp: string;
}
const Emaillverify: React.FC<{}> = ({}) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState<FormData>({
    email: "",
    otp: "",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setFormdata((prev) => ({ ...prev, email: savedEmail }));
    }
  }, []);

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/v1/auth/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("userid", data.id);
        localStorage.removeItem("userEmail")
        toast.success(
          "Account created! You have successfully created an account."
        );
        login();
       setTimeout(() => {
        navigate("/dashboard");
       }, 2000);
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg !p-8 w-full  flex flex-col gap-5 justify-center  h-[60%] max-w-md ">
        <div className="text-center !mb-8">
          <h1 className="text-2xl font-semibold text-neutral-800">
            Please Verify Your Email
          </h1>
          <p className="text-neutral-500 mt-2">
            Enter the otp send to your email
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className=" !p-[0.4rem]">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-neutral-700 !p-[0.4rem]"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your Email"
              value={formdata.email}
              onChange={handelChange}
              className={"bg-neutral-50 border !p-[0.4rem]"}
            />
          </div>
          <div className=" !p-[0.4rem]">
            <label
              htmlFor="otp"
              className="text-sm font-semibold text-neutral-700 !p-[0.4rem]"
            >
              Enter Otp
            </label>
            <Input
              id="otp"
              name="otp"
              type="text"
              required
              placeholder="Enter your otp"
              onChange={handelChange}
              className={"bg-neutral-50 border !p-[0.4rem]"}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-neutral-800 hover:bg-neutral-900 text-white !py-2 !mt-4 rounded-md transition-colors duration-300 cursor-pointer"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Emaillverify;
