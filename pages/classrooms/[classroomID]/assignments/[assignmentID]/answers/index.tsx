import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AnswerInterface, AssignmentInterface } from "../../../../../../types";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../../../../../firebaseConfig";
import Title from "../../../../../../components/general/Title";
import AnswerList from "../../../../../../components/answers/AnswerList";
import Head from "next/head";

const AnswersPage: React.FC = () => {
  const router = useRouter();

  const [answers, setAnswers] = useState<AnswerInterface[] | null>(null);

  const { classroomID, assignmentID } = router.query;

  useEffect(() => {
    const getAnswers = async () => {
      if (typeof classroomID !== "string" || typeof assignmentID !== "string")
        return;

      const classroomDocumentReference = doc(
        database,
        `classrooms/${classroomID}`
      );

      try {
        const classroomDocumentSnapshot = await getDoc(
          classroomDocumentReference
        );

        const assignments: AssignmentInterface[] =
          classroomDocumentSnapshot.data()?.assignments;
        if (!assignments) return;
        const assignment = assignments.find(
          (currentAssignment) => currentAssignment.id === assignmentID
        );
        setAnswers(assignment?.answers ?? null);
      } catch {
        alert("Error loading the assignments");
      }
    };

    getAnswers();
  }, [classroomID, assignmentID]);

  return (
    <>
      <Head>
        <title>SchoolBit | Answers</title>
      </Head>
      <Title title="Answers" />
      {answers ? (
        <AnswerList answers={answers} />
      ) : (
        <p className="text-center text-2xl">Couldn&apos;t load the answers</p>
      )}
    </>
  );
};

export default AnswersPage;
