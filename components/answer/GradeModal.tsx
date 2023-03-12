import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { database } from "../../firebaseConfig";
import { useRouter } from "next/router";
import { IComment, IGrade } from "../../types/types";
import useAppContext from "../../hooks/useAppContext";
import { GrFormClose } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";

interface Props {
  code: string;
  language: string;
  comments: IComment[];
  closeModal: () => void;
}

const GradeModal: React.FC<Props> = ({
  code,
  language,
  comments,
  closeModal,
}) => {
  const { classroom, changeClassroom } = useAppContext();

  const [grade, setGrade] = useState("");

  const router = useRouter();
  const { classroomID, assignmentID, studentID } = router.query as {
    classroomID: string;
    assignmentID: string;
    studentID: string;
  };

  const changeGrade = (event: React.ChangeEvent<HTMLInputElement>) =>
    setGrade(event.target.value);

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  const validateData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (grade.replaceAll(" ", "") === "") {
      alert("Cannot send without a grade");
      setGrade("");
    } else sendGrade();
  };

  const sendGrade = async () => {
    if (!classroom) return;

    const assignment = classroom.assignments.find(
      (currentAssignment) => currentAssignment.id === assignmentID
    );

    if (!assignment) return;

    const answer = assignment.answers.find(
      (currentAnswer) => currentAnswer.senderID === studentID
    );

    if (!answer) return;

    const newAnswers = assignment.answers.filter(
      (currentAnswer) => currentAnswer.senderID !== studentID
    );
    newAnswers.push({
      ...answer,
      grade,
      comments,
      checked: true,
    });

    const newAssignment = { ...assignment, answers: newAnswers };

    const newAssignments = classroom.assignments.filter(
      (currentAssignment) => currentAssignment.id !== assignmentID
    );
    newAssignments.push(newAssignment);

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomID}`
    );

    try {
      await updateDoc(classroomDocumentReference, {
        assignments: newAssignments,
      });
    } catch {
      alert("Failed to mark the answer as checked");
      return;
    }

    const userDocumentReference = doc(database, `users/${studentID}`);

    const newGrade: IGrade = {
      assignmentName: assignment.name,
      classroomName: classroom.classroomName,
      teacherName: classroom.ownerName,
      grade,
      language,
      code,
      comments,
    };

    try {
      await updateDoc(userDocumentReference, {
        grades: arrayUnion(newGrade),
      });
    } catch {
      alert("Failed to send the grade to the student");
      return;
    }

    changeClassroom({ ...classroom, assignments: newAssignments });

    router.push(
      `/classrooms/${classroomID}/assignments/${assignmentID}/answers`
    );
  };

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 h-screen left-0 w-screen backdrop-brightness-90 flex justify-center items-center"
    >
      <div
        onClick={stopPropagation}
        className="relative w-72 bg-white py-20 flex flex-col justify-center items-center rounded shadow-md sm:w-96"
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 rounded transition-colors hover:bg-gray-200"
        >
          <GrFormClose className="text-4xl" />
        </button>

        <div className="absolute top-2 bg-gray-800 py-2 px-10 rounded">
          <AiFillEdit className="text-3xl text-gray-200" />
        </div>

        <form onSubmit={validateData} className="flex justify-center">
          <div className="w-full flex flex-col items-center gap-8">
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-start w-4/5">
                <label htmlFor="grade" className="text-xl font-bold">
                  Grade
                </label>
              </div>
              <input
                type="text"
                name="grade"
                id="grade"
                value={grade}
                onChange={changeGrade}
                className="w-4/5 p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors sm:text-lg"
              />
            </div>

            <input
              type="submit"
              value="Send"
              className="mt-5 bg-gray-900 text-white py-3 px-12 rounded-lg font-bold text-3xl uppercase cursor-pointer hover:bg-gray-800 transition-colors"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GradeModal;
