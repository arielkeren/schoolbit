import Link from "next/link";
import { auth } from "../../firebaseConfig";
import { FiLogIn } from "react-icons/fi";
import { RiUser3Fill } from "react-icons/ri";
import Image from "next/image";
import Title from "./Title";

const Header: React.FC = () => (
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
