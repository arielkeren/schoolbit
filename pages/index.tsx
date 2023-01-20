import Head from "next/head";
import ClassroomList from "../components/home/ClassroomList";
import Title from "../components/general/Title";
import useClassroomContext from "../hooks/useAppContext";

const Homepage: React.FC = () => {
  const { ownedClassrooms, attendedClassrooms } = useClassroomContext();

  return (
    <>
      <Head>
        <title>SchoolBit</title>
      </Head>

      <Title title="My Classrooms" />

      <ClassroomList
        classrooms={ownedClassrooms ?? []}
        addClassroomLink="/create-classroom"
      />

      <Title title="Attended Classrooms" />

      <ClassroomList
        classrooms={attendedClassrooms ?? []}
        addClassroomLink="/join-classroom"
      />
    </>
  );
};

export default Homepage;
