import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { auth, database } from "../../firebaseConfig";
import ClassroomInterface from "../../types";
import { useState, useEffect } from "react";
import { AssignmentInterface } from "../../types";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import AssignmentList from "../../components/AssignmentList";

interface Props {
  ownedClassrooms: ClassroomInterface[];
  attendedClassrooms: ClassroomInterface[];
}

const ClassroomPage: React.FC<Props> = ({
  ownedClassrooms,
  attendedClassrooms,
}) => {
  const router = useRouter();

  const [classroomName, setClassroomName] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState<string | null>(null);
  const [ownerID, setOwnerID] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<AssignmentInterface[] | null>(
    null
  );

  const user = auth.currentUser;
  const { classroomID } = router.query;

  useEffect(() => {
    const getClassroomData = async () => {
      if (
        ownedClassrooms.some(
          (classroom) => classroom.classroomID === classroomID
        ) ||
        attendedClassrooms.some(
          (classroom) => classroom.classroomID === classroomID
        )
      ) {
        const classroomDocumentReference = doc(
          database,
          `classrooms/${classroomID}`
        );

        const classroomDocumentSnapshot = await getDoc(
          classroomDocumentReference
        );

        setClassroomName(classroomDocumentSnapshot.data()?.classroomName ?? "");
        setOwnerName(classroomDocumentSnapshot.data()?.ownerName ?? "");
        setOwnerID(classroomDocumentSnapshot.data()?.ownerID ?? "");
        setAssignments(classroomDocumentSnapshot.data()?.assignments ?? []);
      }
    };

    getClassroomData();
  }, [classroomID, ownedClassrooms, attendedClassrooms]);

  return (
    <>
      {classroomName !== null &&
      ownerName !== null &&
      assignments !== null &&
      typeof classroomID === "string" ? (
        <>
          <Head>
            <title>Coding Classroom | {classroomName}</title>
          </Head>

          <Title title={classroomName} />

          <Subtitle subtitle={`${ownerName}'s Classroom`} />

          <AssignmentList assignments={assignments} classroomID={classroomID} />
        </>
      ) : (
        <>
          <Head>
            <title>Coding Classroom | Classroom Not Found</title>
          </Head>
          <p>
            This classroom either doesn&apos;t exist or isn&apos;t one of your
            own or attended classrooms...
          </p>
        </>
      )}
    </>
  );
};

export default ClassroomPage;
