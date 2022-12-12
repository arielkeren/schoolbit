import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { auth, database } from "../firebaseConfig";
import {
  ClassroomDataInterface,
  ClassroomInterface,
} from "../types";
import { HexColorPicker } from "react-colorful";

const CreateClassroomForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#aabbcc");

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const changeDescription = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value);

  const createClassroom = async () => {
    const classroomsCollectionReference = collection(database, "classrooms");

    const user = auth.currentUser;

    if (user !== null && user.displayName !== null) {
      const classroomData: ClassroomDataInterface = {
        classroomName: name,
        description,
        color,
        ownerName: user.displayName,
        ownerID: user.uid,
        assignments: [],
        participants: [],
        requests: [],
      };

      let classroomDocumentID: string | null = null;
      try {
        classroomDocumentID = (
          await addDoc(classroomsCollectionReference, classroomData)
        ).id;
      } catch {
        alert("Error creating the classroom... Try again later");
      }

      if (classroomDocumentID !== null) {
        const userClassroomData: ClassroomInterface = {
          classroomName: name,
          ownerName: user.displayName,
          description,
          color,
          classroomID: classroomDocumentID,
        };

        const userDocumentReference = doc(database, `users/${user.uid}`);

        try {
          await setDoc(
            userDocumentReference,
            {
              ownedClassrooms: arrayUnion(userClassroomData),
            },
            { merge: true }
          );
        } catch {
          alert(
            "Error linking the classroom with the user... Try again later "
          );
        }
      } else
        alert(
          "Error getting the classroom's data to link it with the user... Try again later"
        );
    } else alert("Error handling the user's data... Try again later");
  };

  const validateData = () => {
    if (name.replaceAll(" ", "") === "") {
      setName("");
      alert("Cannot create a classroom without a name...");
    } else createClassroom();
  };

  const preventDefault = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    validateData();
  };

  return (
    <>
      {auth.currentUser !== null ? (
        <form className="flex justify-center">
          <div className="w-1/2 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-start w-4/5">
                <label
                  htmlFor="name"
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
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
                className="w-4/5 text-3xl p-3 rounded-md outline-none focus:bg-gray-100"
              />
            </div>

            <div className="flex flex-col items-center w-full">
              <div className="flex justify-start w-4/5">
                <label
                  htmlFor="description"
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                >
                  Description
                </label>
              </div>
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={changeDescription}
                className="w-4/5 text-3xl p-3 rounded-md outline-none focus:bg-gray-100"
              />
            </div>

            <div className="flex flex-col items-center w-full m-5 gap-2">
              <div className="flex justify-center w-4/5">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Color
                </h3>
              </div>
              <HexColorPicker color={color} onChange={setColor} />
            </div>
            <div></div>

            <input
              type="submit"
              value="Create"
              onClick={preventDefault}
              className="mt-5 bg-blue-600 text-white py-3 px-12 rounded-lg font-bold text-3xl cursor-pointer hover:bg-blue-700 transition-colors"
            />
          </div>
        </form>
      ) : (
        <p className="text-white text-3xl font-bold text-center">
          Log in to join a classroom...
        </p>
      )}
    </>
  );
};

export default CreateClassroomForm;
