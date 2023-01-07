import Link from "next/link";
import { AssignmentInterface } from "../../types";

interface Props {
  assignment: AssignmentInterface;
  classroomID: string;
}

const Assignment: React.FC<Props> = ({ assignment, classroomID }) => (
  <Link href={`/classrooms/${classroomID}/assignments/${assignment.id}`}>
    <div className="flex flex-col items-center gap-3 h-36 p-1 rounded bg-gray-900 hover:scale-105 transition-transform">
      <h3 className="text-white font-bold text-lg">{assignment.name}</h3>
      <div className="flex flex-col items-center">
        <h4 className="text-white text-2xl">Until</h4>
        <p className="text-white text-2xl">{assignment.until}</p>
      </div>
    </div>
  </Link>
);

export default Assignment;
