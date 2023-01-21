import Head from "next/head";
import { useRouter } from "next/router";
import Title from "../../../components/general/Title";
import CreateAssignmentForm from "../../../components/create-assignment/CreateAssignmentForm";
import useAppContext from "../../../hooks/useAppContext";

const CreateAssignmentPage: React.FC = () => {
  const { ownedClassrooms } = useAppContext();

  const router = useRouter();
  const { classroomID } = router.query;

  return (
    <>
      <Head>
        <title>Create Assignment | SchoolBit</title>
      </Head>

      <Title title="Create Assignment" />

      {ownedClassrooms?.some(
        (classroom) => classroom.classroomID === classroomID
      ) ? (
        <CreateAssignmentForm />
      ) : (
        <p className="text-center text-2xl">
          Failed to get a possible classroom to add an assignment to
        </p>
      )}
    </>
  );
};

export default CreateAssignmentPage;
