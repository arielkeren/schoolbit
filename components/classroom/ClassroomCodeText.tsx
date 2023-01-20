import { useRouter } from "next/router";

const ClassroomCodeText: React.FC = () => {
  const router = useRouter();
  const { classroomID } = router.query;

  return (
    <p className="text-gray-700 text-3xl absolute bottom-5 right-1/2 translate-x-1/2">
      Code: {typeof classroomID === "string" ? classroomID : "..."}
    </p>
  );
};

export default ClassroomCodeText;
