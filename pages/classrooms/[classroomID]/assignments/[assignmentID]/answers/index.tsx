import { useEffect } from "react";
import { useRouter } from "next/router";
import AnswerList from "../../../../../../components/answers/AnswerList";
import Head from "next/head";
import useAppContext from "../../../../../../hooks/useAppContext";
import Header from "../../../../../../components/general/Header";
import Sidebar from "../../../../../../components/general/Sidebar";
import EmptyArea from "../../../../../../components/general/EmptyArea";
import Information from "../../../../../../components/general/Information";
import TeacherSidebar from "../../../../../../components/general/TeacherSidebar";
import StudentSidebar from "../../../../../../components/general/StudentSidebar";

const AnswersPage: React.FC = () => {
  const { user, classroom, getClassroom } = useAppContext();

  const router = useRouter();
  const { classroomID, assignmentID } = router.query as {
    classroomID: string;
    assignmentID: string;
  };

  useEffect(() => {
    getClassroom(classroomID);
  }, [getClassroom, classroomID]);

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

  return (
    <>
      <Head>
        <title>Answers to &quot;{assignment.name}&quot; | SchoolBit</title>
      </Head>

      <Header title={`Answers to "${assignment.name}"`} />

      {user?.uid === classroom.ownerID ? (
        <>
          <TeacherSidebar />

          <EmptyArea>
            <AnswerList answers={assignment.answers} />
          </EmptyArea>
        </>
      ) : (
        <>
          <StudentSidebar />

          <Information
            primary="You're not eligible for seeing other students' answers"
            secondary="Only the teacher can see all the students' answers"
          />
        </>
      )}
    </>
  );
};

export default AnswersPage;
