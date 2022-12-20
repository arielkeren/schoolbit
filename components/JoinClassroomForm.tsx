import { arrayUnion, doc, updateDoc } from "firebase/firestore";
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

  const preventDefault = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    validateClassroomCode();
  };

  const validateClassroomCode = () => {
    if (classroomCode.length !== 20) {
      alert("Invalid classroom code");
      return;
    }

    sendClassroomJoinRequest();
  };

  const detectEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      validateClassroomCode();
    }
  };

  return (
    <>
      {auth.currentUser !== null ? (
        <form className="flex justify-center">
          <div className="w-1/2 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-start w-4/5">
                <label htmlFor="classroom-code" className="text-2xl font-bold">
                  Classroom Code
                </label>
              </div>
              <input
                type="text"
                name="classroom-code"
                id="classroom-code"
                value={classroomCode}
                onChange={changeClassroomCode}
                onKeyDown={detectEnterKey}
                autoFocus
                className="w-4/5 text-3xl p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
              />
            </div>
            <input
              type="submit"
              value="SEND REQUEST"
              onClick={preventDefault}
              className="mt-5 bg-gray-900 text-white py-3 px-12 rounded-lg font-bold text-3xl cursor-pointer hover:bg-gray-800 transition-colors"
            />
          </div>
        </form>
      ) : (
        <p className="text-3xl font-bold text-center">
          Log in to join a classroom...
        </p>
      )}
    </>
  );
};

export default JoinClassroomForm;
