import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, database } from "../../firebaseConfig";
import { useRouter } from "next/router";
import { AnswerInterface, AssignmentInterface } from "../../types/types";
import useAppContext from "../../hooks/useAppContext";

interface Props {
  code: string;
}

const SubmitButton: React.FC<Props> = ({ code }) => {
  const { user } = useAppContext();

  const router = useRouter();
  const { classroomID, assignmentID } = router.query;

  const username = user?.displayName;
  const userID = user?.uid;

  const submitCode = async () => {
    if (!username || !userID) return;

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomID}`
    );
    let classroomDocumentSnapshot: DocumentSnapshot<DocumentData> | null = null;

    try {
      classroomDocumentSnapshot = await getDoc(classroomDocumentReference);
    } catch {
      alert("Failed to get the assignment");
      return;
    }

    const data = classroomDocumentSnapshot.data();
    const assignments: AssignmentInterface[] = data?.assignments;
    const assignment = assignments.find(
      (currentAssignment) => currentAssignment.id === assignmentID
    );

    const newAnswer: AnswerInterface = {
      code,
      senderName: username,
      senderID: userID,
      checked: false,
    };
    assignment?.answers.push(newAnswer);

    try {
      await updateDoc(classroomDocumentReference, { assignments });
    } catch {
      alert("Failed to send the answer");
    }
  };

  return (
    <button
      onClick={submitCode}
      className="absolute bottom-6 right-1/2 translate-x-1/2 text-white bg-gray-900 rounded-md text-4xl font-bold uppercase py-3 px-10"
    >
      Submit
    </button>
  );
};

export default SubmitButton;
