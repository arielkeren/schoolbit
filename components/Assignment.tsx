import Link from "next/link";
import { AssignmentInterface } from "../types";

interface Props {
  assignment: AssignmentInterface;
  classroomID: string;
}

const Assignment: React.FC<Props> = ({ assignment, classroomID }) => {
  return (
    <Link
      href={`/classrooms/${classroomID}/assignments/${assignment.id}`}
      className="w-full"
    >
      <div className="py-4 rounded bg-gray-900 hover:scale-105 transition-transform">
        <p className="text-white font-bold text-lg text-center">
          {assignment.name}
        </p>
      </div>
    </Link>
  );
};

export default Assignment;
