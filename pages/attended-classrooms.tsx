import Head from "next/head";
import ClassroomList from "../components/general/ClassroomList";
import useAppContext from "../hooks/useAppContext";
import Header from "../components/general/Header";
import Sidebar from "../components/general/Sidebar";
import EmptyArea from "../components/general/EmptyArea";

const ClassroomsPage: React.FC = () => {
  const { attendedClassrooms } = useAppContext();

  return (
    <>
      <Head>
        <title>Attended Classrooms | SchoolBit</title>
      </Head>

      <Header title="Attended Classrooms" />

      <Sidebar />

      <EmptyArea>
        <ClassroomList classrooms={attendedClassrooms ?? []} />
      </EmptyArea>
    </>
  );
};

export default ClassroomsPage;
