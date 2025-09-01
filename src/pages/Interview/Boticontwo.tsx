import { UserCircle, MicOff, VideoOffIcon } from "lucide-react";
const Boticontwo: React.FC<{ botname: string }> = ({ botname }) => {
  return (
    <>
      <div className={`relative w-[20rem] h-full bg-neutral-800 rounded-md flex flex-col justify-center items-center 
                  bg-[radial-gradient(circle,#8e44ad,#bb8fce,#e8daef)]
        ` }>
        <UserCircle width={100} height={100} className="text-gray-700" />
        <div className="absolute flex gap-3 bottom-2 left-3">
        <span className="text-neutral-900 font-semibold text-[0.8rem]   ">
          {botname.toUpperCase()}
        </span>
        <span>
          <MicOff width={20} height={20}  className="ml-2 text-gray-800" />
        </span>
        <span>
          <VideoOffIcon
            width={20}
            height={20}
            className="ml-2 text-gray-800"
          />
        </span>
        </div>
      </div>
    </>
  );
};

export default Boticontwo;
