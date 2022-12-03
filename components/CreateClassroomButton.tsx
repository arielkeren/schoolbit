import { AiOutlinePlus } from "react-icons/ai";
import styles from "../styles/CreateClassroomButton.module.css";

interface Props {
  openMenu: () => void;
}

const CreateClassroomButton: React.FC<Props> = ({ openMenu }) => {
  return (
    <button onClick={openMenu} className={styles.button}>
      <AiOutlinePlus className={styles.icon} />
    </button>
  );
};

export default CreateClassroomButton;
