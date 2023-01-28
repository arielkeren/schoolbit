import { auth } from "../../firebaseConfig";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";

interface Props {
  closeSignUpModal: () => void;
  openSignInModal: () => void;
}

const SignUpForm: React.FC<Props> = ({ closeSignUpModal, openSignInModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

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
      if (auth.currentUser)
        await updateProfile(auth.currentUser, { displayName: username });
    } catch {
      alert("Failed to sign up");
      return;
    }

    router.push("/my-classrooms");
  };

  const switchModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    closeSignUpModal();
    openSignInModal();
  };

  return (
    <form className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-start w-full">
            <label htmlFor="username" className="text-xl font-semibold">
              Username
            </label>
          </div>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={changeUsername}
            className="w-full p-3 rounded outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-start w-full">
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
            className="w-full p-3 rounded outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-start w-full">
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
            className="w-full p-3 rounded outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
          />
        </div>
        <input
          type="submit"
          value="Sign Up"
          onClick={signUp}
          className="uppercase my-5 bg-gray-900 text-white py-3 px-12 rounded-lg font-bold text-3xl cursor-pointer hover:bg-gray-800 transition-colors"
        />
      </div>
      <p className="font-bold text-xl px-5 text-center">
        Already have an account?{" "}
        <button
          onClick={switchModal}
          className="text-blue-600 font-extrabold uppercase hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
};

export default SignUpForm;
