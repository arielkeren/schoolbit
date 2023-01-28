import { auth, signInWithGoogle } from "../../firebaseConfig";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

interface Props {
  closeSignInModal: () => void;
  openSignUpModal: () => void;
}

const SignInForm: React.FC<Props> = ({ closeSignInModal, openSignUpModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const emailAndPasswordLogin = async (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      alert("Failed to sign in");
      return;
    }

    router.push("/my-classrooms");
  };

  const googleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await signInWithGoogle();
    } catch {
      alert("Failed to sign in with Google");
      return;
    }

    router.push("/my-classrooms");
  };

  const switchModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    closeSignInModal();
    openSignUpModal();
  };

  return (
    <form className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center w-11/12">
          <div className="flex justify-start w-11/12">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
          </div>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={changeEmail}
            className="w-11/12 p-3 rounded outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
          />
        </div>
        <div className="flex flex-col items-center w-11/12">
          <div className="flex justify-start w-11/12">
            <label htmlFor="password" className="text-xl font-semibold">
              Password
            </label>
          </div>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={changePassword}
            className="w-11/12 p-3 rounded outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
          />
        </div>
        <input
          type="submit"
          value="Sign In"
          onClick={emailAndPasswordLogin}
          className="uppercase my-5 bg-gray-900 text-white py-3 px-12 rounded-lg font-bold text-3xl cursor-pointer hover:bg-gray-800 transition-colors"
        />
      </div>
      <p className="font-bold text-xl px-5 text-center">
        Don&apos;t have an account?{" "}
        <button
          onClick={switchModal}
          className="text-blue-600 font-extrabold uppercase hover:underline"
        >
          Sign up
        </button>
      </p>
      <button
        onClick={googleLogin}
        className="mt-10 flex items-center font-bold text-white shadow-xl rounded p-2 bg-gray-900 uppercase hover:bg-gray-800 transition-colors"
      >
        <FcGoogle className="text-4xl mr-1" /> Continue with Google
      </button>
    </form>
  );
};

export default SignInForm;
