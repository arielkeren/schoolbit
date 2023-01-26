import { useRouter } from "next/router";

const ClassroomCode: React.FC = () => {
  const router = useRouter();
  const { classroomID } = router.query as { classroomID: string };

  const copyCodeToClipboard = () => navigator.clipboard.writeText(classroomID);

  return (
    <div className="absolute bottom-3 left-0 w-full flex justify-center">
      <button
        onClick={copyCodeToClipboard}
        className="text-gray-600 text-3xl p-2 rounded ml-[103px] transition-colors hover:bg-gray-800 hover:text-gray-100"
      >
        {classroomID}
      </button>
    </div>
  );
};

export default ClassroomCode;
