import Link from "next/link";
import styles from "../styles/Classroom.module.css";

interface Props {
  classroomName: string;
  classroomID: string;
}

const Classroom: React.FC<Props> = ({ classroomName, classroomID }) => {
  return (
    <Link href={`/classrooms/${classroomID}`} className={styles.link}>
      <div className={styles.container}>
        <p className={styles.name}>{classroomName}</p>
      </div>
    </Link>
  );
};

export default Classroom;
