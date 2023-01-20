import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { TbChecklist } from "react-icons/tb";
import Title from "../general/Title";
import { useRouter } from "next/router";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import Link from "next/link";
import useAppContext from "../../hooks/useAppContext";

const AssignmentHeader: React.FC = () => {
  const { user, classroom, changeClassroom } = useAppContext();

  const router = useRouter();
  const { classroomID, assignmentID } = router.query;

  const isOwner = user?.uid === classroom?.ownerID;
  const assignments = classroom?.assignments;
  const assignment = assignments?.find(
    (currentAssignmnet) => currentAssignmnet.id === assignmentID
  );

  const removeAssignment = async () => {
    if (!assignments) return;

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
    } catch {
      alert("Failed to remove the assignment");
      return;
    }

    changeClassroom({ ...classroom, assignments: newAssignments });

    router.push(`/classrooms/${classroomID}`);
  };

  return (
    <div className="flex flex-col items-center w-4/5 mx-auto">
      <div className="flex justify-between items-center w-full">
        <Title
          title={!assignment ? "Couldn't Load Assignment" : assignment.name}
        />

        {isOwner && (
          <div className="flex">
            <Link
              href={`/classrooms/${classroomID}/assignments/${assignmentID}/answers`}
              className="rounded-full w-12 h-12 flex justify-center items-center hover:bg-gray-100"
            >
              <TbChecklist className="text-gray-500 text-3xl" />
            </Link>
            <Link
              href={`/classrooms/${classroomID}/assignments/${assignmentID}/edit`}
              className="rounded-full w-12 h-12 flex justify-center items-center hover:bg-gray-100"
            >
              <MdEdit className="text-gray-500 text-3xl" />
            </Link>
            <button className="rounded-full w-12 h-12 flex justify-center items-center hover:bg-gray-100">
              <FaTrashAlt
                onClick={removeAssignment}
                className="text-gray-500 text-2xl"
              />
            </button>
          </div>
        )}
      </div>

      <hr className="w-full border-2 border-gray-100" />
    </div>
  );
};

export default AssignmentHeader;
