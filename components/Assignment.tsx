import Link from "next/link";
import styles from "../styles/Assignment.module.css";
import { AssignmentInterface } from "../types";

interface Props {
  assignment: AssignmentInterface;
  classroomID: string;
}

const Assignment: React.FC<Props> = ({ assignment, classroomID }) => {
  return (
    <Link
      href={`/classrooms/${classroomID}/assignments/${assignment.id}`}
      className={styles.link}
    >
      <div className={styles.container}>
        <p className={styles.name}>{assignment.name}</p>
      </div>
    </Link>
  );
};

export default Assignment;
