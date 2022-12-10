import { auth, signInWithGoogle } from "../firebaseConfig";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      router.push("/");
    } catch {
      alert("Error logging in with email and password... Try again later");
    }
  };

  const googleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await signInWithGoogle();
      router.push("/");
    } catch {
      alert("Error logging in with Google... Try again later");
    }
  };

  return (
    <>
      {auth.currentUser === null ? (
        <form className="flex flex-col items-center">
          <div className="w-1/2 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-start w-4/5">
                <label
                  htmlFor="email"
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                >
                  Email
                </label>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={changeEmail}
                className="w-4/5 text-3xl p-3 rounded-md outline-none focus:bg-gray-100"
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-start w-4/5">
                <label
                  htmlFor="password"
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={changePassword}
                className="w-4/5 text-3xl p-3 rounded-md outline-none focus:bg-gray-100"
              />
            </div>
            <input
              type="submit"
              value="Log in"
              onClick={emailAndPasswordLogin}
              className="my-5 bg-blue-600 text-white py-3 px-12 rounded-lg font-bold text-3xl cursor-pointer hover:bg-blue-700 transition-colors"
            />
          </div>
          <p className="text-white font-bold text-xl">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
          <button
            onClick={googleLogin}
            className="mt-10 flex items-center text-2xl font-bold text-white shadow-xl py-5 px-12 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors duration-300"
          >
            <FcGoogle className="text-5xl mr-2" /> Continue with Google
          </button>
        </form>
      ) : (
        <p className="text-center text-white text-3xl font-bold">
          You&apos;re already logged in...
        </p>
      )}
    </>
  );
};

export default LoginForm;
