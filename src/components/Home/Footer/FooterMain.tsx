
import Footer from "./Footer";
function FooterMain() {
  return (
    <>
      <section className="relative flex flex-col justify-center items-center  w-full h-screen overflow-hidden  ">
        <div className="w-full max-sm:h-[45%] h-[35%] bg-neutral-300 "></div>
        <div className="absolute max-sm:top-[20%] top-[15%] max-sm:h-[14rem] h-[20rem] max-sm:w-[94%] w-[75%] bg-neutral-800 shadow-lg rounded-md flex  flex-col justify-center items-center">
         <span className="text-neutral-50 font-mono text-[2rem] md:text-[3rem] ">
         <span className="   text-amber-400"  >Connect </span>
         <span className=" ">With Us</span>
         </span>
         <span className="text-neutral-100  font-medium text-center font-mono">
         Dedicated to helping our trusted users anytime, anywhere.

         </span>
        </div>
        <div className="w-full max-sm:h-[55%]  h-[65%] bg-neutral-100 !pt-4 flex flex-col justify-end overflow-hidden  ">
         <Footer/>
        </div>
      </section>
    </>
  );
}

export default FooterMain;
