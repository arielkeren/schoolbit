import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { database } from "../../../../../../firebaseConfig";
import { useRouter } from "next/router";
import { AssignmentInterface } from "../../../../../../types";
import Title from "../../../../../../components/general/Title";
import CodeEditor from "../../../../../../components/general/CodeEditor";
import GradeForm from "../../../../../../components/answer/GradeForm";
import ScrollButton from "../../../../../../components/answer/ScrollButton";

const AnswerPage: React.FC = () => {
  const [studentName, setStudentName] = useState<string | null>(null);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const router = useRouter();

  const { classroomID, assignmentID, studentID } = router.query;

  useEffect(() => {
    const getAnswer = async () => {
      const classroomDocumentReference = doc(
        database,
        `classrooms/${classroomID}`
      );

      try {
        const classroomDocumentSnapshot = await getDoc(
          classroomDocumentReference
        );
        const data = classroomDocumentSnapshot.data();

        const assignments: AssignmentInterface[] = data?.assignments;
        const assignment = assignments.find(
          (currentAssignment) => currentAssignment.id === assignmentID
        );

        const answers = assignment?.answers;
        const answer = answers?.find(
          (currentAnswer) => currentAnswer.senderID === studentID
        );

        setStudentName(answer?.senderName ?? null);
        setSubmittedCode(answer?.code ?? null);
      } catch {
        alert("Error loading the answer");
      }
    };

    getAnswer();
  }, [classroomID, assignmentID, studentID]);

  return (
    <>
      {studentName && submittedCode ? (
        <>
          <Title title={`${studentName}'s Answer`} />
          <div className="mb-14">
            <CodeEditor
              code={submittedCode}
              height="calc(100vh - 136px - 48px - 100px)"
              width="95vw"
            />
          </div>
          <GradeForm />
          <ScrollButton />
        </>
      ) : (
        <>
          <Title title="Answer" />
          <p className="text-center text-2xl">
            Couldn&apos;t load the answer...
          </p>
        </>
      )}
    </>
  );
};

export default AnswerPage;
