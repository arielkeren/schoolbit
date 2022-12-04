import { AiOutlinePlus } from "react-icons/ai";
import styles from "../styles/OpenMenuButton.module.css";

interface Props {
  openMenu: () => void;
}

const OpenMenuButton: React.FC<Props> = ({ openMenu }) => {
  return (
    <button onClick={openMenu} className={styles.button}>
      <AiOutlinePlus className={styles.icon} />
    </button>
  );
};

export default OpenMenuButton;
