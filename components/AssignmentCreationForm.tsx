import styles from "../styles/AssignmentCreationForm.module.css";
import { useState } from "react";
import { database } from "../firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { AssignmentInterface } from "../types";
import { useRouter } from "next/router";

interface Props {
  assignmentName: string;
  classroomID: string;
}

const AssignmentCreationForm: React.FC<Props> = ({
  assignmentName,
  classroomID,
}) => {
  const router = useRouter();

  const [question, setQuestion] = useState("");

  const changeQuestion = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setQuestion(event.target.value);

  const createAssignment = async () => {
    const assignmentID = uuidv4();

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomID}`
    );

    const assignmentData: AssignmentInterface = {
      name: assignmentName,
      question,
      answers: [],
      id: assignmentID,
    };

    try {
      await updateDoc(classroomDocumentReference, {
        assignments: arrayUnion(assignmentData),
      });

      router.push(`/classrooms/${classroomID}`);
    } catch {
      alert("Error creating the assignment... Try again later");
    }
  };

  const performChecksBeforeAssignmentCreation = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (question.replaceAll(" ", "") === "") {
      alert("Cannot create an assignment without a question");
      setQuestion("");
    } else {
      createAssignment();
    }
  };

  return (
    <form className={styles.form}>
      <label htmlFor="question" className={styles.label}>
        Question
      </label>
      <textarea
        name="question"
        id="question"
        autoFocus
        value={question}
        onChange={changeQuestion}
        maxLength={300}
        className={styles.input}
      />
      <input
        type="submit"
        value="Create"
        onClick={performChecksBeforeAssignmentCreation}
        className={styles.button}
      />
    </form>
  );
};

export default AssignmentCreationForm;
