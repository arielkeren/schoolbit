import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { GrFormClose } from "react-icons/gr";
import { database } from "../../firebaseConfig";
import useAppContext from "../../hooks/useAppContext";

interface Props {
  closeRemoveAssignmentModal: () => void;
}

const RemoveAssigmentModal: React.FC<Props> = ({
  closeRemoveAssignmentModal,
}) => {
  const { classroom, changeClassroom } = useAppContext();

  const router = useRouter();
  const { classroomID, assignmentID } = router.query as {
    classroomID: string;
    assignmentID: string;
  };

  const assignments = classroom?.assignments;

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

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  return (
    <div
      onClick={closeRemoveAssignmentModal}
      className="fixed top-0 h-screen left-0 w-screen backdrop-brightness-90 flex justify-center items-center"
    >
      <div
        onClick={stopPropagation}
        className="relative w-72 bg-white py-20 flex flex-col justify-center items-center rounded shadow-md sm:w-96"
      >
        <button
          onClick={closeRemoveAssignmentModal}
          className="absolute top-2 right-2 rounded transition-colors hover:bg-gray-200"
        >
          <GrFormClose className="text-4xl" />
        </button>

        <div className="absolute top-2">
          <h2 className="uppercase text-lg font-bold sm:text-xl">
            Remove Assignment
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-medium text-center">
            Do you wish to remove this assignment?
          </p>
          <p className="text-red-600 font-bold text-center">
            WARNING: This action is irreversible.
          </p>
        </div>

        <div className="absolute bottom-2 right-2 flex gap-1">
          <button
            onClick={closeRemoveAssignmentModal}
            className="bg-gray-200 p-2 rounded font-medium uppercase transition-colors hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={removeAssignment}
            className="bg-red-600 p-2 rounded font-medium text-white uppercase transition-colors hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveAssigmentModal;
