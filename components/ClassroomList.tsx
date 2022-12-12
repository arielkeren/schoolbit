import { ClassroomInterface } from "../types";
import AddClassroom from "./AddClassroom";
import Classroom from "./Classroom";

interface Props {
  classrooms: ClassroomInterface[];
  addClassroomLink: string;
}

const ClassroomList: React.FC<Props> = ({ classrooms, addClassroomLink }) => {
  return (
    <div className="m-10 grid grid-cols-4 gap-5">
      {classrooms.map((classroom) => (
        <Classroom classroom={classroom} key={classroom.classroomID} />
      ))}

      <AddClassroom link={addClassroomLink} />
    </div>
  );
};

export default ClassroomList;
