import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { database } from "../../firebaseConfig";
import useAppContext from "../../hooks/useAppContext";
import { IClassroom, IParticipant, IRequest } from "../../types/types";

interface Props {
  request: IRequest;
}

const Request: React.FC<Props> = ({ request }) => {
  const { user, classroom, changeClassroom } = useAppContext();

  const router = useRouter();
  const { classroomID } = router.query as { classroomID: string };

  const acceptRequest = async () => {
    if (!classroom) return;

    const newRequests = classroom.requests.filter(
      (currentRequest) => currentRequest.senderID !== request.senderID
    );

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomID}`
    );

    const newParticipant: IParticipant = {
      name: request.senderName,
      id: request.senderID,
    };

    try {
      await updateDoc(classroomDocumentReference, {
        requests: newRequests,
        participants: arrayUnion(newParticipant),
      });
    } catch {
      alert("Failed to remove the request and add the student");
      return;
    }

    const newAttendedClassroom: IClassroom = {
      classroomID,
      classroomName: classroom.classroomName,
      ownerName: classroom.ownerName,
      description: classroom.description,
      color: classroom.color,
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
      return;
    }

    changeClassroom({
      ...classroom,
      requests: newRequests,
      participants: [...classroom.participants, newParticipant],
    });
  };

  const removeRequest = async () => {
    if (!classroom) return;

    const newRequests = classroom.requests.filter(
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
      return;
    }

    changeClassroom({ ...classroom, requests: newRequests });
  };

  if (user?.uid === request.senderID) removeRequest();

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
