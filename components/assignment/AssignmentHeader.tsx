import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { TbChecklist } from "react-icons/tb";
import Title from "../general/Title";
import { useRouter } from "next/router";
import { AssignmentInterface } from "../../types";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";

interface Props {
  assignmentName: string;
  assignments: AssignmentInterface[];
}

const AssignmentHeader: React.FC<Props> = ({ assignmentName, assignments }) => {
  const router = useRouter();

  const { classroomID, assignmentID } = router.query;

  const removeAssignment = async () => {
    const newAssignments = assignments.filter(
      (assignment) => assignment.id !== assignmentID
    );

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomID}`
    );

    try {
      await updateDoc(classroomDocumentReference, {
        assignments: newAssignments,
      });

      router.push(`/classrooms/${classroomID}`);
    } catch {
      alert("Error removing the assignment");
    }
  };

  return (
    <div className="flex flex-col items-center w-4/5 mx-auto">
      <div className="flex justify-between items-center w-full">
        <Title title={assignmentName} />

        <div className="flex">
          <button className="rounded-full w-12 h-12 flex justify-center items-center hover:bg-gray-100">
            <TbChecklist className="text-gray-500 text-3xl" />
          </button>
          <button className="rounded-full w-12 h-12 flex justify-center items-center hover:bg-gray-100">
            <MdEdit className="text-gray-500 text-3xl" />
          </button>
          <button className="rounded-full w-12 h-12 flex justify-center items-center hover:bg-gray-100">
            <FaTrashAlt
              onClick={removeAssignment}
              className="text-gray-500 text-2xl"
            />
          </button>
        </div>
      </div>

      <hr className="w-full border-2 border-gray-100" />
    </div>
  );
};

export default AssignmentHeader;
