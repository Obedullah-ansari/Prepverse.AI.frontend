

function PorfileCom() {
  return (
    <>
      <div className="relative w-full flex justify-center items-center max-sm:h-[50%] sm:h-[50%] md:h-[40%] bg-neutral-200  rounded-md ">
        <div className="absolute max-sm:w-[8rem] max-sm:h-[8rem] sm:h-[8rem] sm:w-[8rem]  max-sm:top-[50%] sm:top-[50%] md:top-[35%] lg:top-[40%] bg-neutral-50 shadow-md rounded-full ">
          {/* <img src="" alt="" /> */}
        </div>
      </div>

      <div className=" flex flex-col  w-full h-auto  rounded-md max-sm:!pt-14 sm:!pt-12 md:!pt-15 lg:!pt-18  gap-3 items-center">
        <p className="text-slate-500 text-[0.8rem] font-mono ">
          ubaidammar@gmail.com
        </p>
        <h1 className="text-3xl  font-medium">Obedullah Ansari</h1>
        <div className="flex justify-center items-center gap-3 w-full  font-mono text-[0.7rem] text-slate-500">
          <span>student</span>
          <span className="block w-[0.1rem] h-5 rounded-2xl bg-slate-500"></span>
          <span className="">biju patnaik university of technolgy</span>
        </div>
      </div>
    </>
  );
}

export default PorfileCom;
