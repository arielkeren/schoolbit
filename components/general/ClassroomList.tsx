import { IClassroom } from "../../types/types";
import Classroom from "./Classroom";
import Information from "./Information";

interface Props {
  classrooms: IClassroom[];
}

const ClassroomList: React.FC<Props> = ({ classrooms }) => {
  if (classrooms.length === 0)
    return (
      <Information
        primary="Looks like there are no classrooms here"
        secondary="Click the + icon on the left to add some"
      />
    );

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {classrooms.map((classroom) => (
        <Classroom classroom={classroom} key={classroom.classroomID} />
      ))}
    </div>
  );
};

export default ClassroomList;
