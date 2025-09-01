import QuizForm from "./QuizzForm";
import { BrainCircuit } from "lucide-react";
import Loading from "../../tools/Loading.tsx.tsx";
import  { useState } from "react";
function QuizzFormPage() {

  const [quizzLoader, setQuizzLoader] = useState<boolean>(false);
  return (
    <>
      <div className="relative  min-h-screen  bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/10 !py-8 !px-4">
        {quizzLoader && <Loading />}
        <div className="max-w-4xl   !mx-auto">
          <div className="text-center !mb-8">
            <div className="inline-flex items-center gap-3 !mb-4">
              <div className="!p-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30">
                <BrainCircuit className="w-8 h-8 text-yellow-600" />
              </div>
              <h1 className="text-5xl font-mono font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">
                Custom Quiz Builder
              </h1>
            </div>

            <p className="text-lg text-gray-600 max-w-2xl !mt-3 font-mono !mx-auto">
              Create your personalized quiz & Learning Path
            </p>
          </div>

          <QuizForm
           loaderTriggrer={()=> setQuizzLoader((prev) => !prev)}  
          />
        </div>
      </div>
    </>
  );
}

export default QuizzFormPage;
