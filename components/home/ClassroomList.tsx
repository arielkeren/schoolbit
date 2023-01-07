import { ClassroomInterface } from "../../types";
import AddClassroom from "./AddClassroom";
import Classroom from "./Classroom";

interface Props {
  classrooms: ClassroomInterface[];
  addClassroomLink: string;
}

const ClassroomList: React.FC<Props> = ({ classrooms, addClassroomLink }) => (
  <div className="m-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
    {classrooms.map((classroom) => (
      <Classroom classroom={classroom} key={classroom.classroomID} />
    ))}

    <AddClassroom link={addClassroomLink} />
  </div>
);

export default ClassroomList;
