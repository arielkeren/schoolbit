import Link from "next/link";
import { IAssignment } from "../../types/types";

interface Props {
  assignment: IAssignment;
  classroomID: string;
  isOwner: boolean;
}

const Assignment: React.FC<Props> = ({ assignment, classroomID, isOwner }) => (
  <Link
    href={`/classrooms/${classroomID}/assignments/${assignment.id}`}
    className="flex justify-center"
  >
    <div className="bg-gray-900 p-3 rounded-sm w-full lg:w-3/4 2xl:w-1/2">
      <h3 className="text-gray-200 text-lg hover:underline">
        {assignment.name}
      </h3>
      <p className="text-slate-500">until {assignment.until}</p>
      {isOwner && (
        <p className="text-gray-400">{assignment.answers.length} submitted</p>
      )}
    </div>
  </Link>
);

export default Assignment;
