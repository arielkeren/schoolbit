import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "../firebaseConfig";
import styles from "../styles/Request.module.css";
import { RequestInterface } from "../types";

interface Props {
  request: RequestInterface;
  requests: RequestInterface[];
  classroomName: string;
  classroomID: string;
}

const Request: React.FC<Props> = ({
  request,
  requests,
  classroomName,
  classroomID,
}) => {
  const acceptRequest = async () => {
    const newRequests = requests.filter(
      (currentRequest) => currentRequest.senderID !== request.senderID
    );

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomID}`
    );

    try {
      await updateDoc(classroomDocumentReference, {
        requests: newRequests,
        participants: arrayUnion(request.senderName),
      });
    } catch {
      alert("Error removing the request and adding the participant");
    }

    const newAttendedClassroom = { classroomName, classroomID };

    const userDocumentReference = doc(database, `users/${request.senderID}`);

    try {
      await setDoc(
        userDocumentReference,
        {
          attendedClassrooms: arrayUnion(newAttendedClassroom),
        },
        { merge: true }
      );
    } catch {
      alert("Error connecting the classroom with the requesting user");
    }
  };

  const removeRequest = async () => {
    const newRequests = requests.filter(
      (currentRequest) => currentRequest.senderID !== request.senderID
    );

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomID}`
    );

    try {
      await updateDoc(classroomDocumentReference, { requests: newRequests });
    } catch {
      alert("Error removing the request");
    }
  };

  if (auth.currentUser !== null && auth.currentUser.uid === request.senderID)
    removeRequest();

  return (
    <div className={styles.container}>
      <p className={styles.name}>{request.senderName}</p>
      <div className={styles.buttonsContainer}>
        <button onClick={acceptRequest} className={styles.acceptButton}>
          Accept
        </button>
        <button onClick={removeRequest} className={styles.denyButton}>
          Deny
        </button>
      </div>
    </div>
  );
};

export default Request;
