import ClassroomInterface from "../types";
import Classroom from "./Classroom";
import styles from "../styles/ClassroomList.module.css";

interface Props {
  classrooms: ClassroomInterface[];
}

const ClassroomList: React.FC<Props> = ({ classrooms }) => {
  return (
    <div className={styles.container}>
      {classrooms.map((classroom) => (
        <Classroom
          classroomName={classroom.classroomName}
          classroomID={classroom.classroomID}
          key={classroom.classroomID}
        />
      ))}
    </div>
  );
};

export default ClassroomList;
