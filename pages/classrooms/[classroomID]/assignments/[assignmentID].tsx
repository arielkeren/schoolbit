import { AssignmentInterface } from "../../../../types";
import { useRouter } from "next/router";
import Head from "next/head";
import Title from "../../../../components/Title";
import Question from "../../../../components/Question";

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
        <>
          <Head>
            <title>Coding Classroom | {assignment.name}</title>
          </Head>

          <Title title={assignment.name} />

          <Question question={assignment.question} />
        </>
      ) : (
        <p>Couldn&apos;t find this assignment...</p>
      )}
    </>
  );
};

export default AssignmentPage;
