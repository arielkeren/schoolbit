import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  link: string;
}

const AddClassroom: React.FC<Props> = ({ link }) => {
  return (
    <Link href={link}>
      <div className="h-96 rounded-md flex justify-center items-center cursor-pointer bg-gray-900 hover:scale-105 hover:shadow-xl transition-all duration-300">
        <AiOutlinePlus className="text-7xl text-white" />
      </div>
    </Link>
  );
};

export default AddClassroom;
