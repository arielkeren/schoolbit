import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const SignOutButton: React.FC = () => {
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch {
      alert("Failed to sign out");
    }
  };

  return (
    <div className="flex justify-center m-2">
      <button
        onClick={logOut}
        className="bg-gray-900 text-white py-2 px-5 rounded font-bold text-2xl uppercase hover:bg-gray-800 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutButton;
