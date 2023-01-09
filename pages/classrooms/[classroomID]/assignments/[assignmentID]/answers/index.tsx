import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AnswerInterface, AssignmentInterface } from "../../../../../../types";
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
} from "firebase/firestore";
import { database } from "../../../../../../firebaseConfig";
import Title from "../../../../../../components/general/Title";
import AnswerList from "../../../../../../components/answers/AnswerList";
import Head from "next/head";

const AnswersPage: React.FC = () => {
  const [answers, setAnswers] = useState<AnswerInterface[] | null>(null);

  const router = useRouter();
  const { classroomID, assignmentID } = router.query;

  useEffect(() => {
    const getAnswers = async () => {
      if (typeof classroomID !== "string" || typeof assignmentID !== "string")
        return;

      const classroomDocumentReference = doc(
        database,
        `classrooms/${classroomID}`
      );

      let classroomDocumentSnapshot: DocumentSnapshot<DocumentData> | null =
        null;

      try {
        classroomDocumentSnapshot = await getDoc(classroomDocumentReference);
      } catch {
        alert("Failed to get the answers");
        return;
      }

      const data = classroomDocumentSnapshot.data();
      const assignments: AssignmentInterface[] = data?.assignments;

      if (!assignments) return;

      const assignment = assignments.find(
        (currentAssignment) => currentAssignment.id === assignmentID
      );

      setAnswers(assignment?.answers ?? null);
    };

    getAnswers();
  }, [classroomID, assignmentID]);

  return (
    <>
      <Head>
        <title>Answers | SchoolBit</title>
      </Head>

      <Title title="Answers" />

      {answers ? (
        <>
          {answers.length === 0 ? (
            <p className="text-center text-2xl">
              There are no submitted answers yet
            </p>
          ) : (
            <AnswerList answers={answers} />
          )}
        </>
      ) : (
        <p className="text-center text-2xl">Failed to get the answers</p>
      )}
    </>
  );
};

export default AnswersPage;
