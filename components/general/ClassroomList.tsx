import { IClassroom } from "../../types/types";
import Classroom from "./Classroom";

interface Props {
  classrooms: IClassroom[];
}

const ClassroomList: React.FC<Props> = ({ classrooms }) => {
  if (classrooms.length === 0)
    return (
      <>
        <p className="text-3xl font-medium">
          Looks like there are no classrooms here
        </p>
        <p className="text-xl">Click the + icon on the left to add some</p>
      </>
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
