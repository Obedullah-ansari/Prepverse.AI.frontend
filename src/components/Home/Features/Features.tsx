import dsa from "../../../assets/dsadas.png";
import quiz from "../../../assets/quizmain.png";
import interview from "../../../assets/interview.png";

function Features() {
  return (
    <>
      <div className="flex z-[100] flex-col justify-center items-center md:h-[20vh] sm:h-auto max-sm:h-auto   max-sm:!p-3">
        <h1 className="lg:text-[3rem] md:text-4xl sm:text-3xl max-sm:text-xl font-medium text-neutral-900">
        What Makes PrevVerse Powerful
        </h1>
        <p className="mt-4 text-md text-center text-neutral-700 ">
        PrevVerse helps you code, quiz, and interview your way to placement success
        </p>
      </div>

      <div className="w-full z-[100]  md:h-[80vh] max-sm:h-auto sm:h-auto pt-[8rem] flex justify-center items-center">
        <div className="relative max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:justify-center max-sm:items-center  sm:flex sm:flex-col sm:gap-4 sm:justify-center sm:items-center md:block lg:w-[70%] md:w-[80%] sm:w-[96%] max-sm:w-[97%] sm:h-auto md:h-[30rem]   rounded-2xl  md:bg-[url('/src/assets/interview.png')] bg-cover    ">
          <div
            className={`max-sm:w-[85%]  sm:w-[85%] sm:h-[15rem] max-sm:h-[15rem] md:absolute  md:left-[-10%] md:top-[-10%]  md:w-[30rem] md:h-[15rem] max-sm:bg-neutral-300 md:bg-amber-300 rounded-lg   !p-1`}
          >
            <img
              src={dsa}
              alt=""
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div
            className={`max-sm:w-[85%]  sm:w-[85%] sm:h-[15rem]  max-sm:h-[15rem] md:hidden !p-1 bg-neutral-300 rounded-2xl `}
          >
            <img
              src={interview}
              alt=""
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          <div
            className={`max-sm:w-[85%]  z-[100] sm:w-[85%] sm:h-[15rem] max-sm:h-[15rem] md:absolute md:right-[-10%]  md:bottom-[-7%]  md:w-[30rem] md:h-[15rem] max-sm:bg-neutral-300 md:bg-amber-300 rounded-lg    !p-1`}
          >
            <img
              src={quiz}
              alt=""
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
