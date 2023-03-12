import { HiPlus } from "react-icons/hi";
import { BsChatLeftTextFill } from "react-icons/bs";
import useModal from "../../hooks/useModal";
import EditCommentModal from "./EditCommentModal";

interface Props {
  lineNumber: number;
  text: string;
  addComment: (lineNumber: number) => void;
  changeCommentText: (lineNumber: number, newText: string) => void;
  deleteComment: (lineNumber: number) => void;
}

const EditCommentButton: React.FC<Props> = ({
  lineNumber,
  text,
  addComment,
  changeCommentText,
  deleteComment,
}) => {
  const [isEditCommentModalOpen, openEditCommentModal, closeEditCommentModal] =
    useModal();

  const addAndShowComment = () => {
    addComment(lineNumber);
    openEditCommentModal();
  };

  const changeThisCommentText = (newText: string) =>
    changeCommentText(lineNumber, newText);

  const deleteThisComment = () => deleteComment(lineNumber);

  return (
    <>
      {text.replaceAll(" ", "") === "" ? (
        <button
          onClick={addAndShowComment}
          className="rounded h-6 w-6 flex justify-center items-center transition-colors hover:bg-gray-700"
        >
          <HiPlus className="text-gray-300" />
        </button>
      ) : (
        <button
          onClick={openEditCommentModal}
          className="rounded h-6 w-6 flex justify-center items-center transition-colors hover:bg-gray-700"
        >
          <BsChatLeftTextFill className="text-gray-300" />
        </button>
      )}

      {isEditCommentModalOpen && (
        <EditCommentModal
          text={text}
          changeThisCommentText={changeThisCommentText}
          closeModal={closeEditCommentModal}
          deleteThisComment={deleteThisComment}
        />
      )}
    </>
  );
};

export default EditCommentButton;
