import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { TbChecklist } from "react-icons/tb";
import { useRouter } from "next/router";
import Link from "next/link";
import useAppContext from "../../hooks/useAppContext";
import useModal from "../../hooks/useModal";
import RemoveAssignmentModal from "./RemoveAssignmentModal";

const AssignmentHeader: React.FC = () => {
  const { user, classroom, changeClassroom } = useAppContext();

  const [
    isRemoveAssignmentModalOpen,
    openRemoveAssignmentModal,
    closeRemoveAssignmentModal,
  ] = useModal();

  const router = useRouter();
  const { classroomID, assignmentID } = router.query as {
    classroomID: string;
    assignmentID: string;
  };

  const isOwner = user?.uid === classroom?.ownerID;

  return (
    <>
      <div className="flex flex-col items-center w-4/5 mx-auto">
        <div className="flex justify-between items-center w-full">
          {isOwner && (
            <div className="flex py-2">
              <Link
                href={`/classrooms/${classroomID}/assignments/${assignmentID}/answers`}
                className="rounded-full w-12 h-12 flex justify-center items-center transition-colors hover:bg-gray-900"
              >
                <TbChecklist className="text-gray-300 text-3xl" />
              </Link>
              <Link
                href={`/classrooms/${classroomID}/assignments/${assignmentID}/edit`}
                className="rounded-full w-12 h-12 flex justify-center items-center transition-colors hover:bg-gray-900"
              >
                <MdEdit className="text-gray-300 text-3xl" />
              </Link>
              <button className="rounded-full w-12 h-12 flex justify-center items-center transition-colors hover:bg-gray-900">
                <FaTrashAlt
                  onClick={openRemoveAssignmentModal}
                  className="text-gray-300 text-2xl"
                />
              </button>
            </div>
          )}
        </div>

        <hr className="w-full border-2 border-gray-100" />
      </div>

      {isRemoveAssignmentModalOpen && (
        <RemoveAssignmentModal
          closeRemoveAssignmentModal={closeRemoveAssignmentModal}
        />
      )}
    </>
  );
};

export default AssignmentHeader;
