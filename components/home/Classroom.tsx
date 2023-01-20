import Link from "next/link";
import { ClassroomInterface } from "../../types/types";

interface Props {
  classroom: ClassroomInterface;
}

const Classroom: React.FC<Props> = ({ classroom }) => (
  <Link
    href={`/classrooms/${classroom.classroomID}`}
    className="h-56 flex flex-col cursor-pointer hover:scale-105 transition-transform"
  >
    <div className="h-5/6 bg-slate-800 rounded-t-md">
      <div className="p-3">
        <h2 className="text-white text-lg">{classroom.classroomName}</h2>
        <h3 className="text-gray-400">{classroom.ownerName}</h3>
        <p className="text-gray-500 mt-3">{classroom.description}</p>
      </div>
    </div>
    <div
      style={{ backgroundColor: classroom.color }}
      className="h-1/6 w-full rounded-b-md"
    ></div>
  </Link>
);

export default Classroom;
