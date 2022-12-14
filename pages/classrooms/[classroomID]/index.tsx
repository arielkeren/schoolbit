import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { auth, database } from "../../../firebaseConfig";
import { ClassroomInterface } from "../../../types";
import { useState, useEffect } from "react";
import { AssignmentInterface } from "../../../types";
import Title from "../../../components/Title";
import Subtitle from "../../../components/Subtitle";
import AssignmentList from "../../../components/AssignmentList";
import CreateAssignmentButton from "../../../components/CreateAssignmentButton";
import OpenScreenButton from "../../../components/OpenScreenButton";
import ParticipantsScreen from "../../../components/ParticipantsScreen";
import ClassroomCodeText from "../../../components/ClassroomCodeText";
import { RequestInterface } from "../../..//types";
import RequestsScreen from "../../../components/RequestsScreen";

interface Props {
  ownedClassrooms: ClassroomInterface[];
  attendedClassrooms: ClassroomInterface[];
  assignments: AssignmentInterface[];
  changeAssignments: (assignmentArray: AssignmentInterface[]) => void;
}

const ClassroomPage: React.FC<Props> = ({
  ownedClassrooms,
  attendedClassrooms,
  assignments,
  changeAssignments,
}) => {
  const router = useRouter();

  const [classroomName, setClassroomName] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState<string | null>(null);
  const [ownerID, setOwnerID] = useState<string | null>(null);
  const [participants, setParticipants] = useState<string[] | null>(null);
  const [requests, setRequests] = useState<RequestInterface[] | null>(null);
  const [isParticipantsScreenOpen, setIsParticipantsScreenOpen] =
    useState(false);
  const [isRequestsScreenOpen, setIsRequestsScreenOpen] = useState(false);

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
        setParticipants(classroomDocumentSnapshot.data()?.participants ?? []);
        setRequests(classroomDocumentSnapshot.data()?.requests ?? []);

        changeAssignments(classroomDocumentSnapshot.data()?.assignments ?? []);
      }
    };

    getClassroomData();
  }, [classroomID, changeAssignments, ownedClassrooms, attendedClassrooms]);

  const openRequestsScreen = () => setIsRequestsScreenOpen(true);

  const closeRequestsScreen = () => setIsRequestsScreenOpen(false);

  const openParticipantsScreen = () => setIsParticipantsScreenOpen(true);

  const closeParticipantsScreen = () => setIsParticipantsScreenOpen(false);

  return (
    <>
      {user !== null &&
      classroomName !== null &&
      ownerName !== null &&
      assignments !== null &&
      requests !== null &&
      participants !== null &&
      typeof classroomID === "string" ? (
        <>
          <Head>
            <title>Coding Classroom | {classroomName}</title>
          </Head>

          <Title title={classroomName} />

          <Subtitle subtitle={`${ownerName}'s Classroom`} />

          <AssignmentList assignments={assignments} classroomID={classroomID} />

          <ClassroomCodeText code={classroomID} />

          {user.uid === ownerID && (
            <OpenScreenButton openScreen={openRequestsScreen} icon="requests" />
          )}

          <OpenScreenButton
            openScreen={openParticipantsScreen}
            icon="participants"
          />

          {isRequestsScreenOpen && (
            <RequestsScreen
              requests={requests}
              closeRequestsScreen={closeRequestsScreen}
              classroomName={classroomName}
              classroomID={classroomID}
            />
          )}

          {isParticipantsScreenOpen && (
            <ParticipantsScreen
              participants={participants}
              ownerName={ownerName}
              closeParticipantsScreen={closeParticipantsScreen}
            />
          )}

          {user.uid === ownerID && (
            <CreateAssignmentButton classroomID={classroomID} />
          )}
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
