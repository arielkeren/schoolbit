import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";

const CreateAssignmentButton: React.FC = () => {
  const router = useRouter();
  const { classroomID } = router.query as { classroomID: string };

  return (
    <Link
      href={`/classrooms/${classroomID}/create-assignment`}
      className="absolute bottom-5 right-5 rounded-full p-2 bg-gray-900 hover:rotate-180 transition-transform"
    >
      <AiOutlinePlus className="text-white text-6xl" />
    </Link>
  );
};

export default CreateAssignmentButton;
