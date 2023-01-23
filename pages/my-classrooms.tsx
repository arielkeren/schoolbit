import Head from "next/head";
import ClassroomList from "../components/general/ClassroomList";
import useAppContext from "../hooks/useAppContext";
import Header from "../components/general/Header";
import Sidebar from "../components/general/Sidebar";
import EmptyArea from "../components/general/EmptyArea";

const ClassroomsPage: React.FC = () => {
  const { ownedClassrooms } = useAppContext();

  return (
    <>
      <Head>
        <title>My Classrooms | SchoolBit</title>
      </Head>

      <Header title="My Classrooms" />

      <Sidebar />

      <EmptyArea>
        <ClassroomList classrooms={ownedClassrooms ?? []} />
      </EmptyArea>
    </>
  );
};

export default ClassroomsPage;
