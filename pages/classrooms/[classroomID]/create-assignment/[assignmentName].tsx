import Head from "next/head";
import { useRouter } from "next/router";
import Title from "../../../../components/Title";
import AssignmentCreationForm from "../../../../components/AssignmentCreationForm";

const CreateAssignmentPage: React.FC = () => {
  const router = useRouter();

  const { classroomID, assignmentName } = router.query;

  return (
    <>
      {typeof classroomID === "string" && typeof assignmentName === "string" ? (
        <>
          <Head>
            <title>Coding Classroom | {assignmentName}</title>
          </Head>

          <Title title={assignmentName} />

          <AssignmentCreationForm
            assignmentName={assignmentName}
            classroomID={classroomID}
          />
        </>
      ) : (
        <p>Error loading the assignment...</p>
      )}
    </>
  );
};

export default CreateAssignmentPage;
