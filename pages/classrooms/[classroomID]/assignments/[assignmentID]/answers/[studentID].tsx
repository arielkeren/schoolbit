import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import CodeEditor from "../../../../../../components/general/CodeEditor";
import GradeForm from "../../../../../../components/answer/GradeForm";
import Head from "next/head";
import useAppContext from "../../../../../../hooks/useAppContext";
import Header from "../../../../../../components/general/Header";
import Sidebar from "../../../../../../components/general/Sidebar";
import EmptyArea from "../../../../../../components/general/EmptyArea";
import Information from "../../../../../../components/general/Information";
import TeacherSidebar from "../../../../../../components/general/TeacherSidebar";
import StudentSidebar from "../../../../../../components/general/StudentSidebar";
import Loading from "../../../../../../components/general/Loading";

const AnswerPage: React.FC = () => {
  const { user, classroom, getClassroom } = useAppContext();

  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<string | null>(null);

  const router = useRouter();
  const { classroomID, assignmentID, studentID } = router.query as {
    classroomID: string;
    assignmentID: string;
    studentID: string;
  };

  useEffect(() => {
    getClassroom(classroomID).then(() => setIsLoading(false));
  }, [getClassroom, classroomID]);

  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) =>
    setLanguage(event.target.value);

  if (isLoading) return <Loading />;

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

  const assignment = classroom.assignments.find(
    (currentAssignment) => currentAssignment.id === assignmentID
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

  const answer = assignment.answers.find(
    (currentAnswer) => currentAnswer.senderID === studentID
  );

  if (!answer)
    return (
      <>
        <Head>
          <title>Answer Not Found | SchoolBit</title>
        </Head>

        <Header title="Answer Not Found" />

        {user?.uid === classroom.ownerID ? (
          <TeacherSidebar />
        ) : (
          <StudentSidebar />
        )}

        <EmptyArea>
          <Information
            primary="This answer doesn't exist"
            secondary="Make sure you didn't change anything in the link"
          />
        </EmptyArea>
      </>
    );

  return (
    <>
      <Head>
        <title>{answer.senderName}&apos;s Answer | SchoolBit</title>
      </Head>

      <Header title={`${answer.senderName}'s Answer`} />

      {user?.uid === classroom.ownerID ? (
        <>
          <TeacherSidebar />

          <EmptyArea>
            <div className="mb-14">
              <CodeEditor
                code={answer.code}
                language={language ?? answer.language}
                changeLanguage={changeLanguage}
                height="calc(100vh - 136px - 48px - 100px)"
                width="100%"
              />
            </div>

            {answer.checked ? (
              <Information
                primary="You've already graded this student's code"
                secondary="The grade has already been sent to the student"
              />
            ) : (
              <GradeForm />
            )}
          </EmptyArea>
        </>
      ) : (
        <>
          <StudentSidebar />

          <EmptyArea>
            <Information
              primary="You're not eligible for seeing other students' answers"
              secondary="Only the teacher can see students' answers"
            />
          </EmptyArea>
        </>
      )}
    </>
  );
};

export default AnswerPage;
