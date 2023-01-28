import Image from "next/image";
import Logo from "../../public/Logo.svg";
import { BsFillBarChartFill } from "react-icons/bs";
import { RiUserFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";

const StudentSidebar: React.FC = () => {
  const router = useRouter();
  const { classroomID } = router.query as { classroomID: string };

  return (
    <div className="fixed top-0 left-0 w-[100px] py-5 flex flex-col items-center bg-gray-900 h-screen">
      <Link href="/my-classrooms">
        <Image src={Logo} alt="" height="60" />
      </Link>

      <hr className="border-2 w-2/3 border-gray-800 mt-4" />

      <div className="flex flex-col gap-5 mt-3">
        <Link href={`/classrooms/${classroomID}`}>
          <AiFillHome className="text-5xl text-gray-300" />
        </Link>

        <Link href={`/classrooms/${classroomID}/participants`}>
          <HiUserGroup className="text-5xl text-gray-300" />
        </Link>
      </div>

      <div className="flex flex-col gap-5 mt-auto">
        <Link href="/grades">
          <BsFillBarChartFill className="text-5xl text-gray-300" />
        </Link>

        <Link href="/profile">
          <RiUserFill className="text-5xl text-gray-300" />
        </Link>
      </div>
    </div>
  );
};

export default StudentSidebar;
