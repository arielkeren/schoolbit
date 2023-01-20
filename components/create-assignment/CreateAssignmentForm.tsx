import { useState } from "react";
import { database } from "../../firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { IAssignment } from "../../types/types";
import { useRouter } from "next/router";
import Calendar from "react-calendar";

interface Props {
  classroomID: string;
}

const CreateAssignmentForm: React.FC<Props> = ({ classroomID }) => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [date, setDate] = useState(new Date());

  const router = useRouter();

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const changeQuestion = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setQuestion(event.target.value);

  const createAssignment = async () => {
    const noUnnecessarySpacesName = name.trim().replace(/\s{2,}/g, " ");
    if (noUnnecessarySpacesName === "" || question.replaceAll(" ", "") === "")
      return;

    const assignmentID = uuidv4();

    const shortenedDate = `${date.toLocaleString("en-US", {
      month: "short",
    })} ${date.getDate()}`;

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomID}`
    );

    const assignmentData: IAssignment = {
      name: noUnnecessarySpacesName,
      question,
      until: shortenedDate,
      answers: [],
      id: assignmentID,
    };

    try {
      await updateDoc(classroomDocumentReference, {
        assignments: arrayUnion(assignmentData),
      });

      router.push(`/classrooms/${classroomID}`);
    } catch {
      alert("Failed to create the assignment");
    }
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
    <form className="flex justify-center mb-10">
      <div className="w-1/2 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-start w-4/5">
            <label htmlFor="name" className="text-2xl font-bold">
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
            className="w-4/5 text-3xl p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold">Until</h2>

          <Calendar
            value={date}
            onChange={setDate}
            calendarType="US"
            minDate={new Date()}
            view="month"
            locale="en-US"
          />
        </div>

        <div className="flex flex-col items-center w-full">
          <div className="flex justify-start w-full">
            <label htmlFor="question" className="text-2xl font-bold">
              Question
            </label>
          </div>
          <textarea
            name="question"
            id="question"
            value={question}
            onChange={changeQuestion}
            className="w-full h-96 text-3xl p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
          />
        </div>

        <input
          type="submit"
          value="Create"
          onClick={validateAssignment}
          className="mt-5 bg-gray-900 text-white py-3 px-12 rounded-lg font-bold text-3xl uppercase cursor-pointer hover:bg-gray-800 transition-colors"
        />
      </div>
    </form>
  );
};

export default CreateAssignmentForm;
