import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  link: string;
}

const AddClassroom: React.FC<Props> = ({ link }) => (
  <Link href={link}>
    <div className="h-56 rounded-md flex justify-center items-center cursor-pointer bg-gray-900 hover:scale-105 transition-transform">
      <AiOutlinePlus className="text-7xl text-white" />
    </div>
  </Link>
);

export default AddClassroom;
