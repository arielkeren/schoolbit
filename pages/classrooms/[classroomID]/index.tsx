import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { auth, database } from "../../../firebaseConfig";
import { ClassroomInterface } from "../../../types";
import { useState, useEffect } from "react";
import { AssignmentInterface } from "../../../types";
import Title from "../../../components/general/Title";
import Subtitle from "../../../components/classroom/Subtitle";
import AssignmentList from "../../../components/classroom/AssignmentList";
import CreateAssignmentButton from "../../../components/classroom/CreateAssignmentButton";
import OpenScreenButton from "../../../components/classroom/OpenScreenButton";
import ParticipantsScreen from "../../../components/classroom/ParticipantsScreen";
import ClassroomCodeText from "../../../components/classroom/ClassroomCodeText";
import { RequestInterface } from "../../..//types";
import RequestsScreen from "../../../components/classroom/RequestsScreen";

interface Props {
  ownedClassrooms: ClassroomInterface[];
  attendedClassrooms: ClassroomInterface[];
  assignments: AssignmentInterface[];
  ownerID: string;
  changeAssignments: (assignmentArray: AssignmentInterface[]) => void;
  changeOwnerID: (ownerID: string) => void;
}

const ClassroomPage: React.FC<Props> = ({
  ownedClassrooms,
  attendedClassrooms,
  assignments,
  ownerID,
  changeAssignments,
  changeOwnerID,
}) => {
  const router = useRouter();

  const [classroomName, setClassroomName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState<string | null>(null);
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
        setDescription(classroomDocumentSnapshot.data()?.description ?? "");
        setColor(classroomDocumentSnapshot.data()?.color ?? "");
        setOwnerName(classroomDocumentSnapshot.data()?.ownerName ?? "");
        setParticipants(classroomDocumentSnapshot.data()?.participants ?? []);
        setRequests(classroomDocumentSnapshot.data()?.requests ?? []);
        changeOwnerID(classroomDocumentSnapshot.data()?.ownerID ?? "");
        changeAssignments(classroomDocumentSnapshot.data()?.assignments ?? []);
      }
    };

    getClassroomData();
  }, [
    classroomID,
    changeAssignments,
    changeOwnerID,
    ownedClassrooms,
    attendedClassrooms,
  ]);

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
      description !== null &&
      color !== null &&
      typeof classroomID === "string" ? (
        <>
          <Head>
            <title>Coding Classroom | {classroomName}</title>
          </Head>

          <Title title={classroomName} />

          <Subtitle subtitle={ownerName} />

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
              classroomID={classroomID}
              classroomName={classroomName}
              ownerName={ownerName}
              description={description}
              color={color}
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
