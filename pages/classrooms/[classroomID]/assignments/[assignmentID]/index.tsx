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
import Header from "../../../../../components/general/Header";
import Sidebar from "../../../../../components/general/Sidebar";
import EmptyArea from "../../../../../components/general/EmptyArea";
import Information from "../../../../../components/general/Information";
import TeacherSidebar from "../../../../../components/general/TeacherSidebar";
import StudentSidebar from "../../../../../components/general/StudentSidebar";

const AssignmentPage: React.FC = () => {
  const { user, classroom, getClassroom } = useAppContext();

  const [isCodeView, setIsCodeView] = useState(false);
  const [code, setCode] = useState("");

  const router = useRouter();
  const { classroomID, assignmentID } = router.query as {
    classroomID: string;
    assignmentID: string;
  };

  useEffect(() => {
    getClassroom(classroomID);
  }, [getClassroom, classroomID]);

  const toggleCodeView = () =>
    setIsCodeView((previousCodeView) => !previousCodeView);

  const changeCode = (newCode: string) => setCode(newCode);

  const assignment = classroom?.assignments.find(
    (currentAssignment) => currentAssignment.id === assignmentID
  );

  if (!classroom)
    return (
      <>
        <Head>
          <title>Classroom Not Found | SchoolBit</title>
        </Head>

        <Header title="Classroom Not Found" />

        <Sidebar />

        <EmptyArea>
          <Information
            primary="This classroom couldn't be accessed"
            secondary="Check with your teacher if you were accepted into the classroom"
          />
        </EmptyArea>
      </>
    );

  if (!assignment)
    return (
      <>
        <Head>
          <title>Assignment Not Found | SchoolBit</title>
        </Head>

        <Header title="Assignment Not Found" />

        {user?.uid === classroom.ownerID ? (
          <TeacherSidebar />
        ) : (
          <StudentSidebar />
        )}

        <EmptyArea>
          <Information
            primary="This assignment doesn't exist"
            secondary="Make sure you didn't change anything in the link"
          />
        </EmptyArea>
      </>
    );

  return (
    <>
      <Head>
        <title>{assignment.name} | SchoolBit</title>
      </Head>

      <Header title={assignment.name} />

      {user?.uid === classroom.ownerID ? (
        <TeacherSidebar />
      ) : (
        <>
          <StudentSidebar />

          <SubmitButton code={code} />

          <ToggleCodeViewButton
            isCodeView={isCodeView}
            toggleCodeView={toggleCodeView}
          />
        </>
      )}

      <EmptyArea>
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
      </EmptyArea>
    </>
  );
};

export default AssignmentPage;
