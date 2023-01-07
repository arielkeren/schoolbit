import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const LogOutButton: React.FC = () => {
  const router = useRouter();

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch {
      alert("Failed to log out");
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex justify-center m-14">
      <button
        onClick={logOut}
        className="bg-gray-900 text-white py-2 px-5 rounded-lg font-bold text-2xl uppercase hover:bg-gray-800 transition-colors"
      >
        Log out
      </button>
    </div>
  );
};

export default LogOutButton;
