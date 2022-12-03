import { auth } from "../firebaseConfig";
import { useState } from "react";
import styles from "../styles/SignUpForm.module.css";
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
        <div className={styles.container}>
          <form className={styles.form}>
            <div className={styles.fieldContainer}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={changeUsername}
                className={styles.input}
              />
            </div>
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
              value="Sign up"
              onClick={signUp}
              className={styles.signUpButton}
            />
          </form>
        </div>
      ) : (
        <p className={styles.loggedInText}>You&apos;re already logged in...</p>
      )}
    </>
  );
};

export default LoginForm;
