import { useEffect, useState } from "react";
import { database } from "../../firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { IAssignment } from "../../types/types";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import useAppContext from "../../hooks/useAppContext";
import ProgrammingLanguagePicker from "../general/ProgrammingLanguagePicker";
import { TfiLock, TfiUnlock } from "react-icons/tfi";

const CreateAssignmentForm: React.FC = () => {
  const { classroom, changeClassroom } = useAppContext();

  const [name, setName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isLanguageLocked, setIsLanguageLocked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [question, setQuestion] = useState("");
  const [loaded, setLoaded] = useState(false);

  const router = useRouter();
  const { classroomID } = router.query as { classroomID: string };

  useEffect(() => {
    const storedName = localStorage.getItem("SchoolBit-Name");
    const storedLanguage = localStorage.getItem("SchoolBit-Language");
    const storedIsLanguageLocked = localStorage.getItem(
      "SchoolBit-IsLanguageLocked"
    );
    const storedDueDate = localStorage.getItem("SchoolBit-DueDate");
    const storedQuestion = localStorage.getItem("SchoolBit-Question");

    setName(storedName ?? "");
    setLanguage(storedLanguage ?? "javascript");
    setIsLanguageLocked(storedIsLanguageLocked === "true");
    setDate(storedDueDate ? new Date(storedDueDate) : new Date());
    setQuestion(storedQuestion ?? "");
  }, []);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }

    const formattedDate = `${date.toLocaleString("en-US", {
      month: "short",
    })} ${date.getDate()} ${date.getFullYear()}`;

    localStorage.setItem("SchoolBit-DueDate", formattedDate);
  }, [date, loaded]);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    localStorage.setItem("SchoolBit-Name", event.target.value);
  };

  const changeQuestion = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
    localStorage.setItem("SchoolBit-Question", event.target.value);
  };

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
    localStorage.setItem("SchoolBit-Language", event.target.value);
  };

  const lockLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLanguageLocked(true);
    localStorage.setItem("SchoolBit-IsLanguageLocked", "true");
  };

  const unlockLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLanguageLocked(false);
    localStorage.setItem("SchoolBit-IsLanguageLocked", "false");
  };

  const createAssignment = async () => {
    const noUnnecessarySpacesName = name.trim().replace(/\s{2,}/g, " ");
    if (
      noUnnecessarySpacesName === "" ||
      question.replaceAll(" ", "") === "" ||
      !classroom
    )
      return;

    const assignmentID = uuidv4();

    const shortenedDate = `${date.toLocaleString("en-US", {
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

    try {
      await updateDoc(classroomDocumentReference, {
        assignments: arrayUnion(newAssignment),
      });
    } catch {
      alert("Failed to create the assignment");
      return;
    }

    changeClassroom({
      ...classroom,
      assignments: [...classroom.assignments, newAssignment],
    });

    const keyNames = [
      "SchoolBit-Language",
      "SchoolBit-Name",
      "SchoolBit-DueDate",
      "SchoolBit-IsLanguageLocked",
      "SchoolBit-Question",
    ];
    keyNames.forEach((keyName) => localStorage.removeItem(keyName));

    router.push(`/classrooms/${classroomID}`);
  };

  const validateAssignment = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    const noUnnecessarySpacesName = name.trim().replace(/\s{2,}/g, " ");

    if (noUnnecessarySpacesName === "") {
      alert("Cannot create an assignment without a name");
      setName("");
    } else if (question.replaceAll(" ", "") === "") {
      alert("Cannot create an assignment without a question");
      setQuestion("");
    } else createAssignment();
  };

  return (
    <form className="flex justify-center">
      <div className="w-full flex flex-col items-center gap-8 lg:w-4/5 xl:w-1/2">
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-start w-4/5">
            <label
              htmlFor="name"
              className="text-lg text-gray-100 font-bold sm:text-xl"
            >
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

        <h2 className="text-xl text-gray-100 font-bold">Language</h2>

        <div className="flex items-center gap-1">
          {isLanguageLocked ? (
            <button
              onClick={unlockLanguage}
              className="hover:bg-gray-900 p-2 rounded-full"
            >
              <TfiLock className="text-xl text-red-600" />
            </button>
          ) : (
            <button
              onClick={lockLanguage}
              className="hover:bg-gray-900 p-2 rounded-full"
            >
              <TfiUnlock className="text-xl text-green-600" />
            </button>
          )}

          <ProgrammingLanguagePicker
            languageID={language}
            changeLanguage={changeLanguage}
          />
        </div>

        <h2 className="text-xl text-gray-100 font-bold">Due Date</h2>

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
            <label
              htmlFor="question"
              className="text-lg text-gray-100 font-bold sm:text-xl"
            >
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
          value="Create"
          onClick={validateAssignment}
          className="mt-5 bg-gray-900 text-white py-3 px-12 rounded font-bold text-3xl uppercase cursor-pointer hover:bg-gray-800 transition-colors"
        />
      </div>
    </form>
  );
};

export default CreateAssignmentForm;
