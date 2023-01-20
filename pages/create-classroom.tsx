import Head from "next/head";
import Title from "../components/general/Title";
import CreateClassroomForm from "../components/create-classroom/CreateClassroomForm";

const CreateClassroomPage: React.FC = () => (
  <>
    <Head>
      <title>Create Classroom | SchoolBit</title>
    </Head>

    <Title title="Create Classroom" />

    <CreateClassroomForm />
  </>
);

export default CreateClassroomPage;
