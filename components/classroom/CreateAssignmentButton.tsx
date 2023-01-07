import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";

interface Props {
  classroomID: string;
}

const CreateAssignmentButton: React.FC<Props> = ({ classroomID }) => (
  <Link
    href={`/classrooms/${classroomID}/create-assignment`}
    className="absolute bottom-5 right-5 rounded-full p-2 bg-gray-900 hover:rotate-180 transition-transform"
  >
    <AiOutlinePlus className="text-white text-6xl" />
  </Link>
);

export default CreateAssignmentButton;
