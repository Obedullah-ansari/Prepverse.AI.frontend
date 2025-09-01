
import { Link } from "react-router-dom";

const SubmitedView:React.FC<{
  Heading?: string;
  Description?: string;
  urlto?: string;
}>=({
  Heading ,
  Description ,
  urlto
}) => {
  return (
    <div className=" bg-amber-100 bg-opacity-90 h-[100vh] w-full flex justify-center items-center z-50">
      <div className="w-[90%] max-w-md rounded-lg shadow-2xl bg-white border border-amber-600 !p-6 text-center !space-y-6">
        <h2 className="text-2xl font-bold font-mono text-amber-800">
          {Heading}
        </h2>

        <p className="text-neutral-500 font-sans text-base">
         {Description}
         
        </p>

        <Link
          to={urlto || "#"}
          className="inline-block !mt-4 !px-6 !py-2 bg-amber-700 text-white rounded-md text-sm font-semibold font-mono hover:bg-amber-800 transition-all duration-200"
        >
          Go to Dashboard →
        </Link>
      </div>
    </div>
  );
}

export default SubmitedView;
