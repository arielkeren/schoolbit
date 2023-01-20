import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { RiUser3Fill } from "react-icons/ri";
import { BsFillBarChartFill } from "react-icons/bs";
import Image from "next/image";
import useAppContext from "../../hooks/useAppContext";

const Header: React.FC = () => {
  const { user } = useAppContext();

  return (
    <div className="flex justify-between items-center p-7">
      <Link href="/" className="flex items-end font-medium text-3xl">
        <Image
          src="/Logo.svg"
          alt="Coding Classroom"
          width="55"
          height="50"
          priority
          className="mr-2"
        />
        SchoolBit
      </Link>

      {user ? (
        <div className="flex items-center gap-3">
          <Link
            href="/grades"
            className="bg-gray-900 p-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            <BsFillBarChartFill className="text-white text-4xl" />
          </Link>
          <Link
            href="/profile"
            className="bg-gray-900 p-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            <RiUser3Fill className="text-white text-4xl" />
          </Link>
        </div>
      ) : (
        <Link
          href="/login"
          className="bg-gray-900 p-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          <FiLogIn className="text-white text-4xl" />
        </Link>
      )}
    </div>
  );
};

export default Header;
