import { motion, useScroll, useTransform } from "framer-motion";
import { DollarSign, Headset, HomeIcon, ArrowBigRightIcon } from "lucide-react";

function Navbar() {
  const { scrollYProgress } = useScroll();

  // Width shrinks from both sides (centered)
  const width = useTransform(scrollYProgress, [0, 0.2], ["100%", "80%"]);

  // Background color changes from transparent to yellow
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["#fafafa", "#e5e5e5"]
  );

  return (
    <motion.nav
      style={{
        width,
        backgroundColor,
      }}
      className="fixed z-[100000]  top-[2rem] left-1/2 -translate-x-1/2 max-sm:h-[3.5rem] sm:h-[4rem] lg:h-[4.5rem] flex justify-center items-center rounded-full"
    >
      <motion.div className="flex justify-between items-center w-[85%] h-full">
        <h1 className="text-2xl md:inline hidden font-bold  text-transparent bg-clip-text   bg-gradient-to-br from-amber-200 to-amber-600  to ">
          Prepverse
        </h1>

        <ul className="flex max-sm:gap-5 gap-10 justify-center items-center">
          <li>
            <a href="#">
              <HomeIcon
                className="  text-amber-700 bg-gradient-to-br from-amber-200 to-amber-500 !p-[0.2rem] rounded-md   font-medium"
                size={26}
              />
            </a>
          </li>
          <li>
            <a href="#price">
              <DollarSign
                className="  text-amber-700 bg-gradient-to-br from-amber-200 to-amber-500 !p-[0.2rem] rounded-md   font-medium"
                size={26}
              />
            </a>
          </li>
          <li>
            <a href="#contact">
              <Headset
                className="  text-amber-700 bg-gradient-to-br from-amber-200 to-amber-500 !p-[0.2rem] rounded-md   font-medium"
                size={26}
              />
            </a>
          </li>
        </ul>

        <div>
          <button className="text-amber-800 font-semibold !px-1 !py-2 md:!px-3 md:!py-2 border md:text-md text-sm  bg-[#F3C623]  rounded-full">
            Get started
          </button>
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
