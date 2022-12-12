import Head from "next/head";
import Title from "../components/Title";
import CreateClassroomForm from "../components/CreateClassroomForm";

const CreateClassroomPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Coding Classroom | Create Classroom</title>
      </Head>

      <Title title="Create Classroom" />

      <CreateClassroomForm />
    </>
  );
};

export default CreateClassroomPage;
