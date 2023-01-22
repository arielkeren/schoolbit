import { auth, signInWithGoogle } from "../../firebaseConfig";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import useAppContext from "../../hooks/useAppContext";

const LoginForm: React.FC = () => {
  const { user } = useAppContext();

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
      alert("Failed to log in");
      return;
    }

    router.push("/");
  };

  const googleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await signInWithGoogle();
    } catch {
      alert("Failed to log in with Google");
      return;
    }

    router.push("/");
  };

  return (
    <>
      {!user ? (
        <form className="flex flex-col items-center">
          <div className="w-1/2 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-start w-4/5">
                <label htmlFor="email" className="text-2xl font-bold">
                  Email
                </label>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={changeEmail}
                className="w-4/5 text-3xl p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-start w-4/5">
                <label htmlFor="password" className="text-2xl font-bold">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={changePassword}
                className="w-4/5 text-3xl p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
              />
            </div>
            <input
              type="submit"
              value="LOG IN"
              onClick={emailAndPasswordLogin}
              className="my-5 bg-gray-900 text-white py-3 px-12 rounded-lg font-bold text-3xl cursor-pointer hover:bg-gray-800 transition-colors"
            />
          </div>
          <p className="font-bold text-2xl">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-blue-600 font-extrabold uppercase hover:underline"
            >
              Sign up
            </Link>
          </p>
          <button
            onClick={googleLogin}
            className="mt-10 flex items-center text-2xl font-bold text-white shadow-xl py-5 px-12 rounded-lg bg-gray-900 uppercase hover:bg-gray-800 transition-colors"
          >
            <FcGoogle className="text-5xl mr-2" /> Continue with Google
          </button>
        </form>
      ) : (
        <p className="text-center text-3xl">Already logged in</p>
      )}
    </>
  );
};

export default LoginForm;
