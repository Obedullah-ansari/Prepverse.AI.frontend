import Dashboard from "./Dashboard";
import Features from "./Features/Features";
import PricingSection from "./Price/PricingSection";
import Navbar from "./Navbar/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import Reviews from "./Reviews/Reviews";
import StatsSection from "./stats/StatsSection";
import FooterMain from "./Footer/FooterMain";
import { Link } from "react-router-dom";

function Home() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1.3]);
  return (
    <>
      <main className=" relative bg-neutral-50 w-full h-auto overflow-x-hidden ">
        {/* --------------------landing page-------------------- */}
        <Navbar />
        <div className="flex flex-col items-center gap-3 justify-center w-auto !pt-[10rem] !pb-[2rem]   ">
          <h1 className="lg:text-[4rem] sm:text-4xl max-sm:text-3xl text-nowrap font-medium text-gray-800">
            Welcome to Prepverse
          </h1>
          <p className="mt-4 text-md text-center font-semibold text-gray-600">
           Your all in one platform to practice DSA, test with smart quizzes, and prepare for interviews like a pro
          </p>

          <div className="flex gap-5 ">
            <button className="!px-5 !py-2 border border-neutral-900 rounded-full">
              talk to us
            </button>
            <Link 
            to="/domainselected"
            className="!px-3 !py-2 border  bg-[#F3C623]  rounded-full">
              Get started
            </Link>
          </div>
        </div>

        <Dashboard />

        {/* ---------------------Features--------------------- */}

        <section className="relative w-full flex flex-col justify-start items-center  max-sm:h-auto  md:h-[100vh] sm:h-auto  overflow-hidden  !pb-3  ">
          <motion.div
            style={{ scale }}
            className="absolute top-[-50%] max-sm:w-[35rem] max-sm:h-[35rem] sm:w-[35rem] sm:h-[35rem] md:w-[40rem] md:h-[40rem] lg:w-[48rem] lg:h-[48rem] z-0 rounded-full bg-[#F3C623]"
          ></motion.div>
          <Features />
        </section>

        {/* --------------------priceing-------------------- */}
        <section id="price">
        <PricingSection />
        </section>

        {/* --------------------stats-------------------- */}
        <div className="h-auto w-full">
          <div className=" w-full bg-gradient-to-br from-black to-[#000000]/90 text-white">
            <div className="container !mx-auto !py-20 md:!py-32 !px-4 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !mb-6">
                <span className="text-[#F3C623]">Powerful</span> Statistics
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl max-w-3xl !mx-auto">
                Discover how our platform is helping thousands of customers
                succeed
              </p>
            </div>
          </div>

          <StatsSection />
        </div>
        {/* --------------------reviews-------------------- */}

        <Reviews />
       <section id="contact">
       <FooterMain/>
       </section>
    
      </main>
    </>
  );
}

export default Home;
