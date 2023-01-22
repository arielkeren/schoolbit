import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { auth, database } from "../../firebaseConfig";
import { IClassroomData, IClassroom } from "../../types/types";
import { HexColorPicker } from "react-colorful";
import { useRouter } from "next/router";
import useAppContext from "../../hooks/useAppContext";

const CreateClassroomForm: React.FC = () => {
  const { user, addOwnedClassroom } = useAppContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#aabbcc");

  const router = useRouter();

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const changeDescription = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value);

  const createClassroom = async () => {
    const classroomsCollectionReference = collection(database, "classrooms");

    if (!user?.displayName) return;

    const classroomData: IClassroomData = {
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
      alert("Failed to create the classroom");
      return;
    }

    const userClassroomData: IClassroom = {
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
      alert("Failed to connect the classroom");
      return;
    }

    addOwnedClassroom(userClassroomData);
    router.push("/");
  };

  const validateData = () => {
    if (name.replaceAll(" ", "") === "") {
      setName("");
      alert("Cannot create a classroom without a name");
    } else createClassroom();
  };

  const preventDefault = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    validateData();
  };

  return (
    <>
      {auth.currentUser ? (
        <form className="flex justify-center mb-10">
          <div className="w-1/2 flex flex-col items-center gap-3">
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

            <div className="flex flex-col items-center w-full">
              <div className="flex justify-start w-4/5">
                <label htmlFor="description" className="text-2xl font-bold">
                  Description
                </label>
              </div>
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={changeDescription}
                className="w-4/5 text-3xl p-3 rounded-md outline-none bg-gray-100 focus:bg-gray-200 transition-colors"
              />
            </div>

            <div className="flex flex-col items-center w-full m-5 gap-2">
              <div className="flex justify-center w-4/5">
                <h3 className="text-2xl font-bold">Choose Color</h3>
              </div>
              <HexColorPicker
                color={color}
                onChange={setColor}
                className="shadow-xl"
              />
            </div>

            <input
              type="submit"
              value="Create"
              onClick={preventDefault}
              className="mt-5 bg-gray-900 text-white py-3 px-12 rounded-lg font-bold text-3xl uppercase cursor-pointer hover:bg-gray-800 transition-colors"
            />
          </div>
        </form>
      ) : (
        <p className="text-3xl font-bold text-center">
          Log in to create a classroom
        </p>
      )}
    </>
  );
};

export default CreateClassroomForm;
