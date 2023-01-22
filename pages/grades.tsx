import Head from "next/head";
import Title from "../components/general/Title";
import GradeList from "../components/grades/GradeList";

const GradesPage: React.FC = () => (
  <>
    <Head>
      <title>Grades | SchoolBit</title>
    </Head>

    <Title title="Grades" />

    <GradeList />
  </>
);

export default GradesPage;
