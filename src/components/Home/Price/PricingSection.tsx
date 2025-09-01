import React, { useRef } from "react";
import PricingCard from "./PricingCard";
import { motion} from "framer-motion";
const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
 


  const pricingPlans = [
    {
      name: "Free",
      price: 0,
      description:
        "Ideal for individuals exploring our platform or working on personal projects.",
      features: [
        { name: "Mock Interview Basic Version", included: true },
        { name: "DSA Study Planner", included: true },
        { name: "Subject Quizzes", included: true },
        { name: "Mock Interview Real world Simulation", included: false },
        { name: "Company wise DSA Planner", included: false },
        { name: "Detailed Quiz Explanations", included: false },
      ],
      ctaText: "Start Free",
      popular: false,
    },
    {
      name: "Basic",
      price: 5,
      description:
        "Perfect for learners and early-stage professionals to build and grow.",
      features: [
        { name: "Mock Interview Basic Version", included: true },
        { name: "DSA Study Planner + Company wise Planner", included: true },
        { name: "Subject Quizzes with Detailed Explanations", included: true },
        { name: "100 Mock Interview Real world Simulation", included: true },
        {
          name: "Customize you DSA planner graphs and Tables",
          included: false,
        },
        { name: "Choose Your own AI Model", included: false },
      ],
      ctaText: "Subscribe Now",
      popular: true,
    },
    {
      name: "Premium",
      price: 10,
      description:
        "Designed for institutions and professionals seeking advanced tools and insights.",
      features: [
        {
          name: "Mock Interview Basic & Real-world Versions",
          included: true,
        },
        { name: "DSA Study Planner + Company wise Planner", included: true },
        { name: "Subject Quizzes with Detailed Explanations", included: true },
        { name: "Unlimited Mock Interview Basic & Advanced", included: true },
        { name: "Customize you DSA planner graphs and Tables", included: true },
        { name: "Choose Your own AI Model", included: true },
      ],
      ctaText: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-auto z-[2000]  "
    >
      <motion.div
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.4  ,transition: { duration: 0.7 }}}
        className="absolute left-[40%] top-[10%] w-[30rem] h-[30rem] rounded-full z-[-30]  bg-[#F3C623] opacity-[0.4]"
      />
      <div className=" text-center w-full flex-col h-[10rem] flex justify-center items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Choose Your Plan
        </h2>
        <p className="text-lg text-gray-700">
          Select the perfect plan for your needs. Upgrade or downgrade at any
          time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6  lg:gap-10 max-sm:!p-4 sm:!p-4 md:!p-3 lg:!p-10">
        {pricingPlans.map((plan, index) => (
          <div key={index} className={`flex ${plan.popular ? "md:!mt-4" : ""}`}>
            <PricingCard
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              ctaText={plan.ctaText}
              popular={plan.popular}
            />
          </div>
        ))}
      </div>

      <div className="!mt-10 text-center text-sm text-neutral-50">
        All plans include a 14-day free trial. No credit card required.
      </div>
    </div>
  );
};

export default PricingSection;
