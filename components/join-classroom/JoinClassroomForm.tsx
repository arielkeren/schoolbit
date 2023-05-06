import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { database } from "../../firebaseConfig";
import { IRequest } from "../../types/types";
import { useRouter } from "next/router";
import useAppContext from "../../hooks/useAppContext";

const JoinClassroomForm: React.FC = () => {
  const { user } = useAppContext();

  const [classroomCode, setClassroomCode] = useState("");

  const router = useRouter();

  const changeClassroomCode = (event: React.ChangeEvent<HTMLInputElement>) =>
    setClassroomCode(event.target.value);

  const sendClassroomJoinRequest = async () => {
    if (!user || !user.displayName) return;

    const classroomDocumentReference = doc(
      database,
      `classrooms/${classroomCode}`
    );

    const newJoinRequest: IRequest = {
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

    router.push("/attended-classrooms");
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
    <form className="flex justify-center">
      <div className="w-full flex flex-col items-center gap-3 lg:w-4/5 xl:w-1/2">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex flex-col items-center w-4/5">
            <label
              htmlFor="classroom-code"
              className="text-lg text-gray-100 font-bold sm:text-xl"
            >
              Enter Classroom Code
            </label>
            <p className="text-gray-300 font-medium">
              Ask your teacher for the code
            </p>
          </div>
          <input
            type="text"
            name="classroom-code"
            id="classroom-code"
            value={classroomCode}
            onChange={changeClassroomCode}
            onKeyDown={detectEnterKey}
            autoFocus
            className="w-4/5 p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors sm:text-lg"
          />
        </div>
        <input
          type="submit"
          value="Send Request"
          onClick={preventDefault}
          className="mt-5 bg-gray-900 text-white py-3 px-4 rounded font-bold text-2xl uppercase cursor-pointer hover:bg-gray-800 transition-colors lg:text-3xl lg:px-10"
        />
      </div>
    </form>
  );
};

export default JoinClassroomForm;
