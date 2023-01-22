import { useEffect } from "react";
import { useRouter } from "next/router";
import Title from "../../../../../../components/general/Title";
import AnswerList from "../../../../../../components/answers/AnswerList";
import Head from "next/head";
import useAppContext from "../../../../../../hooks/useAppContext";

const AnswersPage: React.FC = () => {
  const { ownedClassrooms, getClassroom } = useAppContext();

  const router = useRouter();
  const { classroomID } = router.query as { classroomID: string };

  useEffect(() => {
    getClassroom(classroomID);
  }, [getClassroom, classroomID]);

  return (
    <>
      <Head>
        <title>Answers | SchoolBit</title>
      </Head>

      <Title title="Answers" />

      {ownedClassrooms?.some(
        (classroom) => classroom.classroomID === classroomID
      ) ? (
        <>
          <AnswerList />
        </>
      ) : (
        <p className="text-center text-2xl">
          You are not allowed to see other answers
        </p>
      )}
    </>
  );
};

export default AnswersPage;
