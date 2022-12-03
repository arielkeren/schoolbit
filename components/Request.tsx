import styles from "../styles/Request.module.css";

interface Props {
  classroomName: string;
  ownerName: string;
}

const Request: React.FC<Props> = ({ classroomName, ownerName }) => {
  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <p className={styles.ownerName}>{ownerName}</p>
        <p className={styles.classroomName}>{classroomName}</p>
      </div>
      <button className={styles.joinButton}>Join</button>
    </div>
  );
};

export default Request;
