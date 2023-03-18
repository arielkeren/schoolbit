import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useRouter } from "next/router";
import { IAnswer } from "../../types/types";
import useAppContext from "../../hooks/useAppContext";

interface Props {
  code: string;
  language: string;
  closeCodeView: () => void;
}

const SubmitButton: React.FC<Props> = ({ code, language, closeCodeView }) => {
  const { user, classroom, changeClassroom } = useAppContext();

  const router = useRouter();
  const { classroomID, assignmentID } = router.query as {
    classroomID: string;
    assignmentID: string;
  };

  const username = user?.displayName;
  const userID = user?.uid;

  const submitCode = async () => {
    if (!username || !userID || !classroom) return;

    if (code.replaceAll(" ", "").replace(/[\r\n]+/gm, "") === "") {
      alert("Cannot submit empty code");
      return;
    }

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomID}`
    );

    const newAssignments = [...classroom.assignments];
    const assignment = newAssignments.find(
      (currentAssignment) => currentAssignment.id === assignmentID
    );

    if (!assignment) {
      alert("Failed to load the classroom's data");
      return;
    }

    const newAnswer: IAnswer = {
      code,
      language,
      senderName: username,
      senderID: userID,
      grade: "",
      comments: [],
      checked: false,
    };
    assignment.answers.push(newAnswer);

    try {
      await updateDoc(classroomDocumentReference, {
        assignments: newAssignments,
      });
    } catch {
      alert("Failed to send the answer");
      return;
    }

    changeClassroom({ ...classroom, assignments: newAssignments });
    localStorage.removeItem(`SchoolBit-${assignmentID}`);
    closeCodeView();
  };

  return (
    <button
      onClick={submitCode}
      className="uppercase font-semibold text-xl text-gray-300"
    >
      Submit
    </button>
  );
};

export default SubmitButton;
