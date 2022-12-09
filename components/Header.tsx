import Link from "next/link";
import { auth } from "../firebaseConfig";
import { FiLogIn } from "react-icons/fi";
import { RiUser3Fill } from "react-icons/ri";

const Header: React.FC = () => {
  const username = auth.currentUser?.displayName ?? null;

  return (
    <div className="flex justify-between items-center p-7 bg-gray-900 shadow-xl">
      <Link
        href="/"
        className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 p-2 hover:text-cyan-400 transition-colors duration-500"
      >
        Coding Classroom
      </Link>
      {username === null ? (
        <Link
          href="/login"
          className="bg-gradient-to-r from-purple-400 to-pink-600 p-3 rounded-full hover:from-purple-300 hover:to-pink-500"
        >
          <FiLogIn className="text-white text-4xl" />
        </Link>
      ) : (
        <div className="flex items-center">
          <Link
            href="/profile"
            className="bg-gradient-to-r from-purple-400 to-pink-600 p-3 rounded-full hover:from-purple-300 hover:to-pink-500"
          >
            <RiUser3Fill className="text-white text-4xl" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
