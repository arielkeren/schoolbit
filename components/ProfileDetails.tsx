import { User } from "firebase/auth";
import styles from "../styles/ProfileDetails.module.css";

interface Props {
  user: User | null;
}

const ProfileDetails: React.FC<Props> = ({ user }) => {
  return (
    <>
      {user === null ? (
        <p className={styles.noUserText}>Log in to see your profile...</p>
      ) : (
        <div className={styles.outerContainer}>
          <div className={styles.innerContainer}>
            <p className={styles.fieldText}>
              <span className={styles.fieldName}>Username</span>{" "}
              {user.displayName}
            </p>
            <hr className={styles.fieldSeparator} />
            <p className={styles.fieldText}>
              <span className={styles.fieldName}>Email</span> {user.email}
            </p>
            <hr className={styles.fieldSeparator} />
            <p className={styles.fieldText}>
              <span className={styles.fieldName}>ID</span> {user.uid}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDetails;
