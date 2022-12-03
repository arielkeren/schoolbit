import styles from "../styles/AssignmentList.module.css";
import { AssignmentInterface } from "../types";
import Assignment from "./Assignment";

interface Props {
  assignments: AssignmentInterface[];
  classroomID: string;
}

const AssignmentList: React.FC<Props> = ({ assignments, classroomID }) => {
  return (
    <div className={styles.container}>
      {assignments.map((assignment) => (
        <Assignment
          assignment={assignment}
          classroomID={classroomID}
          key={assignment.id}
        />
      ))}
    </div>
  );
};

export default AssignmentList;
