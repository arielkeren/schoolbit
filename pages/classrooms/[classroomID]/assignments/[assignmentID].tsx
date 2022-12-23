import { AssignmentInterface, ClassroomInterface } from "../../../../types";
import { useRouter } from "next/router";
import Head from "next/head";
import Title from "../../../../components/Title";
import Question from "../../../../components/Question";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../../../firebaseConfig";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { TbChecklist } from "react-icons/tb";
import AssignmentHeader from "../../../../components/AssignmentHeader";

interface Props {
  assignments: AssignmentInterface[] | null;
  ownedClassrooms: ClassroomInterface[];
  attendedClassrooms: ClassroomInterface[];
  changeAssignments: (assignmentArray: AssignmentInterface[]) => void;
}

const AssignmentPage: React.FC<Props> = ({
  assignments,
  ownedClassrooms,
  attendedClassrooms,
  changeAssignments,
}) => {
  const router = useRouter();

  const [assignment, setAssignment] = useState<AssignmentInterface | null>(
    null
  );

  const { classroomID, assignmentID } = router.query;

  useEffect(() => {
    const getAssignmentData = async () => {
      const classroomDocumentReference = doc(
        database,
        `classrooms/${classroomID}`
      );

      const classroomDocumentSnapshot = await getDoc(
        classroomDocumentReference
      );

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

    if (assignments === null) getAssignmentData();
    else
      setAssignment(
        assignments.find(
          (currentAssignment) => currentAssignment.id === assignmentID
        ) ?? null
      );
  }, [
    assignments,
    changeAssignments,
    assignmentID,
    classroomID,
    attendedClassrooms,
    ownedClassrooms,
  ]);

  return (
    <>
      {assignment !== null ? (
        <>
          <Head>
            <title>Coding Classroom | {assignment.name}</title>
          </Head>

          <AssignmentHeader assignmentName={assignment.name} />

          <Question question={assignment.question} />
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
