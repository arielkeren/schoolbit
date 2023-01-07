import Link from "next/link";
import { auth } from "../../firebaseConfig";
import { FiLogIn } from "react-icons/fi";
import { RiUser3Fill } from "react-icons/ri";
import Image from "next/image";

const Header: React.FC = () => (
  <div className="flex justify-between items-center p-7 bg-white shadow-xl">
    <Link
      href="/"
      className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 p-2 hover:text-cyan-400 transition-colors duration-500"
    >
      <Image
        src="/Logo.svg"
        alt="Coding Classroom"
        width="150"
        height="100"
        priority
        className="h-16 w-36"
      />
    </Link>
    {auth.currentUser?.displayName ? (
      <div className="flex items-center">
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

export default Header;
