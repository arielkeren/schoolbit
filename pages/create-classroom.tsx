import Head from "next/head";
import CreateClassroomForm from "../components/create-classroom/CreateClassroomForm";
import EmptyArea from "../components/general/EmptyArea";
import Header from "../components/general/Header";
import Sidebar from "../components/general/Sidebar";

const CreateClassroomPage: React.FC = () => (
  <>
    <Head>
      <title>Create Classroom | SchoolBit</title>
    </Head>

    <Header title="Create Classroom" />

    <Sidebar />

    <EmptyArea>
      <CreateClassroomForm />
    </EmptyArea>
  </>
);

export default CreateClassroomPage;
