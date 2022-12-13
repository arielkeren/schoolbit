import Head from "next/head";
import { useRouter } from "next/router";
import Title from "../../../components/Title";
import CreateAssignmentForm from "../../../components/CreateAssignmentForm";

const CreateAssignmentPage: React.FC = () => {
  const router = useRouter();

  const { classroomID } = router.query;

  return (
    <>
      {typeof classroomID === "string" ? (
        <>
          <Head>
            <title>Coding Classroom | Create Assignment</title>
          </Head>

          <Title title="Create Assignment" />

          <CreateAssignmentForm classroomID={classroomID} />
        </>
      ) : (
        <>
          <Title title="Create Assignment" />
          <p className="text-white text-center font-bold text-3xl">
            Error loading the assignment...
          </p>
        </>
      )}
    </>
  );
};

export default CreateAssignmentPage;
