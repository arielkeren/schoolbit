import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  openMenu: () => void;
}

const AddClassroom: React.FC<Props> = ({ openMenu }) => {
  return (
    <div
      onClick={openMenu}
      className="h-96 rounded-md flex justify-center items-center cursor-pointer bg-gradient-to-br from-purple-400 to-pink-600 hover:scale-105 hover:from-purple-400 hover:to-pink-500 transition-transform duration-300"
    >
      <AiOutlinePlus className="text-7xl text-white" />
    </div>
  );
};

export default AddClassroom;
