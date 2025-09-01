import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import Aiimage from "../../assets/interview.jpg";

const ResumeUpload: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfUploaded, setPdfUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setPdfUploaded(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch(
      `${import.meta.env.VITE_APP_URL}api/v1/auth/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    await response.json();
    if (response.ok) {
      const userid = localStorage.getItem("userid");
      navigate(`/dashboard/resumeupload/interview/${userid}`);
    }
  };

  return (
    <section className="w-full h-screen flex">
      {/* LEFT SIDE (70%) */}
      <div className="w-[70%] h-full relative">
        <img
          src={Aiimage}
          alt="AI Interview"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-neutral-900/20"></div>
      </div>

      {/* RIGHT SIDE (30%) */}
      <div className="w-[30%] h-full flex flex-col bg-neutral-900 items-center !px-8">
        <div className=" inset-0  flex flex-col justify-center items-start !pt-8 ">
          <h1 className="text-white font-bold text-4xl leading-tight mb-4">
            Your AI Powered Interview <br /> Journey Starts Here
          </h1>
          <p className="text-amber-300 text-md font-semibold max-w-[80%] font-mono !pt-2">
            Upload your resume to get intelligent, real time feedback and
            prepare for interviews with smart AI support.
          </p>
        </div>
        <div className="flex flex-col justify-center w-full h-full items-center gap-6  text-white">

          <label className="text-center cursor-pointer text-neutral-800 font-mono font-medium hover:underline">
            {pdfUploaded ? (
              <span className="flex items-center gap-2 text-neutral-200">
                <FileText className="w-5 h-5 text-amber-400 " />
                {selectedFile?.name}
              </span>
            ) : (
              <span className="text-white font-mono hover:underline">Upload your resume </span>
            )}
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>


          {pdfUploaded && (
            <button
              onClick={handleUpload}
              className="bg-amber-500 text-white font-semibold rounded !px-6 !py-2 hover:bg-amber-600 transition-all duration-300"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResumeUpload;
