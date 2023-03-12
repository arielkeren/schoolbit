import { BsChatLeftTextFill } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";

interface Props {
  text: string;
  closeModal: () => void;
}

const CommentModal: React.FC<Props> = ({ text, closeModal }) => {
  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 h-screen left-0 w-screen backdrop-brightness-90 flex justify-center items-center"
    >
      <div
        onClick={stopPropagation}
        className="relative w-72 bg-white py-20 flex flex-col justify-center items-center rounded shadow-md sm:w-96"
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 rounded transition-colors hover:bg-gray-200"
        >
          <GrFormClose className="text-4xl" />
        </button>

        <div className="absolute top-2 bg-gray-800 py-2 px-10 rounded">
          <BsChatLeftTextFill className="text-2xl text-gray-200" />
        </div>

        <p className="break-all whitespace-pre-wrap bg-gray-100 p-2 rounded w-4/5">
          {text}
        </p>
      </div>
    </div>
  );
};

export default CommentModal;
