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
import OpenModalButton from "../../../components/classroom/OpenModalButton";
import ParticipantsModal from "../../../components/classroom/ParticipantsModal";
import ClassroomCodeText from "../../../components/classroom/ClassroomCodeText";
import { RequestInterface } from "../../..//types";
import RequestsModal from "../../../components/classroom/RequestsModal";

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
  const [classroomName, setClassroomName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState<string | null>(null);
  const [participants, setParticipants] = useState<string[] | null>(null);
  const [requests, setRequests] = useState<RequestInterface[] | null>(null);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);

  const router = useRouter();
  const { classroomID } = router.query;

  useEffect(() => {
    const getClassroomData = async () => {
      if (
        !ownedClassrooms.some(
          (classroom) => classroom.classroomID === classroomID
        ) &&
        !attendedClassrooms.some(
          (classroom) => classroom.classroomID === classroomID
        )
      )
        return;

      const classroomDocumentReference = doc(
        database,
        `classrooms/${classroomID}`
      );

      const classroomDocumentSnapshot = await getDoc(
        classroomDocumentReference
      );

      const data = classroomDocumentSnapshot.data();

      setClassroomName(data?.classroomName ?? "");
      setDescription(data?.description ?? "");
      setColor(data?.color ?? "");
      setOwnerName(data?.ownerName ?? "");
      setParticipants(data?.participants ?? []);
      setRequests(data?.requests ?? []);
      changeOwnerID(data?.ownerID ?? "");
      changeAssignments(data?.assignments ?? []);
    };

    getClassroomData();
  }, [
    classroomID,
    changeAssignments,
    changeOwnerID,
    ownedClassrooms,
    attendedClassrooms,
  ]);

  const openRequestsModal = () => setIsRequestsModalOpen(true);

  const closeRequestsModal = () => setIsRequestsModalOpen(false);

  const openParticipantsModal = () => setIsParticipantsModalOpen(true);

  const closeParticipantsModal = () => setIsParticipantsModalOpen(false);

  const isOwner = auth.currentUser?.uid === ownerID;

  return (
    <>
      {classroomName &&
      ownerName &&
      assignments &&
      requests &&
      participants &&
      description &&
      color &&
      typeof classroomID === "string" ? (
        <>
          <Head>
            <title>{classroomName} | SchoolBit</title>
          </Head>

          <Title title={classroomName} />

          <Subtitle subtitle={ownerName} />

          <AssignmentList
            assignments={assignments}
            classroomID={classroomID}
            isOwner={isOwner}
          />

          <ClassroomCodeText code={classroomID} />

          {isOwner && (
            <OpenModalButton openModal={openRequestsModal} icon="requests" />
          )}

          <OpenModalButton
            openModal={openParticipantsModal}
            icon="participants"
          />

          {isRequestsModalOpen && (
            <RequestsModal
              requests={requests}
              closeRequestsModal={closeRequestsModal}
              classroomID={classroomID}
              classroomName={classroomName}
              ownerName={ownerName}
              description={description}
              color={color}
            />
          )}

          {isParticipantsModalOpen && (
            <ParticipantsModal
              participants={participants}
              ownerName={ownerName}
              closeParticipantsModal={closeParticipantsModal}
            />
          )}

          {isOwner && <CreateAssignmentButton classroomID={classroomID} />}
        </>
      ) : (
        <>
          <Head>
            <title>Classroom Not Found | SchoolBit</title>
          </Head>

          <Title title="Classroom Not Found" />

          <p className="text-center text-2xl">
            This classroom either doesn&apos;t exist or isn&apos;t one of your
            own or attended classrooms
          </p>
        </>
      )}
    </>
  );
};

export default ClassroomPage;
