import { UserCircle, MicOff, MicIcon, VideoOffIcon } from "lucide-react";
const Boticon: React.FC<{ botname: string; isrecording: boolean }> = ({
  botname,
  isrecording,
}) => {
  return (
    <>
      <div
        className={`relative w-[20rem] h-full bg-neutral-800 rounded-md flex flex-col justify-center items-center
          bg-[radial-gradient(circle,#f4d03f,#f9e79f,#fcf3cf)]
          ${
          isrecording ? "border border-green-500" : "border-none"
        } `}
      >
        <UserCircle width={100} height={100} color="#5f6a6a" />
        <div className="absolute flex gap-3 bottom-2 left-3">
          <span className="text-neutral-900 font-semibold text-[0.8rem]   ">
            {botname.toUpperCase()}
          </span>
          {isrecording ? (
            <span>
              <MicIcon
                width={20}
                height={20}
                className="ml-2 text-gray-800"
              />
            </span>
          ) : (
            <span>
              <MicOff width={20} height={20}  className="ml-2 text-gray-800" />
            </span>
          )}
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

export default Boticon;
