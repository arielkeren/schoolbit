import styles from "../styles/OpenParticipantsScreenButton.module.css";
import { HiUserGroup } from "react-icons/hi";

interface Props {
  openParticipantsScreen: () => void;
}

const OpenParticipantsScreenButton: React.FC<Props> = ({
  openParticipantsScreen,
}) => {
  return (
    <button onClick={openParticipantsScreen} className={styles.button}>
      <HiUserGroup className={styles.icon} />
    </button>
  );
};

export default OpenParticipantsScreenButton;
