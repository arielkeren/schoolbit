import Head from "next/head";
import Title from "../components/Title";
import JoinClassroomForm from "../components/JoinClassroomForm";

const JoinClassroomPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Coding Classroom | Join Classroom</title>
      </Head>

      <Title title="Join Classroom" />

      <JoinClassroomForm />
    </>
  );
};

export default JoinClassroomPage;
