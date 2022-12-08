import styles from "../styles/OpenParticipantsScreenButton.module.css";
import { HiUserGroup } from "react-icons/hi";
import { FiMail } from "react-icons/fi";

interface Props {
  openScreen: () => void;
  icon: string;
}

const OpenScreenButton: React.FC<Props> = ({ openScreen, icon }) => {
  return (
    <button
      onClick={openScreen}
      className={styles.button}
      style={{ bottom: icon === "requests" ? "105px" : "20px" }}
    >
      {icon === "requests" ? (
        <FiMail className={styles.icon} />
      ) : (
        <HiUserGroup className={styles.icon} />
      )}
    </button>
  );
};

export default OpenScreenButton;
