import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Title from "../../../components/general/Title";
import Subtitle from "../../../components/classroom/Subtitle";
import AssignmentList from "../../../components/classroom/AssignmentList";
import CreateAssignmentButton from "../../../components/classroom/CreateAssignmentButton";
import OpenModalButton from "../../../components/classroom/OpenModalButton";
import ParticipantsModal from "../../../components/classroom/ParticipantsModal";
import ClassroomCodeText from "../../../components/classroom/ClassroomCodeText";
import RequestsModal from "../../../components/classroom/RequestsModal";
import useAppContext from "../../../hooks/useAppContext";

const ClassroomPage: React.FC = () => {
  const { user, classroom, getClassroom } = useAppContext();

  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);

  const router = useRouter();
  const { classroomID } = router.query;

  useEffect(() => {
    if (typeof classroomID === "string") getClassroom(classroomID);
  }, [getClassroom, classroomID]);

  const openRequestsModal = () => setIsRequestsModalOpen(true);

  const closeRequestsModal = () => setIsRequestsModalOpen(false);

  const openParticipantsModal = () => setIsParticipantsModalOpen(true);

  const closeParticipantsModal = () => setIsParticipantsModalOpen(false);

  return (
    <>
      {classroom && typeof classroomID === "string" ? (
        <>
          <Head>
            <title>{classroom.classroomName} | SchoolBit</title>
          </Head>

          <Title title={classroom.classroomName} />

          <Subtitle subtitle={classroom.ownerName} />

          <AssignmentList />

          <ClassroomCodeText />

          {user?.uid === classroom.ownerID && (
            <OpenModalButton openModal={openRequestsModal} icon="requests" />
          )}

          <OpenModalButton
            openModal={openParticipantsModal}
            icon="participants"
          />

          {isRequestsModalOpen && (
            <RequestsModal closeRequestsModal={closeRequestsModal} />
          )}

          {isParticipantsModalOpen && (
            <ParticipantsModal
              closeParticipantsModal={closeParticipantsModal}
            />
          )}

          {user?.uid === classroom.ownerID && <CreateAssignmentButton />}
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
