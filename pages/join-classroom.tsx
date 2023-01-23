import Head from "next/head";
import EmptyArea from "../components/general/EmptyArea";
import Header from "../components/general/Header";
import Sidebar from "../components/general/Sidebar";
import JoinClassroomForm from "../components/join-classroom/JoinClassroomForm";

const JoinClassroomPage: React.FC = () => (
  <>
    <Head>
      <title>Join Classroom | SchoolBit</title>
    </Head>

    <Header title="Join Classroom" />

    <Sidebar />

    <EmptyArea>
      <JoinClassroomForm />
    </EmptyArea>
  </>
);

export default JoinClassroomPage;
