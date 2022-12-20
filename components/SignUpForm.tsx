import { auth } from "../firebaseConfig";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const signUp = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser !== null)
        await updateProfile(auth.currentUser, { displayName: username });
      router.push("/");
    } catch {
      alert("Error signing up... Try again later");
    }
  };

  return (
    <>
      {auth.currentUser === null ? (
        <form className="flex justify-center">
          <div className="w-1/2 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-start w-4/5">
                <label htmlFor="username" className="text-2xl font-bold">
                  Username
                </label>
              </div>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={changeUsername}
                className="w-4/5 text-3xl p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
              />
            </div>
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
              value="SIGN UP"
              onClick={signUp}
              className="my-5 bg-gray-900 text-white py-3 px-12 rounded-lg font-bold text-3xl cursor-pointer hover:bg-gray-800 transition-colors"
            />
          </div>
        </form>
      ) : (
        <p className="text-3xl font-bold text-center">
          You&apos;re already logged in...
        </p>
      )}
    </>
  );
};

export default LoginForm;
