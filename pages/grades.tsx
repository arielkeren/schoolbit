import Head from "next/head";
import EmptyArea from "../components/general/EmptyArea";
import Header from "../components/general/Header";
import Sidebar from "../components/general/Sidebar";
import GradeList from "../components/grades/GradeList";

const GradesPage: React.FC = () => (
  <>
    <Head>
      <title>Grades | SchoolBit</title>
    </Head>

    <Header title="Grades" />

    <Sidebar />

    <EmptyArea>
      <GradeList />
    </EmptyArea>
  </>
);

export default GradesPage;
