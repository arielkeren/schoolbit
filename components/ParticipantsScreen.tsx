import { useState } from "react";
import styles from "../styles/ParticipantsScreen.module.css";
import { IoMdClose } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import Participant from "./Participant";

interface Props {
  participants: string[];
  ownerName: string;
  closeParticipantsScreen: () => void;
}

const ParticipantsScreen: React.FC<Props> = ({
  participants,
  ownerName,
  closeParticipantsScreen,
}) => {
  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  return (
    <div className={styles.outerContainer} onClick={closeParticipantsScreen}>
      <div className={styles.innerContainer} onClick={stopPropagation}>
        <h2 className={styles.title}>Participants</h2>
        <button
          onClick={closeParticipantsScreen}
          className={styles.closeButton}
        >
          <IoMdClose className={styles.closeIcon} />
        </button>
        <h3 className={styles.sectionHeading}>Owner</h3>
        <Participant name={ownerName} />
        <hr className={styles.separator} />
        <h3 className={styles.sectionHeading}>Students</h3>
        {participants.length === 0 ? (
          <p>Looks like there aren&apos;t any students yet...</p>
        ) : (
          <>
            {participants.map((participant, index) => (
              <Participant name={participant} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ParticipantsScreen;
