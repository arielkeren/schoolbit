import { BsChatLeftTextFill, BsDash } from "react-icons/bs";
import useModal from "../../hooks/useModal";
import CommentModal from "./CommentModal";

interface Props {
  text: string;
}

const CommentButton: React.FC<Props> = ({ text }) => {
  const [isCommentModalOpen, openCommentModal, closeCommentModal] = useModal();

  if (text === "")
    return (
      <div className="rounded h-6 w-6 flex justify-center items-center">
        <BsDash className="text-gray-300" />
      </div>
    );

  return (
    <>
      <button
        onClick={openCommentModal}
        className="rounded h-6 w-6 flex justify-center items-center transition-colors hover:bg-gray-700"
      >
        <BsChatLeftTextFill className="text-gray-300" />
      </button>

      {isCommentModalOpen && (
        <CommentModal text={text} closeModal={closeCommentModal} />
      )}
    </>
  );
};

export default CommentButton;
