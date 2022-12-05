import styles from "../styles/ClassroomCodeText.module.css";

interface Props {
  code: string;
}

const ClassroomCodeText: React.FC<Props> = ({ code }) => {
  return <p className={styles.text}>Code: {code}</p>;
};

export default ClassroomCodeText;
