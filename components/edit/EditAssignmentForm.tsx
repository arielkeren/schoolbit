import { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { IAssignment } from "../../types/types";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import useAppContext from "../../hooks/useAppContext";
import ProgrammingLanguagePicker from "../general/ProgrammingLanguagePicker";
import { TfiLock, TfiUnlock } from "react-icons/tfi";

const EditAssignmentForm: React.FC = () => {
  const { classroom, changeClassroom } = useAppContext();

  const router = useRouter();
  const { classroomID, assignmentID } = router.query as {
    classroomID: string;
    assignmentID: string;
  };

  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [date, setDate] = useState(new Date());
  const [language, setLanguage] = useState("javascript");
  const [isLanguageLocked, setIsLanguageLocked] = useState(false);

  useEffect(() => {
    const assignment = classroom?.assignments.find(
      (currentAssignment) => currentAssignment.id === assignmentID
    );

    const currentYear = new Date().getFullYear();
    const assignmentMonth = assignment?.until.slice(0, 3);
    const assignmentDate = assignment?.until.slice(4);

    const dateFormat = new Date(
      `${assignmentMonth} ${assignmentDate}, ${currentYear}`
    );

    setName(assignment?.name ?? "");
    setQuestion(assignment?.question ?? "");
    setDate(dateFormat);
    setLanguage(assignment?.language ?? "javascript");
    setIsLanguageLocked(assignment?.isLanguageLocked ?? false);
  }, [classroom, assignmentID]);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const changeQuestion = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setQuestion(event.target.value);

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setLanguage(event.target.value);

  const lockLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLanguageLocked(true);
  };

  const unlockLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLanguageLocked(false);
  };

  const editAssignment = async () => {
    if (!classroom) return;

    const noUnnecessarySpacesName = name.trim().replace(/\s{2,}/g, " ");
    if (noUnnecessarySpacesName === "" || question.replaceAll(" ", "") === "")
      return;

    const shortenedDate = `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()}`;

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomID}`
    );

    const newAssignment: IAssignment = {
      name: noUnnecessarySpacesName,
      question,
      until: shortenedDate,
      language,
      isLanguageLocked,
      answers: [],
      id: assignmentID,
    };

    const assignmentIndex = classroom.assignments.findIndex(
      (currentAssignment) => currentAssignment.id === assignmentID
    );

    const newAssignments = [...classroom.assignments];
    newAssignments[assignmentIndex] = newAssignment;

    try {
      await updateDoc(classroomDocumentReference, {
        assignments: newAssignments,
      });
    } catch {
      alert("Failed to edit the assignment");
      return;
    }

    changeClassroom({ ...classroom, assignments: newAssignments });
    router.push(`/classrooms/${classroomID}/assignments/${assignmentID}`);
  };

  const validateAssignment = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!name || !question || !date) return;

    const noUnnecessarySpacesName = name.trim().replace(/\s{2,}/g, " ");

    if (noUnnecessarySpacesName === "") {
      alert("Cannot edit the assignment to not have a name");
      setName("");
    } else if (question.replaceAll(" ", "") === "") {
      alert("Cannot edit the assignment to not have a question");
      setQuestion("");
    } else editAssignment();
  };

  return (
    <form className="flex justify-center">
      <div className="w-full flex flex-col items-center gap-8 lg:w-4/5 xl:w-1/2">
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-start w-4/5">
            <label htmlFor="name" className="text-lg font-bold sm:text-xl">
              Name
            </label>
          </div>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={changeName}
            autoFocus
            className="w-4/5 p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors sm:text-lg"
          />
        </div>

        <h2 className="text-xl font-bold">Language</h2>

        <div className="flex items-center gap-1">
          {isLanguageLocked ? (
            <button
              onClick={unlockLanguage}
              className="hover:bg-gray-100 p-1 rounded-full"
            >
              <TfiLock className="text-xl text-red-600" />
            </button>
          ) : (
            <button
              onClick={lockLanguage}
              className="hover:bg-gray-100 p-1 rounded-full"
            >
              <TfiUnlock className="text-xl text-green-600" />
            </button>
          )}

          <ProgrammingLanguagePicker
            languageID={language}
            changeLanguage={changeLanguage}
          />
        </div>

        <h2 className="text-xl font-bold">Due Date</h2>

        <Calendar
          value={date}
          onChange={setDate}
          calendarType="US"
          minDate={new Date()}
          view="month"
          locale="en-US"
        />

        <div className="flex flex-col items-center w-full">
          <div className="flex justify-start w-full">
            <label htmlFor="question" className="text-lg font-bold sm:text-xl">
              Question
            </label>
          </div>
          <textarea
            name="question"
            id="question"
            value={question}
            onChange={changeQuestion}
            className="w-full h-96 p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors sm:text-lg"
          />
        </div>

        <input
          type="submit"
          value="Save"
          onClick={validateAssignment}
          className="mt-5 bg-gray-900 text-white py-3 px-12 rounded-lg font-bold text-3xl uppercase cursor-pointer hover:bg-gray-800 transition-colors"
        />
      </div>
    </form>
  );
};

export default EditAssignmentForm;
