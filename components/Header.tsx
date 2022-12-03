import { signOut } from "firebase/auth";
import Link from "next/link";
import { auth } from "../firebaseConfig";
import styles from "../styles/Header.module.css";
import { FiLogIn } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

const Header: React.FC = () => {
  const username = auth.currentUser?.displayName ?? null;

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch {
      alert("Error logging out... Try again later");
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.titleLink}>
        Coding Classroom
      </Link>
      {username === null ? (
        <Link href="/login" className={styles.loginLink}>
          <FiLogIn className={styles.loginIcon} />
        </Link>
      ) : (
        <div className={styles.rightContainer}>
          <Link href="/profile" className={styles.usernameLink}>
            {username}
          </Link>
          <button onClick={logOut} className={styles.settingsButton}>
            <IoSettingsOutline className={styles.settingsIcon} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
