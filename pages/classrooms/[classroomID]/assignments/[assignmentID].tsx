import { AssignmentInterface } from "../../../../types";
import { useRouter } from "next/router";
import Head from "next/head";

interface Props {
  assignments: AssignmentInterface[];
}

const AssignmentPage: React.FC<Props> = ({ assignments }) => {
  const router = useRouter();

  const { assignmentID } = router.query;

  const assignment = assignments.find(
    (currentAssignment) => currentAssignment.id === assignmentID
  );

  return (
    <>
      {assignment !== undefined ? (
        <Head>
          <title>Coding Classroom | {assignment.name}</title>
        </Head>
      ) : (
        <></>
      )}
    </>
  );
};

export default AssignmentPage;
