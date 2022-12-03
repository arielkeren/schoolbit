import { auth, signInWithGoogle } from "../firebaseConfig";
import Title from "./Title";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import styles from "../styles/LoginForm.module.css";
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
        <div className={styles.container}>
          <form className={styles.form}>
            <div className={styles.fieldContainer}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={changeEmail}
                className={styles.input}
              />
            </div>
            <div className={styles.fieldContainer}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={changePassword}
                className={styles.input}
              />
            </div>
            <input
              type="submit"
              value="Log in"
              onClick={emailAndPasswordLogin}
              className={styles.logInButton}
            />
            <p className={styles.signUpText}>
              Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
            </p>
            <Title title="OR" />
            <button
              onClick={googleLogin}
              className={styles.continueWithGoogleButton}
            >
              <FcGoogle className={styles.googleIcon} /> Continue with Google
            </button>
          </form>
        </div>
      ) : (
        <p className={styles.loggedInText}>You&apos;re already logged in...</p>
      )}
    </>
  );
};

export default LoginForm;
