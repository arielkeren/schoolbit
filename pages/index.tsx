import Head from "next/head";
import ClassroomList from "../components/ClassroomList";
import Title from "../components/Title";
import { ClassroomInterface } from "../types";

interface Props {
  ownedClassrooms: ClassroomInterface[];
  attendedClassrooms: ClassroomInterface[];
}

const Home: React.FC<Props> = ({ ownedClassrooms, attendedClassrooms }) => {
  return (
    <>
      <Head>
        <title>Coding Classroom</title>
      </Head>

      <Title title="My Classrooms" />

      <ClassroomList
        classrooms={ownedClassrooms}
        addClassroomLink="/create-classroom"
      />

      <Title title="Attended Classrooms" />

      <ClassroomList
        classrooms={attendedClassrooms}
        addClassroomLink="/join-classroom"
      />
    </>
  );
};

export default Home;
