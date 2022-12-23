import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";

interface Props {
  classroomID: string;
}

const CreateAssignmentButton: React.FC<Props> = ({ classroomID }) => {
  const router = useRouter();

  const redirectToAssignmentCreation = () =>
    router.push(`/classrooms/${classroomID}/create-assignment`);

  return (
    <button
      onClick={redirectToAssignmentCreation}
      className="absolute bottom-5 right-5 rounded-full p-2 bg-gray-900 hover:rotate-180 transition-transform"
    >
      <AiOutlinePlus className="text-white text-6xl" />
    </button>
  );
};

export default CreateAssignmentButton;
