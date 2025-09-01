
import { Timer, ArrowRightCircle, ArrowLeftCircle, RotateCcw, AlertTriangle } from "lucide-react";

const QuizInstructions = () => {
  return (
    <div className="h-full w-full absolute top-0 left-0 flex flex-col md:flex-row items-center justify-center bg-yellow-50 !px-6 !py-10 gap-10 z-[100]">
      {/* Left: Instructions */}
      <div className="w-full h-auto md:w-1/2 bg-white !p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-yellow-600 !mb-6">Quiz Instructions</h2>
        <ul className="!space-y-5 text-gray-700 text-base">
          <li className="flex items-start gap-3">
            <Timer className="text-yellow-600 mt-1" />
            <span>Each question has a <strong>1-minute timer</strong>.</span>
          </li>
          <li className="flex items-start gap-3">
            <ArrowRightCircle className="text-yellow-600 mt-1" />
            <span>Click <strong>Next</strong> to move to the next question.</span>
          </li>
          <li className="flex items-start gap-3">
            <ArrowLeftCircle className="text-yellow-600 mt-1" />
            <span>Click <strong>Back</strong> to revisit a question <em>only if time hasn't expired</em>.</span>
          </li>
          <li className="flex items-start gap-3">
            <RotateCcw className="text-yellow-600 mt-1" />
            <span>Click <strong>Clear</strong> to reset your selected option.</span>
          </li>
          <li className="flex items-start gap-3">
            <Timer className="text-yellow-600 mt-1" />
            <span>After <strong>1 minute</strong>, the next question will auto-load.</span>
          </li>
          <li className="flex items-start gap-3">
            <AlertTriangle className="text-yellow-600 mt-1" />
            <span><strong>Once time is up, you cannot return</strong> to the previous question.</span>
          </li>
        </ul>
      </div>

      {/* Right: Images or Placeholder */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        {/* Replace this with real images or animated illustrations */}
        <img
          src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          alt="Quiz Preview"
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default QuizInstructions;
