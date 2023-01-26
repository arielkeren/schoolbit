import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { database } from "../../firebaseConfig";
import { useRouter } from "next/router";
import { IGrade } from "../../types/types";
import useAppContext from "../../hooks/useAppContext";

const GradeForm: React.FC = () => {
  const { classroom } = useAppContext();

  const [grade, setGrade] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const { classroomID, assignmentID, studentID } = router.query as {
    classroomID: string;
    assignmentID: string;
    studentID: string;
  };

  const changeGrade = (event: React.ChangeEvent<HTMLInputElement>) =>
    setGrade(event.target.value);

  const changeMessage = (event: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(event.target.value);

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

    const answer = assignment.answers?.find(
      (currentAnswer) => currentAnswer.senderID === studentID
    );

    if (!answer) return;

    const newAnswers = assignment.answers.filter(
      (currentAnswer) => currentAnswer.senderID !== studentID
    );
    newAnswers.push({
      ...answer,
      checked: true,
    });

    const newAssignments = {
      ...classroom.assignments,
      answers: newAnswers,
    };

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomID}`
    );

    try {
      await updateDoc(classroomDocumentReference, {
        newAssignments,
      });
    } catch {
      alert("Failed to mark the answer as checked");
      return;
    }

    const userDocumentReference = doc(database, `users/${studentID}`);

    const newGrade: IGrade = {
      assignmentName: assignment.name,
      grade,
      message,
      assignmentID,
    };

    try {
      await updateDoc(userDocumentReference, {
        grades: arrayUnion(newGrade),
      });
    } catch {
      alert("Failed to send the grade to the student");
      return;
    }

    router.push(
      `/classrooms/${classroomID}/assignments/${assignmentID}/answers`
    );
  };

  return (
    <form onSubmit={validateData} className="flex justify-center mb-10">
      <div className="w-1/2 flex flex-col items-center gap-3">
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-start w-4/5">
            <label htmlFor="grade" className="text-2xl font-bold">
              Grade
            </label>
          </div>
          <input
            type="text"
            name="grade"
            id="grade"
            placeholder="100"
            autoFocus
            value={grade}
            onChange={changeGrade}
            className="w-4/5 text-3xl p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
          />
        </div>

        <div className="flex flex-col items-center w-full">
          <div className="flex justify-start w-4/5">
            <label htmlFor="message" className="text-2xl font-bold">
              Message
            </label>
          </div>
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Excellent!"
            value={message}
            onChange={changeMessage}
            className="w-4/5 text-3xl p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
          />
        </div>

        <input
          type="submit"
          value="Send"
          className="mt-5 bg-gray-900 text-white py-3 px-12 rounded-lg font-bold text-3xl uppercase cursor-pointer hover:bg-gray-800 transition-colors"
        />
      </div>
    </form>
  );
};

export default GradeForm;
