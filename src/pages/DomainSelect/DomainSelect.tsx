import React from "react";
import dsa from "../../assets/dsa.png";
import quiz from "../../assets/quiz.png";
import interview from "../../assets/interview.png";
import { easeInOut, motion } from "framer-motion";
import { Link } from "react-router-dom";
const DomainSelect: React.FC<{}> = ({}) => {
  return (
    <>
      <section className="w-full h-[100vh] bg-gradient-to-br from-amber-100 to-neutral-100 max-sm:h-auto ">
        
        <div className="w-full h-[15%] max-sm:h-auto  text-center !pt-4 ">
          <h1 className="text-[2.2rem] max-sm:text-[1rem] font-medium text-amber-900">
            Kickstart your journey with a single click
          </h1>
          <p className="text-amber-800 !mt-2 font-mono ">
            Generate , Practice Analyise And Grow
          </p>
        </div>

        <div className="w-full h-[85%] overflow-hidden gap-3  max-sm:h-auto flex flex-col justify-center items-center !p-[1rem]  ">
          <Link to="/domainselected/dsaform">
            <motion.div
              initial={{ x: 0, transition: { duration: 0.2 } }}
              whileHover={{
                x: 70,
                transition: { duration: 0.2, ease: easeInOut },
              }}
              className="md:w-[40rem] cursor-pointer max-sm:w-full sm:w-full h-[13rem] flex    border-[0.2rem]  border-amber-500 rounded-md text-center overflow-hidden"
            >
              <div className="h-full w-[50%] flex justify-start items-center flex-col bg-gradient-to-br from-amber-300 to-neutral-100 ">
                <h1 className="text-[1rem] font-semibold text-amber-900">
                  Craft Your DSA Roadmap
                </h1>
                <p className="text-amber-800 !p-3 text-justify font-mono text-[0.9rem]">
                  Take control of your learning. Design your own DSA schedule,
                  choose what to focus on, and adapt the plan as you grow.
                </p>
              </div>
              <div className="h-full w-[50%]  object-cover">
                <img
                  className="w-full h-full object-cover"
                  src={dsa}
                  alt="img1"
                />
              </div>
            </motion.div>
          </Link>

          <Link to="#">
            <motion.div
              initial={{ x: 0, transition: { duration: 0.2 } }}
              whileHover={{
                x: 70,
                transition: { duration: 0.2, ease: easeInOut },
              }}
              className="md:w-[40rem] cursor-pointer max-sm:w-full sm:w-full h-[13rem] flex   border-[0.2rem]  border-amber-700  rounded-md  text-center overflow-hidden  "
            >
               <div className="h-full w-[50%]  object-cover">
                <img
                  className="w-full h-full object-cover"
                  src={interview}
                  alt="img1"
                />
              </div>
              <div className="h-full w-[50%] flex justify-start items-center flex-col bg-gradient-to-tl from-amber-300 to-neutral-100 ">
                <h1 className="text-[1rem] font-semibold text-amber-800">
                  Your Personal AI Interview Coach
                </h1>
                <p className="text-amber-800 !p-3 text-justify font-mono text-[0.9rem]">
                  Simulate technical and behavioral interviews anytime. Get
                  evaluated on the spot and refine your skills with personalized
                  tips.
                </p>
              </div>
             
            </motion.div>
          </Link>

          <Link to="/domainselected/quizzform">
            <motion.div
              initial={{ x: 0, transition: { duration: 0.2 } }}
              whileHover={{
                x: 70,
                transition: { duration: 0.2, ease: easeInOut },
              }}
              className="md:w-[40rem] cursor-pointer max-sm:w-full sm:w-full h-[13rem] flex    border-[0.2rem]  border-amber-500 rounded-md  text-center overflow-hidden"
            >
              

              <div className="h-full w-[50%] flex justify-start items-center flex-col bg-gradient-to-tr from-amber-300 to-neutral-100 ">
                <h1 className="text-[1rem] font-semibold text-amber-900">
                  Smart Quiz Generator
                </h1>
                <p className="text-amber-800 !p-3 text-justify font-mono text-[0.9rem]">
                Generate intelligent quizzes on any topic of your choice—personalized to match your knowledge level and learning goals
                </p>
              </div>

              <div className="h-full w-[50%]  object-cover">
                <img
                  className="w-full h-full object-cover"
                  src={quiz}
                  alt="img1"
                />
              </div>

            </motion.div>
          </Link>

         
        </div>
      </section>
    </>
  );
};

export default DomainSelect;
