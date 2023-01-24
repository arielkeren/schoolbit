import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import EmptyArea from "../../../components/general/EmptyArea";
import Header from "../../../components/general/Header";
import Information from "../../../components/general/Information";
import Sidebar from "../../../components/general/Sidebar";
import StudentSidebar from "../../../components/general/StudentSidebar";
import TeacherSidebar from "../../../components/general/TeacherSidebar";
import RequestList from "../../../components/requests/RequestList";
import useAppContext from "../../../hooks/useAppContext";

const RequestsPage: React.FC = () => {
  const { user, classroom, getClassroom } = useAppContext();

  const router = useRouter();
  const { classroomID } = router.query as { classroomID: string };

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

  return (
    <>
      <Head>
        <title>{classroom.classroomName} / Requests | SchoolBit</title>
      </Head>

      <Header title={`${classroom.classroomName} / Requests`} />

      {user?.uid === classroom.ownerID ? (
        <>
          <TeacherSidebar />

          <EmptyArea>
            <RequestList />
          </EmptyArea>
        </>
      ) : (
        <>
          <StudentSidebar />

          <EmptyArea>
            <Information
              primary="You're not eligible for seeing the join requests"
              secondary="Only the teacher can accept or deny join requests"
            />
          </EmptyArea>
        </>
      )}
    </>
  );
};

export default RequestsPage;
