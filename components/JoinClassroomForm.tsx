import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, database } from "../firebaseConfig";
import { RequestInterface } from "../types";

const JoinClassroomForm: React.FC = () => {
  const [classroomCode, setClassroomCode] = useState("");

  const user = auth.currentUser;

  const changeClassroomCode = (event: React.ChangeEvent<HTMLInputElement>) =>
    setClassroomCode(event.target.value);

  const sendClassroomJoinRequest = async () => {
    if (user === null || user.displayName === null) return;

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomCode}`
    );

    const newJoinRequest: RequestInterface = {
      senderName: user.displayName,
      senderID: user.uid,
    };

    try {
      await updateDoc(classroomDocumentReference, {
        requests: arrayUnion(newJoinRequest),
      });
    } catch {
      alert("Classroom doesn't exist");
    }
  };

  const checkIfValidClassroomCode = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (classroomCode.length !== 20) {
      alert("Invalid classroom code");
      return;
    }

    sendClassroomJoinRequest();
  };

  return (
    <form>
      <label htmlFor="classroom-code">Classroom Code</label>
      <input
        type="text"
        name="classroom-code"
        id="classroom-code"
        value={classroomCode}
        onChange={changeClassroomCode}
      />
      <input type="submit" onClick={checkIfValidClassroomCode} />
    </form>
  );
};

export default JoinClassroomForm;
