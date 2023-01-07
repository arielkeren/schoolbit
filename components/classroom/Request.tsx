import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "../../firebaseConfig";
import { ClassroomInterface, RequestInterface } from "../../types";

interface Props {
  request: RequestInterface;
  requests: RequestInterface[];
  classroomID: string;
  classroomName: string;
  ownerName: string;
  description: string;
  color: string;
}

const Request: React.FC<Props> = ({
  request,
  requests,
  classroomID,
  classroomName,
  ownerName,
  description,
  color,
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
      alert("Failed to remove the request and add the student");
      return;
    }

    const newAttendedClassroom: ClassroomInterface = {
      classroomID,
      classroomName,
      ownerName,
      description,
      color,
    };

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
      alert("Failed to connect the classroom with the student");
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
      alert("Failed to remove the request");
    }
  };

  if (auth.currentUser !== null && auth.currentUser.uid === request.senderID)
    removeRequest();

  return (
    <div className="bg-gray-900 flex flex-col gap-1 justify-between p-5 items-center rounded border-b-4 border-gray-700 md:flex-row">
      <p className="text-slate-300 text-2xl">{request.senderName}</p>
      <div className="flex gap-3">
        <button
          onClick={acceptRequest}
          className="text-white rounded-md w-28 h-14 font-bold text-xl cursor-pointer uppercase hover:bg-blue-700 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={removeRequest}
          className="text-white rounded-md w-28 h-14 font-bold text-xl cursor-pointer uppercase hover:bg-red-700 transition-colors"
        >
          Deny
        </button>
      </div>
    </div>
  );
};

export default Request;
