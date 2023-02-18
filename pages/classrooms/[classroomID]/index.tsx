import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AssignmentList from "../../../components/classroom/AssignmentList";
import ClassroomCode from "../../../components/classroom/ClassroomCode";
import useAppContext from "../../../hooks/useAppContext";
import Header from "../../../components/general/Header";
import TeacherSidebar from "../../../components/general/TeacherSidebar";
import StudentSidebar from "../../../components/general/StudentSidebar";
import Sidebar from "../../../components/general/Sidebar";
import EmptyArea from "../../../components/general/EmptyArea";
import Information from "../../../components/general/Information";
import Loading from "../../../components/general/Loading";

const ClassroomPage: React.FC = () => {
  const { user, classroom, getClassroom } = useAppContext();

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { classroomID } = router.query as { classroomID: string };

  useEffect(() => {
    getClassroom(classroomID).then(() => setIsLoading(false));
  }, [getClassroom, classroomID]);

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

  return (
    <>
      <Head>
        <title>{classroom.classroomName} | SchoolBit</title>
      </Head>

      <Header title={`${classroom.classroomName} / ${classroom.ownerName}`} />

      {user?.uid === classroom.ownerID ? (
        <TeacherSidebar />
      ) : (
        <StudentSidebar />
      )}

      <EmptyArea>
        <AssignmentList />
      </EmptyArea>

      <ClassroomCode />
    </>
  );
};

export default ClassroomPage;
