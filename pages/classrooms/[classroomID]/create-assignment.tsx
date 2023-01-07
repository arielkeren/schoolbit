import Head from "next/head";
import { useRouter } from "next/router";
import Title from "../../../components/general/Title";
import CreateAssignmentForm from "../../../components/create-assignment/CreateAssignmentForm";
import { ClassroomInterface } from "../../../types";

interface Props {
  ownedClassrooms: ClassroomInterface[];
}

const CreateAssignmentPage: React.FC<Props> = ({ ownedClassrooms }) => {
  const router = useRouter();
  const { classroomID } = router.query;

  return (
    <>
      <Head>
        <title>Create Assignment | SchoolBit</title>
      </Head>

      <Title title="Create Assignment" />

      {typeof classroomID === "string" &&
      ownedClassrooms.some(
        (classroom) => classroom.classroomID === classroomID
      ) ? (
        <CreateAssignmentForm classroomID={classroomID} />
      ) : (
        <p className="text-center text-2xl">
          Failed to get a possible classroom to add an assignment to
        </p>
      )}
    </>
  );
};

export default CreateAssignmentPage;
