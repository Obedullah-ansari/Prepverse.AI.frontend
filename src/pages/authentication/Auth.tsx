import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import Emaillverify from "./Emaillverify";
import { Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

function Auth() {
  const [activeForm, setActiveForm] = useState<
    "login" | "signup" | "forgot" | "verify"
  >("signup");

  const handleToggle = (form: "login" | "signup" | "forgot" | "verify") => {
    setActiveForm(form);
  };

  return (
    <>
      <section className="bg-neutral-100 w-full h-[100vh] relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {activeForm === "login" && (
            <motion.div
              key="login"
              className="absolute w-full h-full flex justify-center items-center"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -200, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Login
                toggle={() => handleToggle("signup")}
                forgot={() => handleToggle("forgot")}
              />
            </motion.div>
          )}

          {activeForm === "signup" && (
            <motion.div
              key="signup"
              className="absolute w-full h-full flex justify-center items-center"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -200, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Signup
                verify={() => handleToggle("verify")}
                toggle={() => handleToggle("login")}
              />
            </motion.div>
          )}

          {activeForm === "forgot" && (
            <motion.div
              key="forgot"
              className="absolute w-full h-full flex justify-center items-center"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -200, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ForgotPassword toggle={() => handleToggle("login")} />
            </motion.div>
          )}
          {activeForm === "verify" && (
            <motion.div
              key="verify"
              className="absolute w-full h-full flex justify-center items-center"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -200, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Emaillverify />
            </motion.div>
          )}
        </AnimatePresence>

        <Toaster richColors position="top-center" />
      </section>
    </>
  );
}

export default Auth;
