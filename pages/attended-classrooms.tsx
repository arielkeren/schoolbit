import Head from "next/head";
import ClassroomList from "../components/ClassroomList";
import Title from "../components/Title";
import ClassroomInterface from "../types";

interface Props {
  attendedClassrooms: ClassroomInterface[];
}

const AttendedClassroomsPage: React.FC<Props> = ({ attendedClassrooms }) => {
  return (
    <>
      <Head>
        <title>Coding Classroom | Attended Classrooms</title>
      </Head>

      <Title title="Attended Classrooms" />

      <ClassroomList classrooms={attendedClassrooms} />
    </>
  );
};

export default AttendedClassroomsPage;
