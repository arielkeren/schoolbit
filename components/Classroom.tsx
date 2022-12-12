import Link from "next/link";
import { ClassroomInterface } from "../types";

interface Props {
  classroom: ClassroomInterface;
}

const Classroom: React.FC<Props> = ({ classroom }) => {
  return (
    <Link href={`/classrooms/${classroom.classroomID}`}>
      <div className="bg-gray-800 h-96 rounded-md cursor-pointer hover:scale-105 transition-transform duration-300">
        <div
          style={{ backgroundColor: classroom.color }}
          className="h-2/5 w-full rounded-t-md"
        ></div>
        <div className="p-3">
          <h2 className="text-white text-lg">{classroom.classroomName}</h2>
          <h3 className="text-gray-400">{classroom.ownerName}</h3>
          <p className="text-gray-500 mt-3">{classroom.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Classroom;
