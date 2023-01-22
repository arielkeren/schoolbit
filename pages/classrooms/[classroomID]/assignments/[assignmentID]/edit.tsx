import Head from "next/head";
import Title from "../../../../../components/general/Title";
import EditAssignmentForm from "../../../../../components/edit-assignment/EditAssignmentForm";
import { useRouter } from "next/router";
import useAppContext from "../../../../../hooks/useAppContext";
import { useEffect } from "react";

const EditAssignmentPage: React.FC = () => {
  const { ownedClassrooms, getClassroom } = useAppContext();

  const router = useRouter();
  const { classroomID } = router.query as { classroomID: string };

  useEffect(() => {
    getClassroom(classroomID);
  }, [classroomID, getClassroom]);

  return (
    <>
      <Head>
        <title>Edit Assignment | SchoolBit</title>
      </Head>

      <Title title="Edit Assignment" />

      {ownedClassrooms?.some(
        (classroom) => classroom.classroomID === classroomID
      ) ? (
        <EditAssignmentForm />
      ) : (
        <p className="text-center text-2xl">
          Failed to get an assignment to edit
        </p>
      )}
    </>
  );
};

export default EditAssignmentPage;
