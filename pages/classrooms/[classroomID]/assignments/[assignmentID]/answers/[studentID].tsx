import { useEffect } from "react";
import { useRouter } from "next/router";
import { IAssignment } from "../../../../../../types/types";
import Title from "../../../../../../components/general/Title";
import CodeEditor from "../../../../../../components/general/CodeEditor";
import GradeForm from "../../../../../../components/answer/GradeForm";
import ScrollButton from "../../../../../../components/answer/ScrollButton";
import Head from "next/head";
import useAppContext from "../../../../../../hooks/useAppContext";

const AnswerPage: React.FC = () => {
  const { classroom, getClassroom } = useAppContext();

  const router = useRouter();
  const { classroomID, assignmentID, studentID } = router.query as {
    classroomID: string;
    assignmentID: string;
    studentID: string;
  };

  useEffect(() => {
    getClassroom(classroomID);
  }, [getClassroom, classroomID]);

  if (!classroom)
    return (
      <>
        <Head>
          <title>Answer Not Found | SchoolBit</title>
        </Head>

        <Title title="Answer Not Found" />
      </>
    );

  const assignments: IAssignment[] = classroom?.assignments;
  const assignment = assignments.find(
    (currentAssignment) => currentAssignment.id === assignmentID
  );

  const answers = assignment?.answers;
  const answer = answers?.find(
    (currentAnswer) => currentAnswer.senderID === studentID
  );

  return (
    <>
      {answer?.senderName && answer?.code ? (
        <>
          <Head>
            <title>{answer.senderName}&apos;s Answer | SchoolBit</title>
          </Head>

          <Title title={`${answer.senderName}'s Answer`} />

          <div className="mb-14">
            <CodeEditor
              code={answer.code}
              height="calc(100vh - 136px - 48px - 100px)"
              width="95vw"
            />
          </div>

          <GradeForm />

          <ScrollButton />
        </>
      ) : (
        <>
          <Title title="Answer Not Found" />

          <p className="text-center text-2xl">Failed to get the answer</p>
        </>
      )}
    </>
  );
};

export default AnswerPage;
