import mainimage from "../../assets/mainnew.png";

function Dashboard() {
  return (
    <>
      <div className="w-full h-auto flex justify-center items-center">
      <div className="h-[33rem] max-sm:h-[20rem] lg:w-[75%] md:w-[85%] sm:w-[95%] max-sm:w-[97%] !p-2 shadow-lg rounded-lg bg-[#F3C623] shadow-amber-200   ">
        <div className="w-full h-full bg-neutral-200 object-cover rounded-lg overflow-hidden">
          <img src={mainimage} className="w-full h-full object-cover" alt="" />
        </div>
      </div>
      </div>
    </>
  );
}

export default Dashboard;
