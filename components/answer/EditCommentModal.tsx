import { BsChatLeftTextFill } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";

interface Props {
  text: string;
  changeThisCommentText: (newText: string) => void;
  closeModal: () => void;
  deleteThisComment: () => void;
}

const EditCommentModal: React.FC<Props> = ({
  text,
  changeThisCommentText,
  closeModal,
  deleteThisComment,
}) => {
  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  const changeText = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    changeThisCommentText(event.target.value);

  const deleteAndClose = () => {
    deleteThisComment();
    closeModal();
  };

  const deleteIfEmptyAndClose = () => {
    if (text.replaceAll(" ", "") === "") deleteThisComment();
    closeModal();
  };

  return (
    <div
      onClick={deleteIfEmptyAndClose}
      className="fixed top-0 h-screen left-0 w-screen backdrop-brightness-90 flex justify-center items-center"
    >
      <div
        onClick={stopPropagation}
        className="relative w-72 bg-white py-20 flex flex-col justify-center items-center rounded shadow-md sm:w-96"
      >
        <button
          onClick={deleteIfEmptyAndClose}
          className="absolute top-2 right-2 rounded transition-colors hover:bg-gray-200"
        >
          <GrFormClose className="text-4xl" />
        </button>

        <div className="absolute top-2 bg-gray-800 py-2 px-10 rounded">
          <BsChatLeftTextFill className="text-2xl text-gray-200" />
        </div>

        <textarea
          value={text}
          onChange={changeText}
          className="resize-none drop-shadow-sm h-72 w-4/5 border-gray-200 border-2 rounded p-1 outline-none transition-all focus:border-gray-300 focus:drop-shadow"
        />

        <button
          onClick={deleteAndClose}
          className="absolute bottom-4 bg-red-600 py-2 px-10 rounded transition-all drop-shadow-md hover:px-12"
        >
          <FaTrashAlt className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

export default EditCommentModal;
