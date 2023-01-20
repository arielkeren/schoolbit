import { useRouter } from "next/router";
import Head from "next/head";
import Title from "../../../../../components/general/Title";
import Question from "../../../../../components/assignment/Question";
import { useEffect, useState } from "react";
import AssignmentHeader from "../../../../../components/assignment/AssignmentHeader";
import ToggleCodeViewButton from "../../../../../components/assignment/ToggleCodeViewButton";
import CodeEditor from "../../../../../components/general/CodeEditor";
import SubmitButton from "../../../../../components/assignment/SubmitButton";
import useAppContext from "../../../../../hooks/useAppContext";

const AssignmentPage: React.FC = () => {
  const { user, classroom, getClassroom } = useAppContext();

  const [isCodeView, setIsCodeView] = useState(false);
  const [code, setCode] = useState("");

  const router = useRouter();
  const { classroomID, assignmentID } = router.query;

  useEffect(() => {
    if (typeof classroomID === "string") getClassroom(classroomID);
  }, [getClassroom, classroomID]);

  const toggleCodeView = () =>
    setIsCodeView((previousCodeView) => !previousCodeView);

  const changeCode = (newCode: string) => setCode(newCode);

  const assignment = classroom?.assignments.find(
    (currentAssignment) => currentAssignment.id === assignmentID
  );

  return (
    <>
      {classroom && assignment ? (
        <>
          <Head>
            <title>{assignment.name} | SchoolBit</title>
          </Head>

          <AssignmentHeader />

          {isCodeView ? (
            <CodeEditor
              code={code}
              height="calc(calc(100vh - 136px - 92px) * 0.8)"
              width="80%"
              changeCode={changeCode}
            />
          ) : (
            <Question question={assignment.question} />
          )}

          {user?.uid !== classroom.ownerID && (
            <>
              <SubmitButton code={code} />

              <ToggleCodeViewButton
                isCodeView={isCodeView}
                toggleCodeView={toggleCodeView}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Head>
            <title>Assignment Not Found | SchoolBit</title>
          </Head>

          <Title title="Assignment Not Found" />

          <p className="text-center text-2xl">Failed to get the assignment</p>
        </>
      )}
    </>
  );
};

export default AssignmentPage;
