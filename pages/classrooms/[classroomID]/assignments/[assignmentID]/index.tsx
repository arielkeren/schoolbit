import { AssignmentInterface, ClassroomInterface } from "../../../../../types";
import { useRouter } from "next/router";
import Head from "next/head";
import Title from "../../../../../components/general/Title";
import Question from "../../../../../components/assignment/Question";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../../../../firebaseConfig";
import AssignmentHeader from "../../../../../components/assignment/AssignmentHeader";
import ToggleCodeViewButton from "../../../../../components/assignment/ToggleCodeViewButton";
import CodeEditor from "../../../../../components/assignment/CodeEditor";

interface Props {
  assignments: AssignmentInterface[] | null;
  ownedClassrooms: ClassroomInterface[];
  attendedClassrooms: ClassroomInterface[];
  ownerID: string;
  changeAssignments: (assignmentArray: AssignmentInterface[]) => void;
  changeOwnerID: (newOwnerID: string) => void;
}

const AssignmentPage: React.FC<Props> = ({
  assignments,
  ownedClassrooms,
  attendedClassrooms,
  ownerID,
  changeAssignments,
  changeOwnerID,
}) => {
  const router = useRouter();

  const [assignment, setAssignment] = useState<AssignmentInterface | null>(
    null
  );
  const [isCodeView, setIsCodeView] = useState(false);
  const [code, setCode] = useState("");

  const { classroomID, assignmentID } = router.query;

  useEffect(() => {
    const getAssignmentDataAndOwnerID = async () => {
      const classroomDocumentReference = doc(
        database,
        `classrooms/${classroomID}`
      );

      const classroomDocumentSnapshot = await getDoc(
        classroomDocumentReference
      );

      changeOwnerID(classroomDocumentSnapshot.data()?.ownerID ?? null);
      changeAssignments(classroomDocumentSnapshot.data()?.assignments ?? []);
    };

    if (
      !ownedClassrooms.some(
        (classroom) => classroom.classroomID === classroomID
      ) &&
      !attendedClassrooms.some(
        (classroom) => classroom.classroomID === classroomID
      )
    )
      return;

    if (assignments === null) getAssignmentDataAndOwnerID();
    else
      setAssignment(
        assignments.find(
          (currentAssignment) => currentAssignment.id === assignmentID
        ) ?? null
      );
  }, [
    assignments,
    changeAssignments,
    changeOwnerID,
    assignmentID,
    classroomID,
    attendedClassrooms,
    ownedClassrooms,
  ]);

  const toggleCodeView = () =>
    setIsCodeView((previousCodeView) => !previousCodeView);

  const changeCode = (newCode: string) => setCode(newCode);

  return (
    <>
      {assignment !== null && assignments !== null && ownerID !== null ? (
        <>
          <Head>
            <title>Coding Classroom | {assignment.name}</title>
          </Head>

          <AssignmentHeader assignments={assignments} ownerID={ownerID} />

          {isCodeView ? (
            <CodeEditor code={code} changeCode={changeCode} />
          ) : (
            <Question question={assignment.question} />
          )}

          <ToggleCodeViewButton
            isCodeView={isCodeView}
            toggleCodeView={toggleCodeView}
          />
        </>
      ) : (
        <>
          <Title title="Assignment" />
          <p className="text-center text-2xl">
            Couldn&apos;t find this assignment...
          </p>
        </>
      )}
    </>
  );
};

export default AssignmentPage;
