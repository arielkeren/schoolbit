import styles from "../styles/ParticipantsScreen.module.css";
import { IoMdClose } from "react-icons/io";
import { RequestInterface } from "../types";
import RequestList from "./RequestList";

interface Props {
  requests: RequestInterface[];
  closeRequestsScreen: () => void;
  classroomName: string;
  classroomID: string;
}

const ParticipantsScreen: React.FC<Props> = ({
  requests,
  closeRequestsScreen,
  classroomName,
  classroomID,
}) => {
  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  return (
    <div className={styles.outerContainer} onClick={closeRequestsScreen}>
      <div className={styles.innerContainer} onClick={stopPropagation}>
        <h2 className={styles.title}>Requests</h2>
        <button onClick={closeRequestsScreen} className={styles.closeButton}>
          <IoMdClose className={styles.closeIcon} />
        </button>
        <RequestList
          requests={requests}
          classroomName={classroomName}
          classroomID={classroomID}
        />
      </div>
    </div>
  );
};

export default ParticipantsScreen;
