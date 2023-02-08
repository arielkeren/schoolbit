import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { database } from "../../firebaseConfig";
import useAppContext from "../../hooks/useAppContext";
import { IClassroom, IParticipant } from "../../types/types";

interface Props {
  student: IParticipant;
  participants: IParticipant[];
}

const Student: React.FC<Props> = ({ student, participants }) => {
  const { user, classroom, changeClassroom } = useAppContext();

  const router = useRouter();
  const { classroomID } = router.query as { classroomID: string };

  const removeStudentFromClassroom = async () => {
    if (!classroom) return false;

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomID}`
    );

    const newParticipants = participants.filter(
      (participant) => participant.id !== student.id
    );

    try {
      await updateDoc(classroomDocumentReference, {
        participants: newParticipants,
      });
    } catch {
      alert("Failed to kick the student");
      return false;
    }

    changeClassroom({ ...classroom, participants: newParticipants });
    return true;
  };

  const removeAttendedClassroom = async () => {
    const userDocumentReference = doc(database, `users/${student.id}`);

    let userDocumentSnapshot: DocumentSnapshot<DocumentData>;
    try {
      userDocumentSnapshot = await getDoc(userDocumentReference);
    } catch {
      alert("Failed to get the student's attended classrooms to remove from");
      return;
    }

    const data = userDocumentSnapshot.data();
    if (!data) return;

    const { attendedClassrooms } = data as { attendedClassrooms: IClassroom[] };

    const newAttendedClassrooms = attendedClassrooms.filter(
      (attendedClassroom) => attendedClassroom.classroomID !== classroomID
    );

    try {
      await updateDoc(userDocumentReference, {
        attendedClassrooms: newAttendedClassrooms,
      });
    } catch {
      alert(
        "Failed to remove this classroom from the student's attended classrooms"
      );
    }
  };

  const kick = () => {
    if (!removeStudentFromClassroom()) return;
    removeAttendedClassroom();
  };

  return (
    <div className="bg-gray-900 flex flex-col gap-1 justify-between p-5 items-center rounded border-b-4 border-gray-700 md:flex-row">
      <p className="text-slate-300 text-2xl">{student.name}</p>

      {user?.uid === classroom?.ownerID && (
        <button
          onClick={kick}
          className="text-white rounded-md w-28 h-14 font-bold text-xl cursor-pointer uppercase hover:bg-red-700 transition-colors"
        >
          Kick
        </button>
      )}
    </div>
  );
};

export default Student;
