import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, database } from "../../firebaseConfig";
import { RequestInterface } from "../../types/types";
import { useRouter } from "next/router";

const JoinClassroomForm: React.FC = () => {
  const [classroomCode, setClassroomCode] = useState("");

  const router = useRouter();

  const changeClassroomCode = (event: React.ChangeEvent<HTMLInputElement>) =>
    setClassroomCode(event.target.value);

  const sendClassroomJoinRequest = async () => {
    const user = auth.currentUser;
    if (!user || !user.displayName) return;

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
      alert("Failed to send a join request\nClassroom possibly doesn't exist");
      return;
    }

    router.push("/");
  };

  const preventDefault = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    validateClassroomCode();
  };

  const validateClassroomCode = () => {
    if (classroomCode.length === 20) sendClassroomJoinRequest();
    else alert("Invalid classroom code\nCode needs to be 20 characters long");
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
              value="Send request"
              onClick={preventDefault}
              className="mt-5 bg-gray-900 text-white py-3 px-12 rounded-lg font-bold text-3xl uppercase cursor-pointer hover:bg-gray-800 transition-colors"
            />
          </div>
        </form>
      ) : (
        <p className="text-3xl font-bold text-center">
          Log in to join a classroom
        </p>
      )}
    </>
  );
};

export default JoinClassroomForm;
