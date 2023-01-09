import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  AnswerInterface,
  AssignmentInterface,
  ClassroomInterface,
} from "../../../../../../types";
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

interface Props {
  ownedClassrooms: ClassroomInterface[];
}

const AnswersPage: React.FC<Props> = ({ ownedClassrooms }) => {
  const [answers, setAnswers] = useState<AnswerInterface[] | null>(null);

  const router = useRouter();
  const { classroomID, assignmentID } = router.query;

  useEffect(() => {
    const getAnswers = async () => {
      if (typeof classroomID !== "string" || typeof assignmentID !== "string")
        return;

      if (
        !ownedClassrooms.some(
          (classroom) => classroom.classroomID === classroomID
        )
      )
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
  }, [classroomID, assignmentID, ownedClassrooms]);

  return (
    <>
      <Head>
        <title>Answers | SchoolBit</title>
      </Head>

      <Title title="Answers" />

      {ownedClassrooms.some(
        (classroom) => classroom.classroomID === classroomID
      ) ? (
        <>
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
      ) : (
        <p className="text-center text-2xl">
          You are not allowed to see other answers
        </p>
      )}
    </>
  );
};

export default AnswersPage;
