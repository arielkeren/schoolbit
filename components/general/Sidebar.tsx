import Image from "next/image";
import Logo from "../../public/Logo.svg";
import { BsFillBarChartFill } from "react-icons/bs";
import { RiUserFill } from "react-icons/ri";
import { MdSchool } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import Link from "next/link";
import { useState } from "react";

const Sidebar: React.FC = () => {
  const [isAddClassroomMenuOpen, setIsAddClassroomMenuOpen] = useState(false);

  const toggleAddClassroomMenu = () =>
    setIsAddClassroomMenuOpen((previousMenuState) => !previousMenuState);

  return (
    <div className="fixed top-0 left-0 w-[100px] py-5 flex flex-col items-center bg-gray-900 h-[100dvh]">
      <Link href="/my-classrooms">
        <Image src={Logo} alt="" height="60" priority />
      </Link>

      <hr className="border-2 w-2/3 border-gray-800 mt-4" />

      <div className="flex flex-col items-center gap-5 mt-3">
        <Link href="/my-classrooms">
          <AiFillHome className="text-5xl text-gray-300" />
        </Link>

        <Link href="/attended-classrooms">
          <MdSchool className="text-5xl text-gray-300" />
        </Link>

        <button onClick={toggleAddClassroomMenu}>
          <HiPlus
            className={`text-5xl text-gray-300 transition-transform ${
              isAddClassroomMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isAddClassroomMenuOpen && (
          <div className="flex flex-col items-center gap-1 bg-gray-700 p-1 rounded">
            <Link
              href="/create-classroom"
              className="uppercase text-gray-300 font-semibold text-lg px-1 rounded transition-colors hover:bg-gray-800"
            >
              Create
            </Link>

            <hr className="border-2 w-full border-gray-900" />

            <Link
              href="/join-classroom"
              className="w-full text-center uppercase text-gray-300 font-semibold text-lg px-1 rounded transition-colors hover:bg-gray-800"
            >
              Join
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 mt-auto">
        <Link href="/grades">
          <BsFillBarChartFill className="text-5xl text-gray-300" />
        </Link>

        <Link href="/profile">
          <RiUserFill className="text-5xl text-gray-300" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
