import Head from "next/head";
import Title from "../components/general/Title";
import GradeList from "../components/grades/GradeList";
import { GradeInterface } from "../types";

interface Props {
  grades: GradeInterface[];
}

const GradesPage: React.FC<Props> = ({ grades }) => {
  return (
    <>
      <Head>
        <title>Grades | SchoolBit</title>
      </Head>

      <Title title="Grades" />

      <GradeList grades={grades} />
    </>
  );
};

export default GradesPage;
